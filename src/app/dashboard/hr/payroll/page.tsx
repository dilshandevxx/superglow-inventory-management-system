import { createClient } from "@/lib/supabase-server";
import { Search, CreditCard, Download, FileText } from "lucide-react";

export default async function PayrollPage() {
  const supabase = createClient();
  const { data: payroll } = await supabase
    .from('payroll')
    .select('*, employee:employees(first_name, last_name, role, branch:branches(name))')
    .order('month', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">Payroll</h1>
          <p className="mt-1 text-sm text-slate-400">Manage employee salaries, deductions, and generate payslips.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 px-5 py-2.5 text-sm font-bold text-[#4ade80] hover:bg-[#4ade80]/20 transition-all active:scale-95">
          <CreditCard className="h-4 w-4" /> Run Payroll
        </button>
      </div>

      <div className="panel overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[#2c303a] flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-[#181a1f]">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search payroll records..." 
              className="w-full bg-[#20232b] border border-[#2c303a] rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
            />
          </div>
          <select className="w-full sm:w-auto bg-[#20232b] border border-[#2c303a] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#4ade80] transition-colors">
            <option>June 2026</option>
            <option>May 2026</option>
            <option>April 2026</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-[#20232b] text-xs uppercase text-slate-500 border-b border-[#2c303a]">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Month</th>
                <th className="px-6 py-4 font-bold tracking-wider">Employee</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Base Salary</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Allowances</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Deductions</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Net Salary</th>
                <th className="px-6 py-4 font-bold tracking-wider text-center">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c303a] bg-[#181a1f]">
              {payroll && payroll.length > 0 ? (
                payroll.map((record) => (
                  <tr key={record.id} className="hover:bg-[#20232b] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-bold text-white">{record.month}</td>
                    <td className="px-6 py-4 font-bold text-white group-hover:text-[#4ade80] transition-colors">
                      {record.employee?.first_name} {record.employee?.last_name}
                      <span className="block text-xs font-normal text-slate-500 mt-0.5">{record.employee?.branch?.name}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400">Rs. {record.base_salary.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-[#4ade80]">+Rs. {record.allowances.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-red-400">-Rs. {record.deductions.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-black text-white">Rs. {record.net_salary.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                        record.status === 'Paid' ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20' : 'bg-orange-400/10 text-orange-400 border-orange-400/20'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-500 hover:text-[#4ade80] transition-colors rounded-lg hover:bg-[#4ade80]/10 border border-transparent hover:border-[#4ade80]/20" title="Download Payslip">
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                    <FileText className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-white font-bold mb-1">No payroll records</p>
                    <p className="text-slate-500 text-sm">No payroll records found for the selected month.</p>
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
