'use client';

import { Bell, LogOut, Settings, Search, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { useRouter, usePathname } from 'next/navigation';

export function Header({ user }: { user: { name: string, role: string } }) {
  const router = useRouter();
  const pathname = usePathname();

  // Generate breadcrumbs from pathname
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    return {
      label,
      isLast: index === paths.length - 1
    };
  });

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };


  return (
    <header className="flex h-16 w-full items-center justify-between px-6 bg-[#09090B] border-b border-white/[0.05] shrink-0 z-10 relative">
      
      {/* Left Title / Breadcrumbs */}
      <div className="hidden md:flex items-center gap-2 text-white font-medium tracking-tight">
        {breadcrumbs.map((crumb, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className={`text-sm ${crumb.isLast ? 'font-semibold text-white' : 'font-medium text-[#A1A1AA] hover:text-white transition-colors cursor-pointer'}`}>
              {crumb.label}
            </span>
            {!crumb.isLast && <ChevronRight className="h-4 w-4 text-[#A1A1AA]/50" strokeWidth={2} />}
          </div>
        ))}
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-md mx-auto relative hidden md:block">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-[#A1A1AA]" strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Tap here to search..." 
            className="w-full bg-[#18181B] border border-white/[0.05] rounded-lg pl-10 pr-12 py-2 text-sm text-white placeholder-[#A1A1AA] focus:outline-none focus:border-white/[0.2] focus:bg-[#27272A] transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex gap-2">
          <button className="relative p-2 rounded-lg bg-[#18181B] text-[#A1A1AA] hover:text-white transition-all border border-white/[0.05] hover:border-white/[0.1]">
            <Bell className="h-4 w-4" strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#A855F7]"></span>
          </button>
          <button className="p-2 rounded-lg bg-[#18181B] text-[#A1A1AA] hover:text-white transition-all border border-white/[0.05] hover:border-white/[0.1]">
            <Settings className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/[0.05]">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-white leading-tight">{user.name}</span>
            <span className="text-[10px] text-[#A1A1AA] uppercase">{user.role.replace('_', ' ')}</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-[#A855F7] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          <button onClick={handleLogout} title="Logout" className="text-[#A1A1AA] hover:text-red-400 transition-all p-2 rounded-lg hover:bg-white/[0.05]">
            <LogOut className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
