"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ShoppingCart, Users, Truck, DollarSign, Settings, BarChart, ChevronLeft } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home, roles: ['super_admin', 'branch_manager', 'cashier', 'inventory_officer', 'accountant', 'hr_officer'] },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package, roles: ['super_admin', 'branch_manager', 'inventory_officer', 'cashier'] },
  { name: 'POS / Billing', href: '/dashboard/pos', icon: ShoppingCart, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Customers', href: '/dashboard/customers', icon: Users, roles: ['super_admin', 'branch_manager', 'cashier'] },
];

export function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const allowedNav = navigation.filter(item => item.roles.includes(role));

  return (
    <div className="flex h-full w-64 flex-col bg-[#09090B] border-r border-white/[0.05] z-20 shrink-0">
      
      {/* Top Toggle Area */}
      <div className="flex h-16 items-center justify-end px-4">
        <button className="p-2 text-[#94A3B8] hover:text-white transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col space-y-2 px-4 py-2 overflow-y-auto custom-scrollbar">
        {allowedNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'text-white bg-gradient-to-b from-white/[0.08] to-transparent border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]' 
                  : 'text-[#A1A1AA] border border-transparent hover:border-white/[0.05] hover:bg-white/[0.02] hover:text-white'
                }
              `}
            >
              <item.icon 
                className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[#A1A1AA] group-hover:text-white'}`} 
                strokeWidth={isActive ? 2 : 1.5} 
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Bottom Profile / Surge Card (Mimicking reference) */}
      <div className="p-4 mt-auto">
        <div className="rounded-xl border border-[#EA580C]/30 bg-[#EA580C]/5 p-4 relative overflow-hidden">
          <p className="text-xs font-semibold text-[#EA580C] flex items-center gap-1.5 mb-2">
            <span className="text-sm">⚡</span> System Surge: High traffic
          </p>
          <ul className="text-[10px] text-[#A1A1AA] space-y-1">
            <li className="flex items-center gap-1">✅ All modules active</li>
            <li className="flex items-center gap-1">📈 Performance optimal</li>
            <li className="flex items-center gap-1">👥 24 users online</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
