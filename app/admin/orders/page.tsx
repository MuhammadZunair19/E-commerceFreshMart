import { AdminShell } from "@/components/admin-shell";
import { AdminTable } from "@/components/admin-table";
import { recentOrders } from "@/lib/data";
import { formatPkr } from "@/lib/utils";

export default function AdminOrdersPage() {
  return (
    <AdminShell title="Order management">
      <AdminTable
        title="Orders"
        columns={["Order", "Customer", "Total", "Status", "Time"]}
        rows={recentOrders.map((order) => [order.id, order.customer, formatPkr(order.total), order.status, order.time])}
        action="Update"
      />
    </AdminShell>
  );
}
