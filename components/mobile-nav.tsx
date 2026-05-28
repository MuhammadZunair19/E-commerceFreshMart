"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingCart, UserRound } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/categories", label: "Categories", icon: LayoutGrid },
  { href: "/search", label: "Search", icon: Search },
  { href: "/account", label: "Account", icon: UserRound }
];

export function MobileNav() {
  const pathname = usePathname();
  const openCart = useCartStore((state) => state.openCart);
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-forest/10 bg-white md:hidden">
      <div className="grid h-16 grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href.split("?")[0];
          return (
            <Link key={item.label} href={item.href} className={cn("grid place-items-center text-[11px] font-semibold text-muted", active && "text-forest")}>
              <span className="grid gap-1 justify-items-center">
                <Icon className="h-5 w-5" />
                {item.label}
              </span>
            </Link>
          );
        })}
        <Button variant="ghost" onClick={openCart} className="relative h-auto rounded-none p-0 text-[11px] font-semibold text-muted" aria-label="Cart">
          <span className="grid gap-1 justify-items-center">
            <ShoppingCart className="h-5 w-5" />
            Cart
          </span>
          {count > 0 && <span className="absolute right-4 top-2 grid h-5 min-w-5 place-items-center rounded-full bg-warning px-1 text-[10px] font-black text-ink">{count}</span>}
        </Button>
      </div>
    </nav>
  );
}
