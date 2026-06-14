import Link from "next/link";
import { PackageSearch, Tags, Bookmark, ArrowRightLeft, Boxes } from "lucide-react";

const inventoryModules = [
  { name: "Products", description: "Manage product catalog, SKUs, and barcodes.", icon: PackageSearch, href: "/dashboard/inventory/products", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Categories", description: "Organize products into manageable categories.", icon: Bookmark, href: "/dashboard/inventory/categories", color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "Brands", description: "Manage product brands and manufacturers.", icon: Tags, href: "/dashboard/inventory/brands", color: "text-pink-500", bg: "bg-pink-500/10" },
  { name: "Branch Stock", description: "Track real-time stock levels across branches.", icon: Boxes, href: "/dashboard/inventory/stock", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Transfers", description: "Manage inter-branch stock transfers and approvals.", icon: ArrowRightLeft, href: "/dashboard/inventory/transfers", color: "text-orange-500", bg: "bg-orange-500/10" },
];

export default function InventoryDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Inventory Management</h1>
      <p className="mt-2 text-slate-500">Centralized control for products, stock, and multi-branch transfers.</p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {inventoryModules.map((module) => (
          <Link key={module.name} href={module.href} className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all">
            <div className={`inline-flex rounded-xl p-3 ${module.bg}`}>
              <module.icon className={`h-6 w-6 ${module.color}`} />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{module.name}</h3>
            <p className="mt-2 text-sm text-slate-500">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
