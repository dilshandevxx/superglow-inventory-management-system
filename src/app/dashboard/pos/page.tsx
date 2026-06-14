import { createClient } from "@/lib/supabase-server";
import PosClient from "./pos-client";

export default async function POSPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*, branch:branches(id, name)')
    .eq('id', user?.id)
    .single();

  const { data: products } = await supabase
    .from('products')
    .select('*, inventory(quantity, branch_id)')
    .order('name');
    
  return (
    <div className="h-full">
      <PosClient products={products || []} userProfile={profile} />
    </div>
  );
}
