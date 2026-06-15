import Link from "next/link";
import { PackageSearch, Tags, Bookmark, ArrowRightLeft, Boxes } from "lucide-react";

const inventoryModules = [
  { name: "Products", description: "Manage product catalog, SKUs, and barcodes.", icon: PackageSearch, href: "/dashboard/inventory/products", color: "text-[#99E2C6]", bg: "bg-[#99E2C6]/10" },
  { name: "Categories", description: "Organize products into manageable categories.", icon: Bookmark, href: "/dashboard/inventory/categories", color: "text-[#FBE7A1]", bg: "bg-[#FBE7A1]/10" },
  { name: "Brands", description: "Manage product brands and manufacturers.", icon: Tags, href: "/dashboard/inventory/brands", color: "text-[#FFA6A6]", bg: "bg-[#FFA6A6]/10" },
  { name: "Branch Stock", description: "Track real-time stock levels across branches.", icon: Boxes, href: "/dashboard/inventory/stock", color: "text-[#C4B5FD]", bg: "bg-[#C4B5FD]/10" },
  { name: "Transfers", description: "Manage inter-branch stock transfers and approvals.", icon: ArrowRightLeft, href: "/dashboard/inventory/transfers", color: "text-[#93C5FD]", bg: "bg-[#93C5FD]/10" },
];

export default function InventoryDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] w-full mx-auto">
      <h1 className="text-3xl font-black text-white tracking-tight">Inventory Management</h1>
      <p className="mt-2 text-[#94A3B8]">Centralized control for products, stock, and multi-branch transfers.</p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {inventoryModules.map((module) => (
          <Link key={module.name} href={module.href} className="group panel p-6 hover:bg-[#2A2A32] transition-all cursor-pointer">
            <div className={`inline-flex rounded-xl p-3 ${module.bg}`}>
              <module.icon className={`h-6 w-6 ${module.color}`} />
            </div>
            <h3 className="mt-4 text-xl font-bold text-white group-hover:text-[#99E2C6] transition-colors">{module.name}</h3>
            <p className="mt-2 text-sm text-[#94A3B8]">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
