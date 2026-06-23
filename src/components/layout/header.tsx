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
      <header className="flex h-20 md:h-24 w-full items-center justify-between px-4 md:px-8 bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] shrink-0 z-30 relative transition-all">
        
        {/* Mobile Hamburger Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden h-10 w-10 flex items-center justify-center rounded-2xl bg-white/[0.02] border border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.05] mr-4 transition-all shadow-sm"
        >
          <Menu className="h-5 w-5" strokeWidth={2.5} />
        </button>

        {/* Left Title / Breadcrumbs (Hidden on tiny screens) */}
        <div className="hidden sm:flex items-center gap-2 text-white tracking-tight">
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className={`text-sm md:text-base ${crumb.isLast ? 'font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300' : 'font-bold text-slate-500 hover:text-white transition-colors cursor-pointer'}`}>
                {crumb.label}
              </span>
              {!crumb.isLast && <ChevronRight className="h-4 w-4 text-slate-600" strokeWidth={3} />}
            </div>
          ))}
        </div>

        {/* Global Search (Hidden on Mobile) */}
        <div className="flex-1 max-w-md mx-auto relative hidden xl:block px-8">
          <div className="relative flex items-center group">
            <Search className="absolute left-4 h-4 w-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors duration-300" strokeWidth={2.5} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-full pl-11 pr-4 py-2.5 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <div className="flex items-center bg-white/[0.02] border border-white/[0.05] rounded-full p-1 shadow-sm backdrop-blur-md">
            
            <button className="relative h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-white/[0.05] hover:text-white transition-all group">
              <Bell className="h-4 w-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
            </button>
            
            <div className="h-4 md:h-5 w-[1px] bg-white/[0.05] mx-0.5 md:mx-1"></div>

            <div className="flex items-center gap-2.5 pl-1 md:pl-2 pr-2 md:pr-4 py-1 cursor-pointer hover:bg-white/[0.05] rounded-full transition-colors group">
              <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-black flex items-center justify-center font-black text-[11px] md:text-[13px] shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform duration-300">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-[12px] md:text-[13px] font-bold text-white leading-none mb-1 tracking-wide">{user.name}</span>
                <span className="text-[9px] md:text-[10px] font-bold text-slate-500 capitalize leading-none tracking-wider">{user.role.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="h-4 md:h-5 w-[1px] bg-white/[0.05] mx-0.5 md:mx-1"></div>

            <button 
              onClick={handleLogout} 
              title="Logout" 
              className="h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all group"
            >
              <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden font-sans">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          {/* Slide-out Drawer */}
          <div className="absolute top-0 left-0 w-[280px] h-full bg-[var(--background)] border-r border-[var(--border)] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex h-20 items-center justify-between px-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-400 to-cyan-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Hexagon className="h-5 w-5 fill-current" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">SuperGlow</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/[0.05] text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Main Menu</p>
              {allowedNav.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 overflow-hidden
                      ${isActive 
                        ? 'text-white' 
                        : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
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
          </div>
        </div>
      )}
    </>
  );
}
