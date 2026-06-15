import { createClient } from "@/lib/supabase-server";
import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, ArrowUpRight, Sparkles, Download } from "lucide-react";
import { DashboardCharts } from "./dashboard-charts";

export default async function DashboardPage() {
  const supabase = createClient();

  // Fetch some real stats
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: branchCount } = await supabase.from('branches').select('*', { count: 'exact', head: true });
  const { count: userCount } = await supabase.from('user_profiles').select('*', { count: 'exact', head: true });

  const stats = [
    { name: "Total Products", value: productCount?.toString() || "0", icon: Package, trend: "+12%", trendBg: "bg-[#99E2C6]/10", trendText: "text-[#99E2C6]" },
    { name: "Active Branches", value: branchCount?.toString() || "0", icon: ShoppingCart, trend: "Stable", trendBg: "bg-white/[0.05]", trendText: "text-[#94A3B8]" },
    { name: "Staff Members", value: userCount?.toString() || "0", icon: Users, trend: "+2%", trendBg: "bg-[#99E2C6]/10", trendText: "text-[#99E2C6]" },
    { name: "Daily Revenue", value: "Rs. 12,450", icon: TrendingUp, trend: "+24.5%", trendBg: "bg-[#99E2C6]/10", trendText: "text-[#99E2C6]" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto w-full pb-10">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            Dashboard Overview <Sparkles className="h-6 w-6 text-[#99E2C6] animate-pulse" />
          </h1>
          <p className="mt-2 text-[#94A3B8] text-sm">Real-time overview of operations and AI forecasting.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Download className="h-4 w-4" /> Export Report
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" /> Run AI Analysis
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className={`panel p-6 flex flex-col justify-between h-40 hover:-translate-y-1 transition-all duration-300 cursor-pointer`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="text-[#94A3B8]">
                  <stat.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
              </div>
              <span className={`flex items-center text-xs font-bold px-3 py-1 rounded-full ${stat.trendBg} ${stat.trendText}`}>
                {stat.trend} {stat.trend.startsWith('+') && <ArrowUpRight className="h-3 w-3 ml-0.5" />}
              </span>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-[#94A3B8] mb-1">{stat.name}</p>
              <p className="text-4xl font-bold tracking-tight text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="panel p-8 mb-8">
        <div className="mb-6 flex justify-between items-center border-b border-white/[0.05] pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Revenue Analytics
          </h2>
          <div className="flex bg-[#1A1A1F] border border-white/[0.05] rounded-full p-1">
            <button className="px-5 py-2 bg-[#2A2A32] text-white rounded-full text-xs font-bold transition-all shadow-sm">This Week</button>
            <button className="px-5 py-2 text-[#94A3B8] hover:text-white rounded-full text-xs font-bold transition-colors">This Month</button>
          </div>
        </div>
        <DashboardCharts />
      </div>

      {/* AI Insights & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Insight Flat Card */}
        <div className="lg:col-span-2 panel p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-[#99E2C6]" strokeWidth={1.5} />
              <h3 className="font-bold text-white text-lg">AI Forecasting</h3>
            </div>
            <span className="bg-[#99E2C6]/10 text-[#99E2C6] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#99E2C6] animate-pulse"></span>
              Active
            </span>
          </div>
          
          <div className="bg-[#1A1A1F] rounded-2xl p-6 flex-1 border border-white/[0.02]">
            <h4 className="text-xl font-bold mb-3 text-white">Weekend Surge Expected</h4>
            <p className="text-[#94A3B8] leading-relaxed text-sm">
              Based on historical data and current foot traffic trends across the Kiriella and Hindurangala branches, the AI model predicts a <strong className="text-[#99E2C6] font-bold">42% increase</strong> in Grocery and Household Product sales this upcoming weekend.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="btn-secondary text-xs border-none bg-[#2A2A32]">
                View Detailed Forecast
              </button>
              <button className="btn-primary text-xs bg-[#99E2C6]">
                Adjust Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Flat Card */}
        <div className="bg-[#FBE7A1] rounded-[20px] p-8 flex flex-col text-[#1A1A1F] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6" strokeWidth={1.5} />
              <h3 className="font-bold text-lg">Stock Alerts</h3>
            </div>
            <span className="text-[#1A1A1F]/60 text-xs font-bold bg-[#1A1A1F]/10 px-3 py-1 rounded-full">3 critical</span>
          </div>
          
          <div className="space-y-3 flex-1">
            {[
              { item: 'Samba Rice 5kg', branch: 'Kiriella Branch', qty: '2 left', status: 'critical' },
              { item: 'Samsung 32" TV', branch: 'Hindurangala Branch', qty: '1 left', status: 'critical' },
              { item: 'Lux Soap 100g', branch: 'Main Warehouse', qty: '15 left', status: 'warning' },
            ].map((alert, i) => (
              <div key={i} className="flex flex-col bg-white/40 p-4 rounded-xl hover:bg-white/60 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-1">
                  <p className="font-bold text-sm">{alert.item}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    alert.status === 'critical' 
                      ? 'text-[#FFA6A6] bg-[#1A1A1F]' 
                      : 'text-[#1A1A1F] bg-[#99E2C6]'
                  }`}>
                    {alert.qty}
                  </span>
                </div>
                <p className="text-xs font-medium opacity-60">{alert.branch}</p>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-3 rounded-full bg-[#1A1A1F]/5 hover:bg-[#1A1A1F]/10 transition-colors text-xs font-bold">
            View All Alerts
          </button>
        </div>

      </div>
    </div>
  );
}
