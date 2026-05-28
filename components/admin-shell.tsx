import Link from "next/link";
import { BarChart3, Boxes, ClipboardList, LayoutGrid, Settings, TicketPercent, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/categories", label: "Categories", icon: LayoutGrid },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/users", label: "Users", icon: UsersRound },
  { href: "/admin/coupons", label: "Coupons", icon: TicketPercent },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4fbf5]">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="hidden min-h-screen border-r border-forest/10 bg-forest p-5 text-white lg:block">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-xl font-black text-forest">F</span>
            <div>
              <p className="text-lg font-black">FreshMart</p>
              <p className="text-xs text-white/70">Admin Console</p>
            </div>
          </Link>
          <nav className="mt-8 space-y-1">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <Button key={item.href} asChild variant="ghost" className="w-full justify-start text-white/80 hover:bg-white/10 hover:text-white">
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </aside>
        <main className="p-4 md:p-8">
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Admin</p>
            <h1 className="mt-2 text-4xl font-black text-forest">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
