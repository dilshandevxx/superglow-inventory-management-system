"use server";

import { createClient } from "@/lib/supabase-server";

export async function getSaleItems(saleId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('sale_items')
    .select(`
      *,
      products(name, sku)
    `)
    .eq('sale_id', saleId);

  if (error) {
    console.error("Error fetching sale items:", error);
    return { error: "Failed to fetch receipt details." };
  }

  return { items: data };
}
