import { Bell, Heart, MapPin, PackageCheck, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { recentOrders } from "@/lib/data";
import { formatPkr } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AccountPage() {
  return (
    <div className="container-x py-8 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="h-fit">
          <CardContent className="p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-forest text-white">
              <UserRound className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-xl font-black text-forest">Ayesha Khan</h1>
              <p className="text-sm text-muted">customer@example.com</p>
            </div>
          </div>
          <nav className="mt-6 space-y-1">
              {[
              { icon: PackageCheck, label: "Orders", href: "/orders" },
              { icon: MapPin, label: "Addresses", href: "/addresses" },
              { icon: Heart, label: "Wishlist", href: "/wishlist" },
              { icon: Bell, label: "Notifications", href: "/profile" },
              { icon: Settings, label: "Settings", href: "/profile" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Button key={item.label} asChild variant={index === 0 ? "secondary" : "ghost"} className="w-full justify-start">
                  <Link href={item.href}>
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
          </CardContent>
        </Card>

        <section className="space-y-6">
          <Card>
            <CardHeader>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Profile</p>
            <CardTitle className="text-3xl">Account overview</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Lifetime spend", formatPkr(42860)],
                ["Saved addresses", "3"],
                ["Wishlist items", "12"]
              ].map(([label, value]) => (
                <Card key={label} className="bg-cream p-5 shadow-none">
                  <p className="text-sm font-bold text-muted">{label}</p>
                  <p className="mt-1 text-2xl font-black text-forest">{value}</p>
                </Card>
              ))}
            </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <CardTitle className="text-2xl">Order history</CardTitle>
                <CardDescription className="mt-1">Filterable status timeline placeholder for Supabase orders.</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="h-11 w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </CardHeader>
            <CardContent>
            <div className="mt-5 overflow-hidden rounded-lg border border-forest/10">
              {recentOrders.map((order) => (
                <div key={order.id} className="grid gap-3 border-b border-forest/10 p-4 last:border-b-0 md:grid-cols-[1fr_160px_120px] md:items-center">
                  <div>
                    <p className="font-black text-forest">{order.id}</p>
                    <p className="text-sm text-muted">Placed {order.time}</p>
                  </div>
                  <p className="font-black">{formatPkr(order.total)}</p>
                  <Badge variant="secondary" className="justify-center">{order.status}</Badge>
                </div>
              ))}
            </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
            <CardTitle className="text-2xl">Delivery addresses</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {["Home - Gulberg III, Lahore", "Work - Blue Area, Islamabad"].map((address) => (
                <Card key={address} className="p-4 shadow-none">
                  <p className="font-black">{address}</p>
                  <p className="mt-2 text-sm text-muted">Ayesha Khan · +92 300 0000000</p>
                </Card>
              ))}
            </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
