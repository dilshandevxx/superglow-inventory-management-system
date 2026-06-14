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
    { name: "Total Products", value: productCount?.toString() || "0", icon: Package, trend: "+12%", color: "text-[#4ade80]", bg: "bg-[#4ade80]/10" },
    { name: "Active Branches", value: branchCount?.toString() || "0", icon: ShoppingCart, trend: "Stable", color: "text-blue-400", bg: "bg-blue-400/10" },
    { name: "Staff Members", value: userCount?.toString() || "0", icon: Users, trend: "+2%", color: "text-orange-400", bg: "bg-orange-400/10" },
    { name: "Daily Revenue", value: "$12,450", icon: TrendingUp, trend: "+24.5%", color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Dashboard Overview <Sparkles className="h-5 w-5 text-[#4ade80]" />
          </h1>
          <p className="mt-1 text-slate-400 text-sm">Real-time overview of operations and AI forecasting.</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="panel p-5 group hover:border-[#4ade80]/50 transition-colors cursor-pointer flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.name}</p>
              </div>
              <span className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-[#4ade80]/10 text-[#4ade80]' : 'bg-slate-800 text-slate-400'}`}>
                {stat.trend} {stat.trend.startsWith('+') && <ArrowUpRight className="h-3 w-3 ml-0.5" />}
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="panel p-6 mb-8">
        <div className="mb-6 flex justify-between items-center border-b border-[#2c303a] pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            Revenue Analytics
          </h2>
          <div className="flex bg-[#181a1f] rounded-full border border-[#2c303a] p-1">
            <button className="px-3 py-1 bg-[#20232b] text-white rounded-full text-xs font-bold">This Week</button>
            <button className="px-3 py-1 text-slate-500 hover:text-white rounded-full text-xs font-bold transition-colors">This Month</button>
          </div>
        </div>
        <DashboardCharts />
      </div>

      {/* AI Insights & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Insight Flat Card */}
        <div className="lg:col-span-2 panel p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#4ade80]" />
              <h3 className="font-bold text-white text-lg">AI Forecasting</h3>
            </div>
            <span className="bg-[#4ade80]/10 text-[#4ade80] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-[#4ade80]/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse"></span>
              Active
            </span>
          </div>
          
          <div className="bg-[#181a1f] rounded-xl p-6 border border-[#2c303a] flex-1">
            <h4 className="text-xl font-bold mb-2 text-white">Weekend Surge Expected</h4>
            <p className="text-slate-400 leading-relaxed text-sm">
              Based on historical data and current foot traffic trends across the Kiriella and Hindurangala branches, the AI model predicts a <strong className="text-[#4ade80] font-bold">42% increase</strong> in Grocery and Household Product sales this upcoming weekend.
            </p>
            <div className="mt-6 flex gap-3">
              <button className="btn-secondary text-xs">
                View Detailed Forecast
              </button>
              <button className="btn-primary text-xs">
                Adjust Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Flat Card */}
        <div className="panel p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-orange-500">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-bold text-white text-lg">Stock Alerts</h3>
            </div>
            <span className="text-slate-500 text-xs font-bold">3 critical</span>
          </div>
          
          <div className="space-y-3 flex-1">
            {[
              { item: 'Samba Rice 5kg', branch: 'Kiriella Branch', qty: '2 left', status: 'critical' },
              { item: 'Samsung 32" TV', branch: 'Hindurangala Branch', qty: '1 left', status: 'critical' },
              { item: 'Lux Soap 100g', branch: 'Main Warehouse', qty: '15 left', status: 'warning' },
            ].map((alert, i) => (
              <div key={i} className="flex flex-col bg-[#181a1f] p-3 rounded-xl border border-[#2c303a] hover:border-slate-600 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <p className="font-bold text-sm text-white">{alert.item}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                    alert.status === 'critical' 
                      ? 'text-red-400 bg-red-400/10 border-red-400/20' 
                      : 'text-orange-400 bg-orange-400/10 border-orange-400/20'
                  }`}>
                    {alert.qty}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-500 mt-1">{alert.branch}</p>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 btn-secondary text-xs border-dashed hover:border-solid">
            View All Alerts
          </button>
        </div>

      </div>
    </div>
  );
}
