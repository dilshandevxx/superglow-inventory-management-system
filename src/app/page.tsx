import Link from "next/link";
import { ArrowRight, Box, BarChart3, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111114] text-white selection:bg-[#99E2C6]/30 overflow-hidden relative">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#99E2C6]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#60A5FA]/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#99E2C6] to-[#60A5FA] text-[#111114] flex items-center justify-center font-black text-xl shadow-lg shadow-[#99E2C6]/20">
            S
          </div>
          <span className="text-xl font-black tracking-tight">SuperGlow</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-bold text-[#94A3B8] hover:text-white transition-colors">
            Documentation
          </Link>
          <Link href="/login" className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10 hover:border-white/20">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#99E2C6]/10 text-[#99E2C6] text-xs font-bold uppercase tracking-widest mb-8 border border-[#99E2C6]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#99E2C6] animate-pulse"></span>
          SuperGlow ERP v2.0 is Live
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] mb-8">
          Manage your business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#99E2C6] to-[#60A5FA]">absolute clarity.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mb-12 font-medium">
          The all-in-one cloud operating system for modern retail and wholesale businesses. Inventory, POS, HR, and Finance—beautifully unified.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/login" className="px-8 py-4 rounded-full bg-gradient-to-r from-[#99E2C6] to-[#60A5FA] text-[#111114] font-black text-lg hover:shadow-[0_0_30px_rgba(153,226,198,0.4)] transition-all hover:-translate-y-1 flex items-center gap-2 group">
            Launch Workspace
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
          </Link>
        </div>
      </main>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#1A1A1F] border border-white/[0.02] p-8 rounded-[32px] hover:bg-[#25252B] transition-colors group">
            <div className="h-12 w-12 rounded-2xl bg-[#99E2C6]/10 text-[#99E2C6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Box className="h-6 w-6" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Inventory</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Real-time stock tracking across multiple branches with predictive AI reordering alerts.
            </p>
          </div>

          <div className="bg-[#1A1A1F] border border-white/[0.02] p-8 rounded-[32px] hover:bg-[#25252B] transition-colors group">
            <div className="h-12 w-12 rounded-2xl bg-[#60A5FA]/10 text-[#60A5FA] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lightning POS</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Blazing fast point-of-sale interface optimized for speed, reliability, and ease of use.
            </p>
          </div>

          <div className="bg-[#1A1A1F] border border-white/[0.02] p-8 rounded-[32px] hover:bg-[#25252B] transition-colors group">
            <div className="h-12 w-12 rounded-2xl bg-[#FBE7A1]/10 text-[#FBE7A1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-6 w-6" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Financial Analytics</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Deep insights into your revenue, expenses, and profitability with automated reporting.
            </p>
          </div>

          <div className="bg-[#1A1A1F] border border-white/[0.02] p-8 rounded-[32px] hover:bg-[#25252B] transition-colors group">
            <div className="h-12 w-12 rounded-2xl bg-[#FFA6A6]/10 text-[#FFA6A6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Modern HR</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Manage attendance, payroll, and employee directories seamlessly from one place.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
