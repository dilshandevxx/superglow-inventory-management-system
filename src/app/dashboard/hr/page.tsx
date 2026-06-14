import Link from "next/link";
import { Users, Clock, CreditCard } from "lucide-react";

const hrModules = [
  { name: "Employee Directory", description: "Manage staff profiles, roles, and basic info.", icon: Users, href: "/dashboard/hr/employees", color: "text-[#4ade80]", bg: "bg-[#4ade80]/10", hover: "group-hover:border-[#4ade80]/50" },
  { name: "Attendance", description: "Track daily check-ins, check-outs, and leaves.", icon: Clock, href: "/dashboard/hr/attendance", color: "text-blue-400", bg: "bg-blue-400/10", hover: "group-hover:border-blue-400/50" },
  { name: "Payroll", description: "Generate salary slips, track allowances and deductions.", icon: CreditCard, href: "/dashboard/hr/payroll", color: "text-purple-400", bg: "bg-purple-400/10", hover: "group-hover:border-purple-400/50" },
];

export default function HRDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto w-full">
      <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">Human Resources</h1>
      <p className="mt-2 text-slate-400">Manage your staff, attendance, and payroll across all branches.</p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hrModules.map((module) => (
          <Link key={module.name} href={module.href} className={`group rounded-2xl bg-[#181a1f] border border-[#2c303a] p-6 shadow-sm hover:bg-[#20232b] ${module.hover} transition-all`}>
            <div className={`inline-flex rounded-xl p-3 ${module.bg} group-hover:scale-110 transition-transform`}>
              <module.icon className={`h-6 w-6 ${module.color}`} />
            </div>
            <h3 className={`mt-5 text-xl font-bold text-white group-hover:${module.color} transition-colors`}>{module.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
