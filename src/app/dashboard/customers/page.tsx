import { createClient } from "@/lib/supabase-server";
import { Plus, Star, Edit, Trash2, List, LayoutGrid, MoreHorizontal, RotateCcw, ChevronDown, User, Phone, Wallet } from "lucide-react";
import SearchInput from "@/components/ui/search-input";
import Pagination from "@/components/ui/pagination";

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
    .select('*', { count: 'exact' });

  if (query) {
    supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,phone.ilike.%${query}%`);
  }

  const { data: customers, count } = await supabaseQuery
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  const totalCustomers = count || 0;
  const totalPages = Math.ceil(totalCustomers / limit);

  return (
    <div className="animate-in fade-in duration-500 max-w-[1600px] w-full mx-auto">
      
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-white tracking-tight">Customers</h1>
          <span className="bg-[#25252B] text-[#94A3B8] text-xs font-semibold px-4 py-1.5 rounded-full border border-white/[0.02]">
            <span className="text-white mr-1">{totalCustomers}</span> total customers
          </span>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <SearchInput placeholder="Search by name or phone..." />

          <div className="flex bg-[#1A1A1F] border border-white/[0.05] rounded-full p-1">
            <button className="p-2 bg-[#2A2A32] text-white rounded-full"><List className="h-4 w-4" /></button>
            <button className="p-2 text-[#94A3B8] hover:text-white rounded-full transition-colors"><LayoutGrid className="h-4 w-4" /></button>
          </div>

          <button className="h-12 w-12 rounded-full bg-[#25252B] border border-white/[0.05] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors shrink-0">
            <MoreHorizontal className="h-5 w-5" />
          </button>

          <button className="btn-primary flex items-center gap-2 shrink-0">
            <Plus className="h-4 w-4" /> Add Customer
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Filter Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          
          <div>
            <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Customer Tier</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center bg-[#FBE7A1] rounded-full px-3 py-2 transition-all">
                <span className="text-sm font-bold text-[#1A1A1F]">All</span>
              </button>
              <button className="flex items-center justify-center bg-[#1A1A1F] border border-white/[0.05] rounded-full px-3 py-2 hover:bg-[#25252B] transition-all">
                <span className="text-sm font-medium text-amber-400">Gold</span>
              </button>
              <button className="flex items-center justify-center bg-[#1A1A1F] border border-white/[0.05] rounded-full px-3 py-2 hover:bg-[#25252B] transition-all">
                <span className="text-sm font-medium text-[#94A3B8]">Silver</span>
              </button>
              <button className="flex items-center justify-center bg-[#1A1A1F] border border-white/[0.05] rounded-full px-3 py-2 hover:bg-[#25252B] transition-all">
                <span className="text-sm font-medium text-amber-600">Bronze</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Sort By</h3>
            <button className="w-full flex items-center justify-between bg-[#1A1A1F] border border-white/[0.05] rounded-xl px-5 py-3 hover:bg-[#25252B] transition-all">
              <span className="text-sm font-medium text-[#94A3B8] flex items-center gap-2">
                <span className="text-[#94A3B8]/60 text-[10px]">RECENT:</span> Newest First
              </span>
              <ChevronDown className="h-4 w-4 text-[#94A3B8]" />
            </button>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Loyalty Points</h3>
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94A3B8]"><Star className="h-4 w-4" /></span>
                <input type="text" placeholder="Minimum points" className="w-full bg-[#1A1A1F] border border-white/[0.05] rounded-xl pl-12 pr-5 py-3 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#99E2C6] transition-all" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-3">Credit Balance</h3>
            <button className="w-full flex items-center justify-between bg-[#1A1A1F] border border-white/[0.05] rounded-xl px-5 py-3 hover:bg-[#25252B] transition-all">
              <span className="text-sm font-medium text-[#94A3B8] flex items-center gap-2">
                <Wallet className="h-4 w-4 text-[#94A3B8]" /> Has Debt
              </span>
              <ChevronDown className="h-4 w-4 text-[#94A3B8]" />
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white hover:text-[#99E2C6] transition-colors">
            <RotateCcw className="h-4 w-4" /> Reset Filters
          </button>

        </div>

        {/* Right Customer List */}
        <div className="flex-1 space-y-3 flex flex-col">
          {customers && customers.length > 0 ? (
            <>
              {customers.map((customer) => {
                const colors = ['bg-[#99E2C6]/20 text-[#99E2C6]', 'bg-[#FBE7A1]/20 text-[#FBE7A1]', 'bg-[#FFA6A6]/20 text-[#FFA6A6]'];
                const colorClass = colors[customer.name.length % 3];
                
                return (
                  <div key={customer.id} className="panel p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#2A2A32] transition-all group cursor-pointer relative overflow-hidden">
                    <div className="flex items-center gap-4 flex-1 relative z-10">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 transition-all font-black text-xl shadow-sm ${colorClass}`}>
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex flex-col">
                        <h3 className="text-base font-bold text-white transition-colors">{customer.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                            <Phone className="h-3 w-3" /> {customer.phone || 'No phone'}
                          </span>
                          <span className="text-xs text-[#94A3B8]">•</span>
                          <span className="bg-[#FBE7A1]/10 text-[#FBE7A1] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current" /> {customer.loyalty_points} pts
                          </span>
                        </div>
                      </div>
                    </div>

                  <div className="flex items-center gap-8 w-full sm:w-auto relative z-10">
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-bold text-[#94A3B8] uppercase">Credit Balance</span>
                      <span className={`text-sm font-bold ${customer.credit_balance > 0 ? 'text-[#FFA6A6]' : 'text-white'}`}>
                        Rs. {customer.credit_balance.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="h-10 w-10 rounded-full bg-[#1A1A1F] border border-white/[0.05] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#32323A] transition-all shrink-0">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="h-10 w-10 rounded-full bg-[#1A1A1F] border border-white/[0.05] flex items-center justify-center text-[#94A3B8] hover:text-[#FFA6A6] hover:bg-[#32323A] transition-all shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  </div>
                );
              })}
              
              <Pagination totalPages={totalPages} currentPage={page} />
            </>
          ) : (
            <div className="panel p-12 flex flex-col items-center justify-center text-center">
              <User className="h-12 w-12 text-[#32323A] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No customers found</h3>
              <p className="text-sm text-[#94A3B8] max-w-md">
                {query ? `No results match "${query}"` : "Try adjusting your filters or click 'Add Customer' to add a new client to the database."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
