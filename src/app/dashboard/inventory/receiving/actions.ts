"use server";

import { createClient } from "@/lib/supabase-server";

export async function receiveStock(payload: {
  productId: string;
  branchId: string;
  quantity: number;
}) {
  const supabase = createClient();
  
  if (!payload.productId || !payload.branchId || payload.quantity <= 0) {
    return { error: "Invalid data provided." };
  }

  try {
    // 1. Check if inventory record already exists for this product at this branch
    const { data: existingInv, error: searchError } = await supabase
      .from('inventory')
      .select('id, quantity')
      .eq('product_id', payload.productId)
      .eq('branch_id', payload.branchId)
      .limit(1);

    if (searchError) {
      console.error("Inventory search error:", searchError);
      return { error: "Failed to search inventory." };
    }

    if (existingInv && existingInv.length > 0) {
      // 2. Update existing inventory
      const currentQty = existingInv[0].quantity;
      const newQty = currentQty + payload.quantity;
      
      const { error: updateError } = await supabase
        .from('inventory')
        .update({ 
          quantity: newQty,
          last_updated: new Date().toISOString()
        })
        .eq('id', existingInv[0].id);

      if (updateError) throw updateError;
    } else {
      // 3. Create new inventory record
      const { error: insertError } = await supabase
        .from('inventory')
        .insert({
          product_id: payload.productId,
          branch_id: payload.branchId,
          quantity: payload.quantity
        });

      if (insertError) throw insertError;
    }

    return { success: true };
  } catch (err: any) {
    console.error("Receive stock error:", err);
    return { error: err.message || "An unexpected error occurred." };
  }
}
