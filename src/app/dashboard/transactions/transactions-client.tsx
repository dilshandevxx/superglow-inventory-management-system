"use client";

import { useState, useMemo } from "react";
import { Search, Receipt, X, Calendar, User as UserIcon, Store, CreditCard, Banknote } from "lucide-react";
import { getSaleItems } from "./actions";

export function TransactionsClient({ initialSales }: { initialSales: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSale, setSelectedSale] = useState<any | null>(null);
  const [receiptItems, setReceiptItems] = useState<any[]>([]);
  const [isLoadingReceipt, setIsLoadingReceipt] = useState(false);

  const filteredSales = useMemo(() => {
    return initialSales.filter(sale => 
      sale.invoice_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sale.customers?.name && sale.customers.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sale.user_profiles?.full_name && sale.user_profiles.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [initialSales, searchQuery]);

  const openReceipt = async (sale: any) => {
    setSelectedSale(sale);
    setIsLoadingReceipt(true);
    setReceiptItems([]);
    
    const result = await getSaleItems(sale.id);
    if (result.items) {
      setReceiptItems(result.items);
    }
    
    setIsLoadingReceipt(false);
  };

  const closeReceipt = () => {
    setSelectedSale(null);
    setReceiptItems([]);
  };

  return (
    <div className="w-full relative">
      
      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
          <input 
            type="text"
            placeholder="Search by Invoice, Customer, or Cashier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-[#252525] rounded-full pl-11 pr-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-[#D1E8D5] shadow-sm"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#1A1A1A] border border-[#252525] rounded-[24px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#252525] bg-[#111113]">
                <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Invoice</th>
                <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Date</th>
                <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Branch / Cashier</th>
                <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Customer</th>
                <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Payment</th>
                <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider text-right">Total</th>
                <th className="p-5 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252525]">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-[#252525]/30 transition-colors group">
                  <td className="p-5">
                    <span className="text-sm font-bold text-white bg-[#252525] px-3 py-1 rounded-full">{sale.invoice_number}</span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                      <Calendar className="h-4 w-4" />
                      {new Date(sale.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white flex items-center gap-1.5"><Store className="h-3 w-3 text-[#A1A1AA]"/> {sale.branches?.name || 'Main'}</span>
                      <span className="text-xs text-[#A1A1AA] mt-0.5">{sale.user_profiles?.full_name || 'System User'}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-[#252525] flex items-center justify-center text-[10px] font-bold text-[#A1A1AA]">
                        <UserIcon className="h-3 w-3" />
                      </div>
                      <span className="text-sm font-semibold text-white">{sale.customers?.name || 'Walk-in Customer'}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    {sale.payment_method === 'Cash' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#D1E8D5]/10 text-[#D1E8D5] border border-[#D1E8D5]/20">
                        <Banknote className="h-3 w-3" /> Cash
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#A5D8FF]/10 text-[#A5D8FF] border border-[#A5D8FF]/20">
                        <CreditCard className="h-3 w-3" /> Card
                      </span>
                    )}
                  </td>
                  <td className="p-5 text-right">
                    <span className="text-sm font-black text-white">Rs. {sale.total.toFixed(2)}</span>
                  </td>
                  <td className="p-5 text-center">
                    <button 
                      onClick={() => openReceipt(sale)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#A1A1AA] hover:text-white hover:bg-[#252525] transition-all border border-transparent hover:border-white/10"
                    >
                      <Receipt className="h-4 w-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#A1A1AA]">
                    <Receipt className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p className="font-semibold">No transactions found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedSale && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" 
            onClick={closeReceipt}
          ></div>
          
          {/* Slide-out Panel */}
          <div className="w-full max-w-md h-full bg-[#1A1A1A] border-l border-[#252525] shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="flex items-center justify-between p-6 border-b border-[#252525] bg-[#09090B]">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Receipt className="h-5 w-5 text-[#D1E8D5]"/> Receipt Details</h3>
                <p className="text-sm text-[#A1A1AA] mt-1">{selectedSale.invoice_number}</p>
              </div>
              <button onClick={closeReceipt} className="h-8 w-8 rounded-full bg-[#252525] flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#252525]/50 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">Date</p>
                  <p className="text-sm font-semibold text-white">{new Date(selectedSale.created_at).toLocaleString()}</p>
                </div>
                <div className="bg-[#252525]/50 rounded-xl p-4">
                  <p className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1">Customer</p>
                  <p className="text-sm font-semibold text-white">{selectedSale.customers?.name || 'Walk-in'}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Items Purchased</h4>
                {isLoadingReceipt ? (
                  <div className="h-32 flex items-center justify-center">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {receiptItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start pb-3 border-b border-[#252525] last:border-0">
                        <div>
                          <p className="text-sm font-semibold text-white">{item.products?.name || 'Unknown Product'}</p>
                          <p className="text-xs text-[#A1A1AA]">{item.quantity} x Rs. {item.unit_price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm font-bold text-white">Rs. {item.total_price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className="p-6 border-t border-[#252525] bg-[#09090B]">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-[#A1A1AA]">
                  <span>Subtotal</span>
                  <span>Rs. {selectedSale.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#A1A1AA]">
                  <span>Discount</span>
                  <span>Rs. {selectedSale.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-black text-white pt-2 border-t border-[#252525]">
                  <span>Total Paid</span>
                  <span className="text-[#D1E8D5]">Rs. {selectedSale.total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={() => window.print()}
                className="w-full py-3 bg-[#252525] hover:bg-white hover:text-[#1A1A1A] text-white rounded-xl font-bold transition-colors shadow-sm"
              >
                Print Receipt
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
