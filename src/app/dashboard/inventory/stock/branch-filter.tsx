"use client";

import { Filter } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function BranchFilter({ 
  branches, 
  currentBranch 
}: { 
  branches: any[], 
  currentBranch: string | null 
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set('branch_id', e.target.value);
    } else {
      params.delete('branch_id');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-xl bg-[#C4B5FD] px-4 py-2 text-sm font-bold text-[#1A1A1F] hover:bg-white transition-colors shadow-sm focus-within:ring-2 focus-within:ring-white">
        <Filter className="h-4 w-4" />
        <select 
          value={currentBranch || ""} 
          onChange={handleChange}
          className="bg-transparent font-bold outline-none cursor-pointer appearance-none pr-4"
        >
          <option value="">All Branches</option>
          {branches?.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
