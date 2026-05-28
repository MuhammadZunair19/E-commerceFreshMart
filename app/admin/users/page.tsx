import { AdminShell } from "@/components/admin-shell";
import { AdminTable } from "@/components/admin-table";

const users = [
  ["Ayesha Khan", "customer@example.com", "customer", "Active", "PKR 42,860"],
  ["Bilal Ahmed", "bilal@example.com", "admin", "Active", "PKR 18,220"],
  ["Sara Malik", "sara@example.com", "customer", "Active", "PKR 67,510"],
  ["Omar Raza", "omar@example.com", "super_admin", "Active", "PKR 9,800"]
];

export default function AdminUsersPage() {
  return (
    <AdminShell title="User management">
      <AdminTable title="Registered users" columns={["Name", "Email", "Role", "Status", "Spending"]} rows={users} action="Manage" />
    </AdminShell>
  );
}
