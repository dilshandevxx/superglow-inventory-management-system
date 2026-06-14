import { createClient } from "@/lib/supabase-server";
import { Plus, ArrowUpRight, ArrowDownRight, DollarSign, Search } from "lucide-react";

export default async function FinancePage() {
  const supabase = createClient();
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*, branch:branches(name), recorded_by:user_profiles(full_name)')
    .order('date', { ascending: false });

  // Calculate summaries
  const totalIncome = transactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) || 0;
  const totalExpense = transactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) || 0;
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Finance & Accounts</h1>
          <p className="mt-1 text-sm text-slate-500">Track branch expenses, supplier payments, and miscellaneous income.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm">
            <ArrowUpRight className="h-4 w-4" /> Record Income
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-sm">
            <ArrowDownRight className="h-4 w-4" /> Record Expense
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm flex items-center gap-4 hover:border-emerald-500 transition-colors">
          <div className="rounded-full p-4 bg-emerald-50 text-emerald-600">
            <ArrowUpRight className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Income</p>
            <p className="text-2xl font-bold text-slate-900">Rs. {totalIncome.toFixed(2)}</p>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm flex items-center gap-4 hover:border-red-500 transition-colors">
          <div className="rounded-full p-4 bg-red-50 text-red-600">
            <ArrowDownRight className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Expenses</p>
            <p className="text-2xl font-bold text-slate-900">Rs. {totalExpense.toFixed(2)}</p>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm flex items-center gap-4 hover:border-blue-500 transition-colors">
          <div className={`rounded-full p-4 ${netProfit >= 0 ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Net Balance</p>
            <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>Rs. {netProfit.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800 flex-1">Recent Transactions</h3>
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Branch</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions && transactions.length > 0 ? (
                transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-500">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        t.type === 'income' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                      }`}>
                        {t.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{t.category}</td>
                    <td className="px-6 py-4 text-slate-500">{t.description || '-'}</td>
                    <td className="px-6 py-4 text-slate-500">{t.branch?.name || '-'}</td>
                    <td className={`px-6 py-4 text-right font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {t.type === 'income' ? '+' : '-'}Rs. {t.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No transactions recorded yet.
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
