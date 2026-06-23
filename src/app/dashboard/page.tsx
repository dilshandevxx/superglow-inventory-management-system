import { createClient } from "@/lib/supabase-server";
import { ArrowRight, DollarSign, Receipt, CreditCard, Banknote, TrendingUp, Users, Package, Store, AlertTriangle, CheckCircle2, ShoppingCart, Plus, ArrowDownToLine } from "lucide-react";
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
  const recentAlerts = lowStockItems.slice(0, 5); // Show top 5 alerts
  const totalAnalyzed = inStockCount + lowStockCount;
  const healthyPercentage = totalAnalyzed > 0 ? (inStockCount / totalAnalyzed) * 100 : 0;

  return (
    <div className="font-sans text-slate-50 max-w-7xl mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 mt-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time store metrics and system status.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/pos" className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-sm">
            <ShoppingCart className="w-4 h-4" /> Launch POS
          </Link>
          <Link href="/dashboard/inventory/products/new" className="bg-[#25252b] hover:bg-[#2d2d33] border border-white/10 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-[#121215] border border-white/10 rounded-xl p-5 shadow-sm hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-slate-400">Today's Revenue</p>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-white">Rs. {todaysRevenue.toLocaleString()}</h2>
          </div>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {todaysSalesCount} Sales Processed
          </p>
        </div>

        <div className="bg-[#121215] border border-white/10 rounded-xl p-5 shadow-sm hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-slate-400">Total Customers</p>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-white">{customerCount || 0}</h2>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
             Registered in CRM
          </p>
        </div>

        <div className="bg-[#121215] border border-white/10 rounded-xl p-5 shadow-sm hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-slate-400">Total Products</p>
            <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-white">{productCount || 0}</h2>
          </div>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            Across {categoryCount} Categories
          </p>
        </div>

        <div className="bg-[#121215] border border-white/10 rounded-xl p-5 shadow-sm hover:border-white/20 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-slate-400">Active Branches</p>
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-white">{branchCount || 0}</h2>
          </div>
          <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> All Systems Online
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-[#121215] border border-white/10 rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-white/5 flex justify-between items-center shrink-0">
            <div>
              <h3 className="font-semibold text-white">Recent Transactions</h3>
              <p className="text-xs text-slate-400 mt-1">Latest sales processed today.</p>
            </div>
            <Link href="/dashboard/transactions" className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-0 flex-1 overflow-x-auto">
            {recentTransactions && recentTransactions.length > 0 ? (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-[#1a1a1f] border-b border-white/5">
                  <tr>
                    <th className="px-5 py-3 font-medium">Invoice</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Payment</th>
                    <th className="px-5 py-3 font-medium">Time</th>
                    <th className="px-5 py-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 font-medium text-white">{tx.invoice_number}</td>
                      <td className="px-5 py-4 text-slate-300">{((tx.customers as any)?.name || (tx.customers as any)?.[0]?.name) || 'Walk-in'}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 text-slate-300 border border-white/10">
                          {tx.payment_method === 'Cash' ? <Banknote className="w-3 h-3 text-emerald-400" /> : <CreditCard className="w-3 h-3 text-cyan-400" />}
                          {tx.payment_method}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 text-xs">
                        {new Date(tx.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td className="px-5 py-4 font-semibold text-white text-right">
                        Rs. {tx.total.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <Receipt className="w-8 h-8 text-slate-600 mb-3" />
                <p className="text-sm font-medium text-slate-400">No transactions yet today</p>
              </div>
            )}
          </div>
        </div>

        {/* Inventory Alerts List */}
        <div className="bg-[#121215] border border-white/10 rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-white/5 shrink-0 flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2">
                Inventory Alerts
                {lowStockCount > 0 && (
                  <span className="bg-rose-500/10 text-rose-500 text-xs font-bold px-2 py-0.5 rounded-full border border-rose-500/20">{lowStockCount}</span>
                )}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Products running low on stock.</p>
            </div>
            <AlertTriangle className="w-5 h-5 text-rose-500 opacity-80" />
          </div>
          
          <div className="p-0 flex-1">
            {recentAlerts.length > 0 ? (
              <ul className="divide-y divide-white/5">
                {recentAlerts.map(alert => (
                  <li key={alert.id} className="p-4 hover:bg-white/[0.02] transition-colors flex justify-between items-center">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{alert.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5 font-mono">{alert.sku}</p>
                    </div>
                    <div className="ml-4 shrink-0 text-right">
                      <p className="text-sm font-bold text-rose-400">{alert.stock}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wide">In Stock</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-3 opacity-80" />
                <p className="text-sm font-medium text-slate-400">Inventory looks healthy</p>
                <p className="text-xs text-slate-500 mt-1">No low stock alerts</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-white/5 shrink-0">
             <Link href="/dashboard/inventory/receiving" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25252b] hover:bg-[#2d2d33] border border-white/10 text-sm font-medium text-white transition-colors shadow-sm">
               <ArrowDownToLine className="w-4 h-4" /> Receive Stock
             </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
