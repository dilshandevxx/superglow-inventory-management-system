import { ArrowRightLeft, Search, Plus } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function TransfersPage() {
  const supabase = createClient();
  const { data: transfers } = await supabase
    .from('inventory_transfers')
    .select(`
      *,
      product:products(name),
      from_branch:branches!from_branch_id(name),
      to_branch:branches!to_branch_id(name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Stock Transfers</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">Manage stock movement between branches and warehouses.</p>
        </div>
        <Link href="/dashboard/inventory/transfers/new" className="flex items-center gap-2 rounded-xl bg-[#93C5FD] px-4 py-2 text-sm font-bold text-[#1A1A1F] hover:bg-white transition-colors shadow-sm">
          <ArrowRightLeft className="h-4 w-4" /> New Transfer
        </Link>
      </div>

      <div className="mt-8 panel overflow-hidden border-none">
        <div className="p-4 border-b border-white/[0.05] flex items-center gap-4 bg-[#1A1A1F]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Search transfers..." 
              className="w-full rounded-lg bg-[#2A2A32] border border-white/[0.05] pl-10 pr-4 py-2 text-sm text-white focus:border-[#93C5FD] focus:outline-none transition-all placeholder-[#94A3B8]"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#94A3B8]">
            <thead className="bg-[#1A1A1F] text-xs uppercase text-[#94A3B8] border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 font-bold">Transfer ID</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Product</th>
                <th className="px-6 py-4 font-bold">From</th>
                <th className="px-6 py-4 font-bold">To</th>
                <th className="px-6 py-4 font-bold">Qty</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {transfers && transfers.length > 0 ? (
                transfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-[#2A2A32] transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{transfer.transfer_number}</td>
                    <td className="px-6 py-4 text-[#94A3B8]">{new Date(transfer.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-bold text-white">{transfer.product?.name}</td>
                    <td className="px-6 py-4 text-[#94A3B8]">{transfer.from_branch?.name || 'Main Warehouse'}</td>
                    <td className="px-6 py-4 text-[#94A3B8]">{transfer.to_branch?.name}</td>
                    <td className="px-6 py-4 font-bold text-white">{transfer.quantity}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md border border-white/[0.05] px-2 py-1 text-xs font-bold ${
                        transfer.status === 'Completed' ? 'bg-[#25252B] text-[#99E2C6]' : 
                        transfer.status === 'Rejected' ? 'bg-[#25252B] text-[#FFA6A6]' :
                        'bg-[#25252B] text-[#FBE7A1]'
                      }`}>
                        {transfer.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[#94A3B8]">
                    No transfers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
