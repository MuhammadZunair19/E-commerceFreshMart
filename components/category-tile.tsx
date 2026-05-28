import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/data";
import { Card } from "@/components/ui/card";

export function CategoryTile({ category }: { category: Category }) {
  return (
    <Card className="group relative min-h-44 overflow-hidden bg-forest p-0">
      <Link href={`/categories/${category.slug}`} className="absolute inset-0">
      <Image src={category.image} alt={category.name} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="text-xl font-black">{category.name}</h3>
        <p className="mt-1 text-sm text-white/85">{category.count} items</p>
      </div>
      </Link>
    </Card>
  );
}
