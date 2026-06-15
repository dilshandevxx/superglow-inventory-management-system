import { createClient } from "@/lib/supabase-server";
import ProductForm from "./product-form";

export default async function NewProductPage() {
  const supabase = createClient();
  
  // Fetch categories and brands for the dropdowns
  const [
    { data: categories },
    { data: brands }
  ] = await Promise.all([
    supabase.from('categories').select('id, name').order('name'),
    supabase.from('brands').select('id, name').order('name')
  ]);

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">Add New Product</h1>
        <p className="text-slate-400 mt-2">Enter the details for the new product to add it to your inventory.</p>
      </div>

      <div className="panel p-6 border-[#2c303a]">
        <ProductForm 
          categories={categories || []} 
          brands={brands || []} 
        />
      </div>
    </div>
  );
}
