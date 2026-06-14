import { User, Bell, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export function Header({ user }: { user: { name: string, role: string } }) {
  const handleLogout = async () => {
    'use server';
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/login');
  };

  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="text-xl font-semibold text-slate-800">
        SuperGlow ERP
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            <User className="h-5 w-5" />
          </div>
          <div className="flex flex-col mr-4">
            <span className="text-sm font-semibold text-slate-800">{user.name}</span>
            <span className="text-xs text-slate-500 capitalize">{user.role.replace('_', ' ')}</span>
          </div>
          <form action={handleLogout}>
            <button type="submit" title="Logout" className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
              <LogOut className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
