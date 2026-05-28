import Link from "next/link";
import { WifiOff } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OfflinePage() {
  return (
    <>
      <PageHero eyebrow="Offline" title="You are offline" description="FreshMart can keep core storefront pages available after the service worker has cached them." />
      <section className="container-x grid place-items-center py-10">
        <Card className="max-w-lg text-center">
          <CardContent className="p-8">
            <WifiOff className="mx-auto h-10 w-10 text-forest" />
            <h2 className="mt-4 text-2xl font-black text-forest">Connection unavailable</h2>
            <p className="mt-2 text-muted">Reconnect to place orders or refresh live inventory data.</p>
            <Button asChild className="mt-6"><Link href="/products">Browse cached catalog</Link></Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
