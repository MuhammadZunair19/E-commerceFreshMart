import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { products } from "@/lib/data";
import { formatPkr } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) notFound();

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);
  const stockLabel = product.stock === 0 ? "Out of Stock" : product.stock <= product.threshold ? "Low Stock" : "In Stock";

  return (
    <div className="container-x py-8 lg:py-12">
      <div className="mb-6 text-sm text-muted">
        <Link href="/products" className="font-bold text-forest">Products</Link> / {product.name}
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 md:grid-cols-[96px_1fr]">
          <div className="order-2 flex gap-3 md:order-1 md:flex-col">
            {product.images.map((image) => (
              <div key={image} className="relative aspect-square w-24 overflow-hidden rounded-lg border border-forest/10 bg-white">
                <Image src={image} alt={product.name} fill className="object-cover" sizes="96px" />
              </div>
            ))}
          </div>
          <div className="relative order-1 aspect-square overflow-hidden rounded-lg bg-white shadow-soft md:order-2">
            <Image src={product.image} alt={product.name} fill priority className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="fresh">{product.category}</Badge>
            {product.organic && <Badge>Organic</Badge>}
            <Badge variant="outline">{stockLabel}</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-black text-forest md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            <span className="font-bold text-muted">SKU {product.sku}</span>
            <span className="font-bold text-muted">{product.brand}</span>
            <span className="flex items-center gap-1 font-bold">
              <Star className="h-4 w-4 fill-warning text-warning" />
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">
            <p className="text-4xl font-black text-forest">{formatPkr(product.salePrice ?? product.price)}</p>
            {product.salePrice && <p className="pb-1 text-lg font-bold text-muted line-through">{formatPkr(product.price)}</p>}
          </div>
          <ProductDetailActions product={product} />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["COD available", "Same-day slots", "Freshness checked"].map((item) => (
              <Card key={item} className="flex items-center gap-2 p-3 text-sm font-bold">
                <CheckCircle2 className="h-5 w-5 text-fresh" />
                {item}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Card className="mt-12">
        <CardContent className="p-6">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="leading-7 text-muted">{product.description}</p>
            </TabsContent>
            <TabsContent value="nutrition" className="pt-4">
              <ul className="space-y-2 text-muted">{product.nutrition.map((item) => <li key={item}>{item}</li>)}</ul>
            </TabsContent>
            <TabsContent value="ingredients" className="pt-4">
              <ul className="space-y-2 text-muted">{product.ingredients.map((item) => <li key={item}>{item}</li>)}</ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-3xl font-black text-forest">Related products</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      )}
    </div>
  );
}
