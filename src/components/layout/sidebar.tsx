import Link from 'next/link';
import { Home, Package, ShoppingCart, Users, Truck, DollarSign, Settings, BarChart } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['super_admin', 'branch_manager', 'cashier', 'inventory_officer', 'accountant', 'hr_officer'] },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package, roles: ['super_admin', 'branch_manager', 'inventory_officer', 'cashier'] },
  { name: 'POS / Billing', href: '/dashboard/pos', icon: ShoppingCart, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Customers', href: '/dashboard/customers', icon: Users, roles: ['super_admin', 'branch_manager', 'cashier'] },
];

export function Sidebar({ role }: { role: string }) {
  const allowedNav = navigation.filter(item => item.roles.includes(role));

  return (
    <div className="flex h-full w-24 md:w-64 flex-col bg-[#1A1A1F] z-20 shrink-0">
      {/* Brand Header */}
      <div className="flex h-24 items-center justify-center md:justify-start px-6">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-[#99E2C6] text-[#1A1A1F] flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
          S
        </div>
        <div className="hidden md:block ml-3 text-xl font-medium text-white tracking-tight">
          SuperGlow
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col items-center md:items-stretch space-y-4 px-4 py-6 overflow-y-auto custom-scrollbar">
        {allowedNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center justify-center md:justify-start gap-4 rounded-xl px-4 py-3 text-sm font-medium text-[#94A3B8] transition-all duration-300 hover:bg-[#25252B] hover:text-white"
          >
            <item.icon className="h-6 w-6 transition-colors duration-200" strokeWidth={1.5} />
            <span className="hidden md:block">{item.name}</span>
          </Link>
        ))}
      </nav>
      
      {/* Footer / Info area */}
      <div className="p-6">
        <div className="h-12 w-12 mx-auto md:w-full rounded-[20px] bg-[#25252B] flex items-center justify-center md:p-4 border border-white/[0.02]">
          <Settings className="h-6 w-6 text-slate-500 md:hidden" strokeWidth={1.5} />
          <div className="hidden md:block w-full">
            <p className="text-[10px] font-bold text-[#99E2C6] mb-1 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#99E2C6] animate-pulse shadow-[0_0_8px_rgba(153,226,198,0.5)]"></span>
              Online
            </p>
            <p className="text-xs text-[#94A3B8] font-medium">v0.1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
