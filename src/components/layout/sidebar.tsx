"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, ShoppingCart, Users, Truck, DollarSign, Settings, BarChart, ChevronLeft, Hexagon, HelpCircle } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['super_admin', 'branch_manager', 'cashier', 'inventory_officer', 'accountant', 'hr_officer'] },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package, roles: ['super_admin', 'branch_manager', 'inventory_officer', 'cashier'] },
  { name: 'POS / Billing', href: '/dashboard/pos', icon: ShoppingCart, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Transactions', href: '/dashboard/transactions', icon: DollarSign, roles: ['super_admin', 'branch_manager', 'accountant', 'cashier'] },
  { name: 'Customers', href: '/dashboard/customers', icon: Users, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['super_admin', 'branch_manager'] },
];

export function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const allowedNav = navigation.filter(item => item.roles.includes(role));

  return (
    <div className="hidden lg:flex h-full w-[260px] flex-col bg-[var(--background)] z-20 shrink-0 border-r border-[var(--border)] font-sans relative">
      
      {/* Brand Logo Area */}
      <div className="flex h-24 items-center px-8 relative group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-400 to-cyan-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform duration-300">
            <Hexagon className="h-5 w-5 fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">SuperGlow</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col space-y-2 px-4 py-6 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Main Menu</p>
        
        {allowedNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 overflow-hidden
                ${isActive 
                  ? 'text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }
              `}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/5 border border-emerald-500/20 rounded-2xl pointer-events-none"></div>
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              )}
              <item.icon 
                className={`h-5 w-5 relative z-10 ${isActive ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-500 group-hover:text-slate-300'}`} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Bottom Area: Premium Help Card */}
      <div className="p-5 mt-auto mb-2">
        <div className="rounded-[24px] bg-gradient-to-b from-[#121215] to-[#0a0a0c] p-6 relative flex flex-col items-center text-center border border-[var(--border)] group hover:border-emerald-500/30 transition-colors duration-500 shadow-xl overflow-hidden">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full group-hover:bg-emerald-500/30 transition-colors duration-500"></div>
          
          <div className="h-12 w-12 bg-white/[0.05] border border-white/10 rounded-2xl flex items-center justify-center mb-4 shadow-sm text-slate-300 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300 backdrop-blur-md">
            <HelpCircle className="h-6 w-6" strokeWidth={2} />
          </div>
          <p className="text-sm font-bold text-white mb-1 tracking-wide">Need Help?</p>
          <p className="text-[11px] font-medium text-slate-400 mb-5">Check our documentation</p>
          <button className="w-full py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-md">
            View Docs
          </button>
        </div>
      </div>
      
    </div>
  );
}
