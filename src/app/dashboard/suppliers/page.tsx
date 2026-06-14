import { createClient } from "@/lib/supabase-server";
import { Plus, Search, Phone, Mail, Edit, Trash2 } from "lucide-react";

export default async function SuppliersPage() {
  const supabase = createClient();
  const { data: suppliers } = await supabase
    .from('suppliers')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Suppliers</h1>
          <p className="mt-1 text-sm text-slate-500">Manage vendors, wholesale suppliers, and payable balances.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Add Supplier
        </button>
      </div>

      <div className="mt-8 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search suppliers..." 
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Supplier Name</th>
                <th className="px-6 py-4 font-medium">Contact Person</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium">Outstanding Balance</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {suppliers && suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{supplier.name}</td>
                    <td className="px-6 py-4 text-slate-500">{supplier.contact_person || '-'}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs space-y-1">
                      {supplier.phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3"/> {supplier.phone}</div>}
                      {supplier.email && <div className="flex items-center gap-1"><Mail className="h-3 w-3"/> {supplier.email}</div>}
                    </td>
                    <td className="px-6 py-4 font-semibold text-red-600">
                      Rs. {supplier.balance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No suppliers found. Add your first supplier.
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
