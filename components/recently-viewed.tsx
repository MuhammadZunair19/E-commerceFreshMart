"use client";

import { ProductCard } from "@/components/product-card";
import { useCustomerStore } from "@/lib/customer-store";

export function RecentlyViewed() {
  const recentlyViewed = useCustomerStore((state) => state.recentlyViewed);

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="container-x py-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">History</p>
          <h2 className="mt-2 text-3xl font-black text-forest">Recently viewed</h2>
        </div>
        <p className="text-sm text-muted">Stored locally until user auth sync is connected.</p>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recentlyViewed.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
