import { ArrowLeft, ArrowRightLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createTransfer } from "../../actions";
import { createClient } from "@/lib/supabase-server";

export default async function NewTransferPage() {
  const supabase = createClient();
  
  // Fetch branches and products for the dropdowns
  const { data: branches } = await supabase.from('branches').select('id, name').order('name');
  const { data: products } = await supabase.from('products').select('id, name, sku').order('name');

  async function action(formData: FormData) {
    "use server";
    const res = await createTransfer(formData);
    if (res.success) {
      redirect("/dashboard/inventory/transfers");
    } else {
      console.error(res.error);
    }
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard/inventory/transfers"
          className="p-2 rounded-full bg-[#1A1A1F] text-[#94A3B8] hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">New Transfer</h1>
          <p className="mt-1 text-sm text-[#94A3B8]">Initiate a stock transfer between branches.</p>
        </div>
      </div>

      <div className="panel p-6 border-none">
        <form action={action} className="space-y-6">
          <div className="space-y-4">
            
            <div>
              <label htmlFor="product_id" className="block text-sm font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                Product <span className="text-[#FFA6A6]">*</span>
              </label>
              <select
                name="product_id"
                id="product_id"
                required
                className="w-full bg-[#1A1A1F] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:border-[#93C5FD] focus:outline-none transition-all"
              >
                <option value="">Select a product...</option>
                {products?.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="from_branch_id" className="block text-sm font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                  From Branch <span className="text-[#FFA6A6]">*</span>
                </label>
                <select
                  name="from_branch_id"
                  id="from_branch_id"
                  required
                  className="w-full bg-[#1A1A1F] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:border-[#93C5FD] focus:outline-none transition-all"
                >
                  <option value="">Select origin branch...</option>
                  {branches?.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="to_branch_id" className="block text-sm font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                  To Branch <span className="text-[#FFA6A6]">*</span>
                </label>
                <select
                  name="to_branch_id"
                  id="to_branch_id"
                  required
                  className="w-full bg-[#1A1A1F] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:border-[#93C5FD] focus:outline-none transition-all"
                >
                  <option value="">Select destination branch...</option>
                  {branches?.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider">
                Quantity <span className="text-[#FFA6A6]">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                min="1"
                required
                placeholder="e.g. 50"
                className="w-full bg-[#1A1A1F] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder-[#94A3B8] focus:border-[#93C5FD] focus:outline-none transition-all"
              />
            </div>
            
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/[0.05]">
            <Link 
              href="/dashboard/inventory/transfers"
              className="px-6 py-3 rounded-xl bg-[#1A1A1F] text-white font-bold hover:bg-white/[0.05] transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#93C5FD] text-[#1A1A1F] font-bold hover:bg-white transition-colors flex items-center gap-2"
            >
              <ArrowRightLeft className="h-4 w-4" /> Create Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
