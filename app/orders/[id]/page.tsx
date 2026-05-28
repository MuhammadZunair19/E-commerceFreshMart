import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderTimeline } from "@/components/order-timeline";
import { PageHero } from "@/components/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, recentOrders } from "@/lib/data";
import { formatPkr } from "@/lib/utils";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = recentOrders.find((item) => item.id === decodeURIComponent(params.id));
  if (!order) notFound();

  return (
    <>
      <PageHero
        eyebrow="Tracking"
        title={order.id}
        description="Status timeline, customer address, payment method, and item snapshot for a single order."
        action={<Badge variant="secondary" className="rounded-md p-3">{order.status}</Badge>}
      />
      <section className="container-x grid gap-6 py-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline active={order.status === "Delivered" ? 4 : 2} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {products.slice(0, 3).map((product, index) => (
                <div key={product.id} className="flex justify-between rounded-lg bg-cream p-4">
                  <div>
                    <p className="font-black">{product.name}</p>
                    <p className="text-sm text-muted">{index + 1} x {formatPkr(product.salePrice ?? product.price)}</p>
                  </div>
                  <p className="font-black text-forest">{formatPkr((product.salePrice ?? product.price) * (index + 1))}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Delivery summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted">Customer</span><span className="font-bold">{order.customer}</span></div>
            <div className="flex justify-between"><span className="text-muted">Payment</span><span className="font-bold">Cash on Delivery</span></div>
            <div className="flex justify-between"><span className="text-muted">Total</span><span className="font-black text-forest">{formatPkr(order.total)}</span></div>
            <p className="rounded-lg bg-cream p-3 text-muted">Gulberg III, Lahore · Tomorrow 09:00 - 12:00</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/orders">Back to orders</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
