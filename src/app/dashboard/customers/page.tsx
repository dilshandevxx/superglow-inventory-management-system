import { createClient } from "@/lib/supabase-server";
import { Star, Edit, Trash2, List, LayoutGrid, MoreHorizontal, RotateCcw, ChevronDown, User, Phone, Wallet } from "lucide-react";
import SearchInput from "@/components/ui/search-input";
import Pagination from "@/components/ui/pagination";
import { AddCustomerModal } from "./add-customer-modal";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const supabase = createClient();
  let supabaseQuery = supabase
    .from('customers')
    .select('*, sales(total)', { count: 'exact' });

  if (query) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,phone.ilike.%${query}%`);
  }

  const { data: customersRaw, count } = await supabaseQuery
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  // Compute Total Spent per customer
  const customers = customersRaw?.map(c => {
    const totalSpent = c.sales ? c.sales.reduce((sum: number, sale: any) => sum + sale.total, 0) : 0;
    return { ...c, totalSpent };
  });

  const totalCustomers = count || 0;
  const totalPages = Math.ceil(totalCustomers / limit);

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto font-sans">
      
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 relative z-10 mt-4">
        <div>
          <p className="text-[#A1A1AA] text-sm font-medium mb-1">CRM Dashboard</p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">Customers</h1>
            <span className="bg-white text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {totalCustomers} Total
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <SearchInput placeholder="Search name or phone..." />
          </div>

          <div className="flex bg-[#1A1A1A] border border-[#252525] rounded-full p-1 shadow-sm">
            <button className="p-2.5 bg-[#252525] text-white rounded-full"><List className="h-4 w-4" /></button>
            <button className="p-2.5 text-[#A1A1AA] hover:text-white rounded-full transition-colors"><LayoutGrid className="h-4 w-4" /></button>
          </div>

          <AddCustomerModal />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Filter Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          
          <div>
            <h3 className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Customer Tier</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center bg-[#D1E8D5] rounded-full px-3 py-2 transition-all shadow-sm">
                <span className="text-sm font-bold text-[#1A1A1A]">All</span>
              </button>
              <button className="flex items-center justify-center bg-[#1A1A1A] border border-[#252525] rounded-full px-3 py-2 hover:bg-[#252525] transition-all text-[#A1A1AA]">
                <span className="text-sm font-medium hover:text-[#FBE7A1]">Gold</span>
              </button>
              <button className="flex items-center justify-center bg-[#1A1A1A] border border-[#252525] rounded-full px-3 py-2 hover:bg-[#252525] transition-all text-[#A1A1AA]">
                <span className="text-sm font-medium hover:text-white">Silver</span>
              </button>
              <button className="flex items-center justify-center bg-[#1A1A1A] border border-[#252525] rounded-full px-3 py-2 hover:bg-[#252525] transition-all text-[#A1A1AA]">
                <span className="text-sm font-medium hover:text-[#FFA6A6]">Bronze</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Sort By</h3>
            <button className="w-full flex items-center justify-between bg-[#1A1A1A] border border-[#252525] rounded-xl px-5 py-3 hover:bg-[#252525] transition-all">
              <span className="text-sm font-medium text-[#A1A1AA] flex items-center gap-2">
                <span className="text-[#A1A1AA]/60 text-[10px]">RECENT:</span> Newest First
              </span>
              <ChevronDown className="h-4 w-4 text-[#A1A1AA]" />
            </button>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Credit Balance</h3>
            <button className="w-full flex items-center justify-between bg-[#1A1A1A] border border-[#252525] rounded-xl px-5 py-3 hover:bg-[#252525] transition-all">
              <span className="text-sm font-medium text-[#A1A1AA] flex items-center gap-2">
                <Wallet className="h-4 w-4 text-[#A1A1AA]" /> Has Debt
              </span>
              <ChevronDown className="h-4 w-4 text-[#A1A1AA]" />
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white hover:text-[#D1E8D5] transition-colors">
            <RotateCcw className="h-4 w-4" /> Reset Filters
          </button>

        </div>

        {/* Right Customer List */}
        <div className="flex-1 space-y-3 flex flex-col">
          {customers && customers.length > 0 ? (
            <>
              {customers.map((customer) => {
                const colors = ['bg-[#D1E8D5]/20 text-[#D1E8D5]', 'bg-[#A5D8FF]/20 text-[#A5D8FF]', 'bg-[#FFA6A6]/20 text-[#FFA6A6]'];
                const colorClass = colors[customer.name.length % 3];
                
                return (
                  <div key={customer.id} className="bg-[#1A1A1A] border border-[#252525] rounded-[24px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#252525] transition-all group cursor-pointer relative overflow-hidden shadow-sm">
                    <div className="flex items-center gap-5 flex-1 relative z-10">
                      
                      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-all font-black text-xl shadow-sm ${colorClass} border border-white/[0.02]`}>
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex flex-col">
                        <h3 className="text-[15px] font-bold text-white transition-colors mb-1">{customer.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          <span className="text-[11px] font-bold text-[#A1A1AA] flex items-center gap-1 bg-[#252525] px-2 py-0.5 rounded-full">
                            <Phone className="h-3 w-3" /> {customer.phone || 'No phone'}
                          </span>
                          <span className="text-[11px] font-bold text-[#1A1A1A] bg-[#FFF8D6] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" /> {customer.loyalty_points} pts
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 w-full sm:w-auto relative z-10 pl-[76px] sm:pl-0 mt-2 sm:mt-0 border-t border-white/[0.05] sm:border-none pt-3 sm:pt-0">
                      <div className="flex gap-6 sm:gap-8">
                         <div className="flex flex-col text-left sm:text-right">
                          <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-0.5">Total Spent</span>
                          <span className="text-sm font-black text-[#D1E8D5]">Rs. {customer.totalSpent.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col text-left sm:text-right">
                          <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-0.5">Credit Balance</span>
                          <span className={`text-sm font-bold ${customer.credit_balance > 0 ? 'text-[#FFA6A6]' : 'text-white'}`}>
                            Rs. {customer.credit_balance.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="h-10 w-10 rounded-full bg-[#252525] flex items-center justify-center text-[#A1A1AA] hover:text-[#1A1A1A] hover:bg-[#A5D8FF] transition-all shrink-0">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="h-10 w-10 rounded-full bg-[#252525] flex items-center justify-center text-[#A1A1AA] hover:text-[#1A1A1A] hover:bg-[#FFA6A6] transition-all shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-4">
                <Pagination totalPages={totalPages} currentPage={page} />
              </div>
            </>
          ) : (
            <div className="bg-[#1A1A1A] border border-[#252525] rounded-[32px] p-16 flex flex-col items-center justify-center text-center shadow-inner">
              <div className="h-20 w-20 bg-[#252525] rounded-full flex items-center justify-center mb-6 text-[#A1A1AA]">
                <User className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No customers found</h3>
              <p className="text-sm text-[#A1A1AA] max-w-sm mb-8">
                {query ? `No results match "${query}"` : "Try adjusting your filters or click 'Add Customer' to add a new client to the CRM."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
