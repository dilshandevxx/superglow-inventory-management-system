'use client';

import { Bell, LogOut, Settings, Search } from 'lucide-react';
import { createClient } from '@/lib/supabase';
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
    <header className="flex h-20 w-full items-center justify-between px-6 border-b border-[#2c303a] bg-[#181a1f] shrink-0">
      
      {/* Global Search (Optional) */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search anywhere..." 
            className="w-full bg-[#20232b] border border-[#2c303a] rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="h-10 w-10 rounded-full bg-[#20232b] border border-[#2c303a] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <Settings className="h-5 w-5" />
        </button>
        <button className="relative h-10 w-10 rounded-full bg-[#20232b] border border-[#2c303a] flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-[#4ade80] border-2 border-[#20232b]"></span>
        </button>
        
        <div className="flex items-center gap-3 ml-2 border-l border-[#2c303a] pl-6">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-white leading-none">{user.name}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold mt-1">{user.role.replace('_', ' ')}</span>
          </div>
          <div className="h-10 w-10 rounded-full bg-[#4ade80]/20 flex items-center justify-center text-[#4ade80] font-bold border border-[#4ade80]/30">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          <button onClick={handleLogout} title="Logout" className="ml-2 text-slate-500 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-[#20232b]">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
