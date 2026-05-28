import { AdminShell } from "@/components/admin-shell";
import { AdminTable } from "@/components/admin-table";
import { categories } from "@/lib/data";

export default function AdminCategoriesPage() {
  return (
    <AdminShell title="Category management">
      <AdminTable
        title="Categories and subcategories"
        columns={["Name", "Slug", "Products", "Visibility"]}
        rows={categories.map((category) => [category.name, category.slug, category.count, "Active"])}
      />
    </AdminShell>
  );
}
