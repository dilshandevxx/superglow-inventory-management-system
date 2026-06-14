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
      <div className="flex h-[calc(100vh-8rem)] gap-6 animate-in fade-in duration-500 print:hidden">
        {/* Left Column: Products & Search */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
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
              className="w-full rounded-xl border-2 border-slate-200 pl-12 pr-4 py-4 text-lg focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-sm transition-all"
            />
          </div>

          <div className="flex-1 overflow-y-auto bg-white rounded-xl border shadow-sm p-4">
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <button 
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="flex flex-col text-left p-4 rounded-xl border hover:border-blue-500 hover:shadow-md transition-all group bg-slate-50 hover:bg-blue-50/50"
                >
                  <div className="flex-1 w-full">
                    <h3 className="font-semibold text-slate-800 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">SKU: {product.sku}</p>
                    {product.barcode && <p className="text-xs text-slate-400">BC: {product.barcode}</p>}
                  </div>
                  <div className="mt-4 flex items-end justify-between w-full border-t pt-2 border-slate-200">
                    <span className="font-bold text-emerald-600 text-lg">Rs. {product.selling_price.toFixed(2)}</span>
                    <Plus className="h-5 w-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Cart */}
        <div className="w-[400px] bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <h2 className="font-bold text-lg flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Current Order</h2>
            <span className="bg-slate-800 px-2 py-1 rounded text-xs font-medium">{cart.length} Items</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                <ShoppingCart className="h-12 w-12 opacity-20" />
                <p>Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 p-3 bg-white border rounded-lg shadow-sm">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-sm leading-tight">{item.name}</h4>
                      <span className="text-emerald-600 font-medium text-sm">Rs. {item.selling_price.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col items-end justify-between gap-2">
                      <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                      <div className="flex items-center gap-2 bg-slate-100 rounded-md p-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white rounded shadow-sm text-slate-600 transition-colors"><Minus className="h-3 w-3" /></button>
                        <span className="text-sm font-bold w-5 text-center text-slate-700">{item.cartQuantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white rounded shadow-sm text-slate-600 transition-colors"><Plus className="h-3 w-3" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-5 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 items-center">
                <span>Discount</span>
                <div className="flex items-center gap-1">
                  <span>Rs.</span>
                  <input 
                    type="number" 
                    value={discount}
                    onChange={e => setDiscount(Number(e.target.value))}
                    className="w-20 text-right p-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-between font-bold text-2xl text-slate-900 pt-3 border-t mt-2">
                <span>Total</span>
                <span className="text-emerald-600">Rs. {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button 
                onClick={() => setPaymentMethod('Cash')}
                className={`py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all ${paymentMethod === 'Cash' ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                <Banknote className="h-5 w-5" /> Cash
              </button>
              <button 
                onClick={() => setPaymentMethod('Card')}
                className={`py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all ${paymentMethod === 'Card' ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                <CreditCard className="h-5 w-5" /> Card
              </button>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0 || isProcessing}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>Complete Checkout <Printer className="h-5 w-5 ml-2 opacity-80" /></>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Receipt for Printing */}
      {lastReceipt && (
        <div className="hidden print:block w-[300px] text-black font-mono text-sm mx-auto p-4">
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
