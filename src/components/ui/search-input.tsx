"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }
      // Reset to page 1 on new search
      params.delete("page");
      
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, pathname, router, searchParams]);

  return (
    <div className="relative flex-1 lg:w-96">
      <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 ${isPending ? 'text-[#99E2C6] animate-pulse' : 'text-[#94A3B8]'}`} />
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder} 
        className="w-full bg-[#1A1A1F] border border-white/[0.05] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#99E2C6] transition-colors"
      />
    </div>
  );
}
