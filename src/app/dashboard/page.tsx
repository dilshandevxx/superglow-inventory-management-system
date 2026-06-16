import { createClient } from "@/lib/supabase-server";
import { Package, ShoppingCart, AlertTriangle, ArrowUpRight, ArrowDownRight, ArrowRight, BarChart3, TrendingUp, Users } from "lucide-react";

export default async function Dashboard() {
  const supabase = createClient();

  // Basic queries to get some real stats
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: branchCount } = await supabase.from('branches').select('*', { count: 'exact', head: true });
  
  // Example dummy data for the rest (to be replaced with actual views later)
  const todaySales = "$12,450";
  const lowStockCount = 42;

  return (
    <div className="space-y-6">
      
      {/* Top Section: Welcome & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Stats / Big Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-[#8B5CF6]/20">
            <div className="absolute top-0 right-0 p-4 opacity-50">
              <Package className="w-24 h-24 text-white" />
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1 relative z-10">Total Products</h3>
            <p className="text-4xl font-bold text-white relative z-10 mb-4">{productCount || 0}</p>
            <div className="flex items-center gap-2 text-white/90 text-sm font-medium relative z-10">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              +12 new this week
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#D946EF] to-[#9333EA] rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-[#D946EF]/20">
            <div className="absolute top-0 right-0 p-4 opacity-50">
              <ShoppingCart className="w-24 h-24 text-white" />
            </div>
            <h3 className="text-white/80 text-sm font-medium mb-1 relative z-10">Today's Sales</h3>
            <p className="text-4xl font-bold text-white relative z-10 mb-4">{todaySales}</p>
            <div className="flex items-center gap-2 text-white/90 text-sm font-medium relative z-10">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                <ArrowUpRight className="w-4 h-4" />
              </span>
              +8% from yesterday
            </div>
          </div>
        </div>

        {/* Quick Actions / System Health */}
        <div className="bg-[#18181B] border border-white/[0.05] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EF4444] to-[#B91C1C] p-1 mb-4 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <div className="w-full h-full rounded-full bg-[#18181B] flex items-center justify-center relative">
              <AlertTriangle className="h-8 w-8 text-[#EF4444]" />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 border-2 border-[#18181B] rounded-full animate-pulse"></span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-white">{lowStockCount} Items</h3>
          <p className="text-sm text-[#A1A1AA] mb-6">Low Stock Warnings</p>
          <div className="flex items-center gap-3 w-full">
            <button className="flex-1 bg-[#27272A] hover:bg-[#3F3F46] text-white py-2 rounded-lg text-sm font-medium transition-colors">View Report</button>
            <button className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-2 rounded-lg text-sm font-medium transition-colors">Reorder</button>
          </div>
        </div>
      </div>

      {/* Middle Section: Charts & Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Revenue Chart */}
        <div className="lg:col-span-2 bg-[#18181B] border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">Weekly Revenue</h3>
            <span className="text-xs text-[#A1A1AA]">Last 7 Days</span>
          </div>
          <div className="h-48 w-full bg-[#121214] rounded-xl border border-white/[0.02] flex items-end justify-between p-4 relative overflow-hidden">
            {/* Fake Chart line */}
            <div className="absolute inset-0 flex items-end opacity-20">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[#8B5CF6]">
                <path d="M0,100 L0,50 Q25,20 50,60 T100,30 L100,100 Z" fill="currentColor" />
              </svg>
            </div>
            {/* Fake Bars */}
            {[65, 80, 55, 110, 85, 95, 130].map((h, i) => (
              <div key={i} className="w-[10%] bg-[#8B5CF6] rounded-t-sm relative group cursor-pointer" style={{ height: `${h / 1.5}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#27272A] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ${(h * 120).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warehouse Capacity Target */}
        <div className="bg-[#18181B] border border-white/[0.05] rounded-2xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-bold text-white w-full text-left mb-6">Warehouse Capacity</h3>
          
          <div className="relative w-32 h-32 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle className="text-[#27272A] stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
              <circle className="text-[#8B5CF6] stroke-current" strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="55.2"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-white">78%</span>
            </div>
          </div>
          
          <div className="flex w-full justify-between mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6]"></div>
              <div>
                <p className="text-[10px] font-bold text-white">Used Space</p>
                <p className="text-[10px] text-[#A1A1AA]">Optimal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3F3F46]"></div>
              <div>
                <p className="text-[10px] font-bold text-white">Available</p>
                <p className="text-[10px] text-[#A1A1AA]">22% remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Alerts / Recent Activity */}
      <div className="bg-[#18181B] border border-white/[0.05] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-white">Recent Inventory Alerts</h3>
          <button className="text-xs text-[#A1A1AA] hover:text-white transition-colors">View Inventory</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.05] text-[10px] uppercase tracking-wider text-[#A1A1AA]">
                <th className="pb-3 font-medium">Product Name</th>
                <th className="pb-3 font-medium">Branch</th>
                <th className="pb-3 font-medium">Current Stock</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center text-xs font-bold text-white">SR</div>
                    <span className="font-semibold text-white">Samba Rice 5kg</span>
                  </div>
                </td>
                <td className="py-4 text-[#A1A1AA]">Kiriella Branch</td>
                <td className="py-4 font-semibold text-white">2 Units</td>
                <td className="py-4">
                  <span className="flex items-center gap-2 text-[#EF4444] text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span> Critical
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-[#A1A1AA] hover:text-white">•••</button>
                </td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center text-xs font-bold text-white">LS</div>
                    <span className="font-semibold text-white">Lux Soap 100g</span>
                  </div>
                </td>
                <td className="py-4 text-[#A1A1AA]">Main Warehouse</td>
                <td className="py-4 font-semibold text-white">15 Units</td>
                <td className="py-4">
                  <span className="flex items-center gap-2 text-[#F59E0B] text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span> Warning
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-[#A1A1AA] hover:text-white">•••</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
