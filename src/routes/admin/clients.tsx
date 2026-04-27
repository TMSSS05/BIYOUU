import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useReservations } from "@/lib/cart";

export const Route = createFileRoute("/admin/clients")({
  head: () => ({ meta: [{ title: "Admin — Clients" }] }),
  component: AdminClients,
});

function AdminClients() {
  const reservations = useReservations();
  const clientsMap = new Map<string, { name: string; email: string; phone: string; count: number; total: number }>();
  reservations.forEach((r) => {
    const k = r.customer.email;
    const prev = clientsMap.get(k);
    clientsMap.set(k, {
      name: `${r.customer.firstName} ${r.customer.lastName}`,
      email: r.customer.email,
      phone: r.customer.phone,
      count: (prev?.count ?? 0) + 1,
      total: (prev?.total ?? 0) + r.total,
    });
  });
  const clients = [...clientsMap.values()];

  return (
    <AdminLayout title="Clients">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Réservations</th>
              <th className="px-4 py-3">CA total</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Aucun client</td></tr>
            )}
            {clients.map((c) => (
              <tr key={c.email} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3">{c.email}</td>
                <td className="px-4 py-3">{c.phone}</td>
                <td className="px-4 py-3">{c.count}</td>
                <td className="px-4 py-3 font-semibold">{c.total} MAD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
