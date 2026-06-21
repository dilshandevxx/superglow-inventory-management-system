import { createClient } from "@/lib/supabase-server";
import { ReceivingClient } from "./receiving-client";
import { redirect } from "next/navigation";

export default async function ReceivingPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch all products for the searchable dropdown
  const { data: products } = await supabase
    .from('products')
    .select('id, name, sku, inventory(quantity, branch_id)')
    .order('name');

  // Fetch all branches
  const { data: branches } = await supabase
    .from('branches')
    .select('*')
    .order('name');

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-8 mt-4">
        <p className="text-[#A1A1AA] text-sm font-medium mb-1">Inventory Management</p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white">Receive Stock</h1>
        <p className="text-sm text-[#A1A1AA] mt-2">Log incoming shipments to increase your branch inventory levels safely.</p>
      </div>

      <ReceivingClient products={products || []} branches={branches || []} />
    </div>
  );
}
