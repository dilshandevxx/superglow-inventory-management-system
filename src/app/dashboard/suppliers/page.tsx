import { createClient } from "@/lib/supabase-server";
import { Plus, Search, Phone, Mail, Edit, Trash2, Users } from "lucide-react";

export default async function SuppliersPage() {
  const supabase = createClient();
  const { data: suppliers } = await supabase
    .from('suppliers')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">Suppliers</h1>
          <p className="mt-1 text-sm text-slate-400">Manage vendors, wholesale suppliers, and payable balances.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 px-5 py-2.5 text-sm font-bold text-[#4ade80] hover:bg-[#4ade80]/20 transition-all active:scale-95">
          <Plus className="h-4 w-4" /> Add Supplier
        </button>
      </div>

      <div className="panel overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[#2c303a] flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-[#181a1f]">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-[#4ade80]" />
            Supplier Directory
          </h3>
          <div className="relative max-w-md w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search suppliers..." 
              className="w-full bg-[#20232b] border border-[#2c303a] rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-[#20232b] text-xs uppercase text-slate-500 border-b border-[#2c303a]">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Supplier Name</th>
                <th className="px-6 py-4 font-bold tracking-wider">Contact Person</th>
                <th className="px-6 py-4 font-bold tracking-wider">Contact Details</th>
                <th className="px-6 py-4 font-bold tracking-wider">Outstanding Balance</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c303a] bg-[#181a1f]">
              {suppliers && suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-[#20232b] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-bold text-white">{supplier.name}</td>
                    <td className="px-6 py-4 text-slate-400">{supplier.contact_person || '-'}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs space-y-1.5">
                      {supplier.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-slate-500"/> {supplier.phone}</div>}
                      {supplier.email && <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-slate-500"/> {supplier.email}</div>}
                    </td>
                    <td className="px-6 py-4 font-black text-red-400">
                      Rs. {supplier.balance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-500 hover:text-[#4ade80] transition-colors rounded-lg hover:bg-[#4ade80]/10 border border-transparent hover:border-[#4ade80]/20">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10 border border-transparent hover:border-red-400/20">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Users className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-white font-bold mb-1">No suppliers found</p>
                    <p className="text-slate-500 text-sm">Add your first supplier to get started.</p>
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
