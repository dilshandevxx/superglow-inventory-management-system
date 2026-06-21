import { createClient } from "@/lib/supabase-server";
import { POSClient } from "./pos-client";
import { redirect } from "next/navigation";

export default async function POSPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Fetch profile to get assigned branch
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('branch_id, role, full_name, id')
    .eq('id', user.id)
    .single();

  // Fetch all necessary data for the POS
  const [categoriesRes, productsRes, customersRes] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('products').select('*, inventory(quantity, branch_id)'),
    supabase.from('customers').select('*').order('name')
  ]);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -mt-4 md:-mt-8 -mx-4 md:-mx-8">
       <POSClient 
         categories={categoriesRes.data || []} 
         products={productsRes.data || []} 
         customers={customersRes.data || []} 
         userProfile={profile}
       />
    </div>
  );
}
