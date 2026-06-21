"use server";

import { createClient } from "@/lib/supabase-server";

type CheckoutPayload = {
  cartItems: {
    product_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
  customerId: string | null;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  total: number;
  branchId: string | null;
  userId: string | null;
};

export async function processCheckout(payload: CheckoutPayload) {
  const supabase = createClient();
  
  // 1. Generate Invoice Number (e.g., INV-168902)
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  
  // Default to the first branch if none assigned (fallback for testing)
  let activeBranchId = payload.branchId;
  if (!activeBranchId) {
    const { data: branches } = await supabase.from('branches').select('id').limit(1).single();
    if (branches) {
      activeBranchId = branches.id;
    }
  }

  // 2. Insert Sale Record
  const { data: sale, error: saleError } = await supabase.from('sales').insert({
    invoice_number: invoiceNumber,
    branch_id: activeBranchId,
    user_id: payload.userId,
    customer_id: payload.customerId,
    subtotal: payload.subtotal,
    discount: payload.discount,
    total: payload.total,
    payment_method: payload.paymentMethod
  }).select().single();

  if (saleError) {
    console.error("Sale Error:", saleError);
    return { error: "Failed to create invoice." };
  }

  // 3. Insert Sale Items
  const itemsToInsert = payload.cartItems.map(item => ({
    sale_id: sale.id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.total_price
  }));

  const { error: itemsError } = await supabase.from('sale_items').insert(itemsToInsert);
  
  if (itemsError) {
    console.error("Sale Items Error:", itemsError);
    return { error: "Failed to insert sale items." };
  }

  // 4. Deduct from Inventory (Sequential updates for now)
  if (activeBranchId) {
    for (const item of payload.cartItems) {
      // Find existing inventory record
      const { data: invRecords } = await supabase
        .from('inventory')
        .select('id, quantity')
        .eq('product_id', item.product_id)
        .eq('branch_id', activeBranchId)
        .limit(1);
        
      if (invRecords && invRecords.length > 0) {
        const inv = invRecords[0];
        const newQty = inv.quantity - item.quantity;
        
        await supabase
          .from('inventory')
          .update({ quantity: newQty, last_updated: new Date().toISOString() })
          .eq('id', inv.id);
      } else {
        // If no inventory record exists yet, create one with negative balance to track overselling
        await supabase
          .from('inventory')
          .insert({
            product_id: item.product_id,
            branch_id: activeBranchId,
            quantity: -item.quantity
          });
      }
    }
  }

  return { success: true, invoiceNumber };
}
