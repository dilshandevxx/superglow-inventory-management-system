import Link from 'next/link';
import { Home, Package, ShoppingCart, Users, Truck, DollarSign, Settings, BarChart } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['super_admin', 'branch_manager', 'cashier', 'inventory_officer', 'accountant', 'hr_officer'] },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package, roles: ['super_admin', 'branch_manager', 'inventory_officer'] },
  { name: 'POS / Billing', href: '/dashboard/pos', icon: ShoppingCart, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Customers', href: '/dashboard/customers', icon: Users, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Suppliers', href: '/dashboard/suppliers', icon: Truck, roles: ['super_admin', 'branch_manager', 'inventory_officer'] },
  { name: 'Finance', href: '/dashboard/finance', icon: DollarSign, roles: ['super_admin', 'accountant'] },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart, roles: ['super_admin', 'branch_manager', 'accountant'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['super_admin', 'branch_manager'] },
];

export function Sidebar({ role }: { role: string }) {
  const allowedNav = navigation.filter(item => item.roles.includes(role));

  return (
    <div className="flex h-full w-64 flex-col bg-[#181a1f] z-20 shrink-0 border-r border-[#2c303a]">
      {/* Brand Header */}
      <div className="flex h-20 items-center px-6 border-b border-[#2c303a]">
        <div className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span className="text-[#4ade80]">✧</span>
          inventar
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto custom-scrollbar">
        {allowedNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-400 transition-colors duration-200 hover:bg-[#4ade80]/10 hover:text-[#4ade80]"
          >
            <item.icon className="h-5 w-5 transition-colors duration-200 group-hover:text-[#4ade80]" />
            {item.name}
          </Link>
        ))}
      </nav>
      
      {/* Footer / Info area */}
      <div className="p-4 border-t border-[#2c303a]">
        <div className="rounded-xl bg-[#20232b] p-4 border border-[#2c303a]">
          <p className="text-[10px] font-black text-[#4ade80] mb-1 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse"></span>
            System Online
          </p>
          <p className="text-xs text-slate-500 font-medium">Pro Plan • v0.1.0</p>
        </div>
      </div>
    </div>
  );
}
