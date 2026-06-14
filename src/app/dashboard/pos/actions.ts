"use server";
import { createClient } from "@/lib/supabase-server";

export async function checkoutAction(data: any) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: "Unauthorized" };

  const { branchId, subtotal, discount, total, paymentMethod, items } = data;

  const { data: saleId, error } = await supabase.rpc('process_checkout', {
    p_branch_id: branchId,
    p_user_id: user.id,
    p_subtotal: subtotal,
    p_discount: discount,
    p_total: total,
    p_payment_method: paymentMethod,
    p_items: items
  });

  if (error) {
    console.error("Checkout Error:", error);
    return { success: false, error: error.message };
  }

  return { success: true, saleId };
}
