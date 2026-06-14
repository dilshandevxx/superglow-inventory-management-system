import Link from "next/link";
import { Users, Clock, CreditCard } from "lucide-react";

const hrModules = [
  { name: "Employee Directory", description: "Manage staff profiles, roles, and basic info.", icon: Users, href: "/dashboard/hr/employees", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Attendance", description: "Track daily check-ins, check-outs, and leaves.", icon: Clock, href: "/dashboard/hr/attendance", color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "Payroll", description: "Generate salary slips, track allowances and deductions.", icon: CreditCard, href: "/dashboard/hr/payroll", color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

export default function HRDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Human Resources</h1>
      <p className="mt-2 text-slate-500">Manage your staff, attendance, and payroll across all branches.</p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hrModules.map((module) => (
          <Link key={module.name} href={module.href} className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
            <div className={`inline-flex rounded-xl p-3 ${module.bg}`}>
              <module.icon className={`h-6 w-6 ${module.color}`} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{module.name}</h3>
            <p className="mt-2 text-sm text-slate-500">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
