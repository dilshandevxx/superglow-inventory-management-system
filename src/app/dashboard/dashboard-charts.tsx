"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000, profit: 2400 },
  { name: 'Feb', sales: 3000, profit: 1398 },
  { name: 'Mar', sales: 2000, profit: 9800 },
  { name: 'Apr', sales: 2780, profit: 3908 },
  { name: 'May', sales: 1890, profit: 4800 },
  { name: 'Jun', sales: 2390, profit: 3800 },
  { name: 'Jul', sales: 3490, profit: 4300 },
];

const categoryData = [
  { name: 'Groceries', value: 400 },
  { name: 'Electronics', value: 300 },
  { name: 'Cosmetics', value: 300 },
  { name: 'Stationery', value: 200 },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Forecast Area Chart */}
      <div className="bg-[#181a1f] p-6 rounded-xl border border-[#2c303a] flex flex-col">
        <div className="mb-6">
          <h3 className="font-bold text-white text-lg">Revenue vs Profit (6 Months)</h3>
          <p className="text-sm text-slate-500">AI forecasted trend based on recent POS data.</p>
        </div>
        <div className="h-[250px] w-full mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#20232b', borderRadius: '8px', border: '1px solid #2c303a', color: '#e2e8f0' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#4ade80" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              <Area type="monotone" dataKey="profit" stroke="#60a5fa" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Performance Bar Chart */}
      <div className="bg-[#181a1f] p-6 rounded-xl border border-[#2c303a] flex flex-col">
        <div className="mb-6">
          <h3 className="font-bold text-white text-lg">Top Performing Categories</h3>
          <p className="text-sm text-slate-500">Sales volume by product category.</p>
        </div>
        <div className="h-[250px] w-full mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#2c303a'}}
                contentStyle={{ backgroundColor: '#20232b', borderRadius: '8px', border: '1px solid #2c303a', color: '#e2e8f0' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="value" fill="#4ade80" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
