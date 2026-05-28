import { Camera, Save } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <>
      <PageHero eyebrow="Profile" title="Personal details" description="Frontend form for Supabase profile fields, avatar upload, and notification preferences." />
      <section className="container-x py-10">
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Account information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-lg bg-cream text-forest">
                <Camera className="h-7 w-7" />
              </div>
              <Button variant="outline">Upload photo</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" placeholder="Ayesha Khan" />
              <Field label="Phone" placeholder="+92 300 0000000" />
              <Field label="Email" placeholder="customer@example.com" />
              <Field label="City" placeholder="Lahore" />
            </div>
            <Button className="w-fit"><Save className="h-4 w-4" /> Save changes</Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Input placeholder={placeholder} />
    </div>
  );
}
