import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useReservations, formatMAD } from "@/lib/cart";

export const Route = createFileRoute("/admin/paiements")({
  head: () => ({ meta: [{ title: "Admin — Paiements" }] }),
  component: AdminPayments,
});

function AdminPayments() {
  const reservations = useReservations();
  return (
    <AdminLayout title="Paiements">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Référence</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Méthode</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Aucun paiement</td></tr>
              )}
              {reservations.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{r.reference}</td>
                  <td className="px-4 py-3">{r.customer.firstName} {r.customer.lastName}</td>
                  <td className="px-4 py-3 font-semibold">{formatMAD(r.total)}</td>
                  <td className="px-4 py-3 text-muted-foreground">Carte bancaire</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{r.paymentStatus}</span></td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
