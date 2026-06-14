import { createClient } from "@/lib/supabase-server";
import { Search, Filter, AlertTriangle } from "lucide-react";

export default async function BranchStockPage() {
  const supabase = createClient();
  const { data: inventory } = await supabase
    .from('inventory')
    .select(`
      *,
      product:products(name, sku, reorder_level),
      branch:branches(name)
    `)
    .order('last_updated', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Branch Stock</h1>
          <p className="mt-1 text-sm text-slate-500">Real-time inventory levels across all branches.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm">
          <Filter className="h-4 w-4" /> Filter by Branch
        </button>
      </div>

      <div className="mt-8 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by product name or SKU..." 
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Product & SKU</th>
                <th className="px-6 py-4 font-medium">Branch</th>
                <th className="px-6 py-4 font-medium">Batch No.</th>
                <th className="px-6 py-4 font-medium">Expiry Date</th>
                <th className="px-6 py-4 font-medium">In Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory && inventory.length > 0 ? (
                inventory.map((item) => {
                  const isLowStock = item.quantity <= (item.product?.reorder_level || 10);
                  
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{item.product?.name}</span>
                          <span className="text-xs text-slate-400">SKU: {item.product?.sku}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                          {item.branch?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{item.batch_number || '-'}</td>
                      <td className="px-6 py-4 text-slate-500">{item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : '-'}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{item.quantity}</td>
                      <td className="px-6 py-4">
                        {isLowStock ? (
                          <div className="flex items-center gap-1.5 text-red-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs font-medium">Low Stock</span>
                          </div>
                        ) : (
                          <span className="text-xs font-medium text-emerald-600">Optimal</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
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
