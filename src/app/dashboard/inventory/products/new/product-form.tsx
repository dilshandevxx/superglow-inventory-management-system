"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "../../actions";
import { ArrowLeft, Save, Loader2, Package, Tag, DollarSign, Layers } from "lucide-react";
import Link from "next/link";

export default function ProductForm({ 
  categories, 
  brands 
}: { 
  categories: any[], 
  brands: any[] 
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    
    const res = await createProduct(formData);
    
    if (!res.success) {
      setError(res.error || "Failed to create product");
      setIsPending(false);
    } else {
      router.push("/dashboard/inventory/products");
      router.refresh();
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      
      {error && (
        <div className="bg-[#FFA6A6]/10 text-[#FFA6A6] p-5 rounded-xl flex items-center gap-3 border border-[#FFA6A6]/20">
          <div className="h-2 w-2 bg-[#FFA6A6] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,166,166,0.5)]"></div>
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      {/* Basic Info Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.05] pb-3">
          <Package className="h-5 w-5 text-[#99E2C6]" /> Basic Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Product Name <span className="text-[#FFA6A6]">*</span></label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required
              placeholder="e.g. SuperGlow Vitamin C Serum"
              className="glass-input w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="sku" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">SKU (Stock Keeping Unit) <span className="text-[#FFA6A6]">*</span></label>
            <input 
              type="text" 
              id="sku" 
              name="sku" 
              required
              placeholder="e.g. SG-VITC-01"
              className="glass-input w-full font-mono"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Description</label>
            <textarea 
              id="description" 
              name="description" 
              rows={3}
              placeholder="Enter product description..."
              className="glass-input w-full resize-none"
            />
          </div>
        </div>
      </div>

      {/* Organization Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.05] pb-3">
          <Layers className="h-5 w-5 text-[#99E2C6]" /> Organization
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="category_id" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Category</label>
            <select 
              id="category_id" 
              name="category_id" 
              className="glass-input w-full appearance-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id} className="bg-slate-900">{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="brand_id" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Brand</label>
            <select 
              id="brand_id" 
              name="brand_id" 
              className="glass-input w-full appearance-none cursor-pointer"
            >
              <option value="" className="bg-slate-900">Select Brand</option>
              {brands.map(b => (
                <option key={b.id} value={b.id} className="bg-slate-900">{b.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="barcode" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Barcode Number</label>
            <input 
              type="text" 
              id="barcode" 
              name="barcode" 
              placeholder="Scan or type barcode"
              className="glass-input w-full font-mono"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent scanner from submitting the form
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Pricing & Stock Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/[0.05] pb-3">
          <DollarSign className="h-5 w-5 text-[#99E2C6]" /> Pricing & Inventory
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label htmlFor="cost_price" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Cost Price (Rs) <span className="text-[#FFA6A6]">*</span></label>
            <input 
              type="number" 
              step="0.01"
              id="cost_price" 
              name="cost_price" 
              required
              placeholder="0.00"
              className="glass-input w-full font-mono"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="selling_price" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Selling Price (Rs) <span className="text-[#FFA6A6]">*</span></label>
            <input 
              type="number" 
              step="0.01"
              id="selling_price" 
              name="selling_price" 
              required
              placeholder="0.00"
              className="glass-input w-full font-mono"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="initial_stock" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Initial Stock</label>
            <input 
              type="number" 
              id="initial_stock" 
              name="initial_stock" 
              defaultValue="0"
              className="glass-input w-full font-mono"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="reorder_level" className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">Reorder Level Alert</label>
            <input 
              type="number" 
              id="reorder_level" 
              name="reorder_level" 
              defaultValue="10"
              className="glass-input w-full font-mono"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
        <Link 
          href="/dashboard/inventory/products"
          className="flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Cancel & Return
        </Link>
        
        <button 
          type="submit" 
          disabled={isPending}
          className="btn-primary flex items-center gap-2"
        >
          {isPending ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="h-4 w-4" /> Save Product</>
          )}
        </button>
      </div>

    </form>
  );
}
