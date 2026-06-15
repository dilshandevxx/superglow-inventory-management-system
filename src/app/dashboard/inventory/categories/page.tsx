import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { deleteCategory } from "../actions";

export default async function CategoriesPage() {
  const supabase = createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Categories</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">Manage product categories for inventory organization.</p>
        </div>
        <Link href="/dashboard/inventory/categories/new" className="flex items-center gap-2 rounded-xl bg-[#FBE7A1] px-4 py-2 text-sm font-bold text-[#1A1A1F] hover:bg-white transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Add Category
        </Link>
      </div>

      <div className="mt-8 panel overflow-hidden border-none max-w-4xl">
        <div className="p-4 border-b border-white/[0.05] flex items-center gap-4 bg-[#1A1A1F]">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full rounded-lg bg-[#2A2A32] border border-white/[0.05] pl-10 pr-4 py-2 text-sm text-white focus:border-[#FBE7A1] focus:outline-none transition-all placeholder-[#94A3B8]"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#94A3B8]">
            <thead className="bg-[#1A1A1F] text-xs uppercase text-[#94A3B8] border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 font-bold">Category Name</th>
                <th className="px-6 py-4 font-bold">Description</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-[#2A2A32] transition-colors">
                    <td className="px-6 py-4 font-bold text-white">{category.name}</td>
                    <td className="px-6 py-4 text-[#94A3B8]">{category.description || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-[#94A3B8] hover:text-[#FBE7A1] transition-colors rounded-md hover:bg-[#1A1A1F]">
                          <Edit className="h-4 w-4" />
                        </button>
                        <form action={deleteCategory.bind(null, category.id)}>
                          <button type="submit" className="p-2 text-[#94A3B8] hover:text-[#FFA6A6] transition-colors rounded-md hover:bg-[#1A1A1F]">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-[#94A3B8]">
                    No categories found. Add one to get started.
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
