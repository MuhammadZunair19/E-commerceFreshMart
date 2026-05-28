import { notFound } from "next/navigation";
import { CatalogClient } from "@/components/catalog-client";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const category = categories.find((item) => item.slug === params.slug);
  if (!category) notFound();

  return (
    <>
      <PageHero
        eyebrow="Category"
        title={category.name}
        description={`Browse ${category.count} grocery items across ${category.subcategories.join(", ")}.`}
        action={
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((subcategory) => (
              <Badge key={subcategory} variant="secondary" className="rounded-md p-2">{subcategory}</Badge>
            ))}
          </div>
        }
      />
      <CatalogClient initialCategory={category.slug} />
    </>
  );
}
