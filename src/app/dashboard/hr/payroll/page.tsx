import { createClient } from "@/lib/supabase-server";
import { Search, CreditCard, Download } from "lucide-react";

export default async function PayrollPage() {
  const supabase = createClient();
  const { data: payroll } = await supabase
    .from('payroll')
    .select('*, employee:employees(first_name, last_name, role, branch:branches(name))')
    .order('month', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Payroll</h1>
          <p className="mt-1 text-sm text-slate-500">Manage employee salaries, deductions, and generate payslips.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm">
          <CreditCard className="h-4 w-4" /> Run Payroll
        </button>
      </div>

      <div className="mt-8 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search payroll records..." 
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
          <select className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500">
            <option>June 2026</option>
            <option>May 2026</option>
            <option>April 2026</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Month</th>
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium text-right">Base Salary</th>
                <th className="px-6 py-4 font-medium text-right">Allowances</th>
                <th className="px-6 py-4 font-medium text-right">Deductions</th>
                <th className="px-6 py-4 font-medium text-right">Net Salary</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payroll && payroll.length > 0 ? (
                payroll.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{record.month}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {record.employee?.first_name} {record.employee?.last_name}
                      <span className="block text-xs font-normal text-slate-500">{record.employee?.branch?.name}</span>
                    </td>
                    <td className="px-6 py-4 text-right">Rs. {record.base_salary.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-emerald-600">+Rs. {record.allowances.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-red-600">-Rs. {record.deductions.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">Rs. {record.net_salary.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        record.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors rounded-md hover:bg-emerald-50" title="Download Payslip">
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    No payroll records found for the selected month.
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
