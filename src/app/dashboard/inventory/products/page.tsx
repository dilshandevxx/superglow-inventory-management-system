import { createClient } from "@/lib/supabase-server";
import { Plus, Search, Scan, List, LayoutGrid, MoreHorizontal, RotateCcw, ChevronDown, Package } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      brand:brands(name)
    `)
    .order('created_at', { ascending: false });

  const totalProducts = products?.length || 0;

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto">
      
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-white tracking-tight">Product</h1>
          <span className="bg-[#20232b] text-slate-400 text-xs font-semibold px-3 py-1 rounded-full border border-[#2c303a]">
            <span className="text-white mr-1">{totalProducts}</span> total products
          </span>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search product..." 
              className="w-full bg-[#20232b] border border-[#2c303a] rounded-full pl-11 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[#4ade80] text-xs font-bold hover:text-white transition-colors px-2 py-1">
              <Scan className="h-3.5 w-3.5" /> Scan
            </button>
          </div>

          <div className="flex bg-[#20232b] rounded-full border border-[#2c303a] p-1">
            <button className="p-1.5 bg-[#4ade80]/20 text-[#4ade80] rounded-full"><List className="h-4 w-4" /></button>
            <button className="p-1.5 text-slate-500 hover:text-white rounded-full transition-colors"><LayoutGrid className="h-4 w-4" /></button>
          </div>

          <button className="h-10 w-10 rounded-full bg-[#20232b] border border-[#2c303a] flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0">
            <MoreHorizontal className="h-5 w-5" />
          </button>

          <button className="btn-primary flex items-center gap-2 shrink-0">
            Add Product
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Filter Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          
          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Product Status</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-between panel px-3 py-2 border-[#4ade80]/30 hover:border-[#4ade80] transition-colors">
                <span className="text-sm font-medium text-white">All</span>
                <span className="text-[10px] font-bold text-[#4ade80] bg-[#4ade80]/10 px-1.5 py-0.5 rounded">1708</span>
              </button>
              <button className="flex items-center justify-between panel px-3 py-2 hover:border-[#4ade80] transition-colors">
                <span className="text-sm font-medium text-slate-300">Active</span>
                <span className="text-xs text-slate-500">1232</span>
              </button>
              <button className="flex items-center justify-between panel px-3 py-2 hover:border-[#4ade80] transition-colors">
                <span className="text-sm font-medium text-slate-300">Inactive</span>
                <span className="text-xs text-slate-500">250</span>
              </button>
              <button className="flex items-center justify-between panel px-3 py-2 hover:border-[#4ade80] transition-colors">
                <span className="text-sm font-medium text-slate-300">Draft</span>
                <span className="text-xs text-slate-500">36</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Product Type</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="panel px-3 py-2 text-sm font-medium text-white border-[#4ade80]/30 hover:border-[#4ade80] transition-colors">Retail</button>
              <button className="panel px-3 py-2 text-sm font-medium text-slate-300 hover:border-[#4ade80] transition-colors">Wholesale</button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Sort By</h3>
            <button className="w-full flex items-center justify-between panel px-4 py-2.5 hover:border-[#4ade80] transition-colors">
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="text-slate-500 text-[10px]">ALPHABETICAL:</span> A-Z
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Stock Alert</h3>
            <button className="w-full flex items-center justify-between panel px-4 py-2.5 hover:border-[#4ade80] transition-colors">
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Package className="h-4 w-4 text-slate-500" /> All stock
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Category</h3>
            <button className="w-full flex items-center justify-between panel px-4 py-2.5 hover:border-[#4ade80] transition-colors">
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="h-4 w-4 flex gap-0.5"><div className="w-1.5 h-1.5 bg-slate-500 rounded-sm"></div><div className="w-1.5 h-1.5 bg-slate-500 rounded-sm"></div></span> All product
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Price</h3>
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input type="text" placeholder="Minimum price" className="w-full bg-[#20232b] border border-[#2c303a] rounded-xl pl-8 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#4ade80] transition-colors" />
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input type="text" placeholder="Maximum price" className="w-full bg-[#20232b] border border-[#2c303a] rounded-xl pl-8 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#4ade80] transition-colors" />
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white hover:text-[#4ade80] transition-colors">
            <RotateCcw className="h-4 w-4" /> Reset Filters
          </button>

        </div>

        {/* Right Product List */}
        <div className="flex-1 space-y-3">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="panel p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-600 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4 flex-1">
                  {/* Product Image Placeholder */}
                  <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-3xl">👟</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-white group-hover:text-[#4ade80] transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-bold px-2 py-0.5 rounded-full">2 variants</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400">{product.category?.name || 'General'}</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Package className="h-3 w-3" /> Stocked Product: <strong className="text-white font-medium">{Math.floor(Math.random() * 50) + 1} in stock</strong>
                        {Math.random() > 0.5 && <span className="text-red-500 flex items-center gap-0.5 ml-1"><span className="w-1.5 h-3 bg-red-500 block"></span> low</span>}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full sm:w-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Retail Price</span>
                    <span className="text-sm font-bold text-white">${product.selling_price.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Wholesale Price</span>
                    <span className="text-sm font-bold text-white">${product.cost_price.toFixed(2)}</span>
                  </div>
                  <button className="h-8 w-8 rounded-full border border-[#2c303a] flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#2c303a] transition-colors shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="panel p-12 flex flex-col items-center justify-center text-center">
              <Package className="h-12 w-12 text-slate-600 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No products found</h3>
              <p className="text-sm text-slate-400 max-w-md">Try adjusting your filters or click 'Add Product' to create your first item in the inventory.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
