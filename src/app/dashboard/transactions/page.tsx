import { createClient } from "@/lib/supabase-server";
import { TransactionsClient } from "./transactions-client";
import { redirect } from "next/navigation";

export default async function TransactionsPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch sales with related data
  const { data: sales, error } = await supabase
    .from('sales')
    .select(`
      *,
      branches(name),
      user_profiles(full_name),
      customers(name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching sales:", error);
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 mt-4">
        <div>
          <p className="text-[#A1A1AA] text-sm font-medium mb-1">Ledger</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-white">Transactions History</h1>
        </div>
      </div>

      <TransactionsClient initialSales={sales || []} />
    </div>
  );
}
