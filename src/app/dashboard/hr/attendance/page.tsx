import { createClient } from "@/lib/supabase-server";
import { Search, Clock, CheckCircle, XCircle } from "lucide-react";

export default async function AttendancePage() {
  const supabase = createClient();
  const { data: attendance } = await supabase
    .from('attendance')
    .select('*, employee:employees(first_name, last_name, role, branch:branches(name))')
    .order('date', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Attendance Tracking</h1>
          <p className="mt-1 text-sm text-slate-500">Daily check-ins and check-outs for staff.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition-colors shadow-sm">
          <Clock className="h-4 w-4" /> Mark Attendance
        </button>
      </div>

      <div className="mt-8 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by employee name or date..." 
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
          <input type="date" className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500" defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Employee</th>
                <th className="px-6 py-4 font-medium">Branch</th>
                <th className="px-6 py-4 font-medium">Check In</th>
                <th className="px-6 py-4 font-medium">Check Out</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendance && attendance.length > 0 ? (
                attendance.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{record.date}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {record.employee?.first_name} {record.employee?.last_name}
                      <span className="block text-xs font-normal text-slate-500">{record.employee?.role}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{record.employee?.branch?.name || '-'}</td>
                    <td className="px-6 py-4 text-slate-500">{record.check_in || '-'}</td>
                    <td className="px-6 py-4 text-slate-500">{record.check_out || '-'}</td>
                    <td className="px-6 py-4">
                      {record.status === 'Present' ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit text-xs font-medium">
                          <CheckCircle className="h-3.5 w-3.5" /> Present
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2 py-1 rounded w-fit text-xs font-medium">
                          <XCircle className="h-3.5 w-3.5" /> {record.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No attendance records for the selected date.
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
