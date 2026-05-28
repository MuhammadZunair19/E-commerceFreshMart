"use client";

import { useMemo, useState } from "react";
import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/data";
import { cn, formatPkr } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

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
          <Button onClick={() => setView("grid")} variant={view === "grid" ? "default" : "outline"} size="icon" className="h-11 w-11" aria-label="Grid view">
            <Grid2X2 className="h-5 w-5" />
          </Button>
          <Button onClick={() => setView("list")} variant={view === "list" ? "default" : "outline"} size="icon" className="h-11 w-11" aria-label="List view">
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
          <label className="block text-sm font-bold text-ink">
            Search
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="mt-2 h-11"
              placeholder="Product or brand"
            />
          </label>
          <label className="mt-4 block text-sm font-bold text-ink">
            Category
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2 h-11">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>{item.name}</SelectItem>
              ))}
              </SelectContent>
            </Select>
          </label>
          <label className="mt-4 block text-sm font-bold text-ink">
            Sort
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="mt-2 h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most popular</SelectItem>
                <SelectItem value="price-low">Price: low to high</SelectItem>
                <SelectItem value="price-high">Price: high to low</SelectItem>
                <SelectItem value="rated">Best rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </label>
          <div className="mt-5">
            <div className="flex justify-between text-sm font-bold">
              <span>Max price</span>
              <span>{formatPkr(maxPrice)}</span>
            </div>
            <Slider className="mt-4" min={200} max={1200} step={50} value={[maxPrice]} onValueChange={(value) => setMaxPrice(value[0] ?? 1200)} />
          </div>
          <label className="mt-5 flex items-center gap-3 text-sm font-bold">
            <Checkbox checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(checked === true)} />
            In stock only
          </label>
          <label className="mt-3 flex items-center gap-3 text-sm font-bold">
            <Checkbox checked={organicOnly} onCheckedChange={(checked) => setOrganicOnly(checked === true)} />
            Organic only
          </label>
          </CardContent>
        </Card>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="secondary">{filtered.length} products found</Badge>
            <p className="hidden text-sm text-muted md:block">Pagination-ready mock catalog</p>
          </div>
          {filtered.length === 0 ? (
            <Card className="grid min-h-80 place-items-center border-dashed text-center">
              <div>
                <h2 className="text-2xl font-black text-forest">No products found</h2>
                <p className="mt-2 text-muted">Try a broader search or remove a filter.</p>
              </div>
            </Card>
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
