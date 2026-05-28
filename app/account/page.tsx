import { Bell, Heart, MapPin, PackageCheck, Settings, UserRound } from "lucide-react";
import { recentOrders } from "@/lib/data";
import { formatPkr } from "@/lib/utils";

export default function AccountPage() {
  return (
    <div className="container-x py-8 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="h-fit rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
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
              { icon: PackageCheck, label: "Orders" },
              { icon: MapPin, label: "Addresses" },
              { icon: Heart, label: "Wishlist" },
              { icon: Bell, label: "Notifications" },
              { icon: Settings, label: "Settings" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <button key={item.label} className={`flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-bold ${index === 0 ? "bg-cream text-forest" : "text-muted hover:bg-cream"}`}>
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="space-y-6">
          <div className="rounded-lg border border-forest/10 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Profile</p>
            <h2 className="mt-2 text-3xl font-black text-forest">Account overview</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Lifetime spend", formatPkr(42860)],
                ["Saved addresses", "3"],
                ["Wishlist items", "12"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-cream p-5">
                  <p className="text-sm font-bold text-muted">{label}</p>
                  <p className="mt-1 text-2xl font-black text-forest">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-forest/10 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-black text-forest">Order history</h2>
                <p className="mt-1 text-muted">Filterable status timeline placeholder for Supabase orders.</p>
              </div>
              <select className="h-11 rounded-lg border border-forest/10 px-3 text-sm font-bold">
                <option>All statuses</option>
                <option>Pending</option>
                <option>Delivered</option>
              </select>
            </div>
            <div className="mt-5 overflow-hidden rounded-lg border border-forest/10">
              {recentOrders.map((order) => (
                <div key={order.id} className="grid gap-3 border-b border-forest/10 p-4 last:border-b-0 md:grid-cols-[1fr_160px_120px] md:items-center">
                  <div>
                    <p className="font-black text-forest">{order.id}</p>
                    <p className="text-sm text-muted">Placed {order.time}</p>
                  </div>
                  <p className="font-black">{formatPkr(order.total)}</p>
                  <span className="rounded-full bg-cream px-3 py-1 text-center text-xs font-black text-forest">{order.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-forest/10 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-forest">Delivery addresses</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {["Home - Gulberg III, Lahore", "Work - Blue Area, Islamabad"].map((address) => (
                <div key={address} className="rounded-lg border border-forest/10 p-4">
                  <p className="font-black">{address}</p>
                  <p className="mt-2 text-sm text-muted">Ayesha Khan · +92 300 0000000</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
