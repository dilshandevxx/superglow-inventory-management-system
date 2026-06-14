import { ArrowRightLeft, Search, Plus } from "lucide-react";

const mockTransfers = [
  { id: 'TR-1001', date: '2026-06-14', product: 'Sony Bravia 55" TV', from: 'Main Warehouse', to: 'Kiriella Branch', quantity: 5, status: 'Pending Approval' },
  { id: 'TR-1000', date: '2026-06-13', product: 'Samsung Galaxy S23', from: 'Kiriella Branch', to: 'Hindurangala Branch', quantity: 10, status: 'Completed' },
];

export default function TransfersPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Stock Transfers</h1>
          <p className="mt-1 text-sm text-slate-500">Manage stock movement between branches and warehouses.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition-colors shadow-sm">
          <ArrowRightLeft className="h-4 w-4" /> New Transfer
        </button>
      </div>

      <div className="mt-8 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search transfers..." 
              className="w-full rounded-lg border border-slate-200 pl-10 pr-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Transfer ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">From</th>
                <th className="px-6 py-4 font-medium">To</th>
                <th className="px-6 py-4 font-medium">Qty</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockTransfers.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{transfer.id}</td>
                  <td className="px-6 py-4 text-slate-500">{transfer.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{transfer.product}</td>
                  <td className="px-6 py-4 text-slate-500">{transfer.from}</td>
                  <td className="px-6 py-4 text-slate-500">{transfer.to}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{transfer.quantity}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      transfer.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
                        : 'bg-orange-50 text-orange-700 ring-orange-600/20'
                    }`}>
                      {transfer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
