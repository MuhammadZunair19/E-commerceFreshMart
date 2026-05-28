"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ChevronDown, LayoutDashboard, Menu, Search, ShoppingCart, Sparkles, UserRound } from "lucide-react";
import { categories, products } from "@/lib/data";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const nav = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Shop" },
  { href: "/deals", label: "Deals" },
  { href: "/orders", label: "Orders" }
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
    <header className="sticky top-0 z-40 border-b border-forest/10 bg-white/95 backdrop-blur-xl">
      <div className="hidden bg-forest text-white md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs font-semibold">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-fresh" />
            Fresh deals every morning · Free delivery above PKR 3,000
          </span>
          <span className="text-white/75">COD available across Lahore, Islamabad, and Rawalpindi</span>
        </div>
      </div>

      <div className="container-x grid min-h-20 grid-cols-[auto_1fr_auto] items-center gap-4 py-3">
        <Link href="/" className="flex min-w-max items-center gap-3" aria-label="FreshMart home">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-forest text-xl font-black text-white shadow-soft">F</span>
          <span className="hidden sm:block">
            <span className="block text-xl font-black tracking-normal text-forest">FreshMart</span>
            <span className="block text-xs font-bold text-muted">Fresh grocery delivery</span>
          </span>
        </Link>

        <form onSubmit={submitSearch} className="relative ml-auto hidden flex-1 max-w-2xl md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search bananas, milk, snacks..."
            className="h-12 bg-cream pl-12 pr-4 focus:bg-white"
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

        <div className="flex items-center justify-end gap-2">
        <Button asChild variant="outline" className="hidden h-11 gap-2 xl:inline-flex">
          <Link href="/categories">
            Categories
            <ChevronDown className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="icon" className="h-11 w-11 lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
        <Button asChild variant="outline" size="icon" className="hidden h-11 w-11 md:inline-flex">
          <Link href="/account" aria-label="Account">
            <UserRound className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          onClick={openCart}
          size="icon"
          className="relative h-11 w-11"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-warning px-1 text-xs font-black text-ink">
              {count}
            </span>
          )}
        </Button>
        </div>
      </div>

      <div className="hidden border-t border-forest/10 bg-white lg:block">
        <div className="container-x flex h-12 items-center justify-between gap-4">
          <nav className="flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-semibold text-muted transition hover:bg-cream hover:text-forest",
                  pathname === item.href && "bg-cream text-forest"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {categories.slice(0, 5).map((category) => (
              <Badge key={category.slug} variant="secondary" className="rounded-md">
                {category.name}
              </Badge>
            ))}
            <Button asChild variant="ghost" className="ml-2 gap-2">
              <Link href="/admin">
                <LayoutDashboard className="h-4 w-4" />
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
