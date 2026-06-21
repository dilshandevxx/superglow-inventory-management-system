import { createClient } from "@/lib/supabase-server";
import { ArrowRight, Settings, DollarSign, Receipt, CreditCard, Banknote, TrendingUp, Users, Package, Activity } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = createClient();

  // Fetch counts
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: branchCount } = await supabase.from('branches').select('*', { count: 'exact', head: true });
  const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });
  const { count: brandCount } = await supabase.from('brands').select('*', { count: 'exact', head: true });
  const { count: customerCount } = await supabase.from('customers').select('*', { count: 'exact', head: true });

  // Get Today's Sales
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { data: todaySales } = await supabase
    .from('sales')
    .select('total')
    .gte('created_at', today.toISOString());
    
  const todaysRevenue = todaySales?.reduce((sum, sale) => sum + sale.total, 0) || 0;
  const todaysSalesCount = todaySales?.length || 0;

  // Recent 5 Transactions
  const { data: recentTransactions } = await supabase
    .from('sales')
    .select(`
      id,
      invoice_number,
      total,
      created_at,
      payment_method,
      customers(name),
      user_profiles(full_name)
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch products with inventory to calculate stock levels
  const { data: products } = await supabase.from('products').select(`
    id,
    name,
    sku,
    reorder_level,
    inventory(quantity)
  `);

  let inStockCount = 0;
  let lowStockCount = 0;
  const lowStockItems: { id: string, name: string, sku: string, stock: number }[] = [];

  products?.forEach(product => {
    const totalStock = product.inventory ? product.inventory.reduce((sum: number, item: any) => sum + item.quantity, 0) : 0;
    const reorderLevel = product.reorder_level || 10;
    
    if (totalStock > 0) {
      inStockCount++;
    }
    
    if (totalStock <= reorderLevel) {
      lowStockCount++;
      lowStockItems.push({
        id: product.id,
        name: product.name,
        sku: product.sku,
        stock: totalStock
      });
    }
  });

  lowStockItems.sort((a, b) => a.stock - b.stock);
  const recentAlerts = lowStockItems.slice(0, 3);

  const totalAnalyzed = inStockCount + lowStockCount;
  const healthyPercentage = totalAnalyzed > 0 ? (inStockCount / totalAnalyzed) * 100 : 0;
  const lowStockPercentage = totalAnalyzed > 0 ? (lowStockCount / totalAnalyzed) * 100 : 0;

  return (
    <div className="text-white font-sans animate-in fade-in duration-700 max-w-[1800px] mx-auto pb-12">
      
      {/* Premium Header & Top Metrics Row */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-10 gap-8 mt-6 relative z-10">
        
        {/* Title Area */}
        <div className="group cursor-default">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#A1A1AA] mb-4 backdrop-blur-md transition-colors group-hover:bg-white/10 group-hover:text-white">
            <Activity className="w-3.5 h-3.5 text-[#D1E8D5]" /> Live System Overview
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60 drop-shadow-sm">
            SuperGlow Hub
          </h1>
        </div>
        
        {/* Top Floating Metrics */}
        <div className="grid grid-cols-2 lg:flex flex-wrap gap-4 w-full xl:w-auto">
          
          <div className="relative overflow-hidden bg-gradient-to-b from-[#1E1E24] to-[#121215] p-5 rounded-[24px] border border-white/[0.05] shadow-2xl group hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity"><Store className="w-12 h-12 text-white" /></div>
            <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-widest mb-1">Active Branches</p>
            <div className="flex items-baseline gap-2 relative z-10">
              <p className="text-3xl font-black text-white tracking-tighter">{branchCount || 0}</p>
              <span className="text-[10px] font-bold text-[#D1E8D5] flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> Online</span>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-[#1E1E24] to-[#121215] p-5 rounded-[24px] border border-white/[0.05] shadow-2xl group hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity"><Package className="w-12 h-12 text-white" /></div>
            <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-widest mb-1">Total Products</p>
            <div className="flex items-baseline gap-2 relative z-10">
              <p className="text-3xl font-black text-white tracking-tighter">{productCount || 0}</p>
              <span className="text-[10px] font-bold text-[#A1A1AA]">SKUs</span>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-[#1A2622] to-[#121A17] p-5 rounded-[24px] border border-[#D1E8D5]/10 shadow-2xl group hover:-translate-y-1 hover:border-[#D1E8D5]/30 hover:shadow-[0_8px_30px_rgba(209,232,213,0.1)] transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><DollarSign className="w-12 h-12 text-[#D1E8D5]" /></div>
            <p className="text-[#D1E8D5]/80 text-xs font-bold uppercase tracking-widest mb-1">Today's Revenue</p>
            <div className="flex items-baseline gap-2 relative z-10">
              <p className="text-3xl font-black text-[#D1E8D5] tracking-tighter">{(todaysRevenue / 1000).toFixed(1)}k</p>
              <span className="text-[10px] font-bold text-[#D1E8D5] bg-[#D1E8D5]/10 px-1.5 py-0.5 rounded uppercase">INR</span>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-[#1E1E24] to-[#121215] p-5 rounded-[24px] border border-white/[0.05] shadow-2xl group hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity"><Users className="w-12 h-12 text-white" /></div>
            <p className="text-[#A1A1AA] text-xs font-bold uppercase tracking-widest mb-1">Total Customers</p>
            <div className="flex items-baseline gap-2 relative z-10">
              <p className="text-3xl font-black text-white tracking-tighter">{customerCount || 0}</p>
              <span className="text-[10px] font-bold text-[#A5D8FF] flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> Growing</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Bento Grid Layer 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Inventory Health Card - Premium Glass */}
        <div className="bg-[#121215]/80 backdrop-blur-xl rounded-[32px] p-8 flex flex-col relative overflow-hidden group border border-white/[0.05] min-h-[400px] shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:border-white/10 transition-colors">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#D1E8D5]/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-8 shrink-0 relative z-10">
            <h3 className="font-bold text-xl text-white">Inventory Health</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white">Real-time</span>
            </div>
          </div>
          
          <div className="flex gap-10 mb-6 shrink-0 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D1E8D5] shadow-[0_0_10px_rgba(209,232,213,0.5)]"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">Healthy</span>
              </div>
              <p className="text-4xl font-black tracking-tighter text-white">{inStockCount}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">Low Stock</span>
              </div>
              <p className="text-4xl font-black tracking-tighter text-white">{lowStockCount}</p>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col justify-end relative z-10 mt-auto">
             <div className="w-full bg-[#252525] h-10 rounded-full overflow-hidden flex shadow-inner border border-[#333]">
                <div className="bg-gradient-to-r from-[#8FB996] to-[#D1E8D5] h-full relative" style={{ width: `${healthyPercentage}%` }}>
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                </div>
                <div className="bg-gradient-to-r from-[#B91C1C] to-[#EF4444] h-full relative" style={{ width: `${lowStockPercentage}%` }}></div>
             </div>
             <div className="flex justify-between mt-3 px-2 text-[10px] text-[#A1A1AA] font-bold uppercase tracking-widest">
                <span>{healthyPercentage.toFixed(1)}% Secure</span>
                <span>{lowStockPercentage.toFixed(1)}% Risk</span>
             </div>
             
             <Link href="/dashboard/inventory/products" className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform">
               <ArrowRight className="w-5 h-5 -rotate-45" strokeWidth={2.5} />
             </Link>
          </div>
        </div>

        {/* Quick Actions (Mint Green Modern) */}
        <div className="bg-gradient-to-br from-[#D1E8D5] to-[#B5D8BC] rounded-[32px] p-8 flex flex-col text-[#121215] relative shadow-[0_8px_30px_rgba(209,232,213,0.15)] min-h-[400px] overflow-hidden group">
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/30 rounded-full blur-[60px] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>

          <div className="flex justify-between items-start mb-8 shrink-0 relative z-10">
            <h3 className="font-black text-xl flex items-center gap-2 tracking-tight">Quick Actions</h3>
            <span className="w-8 h-8 rounded-full bg-[#121215] text-white flex items-center justify-center text-sm font-bold shadow-lg">⚡</span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4 mt-2 relative z-10 w-full">
             <Link href="/dashboard/inventory/products/new" className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-xl hover:bg-white transition-all hover:-translate-y-1 group/btn border border-white">
                <span className="font-bold text-sm tracking-wide">Add New Product</span>
                <div className="w-8 h-8 rounded-full bg-[#121215] text-white flex items-center justify-center opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
             </Link>
             <Link href="/dashboard/inventory/receiving" className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-xl hover:bg-white transition-all hover:-translate-y-1 group/btn border border-white">
                <span className="font-bold text-sm tracking-wide">Receive Stock</span>
                <div className="w-8 h-8 rounded-full bg-[#121215] text-white flex items-center justify-center opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
             </Link>
             <Link href="/dashboard/pos" className="w-full bg-[#121215] rounded-2xl p-5 flex items-center justify-between shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group/btn border border-transparent">
                <span className="font-bold text-sm text-white tracking-wide">Launch POS System</span>
                <div className="w-8 h-8 rounded-full bg-white text-[#121215] flex items-center justify-center transition-transform group-hover/btn:scale-110">
                  <ShoppingCart className="w-4 h-4" />
                </div>
             </Link>
          </div>
        </div>

        {/* Split Column (System Snapshot & Alerts) */}
        <div className="flex flex-col gap-6 min-h-[400px]">
          
          {/* Top: System Overview */}
          <div className="bg-[#121215] rounded-[32px] p-7 flex-1 flex flex-col relative border border-white/[0.05] min-h-0 shadow-xl group hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4 shrink-0">
              <h3 className="font-bold text-white text-lg">Catalog Status</h3>
              <div className="text-right">
                <p className="font-black text-xl text-white tracking-tighter">{productCount}</p>
                <p className="text-[10px] font-bold text-[#A5D8FF] uppercase tracking-widest">Active SKUs</p>
              </div>
            </div>
            
            <div className="space-y-4 mt-auto w-full">
              <div>
                <div className="flex justify-between text-xs mb-2 font-bold text-[#A1A1AA] uppercase tracking-widest">
                  <span>Categories</span>
                  <span className="text-white">{categoryCount} Total</span>
                </div>
                <div className="h-2 w-full bg-[#252525] rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-[#60A5FA] to-[#A5D8FF] rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2 font-bold text-[#A1A1AA] uppercase tracking-widest">
                  <span>Brands</span>
                  <span className="text-white">{brandCount} Total</span>
                </div>
                <div className="h-2 w-full bg-[#252525] rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-[#8FB996] to-[#D1E8D5] rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Critical Alerts (Neon Accent) */}
          <div className="bg-[#FFF8D6] rounded-[32px] p-7 flex-1 text-[#1A1A1A] relative overflow-hidden min-h-0 flex flex-col shadow-[0_8px_30px_rgba(255,248,214,0.1)]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(#1A1A1A 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
            
            <div className="relative z-10 flex justify-between items-start mb-4 shrink-0">
              <h3 className="font-black text-lg flex items-center gap-2 tracking-tight">
                Attention Required
                {lowStockCount > 0 && <span className="bg-[#EF4444] text-white text-[10px] font-black px-2.5 py-1 rounded-full animate-pulse">{lowStockCount}</span>}
              </h3>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-start gap-2.5 mt-1 w-full overflow-y-auto pr-2 custom-scrollbar">
              {recentAlerts.length > 0 ? (
                recentAlerts.map(alert => (
                  <div key={alert.id} className="w-full bg-white/70 backdrop-blur-sm hover:bg-white rounded-2xl p-3 flex items-center justify-between transition-all shadow-sm border border-white">
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-bold truncate text-[#121215]">{alert.name}</span>
                      <span className="text-[10px] font-bold text-[#A1A1AA] tracking-widest uppercase mt-0.5">{alert.sku}</span>
                    </div>
                    <div className="shrink-0 text-right ml-3">
                      <span className="text-[11px] font-black text-[#EF4444] block bg-[#EF4444]/10 px-2 py-0.5 rounded border border-[#EF4444]/20">STOCK: {alert.stock}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-4 opacity-70">
                  <span className="text-3xl mb-2">✨</span>
                  <span className="text-sm font-black text-[#121215] tracking-wide">All systems nominal</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Row 2: Financial & Activity Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Financial Hero Card - The Showstopper */}
        <div className="bg-[#0A1A15] rounded-[32px] p-8 flex flex-col relative overflow-hidden border border-[#D1E8D5]/20 col-span-1 lg:col-span-1 min-h-[340px] shadow-[0_20px_50px_rgba(10,26,21,0.5)] group">
          
          {/* Abstract Mesh Background */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none transition-transform duration-1000 group-hover:scale-110" style={{
            background: `radial-gradient(circle at 100% 0%, rgba(209, 232, 213, 0.4) 0%, transparent 50%), 
                         radial-gradient(circle at 0% 100%, rgba(30, 80, 50, 0.8) 0%, transparent 50%)`
          }}></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

          <div className="flex justify-between items-start mb-6 shrink-0 relative z-10">
            <h3 className="font-bold text-xl text-white">Daily Performance</h3>
            <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-widest uppercase">Live</div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center relative z-10 mt-4">
            <p className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-widest mb-3">Gross Revenue</p>
            <p className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-[#D1E8D5] to-[#8FB996] mb-4 tracking-tighter drop-shadow-lg">
              Rs. {todaysRevenue.toLocaleString()}
            </p>
            <div className="flex items-center gap-3">
               <span className="text-xs font-black text-[#121215] bg-[#D1E8D5] px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(209,232,213,0.4)] tracking-wide">
                 {todaysSalesCount} Sales Processed
               </span>
            </div>
          </div>
        </div>

        {/* Recent Transactions Mini-Ledger */}
        <div className="bg-[#121215]/80 backdrop-blur-xl rounded-[32px] p-8 flex flex-col relative overflow-hidden border border-white/[0.05] col-span-1 lg:col-span-2 min-h-[340px] shadow-2xl hover:border-white/10 transition-colors">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="font-bold text-xl text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center shadow-inner"><Receipt className="w-4 h-4 text-[#A1A1AA]" /></span> 
              Recent Transactions
            </h3>
            <Link href="/dashboard/transactions" className="text-xs font-bold text-[#A1A1AA] hover:text-white transition-colors bg-[#252525] px-4 py-2 rounded-full uppercase tracking-widest">
              View Ledger
            </Link>
          </div>

          <div className="flex-1 w-full flex flex-col gap-3 relative z-10">
             {recentTransactions && recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl border border-white/[0.02] hover:border-white/10 transition-all group/tx cursor-default">
                    <div className="flex items-center gap-5">
                      <div className="hidden sm:flex h-12 w-12 rounded-2xl bg-[#1A1A1A] border border-white/[0.05] items-center justify-center text-[#A1A1AA] shadow-inner group-hover/tx:text-white transition-colors">
                        {tx.payment_method === 'Cash' ? <Banknote className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-bold text-sm text-white tracking-wide">{tx.invoice_number}</p>
                          <span className="text-[9px] font-black text-[#A1A1AA] uppercase tracking-widest bg-[#252525] px-2 py-0.5 rounded">{new Date(tx.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <p className="text-xs font-medium text-[#A1A1AA] tracking-wide">{tx.customers?.name || 'Walk-in Customer'} <span className="mx-1 opacity-50">•</span> <span className="opacity-80">Cashier: {tx.user_profiles?.full_name?.split(' ')[0] || 'System'}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-white text-lg tracking-tight">Rs. {tx.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                    </div>
                  </div>
                ))
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-[#A1A1AA] bg-white/[0.01] rounded-2xl border border-white/[0.02] border-dashed">
                  <Receipt className="w-8 h-8 mb-3 opacity-20" />
                  <p className="font-bold text-sm tracking-wide">No transactions today</p>
                </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Temporary internal component for missing ShoppingCart icon import at top
function ShoppingCart(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
  );
}
