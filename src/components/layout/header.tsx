'use client';

import { Bell, LogOut, Settings, Search } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

export function Header({ user }: { user: { name: string, role: string } }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };


  return (
    <header className="flex h-24 w-full items-center justify-between px-8 bg-[#1A1A1F] shrink-0">
      
      {/* Left Title / Breadcrumbs (Placeholder) */}
      <div className="hidden md:flex items-center gap-4 text-white text-2xl font-medium tracking-tight">
        Dashboard
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-md mx-auto relative hidden md:block">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search for anything" 
            className="w-full bg-[#25252B] border border-white/[0.05] rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#99E2C6] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="relative h-12 w-12 rounded-full bg-[#25252B] flex items-center justify-center text-[#94A3B8] hover:text-white transition-all border border-white/[0.05]">
          <Bell className="h-5 w-5" strokeWidth={1.5} />
          <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#FFA6A6] border-2 border-[#25252B]"></span>
        </button>
        
        <div className="flex items-center gap-3 ml-2">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-medium text-white leading-none">{user.name}</span>
            <span className="text-[10px] text-[#94A3B8] font-medium mt-1">{user.role.replace('_', ' ')}</span>
          </div>
          <div className="h-12 w-12 rounded-full bg-[#FBE7A1] flex items-center justify-center text-[#1A1A1F] font-bold text-lg overflow-hidden border-2 border-[#1A1A1F]">
            {/* Replace with image if exists, else initial */}
            <span className="opacity-90">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          
          <button onClick={handleLogout} title="Logout" className="ml-2 text-[#94A3B8] hover:text-[#FFA6A6] transition-all p-2 rounded-full hover:bg-[#25252B]">
            <LogOut className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
