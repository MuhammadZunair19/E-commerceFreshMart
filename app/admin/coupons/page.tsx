import { Plus } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { AdminTable } from "@/components/admin-table";
import { Button } from "@/components/ui/button";

const coupons = [
  ["FRESH10", "percentage", "10%", "PKR 2,000", "Active"],
  ["FREEDEL", "free_delivery", "Delivery", "PKR 3,000", "Active"],
  ["WELCOME500", "fixed", "PKR 500", "PKR 4,000", "Inactive"]
];

export default function AdminCouponsPage() {
  return (
    <AdminShell title="Promotions and coupons">
      <div className="mb-6"><Button><Plus className="h-4 w-4" /> Create coupon</Button></div>
      <AdminTable title="Coupon codes" columns={["Code", "Type", "Value", "Minimum", "Status"]} rows={coupons} />
    </AdminShell>
  );
}
