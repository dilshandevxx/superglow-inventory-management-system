"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, RotateCcw, Filter } from "lucide-react";

export default function ProductFilters({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset page to 1 when filters change
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/dashboard/inventory/products");
  };

  return (
    <div className="w-full lg:w-[260px] shrink-0">
      
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden w-full flex items-center justify-between bg-[#1A1A1A] border border-[#252525] rounded-2xl p-4 text-sm font-bold text-white mb-4 shadow-sm"
      >
        <span className="flex items-center gap-2"><Filter className="h-4 w-4"/> Filters</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isMobileOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter Content */}
      <div className={`space-y-6 ${isMobileOpen ? 'block' : 'hidden'} lg:block`}>
        <div>
          <h3 className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Sort By</h3>
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="w-full appearance-none bg-[#1A1A1A] border border-[#252525] rounded-2xl px-5 py-3.5 text-sm font-semibold text-white hover:border-[#D1E8D5]/50 focus:border-[#D1E8D5] focus:outline-none transition-all cursor-pointer shadow-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
              <option value="name_asc">Name: A to Z</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA] pointer-events-none" />
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Category</h3>
          <div className="relative">
            <select
              value={currentCategory}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full appearance-none bg-[#1A1A1A] border border-[#252525] rounded-2xl px-5 py-3.5 text-sm font-semibold text-white hover:border-[#E2F1E4]/50 focus:border-[#E2F1E4] focus:outline-none transition-all cursor-pointer shadow-sm"
            >
              <option value="">All Products</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA] pointer-events-none" />
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold text-[#A1A1AA] hover:text-[#E2F1E4] transition-colors rounded-2xl hover:bg-[#1A1A1A] border border-transparent hover:border-[#252525]"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.5} /> Clear All Filters
        </button>
      </div>

    </div>
  );
}
