import { createClient } from "@/lib/supabase-server";
import { Search, Clock, CheckCircle, XCircle } from "lucide-react";

export default async function AttendancePage() {
  const supabase = createClient();
  const { data: attendance } = await supabase
    .from('attendance')
    .select('*, employee:employees(first_name, last_name, role, branch:branches(name))')
    .order('date', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">Attendance Tracking</h1>
          <p className="mt-1 text-sm text-slate-400">Daily check-ins and check-outs for staff.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/20 px-5 py-2.5 text-sm font-bold text-blue-400 hover:bg-blue-500/20 transition-all active:scale-95">
          <Clock className="h-4 w-4" /> Mark Attendance
        </button>
      </div>

      <div className="panel overflow-hidden flex flex-col">
        <div className="p-5 border-b border-[#2c303a] flex flex-col sm:flex-row sm:items-center gap-4 justify-between bg-[#181a1f]">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by employee name or date..." 
              className="w-full bg-[#20232b] border border-[#2c303a] rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <input 
            type="date" 
            className="w-full sm:w-auto bg-[#20232b] border border-[#2c303a] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" 
            defaultValue={new Date().toISOString().split('T')[0]} 
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-[#20232b] text-xs uppercase text-slate-500 border-b border-[#2c303a]">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                <th className="px-6 py-4 font-bold tracking-wider">Employee</th>
                <th className="px-6 py-4 font-bold tracking-wider">Branch</th>
                <th className="px-6 py-4 font-bold tracking-wider">Check In</th>
                <th className="px-6 py-4 font-bold tracking-wider">Check Out</th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2c303a] bg-[#181a1f]">
              {attendance && attendance.length > 0 ? (
                attendance.map((record) => (
                  <tr key={record.id} className="hover:bg-[#20232b] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-bold text-white">{record.date}</td>
                    <td className="px-6 py-4 font-bold text-white group-hover:text-blue-400 transition-colors">
                      {record.employee?.first_name} {record.employee?.last_name}
                      <span className="block text-xs font-normal text-slate-500 mt-0.5">{record.employee?.role}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{record.employee?.branch?.name || '-'}</td>
                    <td className="px-6 py-4 text-slate-400">{record.check_in || '-'}</td>
                    <td className="px-6 py-4 text-slate-400">{record.check_out || '-'}</td>
                    <td className="px-6 py-4">
                      {record.status === 'Present' ? (
                        <div className="flex items-center gap-1.5 text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/20 px-2 py-1 rounded w-fit text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle className="h-3.5 w-3.5" /> Present
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-1 rounded w-fit text-[10px] font-bold uppercase tracking-wider">
                          <XCircle className="h-3.5 w-3.5" /> {record.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <Clock className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-white font-bold mb-1">No attendance records</p>
                    <p className="text-slate-500 text-sm">No attendance records for the selected date.</p>
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
