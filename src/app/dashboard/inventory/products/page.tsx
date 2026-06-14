import { createClient } from "@/lib/supabase-server";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      brand:brands(name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your product catalog and pricing.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="mt-8 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products by name, SKU, or barcode..." 
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">SKU / Barcode</th>
                <th className="px-6 py-4 font-medium">Category & Brand</th>
                <th className="px-6 py-4 font-medium">Price (Rs.)</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 w-fit">SKU: {product.sku}</span>
                        {product.barcode && <span className="text-xs text-slate-400">BC: {product.barcode}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{product.category?.name || '-'}</span>
                        <span className="text-xs text-slate-400">{product.brand?.name || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-emerald-600 font-semibold">{product.selling_price.toFixed(2)}</span>
                        <span className="text-xs text-slate-400">Cost: {product.cost_price.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No products found. Add a product to get started.
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
