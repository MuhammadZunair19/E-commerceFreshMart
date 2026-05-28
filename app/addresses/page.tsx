import { MapPin, Plus } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressesPage() {
  return (
    <>
      <PageHero eyebrow="Addresses" title="Delivery addresses" description="Manage saved addresses and default delivery information." />
      <section className="container-x grid gap-6 py-10 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-4 md:grid-cols-2">
          {["Home - Gulberg III, Lahore", "Work - Blue Area, Islamabad", "Parents - Johar Town, Lahore"].map((address) => (
            <Card key={address}>
              <CardContent className="p-5">
                <MapPin className="h-5 w-5 text-forest" />
                <p className="mt-3 font-black text-forest">{address}</p>
                <p className="mt-2 text-sm text-muted">Ayesha Khan · +92 300 0000000</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Set default</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> Add address</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {["Label", "Full name", "Phone", "Address line 1", "City"].map((label) => (
              <div key={label} className="grid gap-2">
                <Label>{label}</Label>
                <Input placeholder={label} />
              </div>
            ))}
            <Button>Save address</Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
