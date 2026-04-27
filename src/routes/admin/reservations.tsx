import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useReservations, formatMAD } from "@/lib/cart";

export const Route = createFileRoute("/admin/reservations")({
  head: () => ({ meta: [{ title: "Admin — Réservations" }] }),
  component: AdminReservations,
});

function AdminReservations() {
  const reservations = useReservations();
  return (
    <AdminLayout title="Réservations">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Offre(s)</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Paiement</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Aucune réservation</td></tr>
              )}
              {reservations.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-4 py-3"><p className="font-medium">{r.customer.firstName} {r.customer.lastName}</p><p className="text-xs text-muted-foreground">{r.customer.email}</p></td>
                  <td className="px-4 py-3">{r.items.map((i) => i.title).join(", ")}</td>
                  <td className="px-4 py-3 text-xs">{r.items[0]?.startDate} → {r.items[0]?.endDate}</td>
                  <td className="px-4 py-3 font-semibold">{formatMAD(r.total)}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{r.status}</span></td>
                  <td className="px-4 py-3"><span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">{r.paymentStatus}</span></td>
                  <td className="px-4 py-3 text-xs"><button className="text-primary hover:underline">Voir</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
