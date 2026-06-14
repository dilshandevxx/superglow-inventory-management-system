export default function DashboardPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
      <p className="mt-2 text-slate-500">Welcome to SuperGlow Trade Center cloud ERP.</p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500">Total Sales Today</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">Rs. 0.00</p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500">Low Stock Items</p>
          <p className="mt-2 text-4xl font-bold text-red-600">0</p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500">Pending Transfers</p>
          <p className="mt-2 text-4xl font-bold text-orange-500">0</p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm font-medium text-slate-500">Total Customers</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">0</p>
        </div>
      </div>
    </div>
  );
}
