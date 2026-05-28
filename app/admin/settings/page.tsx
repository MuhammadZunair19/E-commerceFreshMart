import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Store settings">
      <Card className="max-w-3xl">
        <CardHeader><CardTitle>Operational defaults</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {["Store name", "Support email", "Default delivery fee", "Free delivery threshold", "Low stock default", "Resend sender email"].map((label) => (
            <div key={label} className="grid gap-2"><Label>{label}</Label><Input placeholder={label} /></div>
          ))}
          <Button className="w-fit">Save settings</Button>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
