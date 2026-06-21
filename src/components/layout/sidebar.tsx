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
    <div className="hidden lg:flex h-full w-[260px] flex-col bg-[#1A1A1A] z-20 shrink-0 border-r border-[#252525] font-sans">
      
      {/* Brand Logo Area */}
      <div className="flex h-24 items-center px-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded flex items-center justify-center bg-[#D1E8D5] text-[#1A1A1A]">
            <Hexagon className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SuperGlow</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col space-y-1.5 px-4 py-4 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] mb-3">Main Menu</p>
        
        {allowedNav.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200
                ${isActive 
                  ? 'bg-[#252525] text-white shadow-sm' 
                  : 'text-[#A1A1AA] hover:bg-[#252525]/40 hover:text-white'
                }
              `}
            >
              <item.icon 
                className={`h-5 w-5 ${isActive ? 'text-[#D1E8D5]' : 'text-[#A1A1AA] group-hover:text-white'}`} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Bottom Area: Pale Mint Help Card */}
      <div className="p-5 mt-auto mb-2">
        <div className="rounded-[24px] bg-[#E2F1E4] p-5 relative overflow-hidden flex flex-col items-center text-center shadow-inner">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-[#1A1A1A]">
            <HelpCircle className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <p className="text-sm font-bold text-[#1A1A1A] mb-1">Need Help?</p>
          <p className="text-[11px] font-medium text-[#1A1A1A]/70 mb-5">Check our documentation</p>
          <button className="w-full py-2.5 bg-[#1A1A1A] text-white rounded-full text-xs font-bold transition-transform hover:scale-[1.02] active:scale-95 shadow-md">
            View Docs
          </button>
        </div>
      </div>
      
    </div>
  );
}
