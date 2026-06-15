import { createClient } from "@/lib/supabase-server";
import { Plus, Scan, List, LayoutGrid, MoreHorizontal, RotateCcw, ChevronDown, Package } from "lucide-react";
import Link from "next/link";
import SearchInput from "@/components/ui/search-input";
import Pagination from "@/components/ui/pagination";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const supabase = createClient();
  
  let supabaseQuery = supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      brand:brands(name),
      inventory(quantity)
    `, { count: 'exact' });

  if (query) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,sku.ilike.%${query}%,barcode.ilike.%${query}%`);
  }

  const { data: products, count } = await supabaseQuery
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  const totalProducts = count || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto">
      
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-white tracking-tight">Products</h1>
          <span className="bg-[#25252B] text-[#94A3B8] text-xs font-semibold px-4 py-1.5 rounded-full border border-white/[0.02]">
            <span className="text-white mr-1">{totalProducts}</span> total products
          </span>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-96">
            <SearchInput placeholder="Search by name, SKU, or barcode..." />
          </div>

          <div className="flex bg-[#1A1A1F] border border-white/[0.05] rounded-full p-1">
            <button className="p-2 bg-[#2A2A32] text-white rounded-full"><List className="h-4 w-4" /></button>
            <button className="p-2 text-[#94A3B8] hover:text-white rounded-full transition-colors"><LayoutGrid className="h-4 w-4" /></button>
          </div>

          <Link href="/dashboard/inventory/products/new" className="btn-primary flex items-center gap-2 shrink-0">
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Filter Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          
          <div>
            <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Product Type</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-[#FBE7A1] text-[#1A1A1F] font-bold rounded-full px-3 py-2 text-center transition-all text-sm">Retail</button>
              <button className="bg-[#1A1A1F] border border-white/[0.05] text-[#94A3B8] font-medium rounded-full px-3 py-2 text-center hover:bg-[#25252B] transition-all text-sm">Wholesale</button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Sort By</h3>
            <button className="w-full flex items-center justify-between bg-[#1A1A1F] border border-white/[0.05] rounded-xl px-5 py-3 hover:bg-[#25252B] transition-all">
              <span className="text-sm font-medium text-[#94A3B8] flex items-center gap-2">
                <span className="text-[#94A3B8]/60 text-[10px]">RECENT:</span> Newest First
              </span>
              <ChevronDown className="h-4 w-4 text-[#94A3B8]" />
            </button>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Category</h3>
            <button className="w-full flex items-center justify-between bg-[#1A1A1F] border border-white/[0.05] rounded-xl px-5 py-3 hover:bg-[#25252B] transition-all">
              <span className="text-sm font-medium text-[#94A3B8] flex items-center gap-2">
                <span className="h-4 w-4 flex gap-0.5"><div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-sm"></div><div className="w-1.5 h-1.5 bg-[#94A3B8] rounded-sm"></div></span> All products
              </span>
              <ChevronDown className="h-4 w-4 text-[#94A3B8]" />
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white hover:text-[#99E2C6] transition-colors">
            <RotateCcw className="h-4 w-4" /> Reset Filters
          </button>

        </div>

        {/* Right Product List */}
        <div className="flex-1 space-y-3 flex flex-col">
          {products && products.length > 0 ? (
            <>
              {products.map((product) => {
                const totalStock = product.inventory ? product.inventory.reduce((sum: number, item: any) => sum + item.quantity, 0) : 0;
                const isLowStock = totalStock <= (product.reorder_level || 10);
                
                return (
                  <div key={product.id} className="panel p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#2A2A32] transition-all group cursor-pointer relative overflow-hidden">
                    <div className="flex items-center gap-4 flex-1 relative z-10">
                      {/* Styled text placeholder for image */}
                      <div className="h-16 w-16 bg-[#1A1A1F] border border-white/[0.05] rounded-xl flex items-center justify-center shrink-0 text-[#FBE7A1] font-black text-xl uppercase group-hover:bg-[#2A2A32] transition-all">
                        {product.name.charAt(0)}
                      </div>
                      
                      <div className="flex flex-col">
                        <h3 className="text-base font-bold text-white transition-colors">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs text-[#94A3B8] font-mono bg-[#1A1A1F] border border-white/[0.05] px-2 py-0.5 rounded-md">
                            SKU: {product.sku}
                          </span>
                          <span className="text-xs text-[#94A3B8]">•</span>
                          <span className="text-xs text-[#94A3B8]">{product.category?.name || 'Uncategorized'}</span>
                          <span className="text-xs text-[#94A3B8]">•</span>
                          <span className={`text-xs flex items-center gap-1 ${isLowStock ? 'text-[#FFA6A6]' : 'text-[#94A3B8]'}`}>
                            <Package className="h-3 w-3" /> Stock: <strong className="font-medium">{totalStock}</strong>
                            {isLowStock && <span className="text-[#FFA6A6] flex items-center gap-0.5 ml-1"><span className="w-1.5 h-3 bg-[#FFA6A6] block opacity-80"></span> low</span>}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 w-full sm:w-auto relative z-10">
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Retail Price</span>
                        <span className="text-sm font-bold text-[#FBE7A1]">Rs. {product.selling_price.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Cost Price</span>
                        <span className="text-sm font-bold text-[#94A3B8]">Rs. {product.cost_price.toFixed(2)}</span>
                      </div>
                      <button className="h-10 w-10 rounded-full bg-[#1A1A1F] border border-white/[0.05] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#32323A] transition-all shrink-0">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <Pagination totalPages={totalPages} currentPage={page} />
            </>
          ) : (
            <div className="panel p-12 flex flex-col items-center justify-center text-center">
              <Package className="h-12 w-12 text-[#94A3B8] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No products found</h3>
              <p className="text-sm text-[#94A3B8] max-w-md">
                {query ? `No results match "${query}"` : "Try adjusting your filters or click 'Add Product' to create your first item in the inventory."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
