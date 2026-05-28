import { Search } from "lucide-react";
import { CatalogClient } from "@/components/catalog-client";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";

export default function SearchPage({
  searchParams
}: {
  searchParams: { q?: string };
}) {
  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Find groceries fast"
        description="Autocomplete and history-ready search surface, backed by mock data until Supabase full-text search is wired."
        action={<Badge variant="secondary" className="gap-2 rounded-md p-3"><Search className="h-4 w-4" /> Debounced suggestions ready</Badge>}
      />
      <CatalogClient initialSearch={searchParams.q} />
    </>
  );
}
