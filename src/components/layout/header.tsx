'use client';

import { useState, useEffect } from 'react';
import { Bell, LogOut, Search, ChevronRight, Menu, X, Home, Package, ShoppingCart, Users, Settings, Hexagon, DollarSign } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['super_admin', 'branch_manager', 'cashier', 'inventory_officer', 'accountant', 'hr_officer'] },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package, roles: ['super_admin', 'branch_manager', 'inventory_officer', 'cashier'] },
  { name: 'POS / Billing', href: '/dashboard/pos', icon: ShoppingCart, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Transactions', href: '/dashboard/transactions', icon: DollarSign, roles: ['super_admin', 'branch_manager', 'accountant', 'cashier'] },
  { name: 'Customers', href: '/dashboard/customers', icon: Users, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['super_admin', 'branch_manager'] },
];

export function Header({ user }: { user: { name: string, role: string } }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const allowedNav = navigation.filter(item => item.roles.includes(user.role));

  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    return { label, isLast: index === paths.length - 1 };
  });

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      <header className="flex h-20 md:h-24 w-full items-center justify-between px-4 md:px-8 bg-[#09090B] shrink-0 z-30 relative">
        
        {/* Mobile Hamburger Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full bg-[#18181B] border border-white/[0.05] text-[#A1A1AA] hover:text-white mr-4"
        >
          <Menu className="h-5 w-5" strokeWidth={2.5} />
        </button>

        {/* Left Title / Breadcrumbs (Hidden on tiny screens) */}
        <div className="hidden sm:flex items-center gap-2 text-white tracking-tight">
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`text-sm md:text-base ${crumb.isLast ? 'font-bold text-white' : 'font-semibold text-[#A1A1AA] hover:text-white transition-colors cursor-pointer'}`}>
                {crumb.label}
              </span>
              {!crumb.isLast && <ChevronRight className="h-4 w-4 text-[#A1A1AA]" strokeWidth={2.5} />}
            </div>
          ))}
        </div>

        {/* Global Search (Hidden on Mobile) */}
        <div className="flex-1 max-w-md mx-auto relative hidden xl:block px-8">
          <div className="relative flex items-center group">
            <Search className="absolute left-4 h-4 w-4 text-[#A1A1AA] group-focus-within:text-[#D1E8D5] transition-colors" strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full bg-[#1A1A1A] border border-[#252525] rounded-full pl-11 pr-4 py-3 text-sm font-semibold text-white placeholder-[#A1A1AA] focus:outline-none focus:border-[#D1E8D5]/50 focus:bg-[#1A1A1A]/80 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <div className="flex items-center bg-[#18181B] border border-white/[0.05] rounded-full p-1 shadow-sm">
            
            <button className="relative h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-[#A1A1AA] hover:bg-white/[0.05] hover:text-white transition-all">
              <Bell className="h-4 w-4" strokeWidth={2.5} />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#D1E8D5] shadow-[0_0_8px_rgba(209,232,213,0.5)]"></span>
            </button>
            
            <div className="h-4 md:h-5 w-[1px] bg-white/[0.05] mx-0.5 md:mx-1"></div>

            <div className="flex items-center gap-2.5 pl-1 md:pl-2 pr-2 md:pr-4 py-1 cursor-pointer hover:bg-white/[0.05] rounded-full transition-colors group">
              <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-[#D1E8D5] to-[#A5D8FF] text-[#1A1A1A] flex items-center justify-center font-bold text-[11px] md:text-[13px] shadow-sm group-hover:scale-105 transition-transform">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-[12px] md:text-[13px] font-semibold text-white leading-none mb-1">{user.name}</span>
                <span className="text-[9px] md:text-[10px] font-medium text-[#A1A1AA] capitalize leading-none">{user.role.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="h-4 md:h-5 w-[1px] bg-white/[0.05] mx-0.5 md:mx-1"></div>

            <button 
              onClick={handleLogout} 
              title="Logout" 
              className="h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-[#A1A1AA] hover:bg-[#FFA6A6]/10 hover:text-[#FFA6A6] transition-all"
            >
              <LogOut className="h-4 w-4" strokeWidth={2.5} />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden font-sans">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Slide-out Drawer */}
          <div className="absolute top-0 left-0 w-[280px] h-full bg-[#1A1A1A] border-r border-[#252525] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex h-20 items-center justify-between px-6 border-b border-[#252525]">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded flex items-center justify-center bg-[#D1E8D5] text-[#1A1A1A]">
                  <Hexagon className="h-5 w-5 fill-current" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">SuperGlow</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-[#252525] text-[#A1A1AA] hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] mb-4">Main Menu</p>
              {allowedNav.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition-all duration-200
                      ${isActive ? 'bg-[#252525] text-white shadow-sm' : 'text-[#A1A1AA] hover:bg-[#252525]/40 hover:text-white'}
                    `}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-[#D1E8D5]' : 'text-[#A1A1AA] group-hover:text-white'}`} strokeWidth={isActive ? 2.5 : 2} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
