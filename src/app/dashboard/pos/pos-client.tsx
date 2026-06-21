"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Minus, Trash2, ShoppingCart, User as UserIcon, CreditCard, Banknote, CheckCircle, ChevronRight, Package } from "lucide-react";
import { processCheckout } from "./actions";

type Product = any;
type Category = any;
type Customer = any;
type CartItem = Product & { cartQuantity: number };

export function POSClient({
  categories,
  products,
  customers,
  userProfile
}: {
  categories: Category[],
  products: Product[],
  customers: Customer[],
  userProfile: any
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (p.barcode && p.barcode.includes(searchQuery));
      const matchesCategory = activeCategory ? p.category_id === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item);
      }
      return [...prev, { ...product, cartQuantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.cartQuantity + delta);
        return { ...item, cartQuantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.selling_price * item.cartQuantity), 0);
  const discount = 0; // Placeholder for future discount logic
  const total = subtotal - discount;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    
    try {
      const result = await processCheckout({
        cartItems: cart.map(item => ({
          product_id: item.id,
          quantity: item.cartQuantity,
          unit_price: item.selling_price,
          total_price: item.cartQuantity * item.selling_price
        })),
        customerId: selectedCustomer || null,
        paymentMethod,
        subtotal,
        discount,
        total,
        branchId: userProfile?.branch_id,
        userId: userProfile?.id
      });

      if (result.error) {
        alert("Checkout Failed: " + result.error);
      } else {
        setSuccessMessage(`Invoice ${result.invoiceNumber} processed successfully!`);
        setCart([]);
        setSelectedCustomer("");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err: any) {
      alert("An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-[#09090B] overflow-hidden">
      
      {/* Left Panel: Catalog */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-[#252525] bg-[#09090B]">
        
        {/* Top Controls */}
        <div className="p-4 md:p-6 border-b border-[#252525] space-y-4 shrink-0 z-10 bg-[#09090B]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" />
            <input 
              type="text"
              placeholder="Search by product name, SKU, or barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#252525] rounded-full pl-12 pr-4 py-4 text-white font-semibold focus:outline-none focus:border-[#D1E8D5] shadow-sm text-sm"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 snap-x">
            <button 
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all shrink-0 snap-start
                ${activeCategory === null ? 'bg-white text-[#1A1A1A]' : 'bg-[#1A1A1A] text-[#A1A1AA] hover:text-white border border-[#252525]'}`}
            >
              All Items
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all shrink-0 snap-start
                  ${activeCategory === cat.id ? 'bg-[#D1E8D5] text-[#1A1A1A]' : 'bg-[#1A1A1A] text-[#A1A1AA] hover:text-white border border-[#252525]'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-[#09090B]">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => {
              // Calculate global/branch stock for display
              const stock = product.inventory ? product.inventory.reduce((acc: number, inv: any) => acc + inv.quantity, 0) : 0;
              const isLowStock = stock <= (product.reorder_level || 10);

              return (
                <div 
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-[#1A1A1A] border border-[#252525] rounded-3xl p-4 cursor-pointer hover:border-[#D1E8D5]/50 transition-all group flex flex-col shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-3">
                    <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLowStock ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#252525] text-white'}`}>
                      {stock} in stock
                    </div>
                  </div>
                  
                  <div className="h-16 w-16 bg-[#252525] rounded-2xl flex items-center justify-center text-[#A1A1AA] font-bold text-xl uppercase mb-4 mt-2 group-hover:scale-105 transition-transform group-hover:bg-white group-hover:text-[#1A1A1A]">
                    {product.name.charAt(0)}
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider font-bold mb-1">{product.sku}</p>
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-2">{product.name}</h3>
                    <p className="text-[#D1E8D5] font-black">Rs. {product.selling_price.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredProducts.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-[#A1A1AA]">
              <Package className="h-12 w-12 mb-4 opacity-50" />
              <p className="font-bold">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Cart */}
      <div className="w-full lg:w-[400px] xl:w-[460px] flex flex-col bg-[#111113] shrink-0 border-l border-[#252525] relative">
        
        {/* Success Overlay */}
        {successMessage && (
          <div className="absolute inset-0 bg-[#09090B]/80 backdrop-blur-md z-50 flex flex-col items-center justify-center animate-in fade-in">
             <div className="h-20 w-20 bg-[#D1E8D5] rounded-full flex items-center justify-center text-[#1A1A1A] mb-4 shadow-[0_0_40px_rgba(209,232,213,0.3)] animate-bounce">
               <CheckCircle className="h-10 w-10" />
             </div>
             <p className="text-white font-bold text-lg">{successMessage}</p>
          </div>
        )}

        <div className="p-6 border-b border-[#252525] shrink-0 bg-[#1A1A1A]">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-[#D1E8D5]" /> 
            Current Order
          </h2>
          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
              <select 
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full bg-[#09090B] border border-[#252525] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-white appearance-none cursor-pointer"
              >
                <option value="">Walk-in Customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[#A1A1AA] text-center px-8 opacity-50">
              <ShoppingCart className="h-12 w-12 mb-4" />
              <p className="text-sm font-bold">Cart is empty</p>
              <p className="text-[11px] mt-2">Click on products to add them to the current order.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="bg-[#1A1A1A] border border-[#252525] rounded-2xl p-3 flex flex-col gap-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <h4 className="text-sm font-bold text-white leading-snug">{item.name}</h4>
                    <p className="text-[11px] text-[#A1A1AA] font-bold mt-0.5">Rs. {item.selling_price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="h-8 w-8 rounded-full bg-[#252525] flex items-center justify-center text-[#A1A1AA] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-[#09090B] border border-[#252525] rounded-full p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="h-6 w-6 rounded-full hover:bg-[#252525] flex items-center justify-center text-white transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-white">{item.cartQuantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="h-6 w-6 rounded-full bg-[#252525] hover:bg-[#333] flex items-center justify-center text-white transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-sm font-black text-[#D1E8D5]">
                    Rs. {(item.selling_price * item.cartQuantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-[#252525] bg-[#1A1A1A] shrink-0">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm text-[#A1A1AA] font-semibold">
              <span>Subtotal</span>
              <span className="text-white">Rs. {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#A1A1AA] font-semibold">
              <span>Discount</span>
              <span className="text-white">Rs. {discount.toFixed(2)}</span>
            </div>
            <div className="h-px w-full bg-[#252525] my-2"></div>
            <div className="flex justify-between text-xl font-black text-white">
              <span>Total</span>
              <span className="text-[#D1E8D5]">Rs. {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              onClick={() => setPaymentMethod('Cash')}
              className={`py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold border transition-all
                ${paymentMethod === 'Cash' ? 'bg-[#252525] border-white text-white' : 'bg-[#09090B] border-[#252525] text-[#A1A1AA] hover:border-white/50'}`}
            >
              <Banknote className="h-4 w-4" /> Cash
            </button>
            <button 
              onClick={() => setPaymentMethod('Card')}
              className={`py-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold border transition-all
                ${paymentMethod === 'Card' ? 'bg-[#252525] border-white text-white' : 'bg-[#09090B] border-[#252525] text-[#A1A1AA] hover:border-white/50'}`}
            >
              <CreditCard className="h-4 w-4" /> Card
            </button>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0 || isProcessing}
            className={`w-full py-5 rounded-full font-black text-lg flex items-center justify-center gap-2 shadow-xl transition-all
              ${cart.length === 0 ? 'bg-[#252525] text-[#A1A1AA] cursor-not-allowed' : 'bg-[#D1E8D5] text-[#1A1A1A] hover:bg-white hover:scale-[1.02] active:scale-[0.98]'}`}
          >
            {isProcessing ? (
               <div className="h-5 w-5 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
            ) : (
               <>Complete Checkout <ChevronRight className="h-5 w-5" /></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
