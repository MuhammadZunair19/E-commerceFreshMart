"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Categories" },
  { href: "/admin", label: "Admin" }
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    const normalized = query.toLowerCase();
    return products
      .filter((product) => `${product.name} ${product.brand} ${product.tags.join(" ")}`.toLowerCase().includes(normalized))
      .slice(0, 4);
  }, [query]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    router.push(`/products?search=${encodeURIComponent(query)}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-white/95 backdrop-blur">
      <div className="container-x flex h-20 items-center gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="FreshMart home">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-forest text-xl font-black text-white">F</span>
          <span className="hidden text-xl font-black tracking-normal text-forest sm:block">FreshMart</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold text-muted transition hover:bg-cream hover:text-forest",
                pathname === item.href && "bg-cream text-forest"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="relative ml-auto hidden flex-1 max-w-2xl md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search bananas, milk, snacks..."
            className="h-12 w-full rounded-lg border border-forest/10 bg-cream pl-12 pr-4 text-sm outline-none transition focus:border-fresh focus:bg-white focus:ring-4 focus:ring-fresh/15"
          />
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-14 overflow-hidden rounded-lg border border-forest/10 bg-white shadow-soft">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-between px-4 py-3 text-sm hover:bg-cream"
                  onClick={() => setQuery("")}
                >
                  <span className="font-semibold text-ink">{product.name}</span>
                  <span className="text-muted">{product.category}</span>
                </Link>
              ))}
            </div>
          )}
        </form>

        <button className="grid h-11 w-11 place-items-center rounded-lg border border-forest/10 text-forest lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/account" className="hidden h-11 w-11 place-items-center rounded-lg border border-forest/10 text-forest md:grid" aria-label="Account">
          <UserRound className="h-5 w-5" />
        </Link>
        <button
          onClick={openCart}
          className="relative grid h-11 w-11 place-items-center rounded-lg bg-forest text-white transition hover:bg-leaf"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-warning px-1 text-xs font-black text-ink">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
