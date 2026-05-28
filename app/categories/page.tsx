import { CategoryTile } from "@/components/category-tile";
import { PageHero } from "@/components/page-hero";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Departments"
        title="Shop by category"
        description="Explore every grocery department with nested category structure ready for Supabase categories and subcategories."
      />
      <section className="container-x py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryTile key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </>
  );
}
