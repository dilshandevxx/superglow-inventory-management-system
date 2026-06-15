import { createClient } from "@/lib/supabase-server";
import { Search, AlertTriangle } from "lucide-react";
import BranchFilter from "./branch-filter";

export default async function BranchStockPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const branchId = typeof searchParams.branch_id === 'string' ? searchParams.branch_id : null;
  const supabase = createClient();
  
  const { data: branches } = await supabase.from('branches').select('id, name').order('name');
  
  let query = supabase
    .from('inventory')
    .select(`
      *,
      product:products(name, sku, reorder_level),
      branch:branches(name)
    `)
    .order('last_updated', { ascending: false });

  if (branchId) {
    query = query.eq('branch_id', branchId);
  }

  const { data: inventory } = await query;

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Branch Stock</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">Real-time inventory levels across all branches.</p>
        </div>
        <BranchFilter branches={branches || []} currentBranch={branchId} />
      </div>

      <div className="mt-8 panel overflow-hidden border-none">
        <div className="p-4 border-b border-white/[0.05] flex items-center gap-4 bg-[#1A1A1F]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Search by product name or SKU..." 
              className="w-full rounded-lg bg-[#2A2A32] border border-white/[0.05] pl-10 pr-4 py-2 text-sm text-white focus:border-[#C4B5FD] focus:outline-none transition-all placeholder-[#94A3B8]"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#94A3B8]">
            <thead className="bg-[#1A1A1F] text-xs uppercase text-[#94A3B8] border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 font-bold">Product & SKU</th>
                <th className="px-6 py-4 font-bold">Branch</th>
                <th className="px-6 py-4 font-bold">Batch No.</th>
                <th className="px-6 py-4 font-bold">Expiry Date</th>
                <th className="px-6 py-4 font-bold">In Stock</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {inventory && inventory.length > 0 ? (
                inventory.map((item) => {
                  const isLowStock = item.quantity <= (item.product?.reorder_level || 10);
                  
                  return (
                    <tr key={item.id} className="hover:bg-[#2A2A32] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{item.product?.name}</span>
                          <span className="text-xs text-[#94A3B8]">SKU: {item.product?.sku}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-[#25252B] border border-white/[0.05] px-2 py-1 text-xs font-bold text-[#94A3B8]">
                          {item.branch?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#94A3B8]">{item.batch_number || '-'}</td>
                      <td className="px-6 py-4 text-[#94A3B8]">{item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : '-'}</td>
                      <td className="px-6 py-4 font-bold text-white">{item.quantity}</td>
                      <td className="px-6 py-4">
                        {isLowStock ? (
                          <div className="flex items-center gap-1.5 text-[#FFA6A6]">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs font-bold">Low Stock</span>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-[#99E2C6]">Optimal</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#94A3B8]">
                    No stock records found across branches.
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
