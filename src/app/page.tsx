import Link from "next/link";
import { ArrowRight, Package, ShoppingCart, BarChart3, Users, Play, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans selection:bg-white/20">
      
      {/* Top Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-[#D1E8D5] text-[#1A1A1A] flex items-center justify-center font-black text-lg">
            S
          </div>
          <span className="text-lg font-bold tracking-tight">SuperGlow</span>
        </div>
        
        {/* Pill Navigation (matching the image style) */}
        <nav className="hidden md:flex items-center gap-2 bg-[#252525] p-1 rounded-full">
          <div className="px-5 py-2 rounded-full bg-white text-[#1A1A1A] font-bold text-sm cursor-pointer shadow-sm">
            Overview
          </div>
          <div className="px-5 py-2 rounded-full text-[#A1A1AA] hover:text-white font-medium text-sm cursor-pointer transition-colors">
            Inventory
          </div>
          <div className="px-5 py-2 rounded-full text-[#A1A1AA] hover:text-white font-medium text-sm cursor-pointer transition-colors">
            POS
          </div>
          <div className="px-5 py-2 rounded-full text-[#A1A1AA] hover:text-white font-medium text-sm cursor-pointer transition-colors">
            HR
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="px-6 py-2.5 rounded-full bg-[#333333] hover:bg-[#444444] text-white font-bold text-sm transition-colors">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content Area (mimicking the dashboard vibe of the image) */}
      <main className="max-w-[1400px] mx-auto px-8 pt-8 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
          <div>
            <p className="text-[#A1A1AA] text-sm font-medium mb-1">Overview</p>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">SuperGlow ERP</h1>
              <span className="text-[#A1A1AA] text-2xl">▾</span>
            </div>
          </div>
          
          <div className="flex gap-12">
            <div>
              <p className="text-[#A1A1AA] text-sm font-medium mb-1">Total Branches</p>
              <p className="text-2xl font-semibold">12 <span className="text-sm font-normal text-[#A1A1AA]">active</span></p>
            </div>
            <div>
              <p className="text-[#A1A1AA] text-sm font-medium mb-1">Daily Volume</p>
              <p className="text-2xl font-semibold">48.2K</p>
            </div>
            <div>
              <p className="text-[#A1A1AA] text-sm font-medium mb-1">System Status</p>
              <p className="text-2xl font-semibold">Online</p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button className="px-5 py-2 rounded-full bg-white text-[#1A1A1A] font-bold text-sm">All Modules</button>
          <button className="px-5 py-2 rounded-full border border-[#444444] text-[#A1A1AA] hover:text-white hover:border-white font-medium text-sm transition-all">Smart Inventory</button>
          <button className="px-5 py-2 rounded-full border border-[#444444] text-[#A1A1AA] hover:text-white hover:border-white font-medium text-sm transition-all">Lightning POS</button>
          <button className="px-5 py-2 rounded-full border border-[#444444] text-[#A1A1AA] hover:text-white hover:border-white font-medium text-sm transition-all">Financial Analytics</button>
          <button className="px-5 py-2 rounded-full border border-[#444444] text-[#A1A1AA] hover:text-white hover:border-white font-medium text-sm transition-all">Modern HR</button>
          
          <div className="ml-auto flex gap-2">
            <button className="w-9 h-9 rounded-full bg-[#252525] flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bento Grid (Matching the image aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Dark Card with Chart (Inventory) */}
          <div className="bg-[#252525] rounded-[32px] p-8 flex flex-col relative overflow-hidden group">
            <div className="flex justify-between items-start mb-8">
              <h3 className="font-semibold text-lg">Inventory Analytics</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full border border-[#444444] text-xs font-medium">Weekly</span>
                <span className="w-6 h-6 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center text-xs font-bold">+</span>
              </div>
            </div>
            
            <div className="flex gap-8 mb-8 z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#D1E8D5]"></div>
                  <span className="text-xs text-[#A1A1AA]">In Stock</span>
                </div>
                <p className="text-xl font-bold">124.5K</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <span className="text-xs text-[#A1A1AA]">Low Stock</span>
                </div>
                <p className="text-xl font-bold">1,280</p>
              </div>
            </div>

            {/* Mock Chart Area */}
            <div className="mt-auto h-32 w-full flex items-end justify-between relative z-10">
               {/* Abstract wave decoration mimicking the image */}
               <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#D1E8D5]/20 to-transparent blur-xl"></div>
               {[30, 50, 40, 80, 60, 90, 70].map((h, i) => (
                 <div key={i} className="w-[10%] bg-white/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
               ))}
               
               <Link href="/login" className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                 <ArrowRight className="w-5 h-5 -rotate-45" />
               </Link>
            </div>
          </div>

          {/* Card 2: Pale Mint Green (POS) */}
          <div className="bg-[#E2F1E4] rounded-[32px] p-8 flex flex-col text-[#1A1A1A] relative">
            <div className="flex justify-between items-start mb-8">
              <h3 className="font-semibold text-lg flex items-center gap-2">Point of Sale <span className="text-xs px-2 py-0.5 bg-white rounded-full">Pro</span></h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full border border-[#1A1A1A]/10 text-xs font-medium">Daily</span>
                <span className="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold">+</span>
              </div>
            </div>

            <div className="flex-1 flex items-end justify-center gap-4 mt-12">
               {/* Mock bar chart mimicking the image */}
               <div className="w-1/3 bg-white rounded-t-xl h-[60%] p-3 relative shadow-sm">
                 <p className="text-[10px] text-[#A1A1AA] mb-1">Morning</p>
                 <p className="text-sm font-bold">12.5K</p>
               </div>
               <div className="w-1/3 bg-white rounded-t-xl h-[90%] p-3 relative shadow-sm">
                 <p className="text-[10px] text-[#A1A1AA] mb-1">Afternoon</p>
                 <p className="text-sm font-bold">28.4K</p>
               </div>
               <div className="w-1/3 bg-white rounded-t-xl h-[40%] p-3 relative shadow-sm">
                 <p className="text-[10px] text-[#A1A1AA] mb-1">Evening</p>
                 <p className="text-sm font-bold">8.2K</p>
               </div>
            </div>

            <Link href="/login" className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
               <ArrowRight className="w-5 h-5 -rotate-45" />
            </Link>
          </div>

          {/* Card 3: Split Column (Analytics & HR) */}
          <div className="flex flex-col gap-5">
            
            {/* Top Split Card: Dark (Analytics) */}
            <div className="bg-[#252525] rounded-[32px] p-6 flex-1 flex flex-col relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-white">Financials</h3>
                <div className="text-right">
                  <p className="font-bold text-lg text-white">Rs. 1,768K</p>
                  <p className="text-[10px] text-[#D1E8D5]">+17% monthly</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-auto">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#A1A1AA]">Revenue</span>
                    <span className="text-white font-bold">1,288K</span>
                  </div>
                  <div className="h-4 w-full bg-[#333] rounded-full overflow-hidden">
                    <div className="h-full bg-[#A5D8FF] w-[75%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#A1A1AA]">Expenses</span>
                    <span className="text-white font-bold">480K</span>
                  </div>
                  <div className="h-4 w-full bg-[#333] rounded-full overflow-hidden">
                    <div className="h-full bg-[#D1E8D5] w-[45%] rounded-full"></div>
                  </div>
                </div>
              </div>

              <Link href="/login" className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                 <ArrowRight className="w-4 h-4 -rotate-45" />
              </Link>
            </div>

            {/* Bottom Split Card: Pale Yellow (HR/Staff) */}
            <div className="bg-[#FFF8D6] rounded-[32px] p-6 flex-1 text-[#1A1A1A] relative overflow-hidden">
              {/* Subtle background dots mimicking image */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1A1A1A 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
              
              <div className="relative z-10 flex justify-between items-start mb-4">
                <h3 className="font-semibold">Staff Activity</h3>
                <span className="px-3 py-1 rounded-full bg-white text-xs font-medium shadow-sm">Monthly</span>
              </div>

              <div className="relative z-10 flex items-center gap-2 mb-6">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#252525] border-2 border-[#FFF8D6] flex items-center justify-center text-white text-[10px] font-bold">E</div>
                  <div className="w-8 h-8 rounded-full bg-[#A5D8FF] border-2 border-[#FFF8D6] flex items-center justify-center text-[#1A1A1A] text-[10px] font-bold">M</div>
                  <div className="w-8 h-8 rounded-full bg-[#D1E8D5] border-2 border-[#FFF8D6] flex items-center justify-center text-[#1A1A1A] text-[10px] font-bold">A</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  +
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-xs font-bold">Dilshan P.</p>
                  <p className="text-[10px] text-[#1A1A1A]/60">Super Admin</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">Online</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
