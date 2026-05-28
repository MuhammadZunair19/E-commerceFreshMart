import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const reviews = [
  { name: "Ayesha", rating: 5, text: "Arrived fresh, well packed, and exactly as described." },
  { name: "Bilal", rating: 4, text: "Good quality and quick delivery slot confirmation." },
  { name: "Sara", rating: 5, text: "This is now a weekly cart staple for my family." }
];

export function ProductReviews({ rating, count }: { rating: number; count: number }) {
  return (
    <Card>
      <CardHeader className="flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <CardTitle>Customer reviews</CardTitle>
        <Badge variant="warning" className="gap-1 rounded-md">
          <Star className="h-4 w-4 fill-current" />
          {rating} average · {count} reviews
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.name} className="bg-cream shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-1 text-warning">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 font-black text-forest">{review.name}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
