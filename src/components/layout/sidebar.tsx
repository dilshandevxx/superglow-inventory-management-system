import Link from 'next/link';
import { Home, Package, ShoppingCart, Users, Truck, DollarSign, Settings, BarChart } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['super_admin', 'branch_manager', 'cashier', 'inventory_officer', 'accountant', 'hr_officer'] },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package, roles: ['super_admin', 'branch_manager', 'inventory_officer'] },
  { name: 'POS / Billing', href: '/dashboard/pos', icon: ShoppingCart, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Customers', href: '/dashboard/customers', icon: Users, roles: ['super_admin', 'branch_manager', 'cashier'] },
  { name: 'Suppliers', href: '/dashboard/suppliers', icon: Truck, roles: ['super_admin', 'branch_manager', 'inventory_officer'] },
  { name: 'Finance', href: '/dashboard/finance', icon: DollarSign, roles: ['super_admin', 'accountant'] },
  { name: 'Reports', href: '/dashboard/reports', icon: BarChart, roles: ['super_admin', 'branch_manager', 'accountant'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['super_admin', 'branch_manager'] },
];

export function Sidebar({ role }: { role: string }) {
  const allowedNav = navigation.filter(item => item.roles.includes(role));

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-16 items-center px-6 text-xl font-bold tracking-wider">
        SUPERGLOW
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {allowedNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
