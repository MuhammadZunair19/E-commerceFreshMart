"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AlertTriangle, Boxes, CircleDollarSign, ClipboardList, PackagePlus, UsersRound } from "lucide-react";
import { dashboardSeries, products, recentOrders } from "@/lib/data";
import { formatPkr } from "@/lib/utils";

const categorySales = [
  { name: "Fruits", value: 31, color: "#52B788" },
  { name: "Dairy", value: 22, color: "#1B4332" },
  { name: "Bakery", value: 18, color: "#F4A261" },
  { name: "Snacks", value: 16, color: "#2D6A4F" },
  { name: "Other", value: 13, color: "#E63946" }
];

const stats = [
  { label: "Revenue today", value: formatPkr(154000), icon: CircleDollarSign, note: "+18% vs yesterday" },
  { label: "Orders today", value: "68", icon: ClipboardList, note: "12 pending" },
  { label: "Active users", value: "326", icon: UsersRound, note: "Realtime presence" },
  { label: "Low stock items", value: "2", icon: AlertTriangle, note: "Needs reorder" }
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f4fbf5]">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="hidden min-h-screen border-r border-forest/10 bg-forest p-5 text-white lg:block">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-xl font-black text-forest">F</span>
            <div>
              <p className="text-lg font-black">FreshMart</p>
              <p className="text-xs text-white/70">Admin Console</p>
            </div>
          </div>
          <nav className="mt-8 space-y-1">
            {["Dashboard", "Products", "Orders", "Customers", "Coupons", "Settings"].map((item, index) => (
              <button key={item} className={`flex h-11 w-full items-center rounded-lg px-3 text-sm font-bold ${index === 0 ? "bg-white text-forest" : "text-white/78 hover:bg-white/10"}`}>
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="p-4 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Live dashboard</p>
              <h1 className="mt-2 text-4xl font-black text-forest">Operations overview</h1>
            </div>
            <button className="inline-flex h-11 items-center gap-2 rounded-lg bg-forest px-4 font-black text-white">
              <PackagePlus className="h-5 w-5" />
              New product
            </button>
          </div>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-cream text-forest">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-fresh/20 px-3 py-1 text-xs font-black text-forest">Live</span>
                  </div>
                  <p className="mt-4 text-sm font-bold text-muted">{stat.label}</p>
                  <p className="mt-1 text-3xl font-black text-forest">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted">{stat.note}</p>
                </div>
              );
            })}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-forest">Revenue over time</h2>
                <div className="rounded-lg bg-cream p-1 text-sm font-bold">
                  <button className="rounded-md bg-white px-3 py-1 text-forest">Daily</button>
                  <button className="px-3 py-1 text-muted">Weekly</button>
                  <button className="px-3 py-1 text-muted">Monthly</button>
                </div>
              </div>
              <div className="mt-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardSeries}>
                    <defs>
                      <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#52B788" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#52B788" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d9eee0" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatPkr(Number(value))} />
                    <Area type="monotone" dataKey="revenue" stroke="#1B4332" fill="url(#revenue)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-forest">Sales by category</h2>
              <div className="mt-6 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categorySales} dataKey="value" nameKey="name" innerRadius={70} outerRadius={108} paddingAngle={3}>
                      {categorySales.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-2">
            <div className="rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-forest">Orders volume</h2>
              <div className="mt-6 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d9eee0" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#2D6A4F" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-forest">Live activity feed</h2>
              <div className="mt-5 space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-lg bg-cream p-4">
                    <div>
                      <p className="font-black text-forest">{order.id}</p>
                      <p className="text-sm text-muted">{order.customer} placed {formatPkr(order.total)} order</p>
                    </div>
                    <span className="text-xs font-bold text-muted">{order.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-forest" />
              <h2 className="text-xl font-black text-forest">Inventory heatmap</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {products.map((product) => {
                const state = product.stock === 0 ? "bg-danger text-white" : product.stock <= product.threshold ? "bg-warning text-ink" : "bg-fresh/25 text-forest";
                return (
                  <button key={product.id} className={`min-h-24 rounded-lg p-3 text-left ${state}`}>
                    <p className="font-black">{product.name}</p>
                    <p className="mt-2 text-sm font-bold">{product.stock} in stock</p>
                  </button>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
