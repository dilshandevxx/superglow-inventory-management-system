import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Plus, Edit, Trash2, Bookmark } from "lucide-react";
import { deleteCategory } from "../actions";
import SearchInput from "@/components/ui/search-input";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const supabase = createClient();
  
  let supabaseQuery = supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (query) {
    supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
  }

  const { data: categories } = await supabaseQuery;

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto font-sans mt-4">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <p className="text-[#A1A1AA] text-sm font-medium mb-1">Organization</p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">Categories</h1>
            <span className="bg-white text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {categories?.length || 0} Total
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <SearchInput placeholder="Search categories..." />
          </div>

          <Link href="/dashboard/inventory/categories/new" className="bg-[#FFF8D6] text-[#1A1A1A] hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm shrink-0">
            <Plus className="h-4 w-4" strokeWidth={2.5} /> Add Category
          </Link>
        </div>
      </div>

      <div className="bg-[#1A1A1A] rounded-[32px] border border-[#252525] overflow-hidden shadow-sm max-w-5xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#A1A1AA]">
            <thead className="bg-[#1A1A1A] text-[10px] uppercase font-bold text-[#A1A1AA] tracking-wider border-b border-[#252525]">
              <tr>
                <th className="px-8 py-5">Category Name</th>
                <th className="px-8 py-5">Description</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252525]">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-[#252525]/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-[#252525] rounded-xl flex items-center justify-center text-[#FFF8D6] group-hover:bg-[#1A1A1A] transition-colors border border-white/[0.02]">
                          <Bookmark className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <span className="font-bold text-[15px] text-white">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[#A1A1AA] font-medium">{category.description || '—'}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="h-9 w-9 rounded-full bg-[#1A1A1A] border border-[#252525] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-white transition-all shadow-sm">
                          <Edit className="h-4 w-4" />
                        </button>
                        <form action={deleteCategory.bind(null, category.id)}>
                          <button type="submit" className="h-9 w-9 rounded-full bg-[#1A1A1A] border border-[#252525] flex items-center justify-center text-[#A1A1AA] hover:text-[#FFA6A6] hover:border-[#FFA6A6] transition-all shadow-sm">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="h-16 w-16 bg-[#252525] rounded-full flex items-center justify-center mb-4 text-[#A1A1AA]">
                        <Bookmark className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <p className="font-bold text-white mb-1">No categories found</p>
                      <p className="text-sm text-[#A1A1AA]">{query ? `No results for "${query}"` : "Create a category to start organizing your products."}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
