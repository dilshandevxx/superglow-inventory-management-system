"use client";

import { useState } from "react";
import { Plus, X, User, Phone, Mail } from "lucide-react";
import { addCustomer } from "./actions";

export function AddCustomerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsProcessing(true);
    const result = await addCustomer({ name, phone, email });
    
    if (result.error) {
      alert(result.error);
    } else {
      setIsOpen(false);
      setName("");
      setPhone("");
      setEmail("");
    }
    setIsProcessing(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[#D1E8D5] text-[#1A1A1A] hover:bg-white transition-colors px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-sm shrink-0"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} /> Add Customer
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsOpen(false)}></div>
          
          <div className="bg-[#1A1A1A] border border-[#252525] rounded-[32px] w-full max-w-md relative z-10 animate-in zoom-in-95 duration-200 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#252525] bg-[#09090B]">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-[#D1E8D5]" /> New Customer
              </h3>
              <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full bg-[#252525] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:bg-[#333] transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#A1A1AA]">Full Name <span className="text-[#EF4444]">*</span></label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" />
                  <input 
                    type="text" required
                    value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full bg-[#09090B] border border-[#252525] rounded-2xl pl-12 pr-4 py-3 text-white font-semibold focus:outline-none focus:border-[#D1E8D5]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#A1A1AA]">Phone Number <span className="text-[#EF4444]">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" />
                  <input 
                    type="tel" required
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 234 567 8900"
                    className="w-full bg-[#09090B] border border-[#252525] rounded-2xl pl-12 pr-4 py-3 text-white font-semibold focus:outline-none focus:border-[#D1E8D5]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#A1A1AA]">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A1A1AA]" />
                  <input 
                    type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@example.com"
                    className="w-full bg-[#09090B] border border-[#252525] rounded-2xl pl-12 pr-4 py-3 text-white font-semibold focus:outline-none focus:border-[#D1E8D5]"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4 bg-[#252525] hover:bg-[#333] text-white rounded-full font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={isProcessing}
                  className="flex-1 py-4 bg-[#D1E8D5] hover:bg-white text-[#1A1A1A] rounded-full font-bold transition-colors disabled:opacity-50"
                >
                  {isProcessing ? "Saving..." : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
