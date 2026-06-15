import { ArrowLeft, Bookmark } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createCategory } from "../../actions";
import { SubmitButton } from "@/components/ui/submit-button"; // Assuming there's a submit button, if not I'll use a regular button.

export default function NewCategoryPage() {
  async function action(formData: FormData) {
    "use server";
    const res = await createCategory(formData);
    if (res.success) {
      redirect("/dashboard/inventory/categories");
    } else {
      console.error(res.error);
    }
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard/inventory/categories"
          className="p-2 rounded-full bg-[#1A1A1F] text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">New Category</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">Create a new product category.</p>
        </div>
      </div>

      <div className="panel p-6 border-none">
        <form action={action} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                Category Name <span className="text-[#FFA6A6]">*</span>
              </label>
              <div className="relative">
                <Bookmark className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="e.g. Skin Care"
                  className="w-full bg-[#1A1A1F] border border-white/[0.05] rounded-xl pl-11 pr-4 py-3 text-white placeholder-[#94A3B8] focus:border-[#FBE7A1] focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                placeholder="Brief description of the category..."
                className="w-full bg-[#1A1A1F] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-[#94A3B8] focus:border-[#FBE7A1] focus:outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.05]">
            <Link 
              href="/dashboard/inventory/categories"
              className="px-6 py-3 rounded-xl bg-[#1A1A1F] text-white font-bold hover:bg-white/[0.05] transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#FBE7A1] text-[#1A1A1F] font-bold hover:bg-white transition-colors"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
