import { Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/data";

export default function DealsPage() {
  const deals = products.filter((product) => product.salePrice);

  return (
    <>
      <PageHero
        eyebrow="Flash deals"
        title="Today's grocery offers"
        description="Sale pricing, countdown blocks, and promo campaign surfaces for the SRS promotions module."
      />
      <section className="container-x py-10">
        <Card className="mb-8 bg-forest text-white">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-fresh" />
              <div>
                <p className="font-black">Weekend freshness sale</p>
                <p className="text-sm text-white/75">Use coupon FRESH10 at checkout mockup.</p>
              </div>
            </div>
            <p className="text-2xl font-black">07:18:42</p>
          </CardContent>
        </Card>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
