import { createClient } from "@/lib/supabase-server";
import { SettingsClient } from "./settings-client";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch Branches
  const { data: branches } = await supabase
    .from('branches')
    .select('*')
    .order('name');

  // Fetch Staff (User Profiles)
  const { data: staff } = await supabase
    .from('user_profiles')
    .select(`
      *,
      branches(name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto font-sans">
      <div className="mb-8 mt-4">
        <p className="text-[#A1A1AA] text-sm font-medium mb-1">System Configuration</p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">Settings</h1>
        <p className="text-sm text-[#A1A1AA] mt-2">Manage branches, staff roles, and global system preferences.</p>
      </div>

      <SettingsClient branches={branches || []} staff={staff || []} />
    </div>
  );
}
