import { ArrowLeft, Tags } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createBrand } from "../../actions";

export default function NewBrandPage() {
  async function action(formData: FormData) {
    "use server";
    const res = await createBrand(formData);
    if (res.success) {
      redirect("/dashboard/inventory/brands");
    } else {
      console.error(res.error);
    }
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard/inventory/brands"
          className="p-2 rounded-full bg-[#1A1A1F] text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">New Brand</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">Add a new manufacturer or brand.</p>
        </div>
      </div>

      <div className="panel p-6 border-none">
        <form action={action} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                Brand Name <span className="text-[#FFA6A6]">*</span>
              </label>
              <div className="relative">
                <Tags className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#94A3B8]" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="e.g. L'Oreal"
                  className="w-full bg-[#1A1A1F] border border-white/[0.05] rounded-xl pl-11 pr-4 py-3 text-white placeholder-[#94A3B8] focus:border-[#FFA6A6] focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.05]">
            <Link 
              href="/dashboard/inventory/brands"
              className="px-6 py-3 rounded-xl bg-[#1A1A1F] text-white font-bold hover:bg-white/[0.05] transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#FFA6A6] text-[#1A1A1F] font-bold hover:bg-white transition-colors"
            >
              Save Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
