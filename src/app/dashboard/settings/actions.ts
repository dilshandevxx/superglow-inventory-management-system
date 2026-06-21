"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function addBranch(payload: {
  name: string;
  address?: string;
  phone?: string;
}) {
  const supabase = createClient();
  
  if (!payload.name) {
    return { error: "Branch name is required." };
  }

  try {
    const { error } = await supabase
      .from('branches')
      .insert({
        name: payload.name,
        address: payload.address || null,
        phone: payload.phone || null,
        status: 'active'
      });

    if (error) throw error;

    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (err: any) {
    console.error("Add branch error:", err);
    return { error: err.message || "An unexpected error occurred." };
  }
}
