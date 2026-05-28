import { Plus, Upload } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { AdminTable } from "@/components/admin-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { products } from "@/lib/data";
import { formatPkr } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <AdminShell title="Product management">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button><Plus className="h-4 w-4" /> Add product</Button>
        <Button variant="outline"><Upload className="h-4 w-4" /> CSV upload</Button>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <AdminTable
          title="Products"
          columns={["Name", "SKU", "Price", "Stock", "Status"]}
          rows={products.map((product) => [product.name, product.sku, formatPkr(product.salePrice ?? product.price), product.stock, product.stock > 0 ? "Active" : "Inactive"])}
        />
        <Card className="h-fit">
          <CardHeader><CardTitle>Quick editor</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            {["Name", "SKU", "Price", "Stock quantity", "Low stock threshold"].map((label) => (
              <div key={label} className="grid gap-2"><Label>{label}</Label><Input placeholder={label} /></div>
            ))}
            <Button>Save product</Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
