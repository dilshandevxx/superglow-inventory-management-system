import { createClient } from "@/lib/supabase-server";
import { Plus, List, LayoutGrid, MoreHorizontal, Package, PackagePlus } from "lucide-react";
import Link from "next/link";
import SearchInput from "@/components/ui/search-input";
import Pagination from "@/components/ui/pagination";
import ProductFilters from "./product-filters";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const categoryId = typeof searchParams.category === 'string' ? searchParams.category : '';
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const supabase = createClient();
  
  // Fetch categories for the filter
  const { data: categories } = await supabase.from('categories').select('id, name').order('name');

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

  if (categoryId) {
    supabaseQuery = supabaseQuery.eq('category_id', categoryId);
  }

  if (sort === 'newest') {
    supabaseQuery = supabaseQuery.order('created_at', { ascending: false });
  } else if (sort === 'oldest') {
    supabaseQuery = supabaseQuery.order('created_at', { ascending: true });
  } else if (sort === 'price_high') {
    supabaseQuery = supabaseQuery.order('selling_price', { ascending: false });
  } else if (sort === 'price_low') {
    supabaseQuery = supabaseQuery.order('selling_price', { ascending: true });
  } else if (sort === 'name_asc') {
    supabaseQuery = supabaseQuery.order('name', { ascending: true });
  }

  const { data: products, count } = await supabaseQuery.range(offset, offset + limit - 1);

  const totalProducts = count || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto font-sans">
      
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 relative z-10 mt-4">
        <div>
          <p className="text-[#A1A1AA] text-sm font-medium mb-1">Catalog Management</p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">Products</h1>
            <span className="bg-white text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {totalProducts} Total
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <SearchInput placeholder="Search name, SKU, barcode..." />
          </div>

          <div className="flex bg-[#1A1A1A] border border-[#252525] rounded-full p-1 shadow-sm">
            <button className="p-2.5 bg-[#252525] text-white rounded-full"><List className="h-4 w-4" /></button>
            <button className="p-2.5 text-[#A1A1AA] hover:text-white rounded-full transition-colors"><LayoutGrid className="h-4 w-4" /></button>
          </div>

          <Link href="/dashboard/inventory/receiving" className="bg-[#252525] text-white hover:bg-[#333] transition-colors px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm shrink-0 border border-white/[0.05]">
            <PackagePlus className="h-4 w-4" strokeWidth={2.5} /> Receive Stock
          </Link>

          <Link href="/dashboard/inventory/products/new" className="bg-[#D1E8D5] text-[#1A1A1A] hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm shrink-0">
            <Plus className="h-4 w-4" strokeWidth={2.5} /> Add Product
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Filter Sidebar */}
        <ProductFilters categories={categories || []} />

        {/* Right Product List */}
        <div className="flex-1 space-y-3 flex flex-col">
          {products && products.length > 0 ? (
            <>
              {products.map((product) => {
                const totalStock = product.inventory ? product.inventory.reduce((sum: number, item: any) => sum + item.quantity, 0) : 0;
                const isLowStock = totalStock <= (product.reorder_level || 10);
                
                return (
                  <div key={product.id} className="bg-[#1A1A1A] border border-[#252525] rounded-[24px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#252525] transition-all group cursor-pointer relative overflow-hidden shadow-sm">
                    <div className="flex items-center gap-5 flex-1 relative z-10">
                      
                      {/* Avatar/Initials */}
                      <div className="h-14 w-14 bg-[#252525] rounded-2xl flex items-center justify-center shrink-0 text-[#D1E8D5] font-bold text-lg uppercase group-hover:bg-[#1A1A1A] transition-all border border-white/[0.02]">
                        {product.name.charAt(0)}
                      </div>
                      
                      <div className="flex flex-col">
                        <h3 className="text-[15px] font-bold text-white transition-colors mb-1">{product.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold text-[#1A1A1A] bg-[#E2F1E4] px-2 py-0.5 rounded-full">
                            {product.sku}
                          </span>
                          <span className="text-xs font-medium text-[#A1A1AA]">{product.category?.name || 'Uncategorized'}</span>
                          <span className="text-xs text-[#252525]">•</span>
                          <span className={`text-[11px] font-bold flex items-center gap-1.5 px-2 py-0.5 rounded-full ${isLowStock ? 'bg-[#FFF8D6] text-[#1A1A1A]' : 'bg-[#252525] text-white'}`}>
                            Stock: {totalStock}
                            {isLowStock && <span className="flex items-center gap-1 ml-1 text-[#EA580C] uppercase text-[9px]"><div className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse"></div> Low</span>}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 w-full sm:w-auto relative z-10 pl-[76px] sm:pl-0 mt-2 sm:mt-0 border-t border-white/[0.05] sm:border-none pt-3 sm:pt-0">
                      <div className="flex gap-6 sm:gap-8">
                        <div className="flex flex-col text-left sm:text-right">
                          <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-0.5">Retail Price</span>
                          <span className="text-sm font-bold text-white">Rs. {product.selling_price.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col text-left sm:text-right">
                          <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-0.5">Cost Price</span>
                          <span className="text-sm font-bold text-[#A1A1AA]">Rs. {product.cost_price.toFixed(2)}</span>
                        </div>
                      </div>
                      <button className="h-10 w-10 rounded-full bg-[#252525] flex items-center justify-center text-[#A1A1AA] hover:text-[#1A1A1A] hover:bg-[#E2F1E4] transition-all shrink-0">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-4">
                <Pagination totalPages={totalPages} currentPage={page} />
              </div>
            </>
          ) : (
            <div className="bg-[#1A1A1A] border border-[#252525] rounded-[32px] p-16 flex flex-col items-center justify-center text-center shadow-inner">
              <div className="h-20 w-20 bg-[#252525] rounded-full flex items-center justify-center mb-6 text-[#A1A1AA]">
                <Package className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
              <p className="text-sm text-[#A1A1AA] max-w-sm mb-8">
                {query ? `No results match "${query}"` : "Try adjusting your filters or click 'Add Product' to create your first item in the inventory catalog."}
              </p>
              {!query && (
                <Link href="/dashboard/inventory/products/new" className="bg-[#D1E8D5] text-[#1A1A1A] hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm">
                  <Plus className="h-4 w-4" strokeWidth={2.5} /> Add Product
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
