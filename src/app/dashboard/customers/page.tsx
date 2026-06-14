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
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black text-white tracking-tight">Customers</h1>
          <span className="bg-[#20232b] text-slate-400 text-xs font-semibold px-3 py-1 rounded-full border border-[#2c303a]">
            <span className="text-white mr-1">{totalCustomers}</span> total customers
          </span>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <SearchInput placeholder="Search by name or phone..." />

          <div className="flex bg-[#20232b] rounded-full border border-[#2c303a] p-1">
            <button className="p-1.5 bg-[#4ade80]/20 text-[#4ade80] rounded-full"><List className="h-4 w-4" /></button>
            <button className="p-1.5 text-slate-500 hover:text-white rounded-full transition-colors"><LayoutGrid className="h-4 w-4" /></button>
          </div>

          <button className="h-10 w-10 rounded-full bg-[#20232b] border border-[#2c303a] flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0">
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
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Customer Tier</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-between panel px-3 py-2 border-[#4ade80]/30 hover:border-[#4ade80] transition-colors">
                <span className="text-sm font-medium text-white">All</span>
              </button>
              <button className="flex items-center justify-between panel px-3 py-2 hover:border-[#4ade80] transition-colors">
                <span className="text-sm font-medium text-amber-400">Gold</span>
              </button>
              <button className="flex items-center justify-between panel px-3 py-2 hover:border-[#4ade80] transition-colors">
                <span className="text-sm font-medium text-slate-300">Silver</span>
              </button>
              <button className="flex items-center justify-between panel px-3 py-2 hover:border-[#4ade80] transition-colors">
                <span className="text-sm font-medium text-amber-700">Bronze</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Sort By</h3>
            <button className="w-full flex items-center justify-between panel px-4 py-2.5 hover:border-[#4ade80] transition-colors">
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <span className="text-slate-500 text-[10px]">RECENT:</span> Newest First
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Loyalty Points</h3>
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"><Star className="h-4 w-4" /></span>
                <input type="text" placeholder="Minimum points" className="w-full bg-[#20232b] border border-[#2c303a] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#4ade80] transition-colors" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Credit Balance</h3>
            <button className="w-full flex items-center justify-between panel px-4 py-2.5 hover:border-[#4ade80] transition-colors">
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Wallet className="h-4 w-4 text-slate-500" /> Has Debt
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white hover:text-[#4ade80] transition-colors">
            <RotateCcw className="h-4 w-4" /> Reset Filters
          </button>

        </div>

        {/* Right Customer List */}
        <div className="flex-1 space-y-3 flex flex-col">
          {customers && customers.length > 0 ? (
            <>
              {customers.map((customer) => (
                <div key={customer.id} className="panel p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-600 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 bg-[#2c303a] rounded-full flex items-center justify-center shrink-0 border border-slate-700">
                      <User className="h-6 w-6 text-slate-400" />
                    </div>
                    
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-white group-hover:text-[#4ade80] transition-colors">{customer.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {customer.phone || 'No phone'}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="bg-amber-500/10 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" /> {customer.loyalty_points} pts
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 w-full sm:w-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Credit Balance</span>
                      <span className={`text-sm font-bold ${customer.credit_balance > 0 ? 'text-red-400' : 'text-white'}`}>
                        Rs. {customer.credit_balance.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="h-8 w-8 rounded-full border border-[#2c303a] flex items-center justify-center text-slate-500 hover:text-[#4ade80] hover:bg-[#2c303a] transition-colors shrink-0">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 rounded-full border border-[#2c303a] flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-[#2c303a] transition-colors shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Pagination totalPages={totalPages} currentPage={page} />
            </>
          ) : (
            <div className="panel p-12 flex flex-col items-center justify-center text-center">
              <User className="h-12 w-12 text-slate-600 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No customers found</h3>
              <p className="text-sm text-slate-400 max-w-md">
                {query ? `No results match "${query}"` : "Try adjusting your filters or click 'Add Customer' to add a new client to the database."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
