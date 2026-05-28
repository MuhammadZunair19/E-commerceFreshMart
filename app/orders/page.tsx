import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentOrders } from "@/lib/data";
import { formatPkr } from "@/lib/utils";

export default function OrdersPage() {
  return (
    <>
      <PageHero eyebrow="Orders" title="Order history" description="Track current and past orders with status filters and detail pages." />
      <section className="container-x py-10">
        <Card>
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="grid gap-3 rounded-lg border border-forest/10 p-4 md:grid-cols-[1fr_140px_120px_120px] md:items-center">
                <div>
                  <p className="font-black text-forest">{order.id}</p>
                  <p className="text-sm text-muted">{order.customer} · {order.time}</p>
                </div>
                <p className="font-black">{formatPkr(order.total)}</p>
                <Badge variant="secondary" className="justify-center">{order.status}</Badge>
                <Button asChild variant="outline">
                  <Link href={`/orders/${order.id}`}>Details</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
