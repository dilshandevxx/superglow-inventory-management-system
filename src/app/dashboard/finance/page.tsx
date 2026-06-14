import { createClient } from "@/lib/supabase-server";
import { Plus, ArrowUpRight, ArrowDownRight, DollarSign, Search, FileText } from "lucide-react";

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
    <div className="animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">Finance & Accounts</h1>
          <p className="mt-1 text-sm text-slate-400">Track branch expenses, supplier payments, and miscellaneous income.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 px-5 py-2.5 text-sm font-bold text-[#4ade80] hover:bg-[#4ade80]/20 transition-all active:scale-95">
            <ArrowUpRight className="h-4 w-4" /> Record Income
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-5 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/20 transition-all active:scale-95">
            <ArrowDownRight className="h-4 w-4" /> Record Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div className="panel p-6 flex items-center gap-5 hover:border-[#4ade80]/50 transition-colors cursor-pointer group">
          <div className="rounded-xl p-3 bg-[#4ade80]/10 text-[#4ade80] group-hover:scale-110 transition-transform">
            <ArrowUpRight className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Income</p>
            <p className="text-2xl font-black text-white">Rs. {totalIncome.toFixed(2)}</p>
          </div>
        </div>
        <div className="panel p-6 flex items-center gap-5 hover:border-red-400/50 transition-colors cursor-pointer group">
          <div className="rounded-xl p-3 bg-red-400/10 text-red-400 group-hover:scale-110 transition-transform">
            <ArrowDownRight className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Expenses</p>
            <p className="text-2xl font-black text-white">Rs. {totalExpense.toFixed(2)}</p>
          </div>
        </div>
        <div className="panel p-6 flex items-center gap-5 hover:border-blue-400/50 transition-colors cursor-pointer group">
          <div className={`rounded-xl p-3 ${netProfit >= 0 ? 'bg-blue-400/10 text-blue-400' : 'bg-red-400/10 text-red-400'} group-hover:scale-110 transition-transform`}>
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Net Balance</p>
            <p className={`text-2xl font-black ${netProfit >= 0 ? 'text-blue-400' : 'text-red-400'}`}>Rs. {netProfit.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="panel overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[#2c303a] flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-[#181a1f]">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#4ade80]" />
            Recent Transactions
          </h3>
          <div className="relative max-w-md w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-full bg-[#20232b] border border-[#2c303a] rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-[#20232b] text-xs uppercase text-slate-500 border-b border-[#2c303a]">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                <th className="px-6 py-4 font-bold tracking-wider">Type</th>
                <th className="px-6 py-4 font-bold tracking-wider">Category</th>
                <th className="px-6 py-4 font-bold tracking-wider">Description</th>
                <th className="px-6 py-4 font-bold tracking-wider">Branch</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c303a] bg-[#181a1f]">
              {transactions && transactions.length > 0 ? (
                transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-[#20232b] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 text-slate-400 group-hover:text-white transition-colors">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                        t.type === 'income' ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20' : 'bg-red-400/10 text-red-400 border-red-400/20'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{t.category}</td>
                    <td className="px-6 py-4 text-slate-500">{t.description || '-'}</td>
                    <td className="px-6 py-4 text-slate-500">{t.branch?.name || '-'}</td>
                    <td className={`px-6 py-4 text-right font-black ${t.type === 'income' ? 'text-[#4ade80]' : 'text-red-400'}`}>
                      {t.type === 'income' ? '+' : '-'}Rs. {t.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <DollarSign className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-white font-bold mb-1">No transactions</p>
                    <p className="text-slate-500 text-sm">No transactions have been recorded yet.</p>
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
