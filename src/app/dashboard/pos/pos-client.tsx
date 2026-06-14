"use client";

import { useState, useMemo } from "react";
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote, Printer } from "lucide-react";
import { checkoutAction } from "./actions";

type Product = any; 
type CartItem = Product & { cartQuantity: number };

export default function PosClient({ products, userProfile }: { products: any[], userProfile: any }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<any>(null);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const lowerSearch = searchTerm.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerSearch) || 
      p.sku.toLowerCase().includes(lowerSearch) ||
      (p.barcode && p.barcode.includes(searchTerm))
    );
  }, [products, searchTerm]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item);
      }
      return [...prev, { ...product, cartQuantity: 1 }];
    });
    setSearchTerm("");
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = Math.max(1, item.cartQuantity + delta);
        return { ...item, cartQuantity: newQ };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.selling_price * item.cartQuantity), 0);
  const total = subtotal - discount;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsProcessing(true);
    try {
      const items = cart.map(item => ({
        product_id: item.id,
        quantity: item.cartQuantity,
        unit_price: item.selling_price,
        total_price: item.selling_price * item.cartQuantity
      }));
      
      const res = await checkoutAction({
        branchId: userProfile?.branch_id,
        subtotal,
        discount,
        total,
        paymentMethod,
        items
      });
      
      if (res.success) {
        setLastReceipt({
          items: cart,
          subtotal,
          discount,
          total,
          paymentMethod,
          date: new Date().toLocaleString(),
          cashier: userProfile?.full_name,
          branch: userProfile?.branch?.name
        });
        setCart([]);
        setDiscount(0);
        
        // Timeout to allow state to update before printing
        setTimeout(() => {
          window.print();
        }, 100);
      } else {
        alert("Error during checkout: " + res.error);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-8rem)] gap-6 animate-in fade-in duration-500 print:hidden max-w-[1600px] mx-auto w-full">
        {/* Left Column: Products & Search */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filteredProducts.length === 1) {
                  addToCart(filteredProducts[0]);
                }
              }}
              placeholder="Scan barcode or search products... (Press Enter to quick-add)" 
              className="w-full bg-[#181a1f] border border-[#2c303a] rounded-full pl-12 pr-4 py-4 text-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#4ade80] transition-colors shadow-sm"
            />
          </div>

          <div className="flex-1 overflow-y-auto bg-[#181a1f] rounded-xl border border-[#2c303a] p-4 custom-scrollbar">
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <button 
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="flex flex-col text-left p-4 rounded-xl border border-[#2c303a] hover:border-[#4ade80]/50 transition-colors group bg-[#20232b] hover:bg-[#4ade80]/5"
                >
                  <div className="flex-1 w-full">
                    <h3 className="font-bold text-white line-clamp-2 group-hover:text-[#4ade80] transition-colors">{product.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-mono">SKU: {product.sku}</p>
                  </div>
                  <div className="mt-4 flex items-end justify-between w-full border-t border-[#2c303a] pt-3">
                    <span className="font-black text-[#4ade80] text-lg">Rs. {product.selling_price.toFixed(2)}</span>
                    <div className="h-8 w-8 rounded-full bg-[#181a1f] border border-[#2c303a] flex items-center justify-center group-hover:border-[#4ade80]/50 group-hover:text-[#4ade80] text-slate-500 transition-colors">
                      <Plus className="h-4 w-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Cart */}
        <div className="w-[400px] bg-[#181a1f] rounded-xl border border-[#2c303a] flex flex-col overflow-hidden shrink-0">
          <div className="p-4 bg-[#20232b] border-b border-[#2c303a] flex items-center justify-between">
            <h2 className="font-bold text-lg flex items-center gap-2 text-white"><ShoppingCart className="h-5 w-5 text-[#4ade80]" /> Current Order</h2>
            <span className="bg-[#181a1f] border border-[#2c303a] text-slate-300 px-3 py-1 rounded-full text-xs font-bold">{cart.length} Items</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-[#181a1f] custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3">
                <ShoppingCart className="h-12 w-12 opacity-20" />
                <p className="text-sm font-medium">Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 p-3 bg-[#20232b] border border-[#2c303a] rounded-xl hover:border-slate-600 transition-colors group">
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm leading-tight mb-1">{item.name}</h4>
                      <span className="text-[#4ade80] font-black text-sm">Rs. {item.selling_price.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2">
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-400 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      <div className="flex items-center gap-2 bg-[#181a1f] border border-[#2c303a] rounded-lg p-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-[#20232b] rounded text-slate-400 hover:text-white transition-colors"><Minus className="h-3 w-3" /></button>
                        <span className="text-sm font-bold w-6 text-center text-white">{item.cartQuantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-[#20232b] rounded text-slate-400 hover:text-white transition-colors"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#20232b] p-5 border-t border-[#2c303a]">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-slate-400">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-white">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400 items-center">
                <span className="font-medium">Discount</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold">Rs.</span>
                  <input 
                    type="number" 
                    value={discount}
                    onChange={e => setDiscount(Number(e.target.value))}
                    className="w-24 bg-[#181a1f] text-right p-1.5 border border-[#2c303a] rounded-lg text-white font-bold focus:border-[#4ade80] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="flex justify-between font-black text-2xl text-white pt-4 border-t border-[#2c303a] mt-2">
                <span>Total</span>
                <span className="text-[#4ade80]">Rs. {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                onClick={() => setPaymentMethod('Cash')}
                className={`py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all border ${paymentMethod === 'Cash' ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30' : 'bg-[#181a1f] text-slate-400 border-[#2c303a] hover:bg-[#2c303a] hover:text-white'}`}
              >
                <Banknote className="h-5 w-5" /> Cash
              </button>
              <button 
                onClick={() => setPaymentMethod('Card')}
                className={`py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all border ${paymentMethod === 'Card' ? 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30' : 'bg-[#181a1f] text-slate-400 border-[#2c303a] hover:bg-[#2c303a] hover:text-white'}`}
              >
                <CreditCard className="h-5 w-5" /> Card
              </button>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0 || isProcessing}
              className="w-full btn-primary py-4 text-lg font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>Complete Checkout <Printer className="h-5 w-5 ml-1 opacity-80" /></>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Receipt for Printing */}
      {lastReceipt && (
        <div className="hidden print:block w-[300px] text-black font-mono text-sm mx-auto p-4 bg-white">
          <div className="text-center mb-4">
            <h1 className="font-bold text-xl uppercase">SuperGlow</h1>
            <p className="text-xs">{lastReceipt.branch || "Main Branch"}</p>
            <p className="text-xs">Tel: +94 11 234 5678</p>
          </div>
          
          <div className="border-t border-b border-dashed border-slate-400 py-2 mb-4 text-xs">
            <p>Date: {lastReceipt.date}</p>
            <p>Cashier: {lastReceipt.cashier || "Staff"}</p>
          </div>

          <table className="w-full mb-4 text-xs">
            <thead>
              <tr className="border-b border-dashed border-slate-400">
                <th className="text-left pb-1">Item</th>
                <th className="text-right pb-1">Qty</th>
                <th className="text-right pb-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {lastReceipt.items.map((item: any) => (
                <tr key={item.id}>
                  <td className="py-1">
                    <div className="truncate w-32">{item.name}</div>
                    <div className="text-[10px] text-slate-500">@ {item.selling_price.toFixed(2)}</div>
                  </td>
                  <td className="text-right py-1">{item.cartQuantity}</td>
                  <td className="text-right py-1">{(item.selling_price * item.cartQuantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t border-dashed border-slate-400 pt-2 space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{lastReceipt.subtotal.toFixed(2)}</span>
            </div>
            {lastReceipt.discount > 0 && (
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-{lastReceipt.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm mt-2 pt-2 border-t border-dashed border-slate-400">
              <span>TOTAL:</span>
              <span>{lastReceipt.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>Payment ({lastReceipt.paymentMethod}):</span>
              <span>{lastReceipt.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center mt-8 text-xs">
            <p>Thank you for shopping with us!</p>
            <p>Please come again.</p>
          </div>
        </div>
      )}
    </>
  );
}
