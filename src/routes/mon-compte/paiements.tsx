import { createFileRoute } from "@tanstack/react-router";
import { AccountLayout } from "@/components/AccountLayout";
import { useReservations, formatMAD } from "@/lib/cart";

export const Route = createFileRoute("/mon-compte/paiements")({
  head: () => ({ meta: [{ title: "Mes paiements — BIYOUU" }] }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const reservations = useReservations();
  return (
    <AccountLayout title="Historique des paiements">
      {reservations.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          Aucun paiement enregistré.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3">Référence</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Montant</th>
                <th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-5 py-3 font-medium">{r.reference}</td>
                  <td className="px-5 py-3 text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("fr-FR")}</td>
                  <td className="px-5 py-3 font-semibold">{formatMAD(r.total)}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {r.paymentStatus === "paid" ? "Payé" : "En attente"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AccountLayout>
  );
}
