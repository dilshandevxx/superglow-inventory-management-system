"use client";

import { useState, useMemo } from "react";
import { CheckCircle, Search, PackagePlus, Box, Store } from "lucide-react";
import { receiveStock } from "./actions";

export function ReceivingClient({ products, branches }: { products: any[], branches: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>(branches[0]?.id || "");
  const [quantityToAdd, setQuantityToAdd] = useState<number | "">("");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 10); // Limit to top 10 results for dropdown
  }, [products, searchQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !selectedBranch || typeof quantityToAdd !== 'number' || quantityToAdd <= 0) return;

    setIsProcessing(true);
    
    try {
      const result = await receiveStock({
        productId: selectedProduct.id,
        branchId: selectedBranch,
        quantity: quantityToAdd
      });

      if (result.error) {
        alert("Failed to receive stock: " + result.error);
      } else {
        setSuccessMessage(`Successfully added ${quantityToAdd} units to ${selectedProduct.name}!`);
        // Reset form
        setSelectedProduct(null);
        setSearchQuery("");
        setQuantityToAdd("");
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err) {
      alert("An error occurred while saving.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] border border-[#252525] rounded-[32px] p-6 md:p-10 relative overflow-hidden shadow-xl">
      
      {/* Success Overlay */}
      {successMessage && (
        <div className="absolute inset-0 bg-[#1A1A1A]/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in">
           <div className="h-20 w-20 bg-[#D1E8D5] rounded-full flex items-center justify-center text-[#1A1A1A] mb-4 shadow-[0_0_40px_rgba(209,232,213,0.3)] animate-bounce">
             <CheckCircle className="h-10 w-10" />
           </div>
           <p className="text-white font-bold text-xl">{successMessage}</p>
           <button 
             onClick={() => setSuccessMessage(null)}
             className="mt-6 px-6 py-2 bg-[#252525] hover:bg-white hover:text-[#1A1A1A] rounded-full font-bold transition-all text-white"
           >
             Receive More Stock
           </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
        
        {/* Step 1: Select Product */}
        <div className="space-y-3 relative">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#252525] text-xs">1</span>
            Select Product
          </label>
          
          {!selectedProduct ? (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" />
              <input 
                type="text"
                placeholder="Search product by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#09090B] border border-[#252525] rounded-2xl pl-12 pr-4 py-4 text-white font-semibold focus:outline-none focus:border-[#D1E8D5] shadow-sm"
              />
              
              {/* Dropdown Results */}
              {searchQuery && filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#252525] border border-[#333] rounded-2xl shadow-2xl overflow-hidden z-20">
                  {filteredProducts.map(product => {
                    const stock = product.inventory?.reduce((acc: number, inv: any) => acc + inv.quantity, 0) || 0;
                    return (
                      <div 
                        key={product.id}
                        onClick={() => {
                          setSelectedProduct(product);
                          setSearchQuery("");
                        }}
                        className="px-4 py-3 hover:bg-[#333] cursor-pointer border-b border-[#333] last:border-0 flex justify-between items-center transition-colors"
                      >
                        <div>
                          <p className="font-bold text-sm text-white">{product.name}</p>
                          <p className="text-xs text-[#A1A1AA]">{product.sku}</p>
                        </div>
                        <span className="text-[10px] font-bold bg-[#1A1A1A] px-2 py-1 rounded-md text-[#A1A1AA]">Current Stock: {stock}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full bg-[#D1E8D5]/10 border border-[#D1E8D5]/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#09090B] flex items-center justify-center text-[#D1E8D5]">
                  <Box className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-white">{selectedProduct.name}</p>
                  <p className="text-xs text-[#A1A1AA]">{selectedProduct.sku}</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedProduct(null)}
                className="text-xs font-bold text-[#EF4444] hover:underline"
              >
                Change Product
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Select Branch */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#252525] text-xs">2</span>
            Destination Branch
          </label>
          <div className="relative">
            <Store className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" />
            <select 
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full bg-[#09090B] border border-[#252525] rounded-2xl pl-12 pr-4 py-4 text-sm font-semibold text-white focus:outline-none focus:border-white appearance-none cursor-pointer"
            >
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 3: Quantity */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#252525] text-xs">3</span>
            Quantity Received
          </label>
          <input 
            type="number"
            min="1"
            placeholder="e.g. 50"
            value={quantityToAdd}
            onChange={(e) => setQuantityToAdd(e.target.value === "" ? "" : parseInt(e.target.value))}
            className="w-full bg-[#09090B] border border-[#252525] rounded-2xl px-4 py-4 text-white font-bold text-xl focus:outline-none focus:border-[#D1E8D5]"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={!selectedProduct || !selectedBranch || !quantityToAdd || isProcessing}
            className={`w-full py-5 rounded-full font-black text-lg flex items-center justify-center gap-2 shadow-xl transition-all
              ${(!selectedProduct || !selectedBranch || !quantityToAdd) ? 'bg-[#252525] text-[#A1A1AA] cursor-not-allowed' : 'bg-[#D1E8D5] text-[#1A1A1A] hover:bg-white hover:scale-[1.02] active:scale-[0.98]'}`}
          >
            {isProcessing ? (
               <div className="h-5 w-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
            ) : (
               <>Add Stock to Inventory <PackagePlus className="h-5 w-5" /></>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
