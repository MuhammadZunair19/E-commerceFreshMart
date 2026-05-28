import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { products } from "@/lib/data";
import { formatPkr } from "@/lib/utils";

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
            <span className="rounded-full bg-fresh/20 px-3 py-1 text-xs font-black text-forest">{product.category}</span>
            {product.organic && <span className="rounded-full bg-forest px-3 py-1 text-xs font-black text-white">Organic</span>}
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-muted">{stockLabel}</span>
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
              <div key={item} className="flex items-center gap-2 rounded-lg border border-forest/10 bg-white p-3 text-sm font-bold">
                <CheckCircle2 className="h-5 w-5 text-fresh" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-forest">Description</h2>
          <p className="mt-3 leading-7 text-muted">{product.description}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-forest">Nutritional info</h2>
          <ul className="mt-3 space-y-2 text-muted">
            {product.nutrition.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-forest">Ingredients</h2>
          <ul className="mt-3 space-y-2 text-muted">
            {product.ingredients.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

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
