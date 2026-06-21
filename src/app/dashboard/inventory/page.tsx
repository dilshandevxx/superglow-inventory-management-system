import Link from "next/link";
import { PackageSearch, Bookmark, Tags, Boxes, ArrowRightLeft } from "lucide-react";

const inventoryModules = [
  { 
    name: "Products", 
    description: "Manage product catalog, SKUs, barcodes, and pricing.", 
    icon: PackageSearch, 
    href: "/dashboard/inventory/products", 
    bg: "bg-[#1A1A1A]",
    iconBg: "bg-[#D1E8D5]",
    iconColor: "text-[#1A1A1A]"
  },
  { 
    name: "Categories", 
    description: "Organize products into manageable hierarchy.", 
    icon: Bookmark, 
    href: "/dashboard/inventory/categories", 
    bg: "bg-[#1A1A1A]",
    iconBg: "bg-[#FFF8D6]",
    iconColor: "text-[#1A1A1A]"
  },
  { 
    name: "Brands", 
    description: "Manage product manufacturers and partners.", 
    icon: Tags, 
    href: "/dashboard/inventory/brands", 
    bg: "bg-[#1A1A1A]",
    iconBg: "bg-[#A5D8FF]",
    iconColor: "text-[#1A1A1A]"
  },
  { 
    name: "Branch Stock", 
    description: "Track real-time stock levels across all branches.", 
    icon: Boxes, 
    href: "/dashboard/inventory/stock", 
    bg: "bg-[#252525]", // slightly different to mix the grid up
    iconBg: "bg-[#1A1A1A]",
    iconColor: "text-[#D1E8D5]"
  },
  { 
    name: "Transfers", 
    description: "Manage inter-branch stock transfers and approvals.", 
    icon: ArrowRightLeft, 
    href: "/dashboard/inventory/transfers", 
    bg: "bg-[#252525]",
    iconBg: "bg-[#1A1A1A]",
    iconColor: "text-[#FFF8D6]"
  },
];

export default function InventoryDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] w-full mx-auto font-sans mt-4">
      <p className="text-[#A1A1AA] text-sm font-medium mb-1">Module Overview</p>
      <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">Inventory Management</h1>
      <p className="mt-2 text-[#A1A1AA] max-w-2xl">Centralized control for products, stock, multi-branch transfers, and product organization.</p>
      
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {inventoryModules.map((module) => (
          <Link key={module.name} href={module.href} className={`group ${module.bg} rounded-[32px] p-8 border border-[#252525] hover:border-white/[0.1] hover:bg-[#2A2A32] transition-all cursor-pointer shadow-sm relative overflow-hidden`}>
            
            {/* Minimalist dot pattern background element */}
            <div className="absolute right-0 top-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FFF 2px, transparent 2px)', backgroundSize: '16px 16px', width: '100px', height: '100px', borderBottomLeftRadius: '100%' }}></div>

            <div className={`inline-flex rounded-2xl p-4 mb-6 shadow-inner ${module.iconBg}`}>
              <module.icon className={`h-6 w-6 ${module.iconColor}`} strokeWidth={2} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{module.name}</h3>
            <p className="text-sm text-[#A1A1AA] font-medium leading-relaxed">{module.description}</p>
            
            <div className="mt-8 flex items-center text-xs font-bold text-white">
              Open Module <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
