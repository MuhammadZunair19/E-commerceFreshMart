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
import Link from "next/link";
import { dashboardSeries, products, recentOrders } from "@/lib/data";
import { formatPkr } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            {[
              ["Dashboard", "/admin"],
              ["Products", "/admin/products"],
              ["Orders", "/admin/orders"],
              ["Customers", "/admin/users"],
              ["Coupons", "/admin/coupons"],
              ["Settings", "/admin/settings"]
            ].map(([item, href], index) => (
              <Button key={item} asChild variant={index === 0 ? "secondary" : "ghost"} className={`w-full justify-start ${index === 0 ? "bg-white text-forest hover:bg-white" : "text-white/78 hover:bg-white/10 hover:text-white"}`}>
                <Link href={href}>{item}</Link>
              </Button>
            ))}
          </nav>
        </aside>

        <main className="p-4 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Live dashboard</p>
              <h1 className="mt-2 text-4xl font-black text-forest">Operations overview</h1>
            </div>
            <Button>
              <PackagePlus className="h-5 w-5" />
              New product
            </Button>
          </div>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-cream text-forest">
                      <Icon className="h-5 w-5" />
                    </span>
                    <Badge variant="fresh">Live</Badge>
                  </div>
                  <p className="mt-4 text-sm font-bold text-muted">{stat.label}</p>
                  <p className="mt-1 text-3xl font-black text-forest">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted">{stat.note}</p>
                  </CardContent>
                </Card>
              );
            })}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <Card>
              <CardHeader className="flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Revenue over time</CardTitle>
                  <CardDescription>Daily, weekly, and monthly ranges</CardDescription>
                </div>
                <Tabs defaultValue="daily">
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by category</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Orders volume</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live activity feed</CardTitle>
              </CardHeader>
              <CardContent>
              <div className="mt-5 space-y-3">
                {recentOrders.map((order) => (
                  <Card key={order.id} className="flex items-center justify-between bg-cream p-4 shadow-none">
                    <div>
                      <p className="font-black text-forest">{order.id}</p>
                      <p className="text-sm text-muted">{order.customer} placed {formatPkr(order.total)} order</p>
                    </div>
                    <span className="text-xs font-bold text-muted">{order.time}</span>
                  </Card>
                ))}
              </div>
              </CardContent>
            </Card>
          </section>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Boxes className="h-5 w-5 text-forest" />
                Inventory heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {products.map((product) => {
                const state = product.stock === 0 ? "bg-danger text-white" : product.stock <= product.threshold ? "bg-warning text-ink" : "bg-fresh/25 text-forest";
                return (
                  <Button key={product.id} variant="ghost" className={`h-auto min-h-24 justify-start rounded-lg p-3 text-left hover:opacity-90 ${state}`}>
                    <span>
                    <p className="font-black">{product.name}</p>
                    <p className="mt-2 text-sm font-bold">{product.stock} in stock</p>
                    </span>
                  </Button>
                );
              })}
            </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
