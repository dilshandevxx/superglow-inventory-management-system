import { createClient } from "@/lib/supabase-server";
import { Plus, Search, User, Edit, Trash2, Users } from "lucide-react";

export default async function EmployeesPage() {
  const supabase = createClient();
  const { data: employees } = await supabase
    .from('employees')
    .select('*, branch:branches(name)')
    .order('created_at', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">Employee Directory</h1>
          <p className="mt-1 text-sm text-slate-400">Manage staff profiles and branch assignments.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 px-5 py-2.5 text-sm font-bold text-[#4ade80] hover:bg-[#4ade80]/20 transition-all active:scale-95">
          <Plus className="h-4 w-4" /> Add Employee
        </button>
      </div>

      <div className="panel overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[#2c303a] flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-[#181a1f]">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-[#4ade80]" />
            Staff List
          </h3>
          <div className="relative max-w-md w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="w-full bg-[#20232b] border border-[#2c303a] rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-[#20232b] text-xs uppercase text-slate-500 border-b border-[#2c303a]">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Employee Name</th>
                <th className="px-6 py-4 font-bold tracking-wider">Role</th>
                <th className="px-6 py-4 font-bold tracking-wider">Branch</th>
                <th className="px-6 py-4 font-bold tracking-wider">Contact</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c303a] bg-[#181a1f]">
              {employees && employees.length > 0 ? (
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-[#20232b] transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#20232b] border border-[#2c303a] flex items-center justify-center text-slate-400 group-hover:border-[#4ade80]/50 group-hover:text-[#4ade80] transition-colors">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-white group-hover:text-[#4ade80] transition-colors">{emp.first_name} {emp.last_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{emp.role}</td>
                    <td className="px-6 py-4 text-slate-400">{emp.branch?.name || '-'}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      <div>{emp.phone}</div>
                      <div className="text-slate-500">{emp.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                        emp.status === 'Active' ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-500 hover:text-[#4ade80] transition-colors rounded-lg hover:bg-[#4ade80]/10 border border-transparent hover:border-[#4ade80]/20">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Users className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-white font-bold mb-1">No employees found</p>
                    <p className="text-slate-500 text-sm">Add staff members to get started.</p>
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
