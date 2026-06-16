import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user profile for role
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  const userRole = profile?.role || 'cashier';
  const fullName = profile?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--background)]">
      {/* Sidebar Navigation */}
      <Sidebar role={userRole} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header user={{ name: fullName, role: userRole }} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full bg-[#121214]">
          {children}
        </main>
      </div>
    </div>
  );
}
