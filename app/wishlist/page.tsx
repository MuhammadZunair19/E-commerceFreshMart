"use client";

import { Heart } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/lib/data";
import { useCustomerStore } from "@/lib/customer-store";
import Link from "next/link";

export default function WishlistPage() {
  const wishlistIds = useCustomerStore((state) => state.wishlistIds);
  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id));

  return (
    <>
      <PageHero
        eyebrow="Wishlist"
        title="Saved favorites"
        description="Customer wishlist management page for saved products and future restock reminders."
        action={<Badge variant="fresh" className="gap-2 rounded-md p-3"><Heart className="h-4 w-4" /> {wishlistProducts.length} saved items</Badge>}
      />
      <section className="container-x py-10">
        {wishlistProducts.length === 0 ? (
          <Card className="grid min-h-72 place-items-center border-dashed text-center">
            <div>
              <h2 className="text-2xl font-black text-forest">No saved items yet</h2>
              <p className="mt-2 text-muted">Save products from the catalog to build your grocery shortlist.</p>
              <Button asChild className="mt-5"><Link href="/products">Browse products</Link></Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
