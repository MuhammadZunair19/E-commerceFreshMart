"use client";

import { useMemo, useState } from "react";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/data";
import { cn, formatPkr } from "@/lib/utils";

export function CatalogClient({
  initialSearch,
  initialCategory
}: {
  initialSearch?: string;
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory ?? "all");
  const [search, setSearch] = useState(initialSearch ?? "");
  const [sort, setSort] = useState("popular");
  const [organicOnly, setOrganicOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [maxPrice, setMaxPrice] = useState(1200);

  const filtered = useMemo(() => {
    let results = products.filter((product) => {
      const categoryMatch = category === "all" || product.category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-") === category;
      const searchMatch = `${product.name} ${product.brand} ${product.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase());
      const priceMatch = (product.salePrice ?? product.price) <= maxPrice;
      const organicMatch = !organicOnly || product.organic;
      const stockMatch = !inStockOnly || product.stock > 0;
      return categoryMatch && searchMatch && priceMatch && organicMatch && stockMatch;
    });

    if (sort === "price-low") results = [...results].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === "price-high") results = [...results].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    if (sort === "rated") results = [...results].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") results = [...results].reverse();
    return results;
  }, [category, inStockOnly, maxPrice, organicOnly, search, sort]);

  return (
    <div className="container-x py-8 lg:py-12">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Catalog</p>
          <h1 className="mt-2 text-4xl font-black text-forest md:text-5xl">Shop groceries</h1>
          <p className="mt-3 max-w-2xl text-muted">Browse categories, filter essentials, compare prices, and build a cart with live totals.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView("grid")} className={cn("grid h-11 w-11 place-items-center rounded-lg border border-forest/10", view === "grid" && "bg-forest text-white")} aria-label="Grid view">
            <Grid2X2 className="h-5 w-5" />
          </button>
          <button onClick={() => setView("list")} className={cn("grid h-11 w-11 place-items-center rounded-lg border border-forest/10", view === "list" && "bg-forest text-white")} aria-label="List view">
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border border-forest/10 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-forest">
            <SlidersHorizontal className="h-5 w-5" />
            <h2 className="font-black">Filters</h2>
          </div>
          <label className="mt-5 block text-sm font-bold text-ink">
            Search
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-forest/10 px-3 outline-none focus:border-fresh focus:ring-4 focus:ring-fresh/15"
              placeholder="Product or brand"
            />
          </label>
          <label className="mt-4 block text-sm font-bold text-ink">
            Category
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-forest/10 px-3 outline-none">
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm font-bold text-ink">
            Sort
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-forest/10 px-3 outline-none">
              <option value="popular">Most popular</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rated">Best rated</option>
              <option value="newest">Newest</option>
            </select>
          </label>
          <div className="mt-5">
            <div className="flex justify-between text-sm font-bold">
              <span>Max price</span>
              <span>{formatPkr(maxPrice)}</span>
            </div>
            <input type="range" min="200" max="1200" step="50" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="mt-3 w-full accent-forest" />
          </div>
          <label className="mt-5 flex items-center gap-3 text-sm font-bold">
            <input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} className="h-5 w-5 accent-forest" />
            In stock only
          </label>
          <label className="mt-3 flex items-center gap-3 text-sm font-bold">
            <input type="checkbox" checked={organicOnly} onChange={(event) => setOrganicOnly(event.target.checked)} className="h-5 w-5 accent-forest" />
            Organic only
          </label>
        </aside>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <p className="font-bold text-muted">{filtered.length} products found</p>
            <p className="hidden text-sm text-muted md:block">Pagination-ready mock catalog</p>
          </div>
          {filtered.length === 0 ? (
            <div className="grid min-h-80 place-items-center rounded-lg border border-dashed border-forest/20 bg-white text-center">
              <div>
                <h2 className="text-2xl font-black text-forest">No products found</h2>
                <p className="mt-2 text-muted">Try a broader search or remove a filter.</p>
              </div>
            </div>
          ) : (
            <div className={cn(view === "grid" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3" : "grid gap-4")}>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
