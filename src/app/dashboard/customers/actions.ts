"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function addCustomer(payload: {
  name: string;
  phone: string;
  email?: string;
}) {
  const supabase = createClient();
  
  if (!payload.name || !payload.phone) {
    return { error: "Name and phone are required." };
  }

  try {
    const { error } = await supabase
      .from('customers')
      .insert({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        loyalty_points: 0,
        credit_balance: 0
      });

    if (error) {
      if (error.code === '23505') {
        return { error: "A customer with this phone number already exists." };
      }
      throw error;
    }

    revalidatePath('/dashboard/customers');
    return { success: true };
  } catch (err: any) {
    console.error("Add customer error:", err);
    return { error: err.message || "An unexpected error occurred." };
  }
}
