"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const supabase = createClient();

  const name = formData.get("name") as string;
  const sku = formData.get("sku") as string;
  const barcode = formData.get("barcode") as string;
  const description = formData.get("description") as string;
  const category_id = formData.get("category_id") as string;
  const brand_id = formData.get("brand_id") as string;
  const cost_price = parseFloat(formData.get("cost_price") as string);
  const selling_price = parseFloat(formData.get("selling_price") as string);
  const reorder_level = parseInt(formData.get("reorder_level") as string) || 10;
  
  const initial_stock = parseInt(formData.get("initial_stock") as string) || 0;
  // Get branch ID from current user profile
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('branch_id')
    .eq('id', user.id)
    .single();

  const branch_id = profile?.branch_id;

  try {
    // 1. Insert Product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([
        {
          name,
          sku,
          barcode: barcode || null,
          description,
          category_id: category_id || null,
          brand_id: brand_id || null,
          cost_price,
          selling_price,
          reorder_level
        }
      ])
      .select()
      .single();

    if (productError) throw productError;

    // 2. Insert Initial Stock if greater than 0 and branch is known
    if (initial_stock > 0 && branch_id) {
      const { error: stockError } = await supabase
        .from('inventory')
        .insert([
          {
            product_id: product.id,
            branch_id: branch_id,
            quantity: initial_stock,
            batch_number: 'INITIAL'
          }
        ]);
        
      if (stockError) throw stockError;
    }

    revalidatePath("/dashboard/inventory/products");
    return { success: true, data: product };

  } catch (error: any) {
    console.error("Create product error:", error);
    return { success: false, error: error.message || "Failed to create product" };
  }
}

// --- Categories ---
export async function createCategory(formData: FormData) {
  const supabase = createClient();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  
  const { data, error } = await supabase.from('categories').insert([{ name, description }]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard/inventory/categories");
  return { success: true, data };
}

export async function deleteCategory(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard/inventory/categories");
  return { success: true };
}

// --- Brands ---
export async function createBrand(formData: FormData) {
  const supabase = createClient();
  const name = formData.get("name") as string;
  
  const { data, error } = await supabase.from('brands').insert([{ name }]).select().single();
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard/inventory/brands");
  return { success: true, data };
}

export async function deleteBrand(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('brands').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard/inventory/brands");
  return { success: true };
}

// --- Transfers ---
export async function createTransfer(formData: FormData) {
  const supabase = createClient();
  const product_id = formData.get("product_id") as string;
  const from_branch_id = formData.get("from_branch_id") as string;
  const to_branch_id = formData.get("to_branch_id") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const transfer_number = 'TRF-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  const { data, error } = await supabase.from('inventory_transfers').insert([{
    transfer_number,
    product_id,
    from_branch_id: from_branch_id || null,
    to_branch_id,
    quantity,
    status: 'Pending',
    created_by: user.id
  }]).select().single();

  if (error) return { success: false, error: error.message };
  revalidatePath("/dashboard/inventory/transfers");
  return { success: true, data };
}
