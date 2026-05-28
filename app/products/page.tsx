import { CatalogClient } from "@/components/catalog-client";

export default function ProductsPage({
  searchParams
}: {
  searchParams: { search?: string; category?: string };
}) {
  return <CatalogClient initialSearch={searchParams.search} initialCategory={searchParams.category} />;
}
