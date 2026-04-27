import { createFileRoute } from "@tanstack/react-router";
import { AccountLayout } from "@/components/AccountLayout";
import { useReservations, formatMAD } from "@/lib/cart";

export const Route = createFileRoute("/mon-compte/reservations")({
  head: () => ({ meta: [{ title: "Mes réservations — BIYOUU" }] }),
  component: ReservationsPage,
});

function ReservationsPage() {
  const reservations = useReservations();
  return (
    <AccountLayout title="Mes réservations">
      {reservations.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          Aucune réservation enregistrée.
        </p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((r) => (
            <li key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg">{r.reference}</p>
                  <p className="text-xs text-muted-foreground">
                    Créée le {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge label={r.status === "confirmed" ? "Confirmée" : r.status === "pending" ? "En attente" : "Annulée"} variant={r.status === "confirmed" ? "success" : r.status === "pending" ? "warn" : "danger"} />
                  <Badge label={r.paymentStatus === "paid" ? "Payée" : r.paymentStatus === "pending" ? "Paiement en attente" : "Remboursée"} variant={r.paymentStatus === "paid" ? "success" : "warn"} />
                </div>
              </div>
              <ul className="mt-4 space-y-2 border-t border-border pt-3 text-sm">
                {r.items.map((i) => (
                  <li key={i.id} className="flex justify-between">
                    <span>{i.title} <span className="text-xs text-muted-foreground">× {i.quantity}</span></span>
                    <span className="font-medium">{formatMAD(i.unitPrice * i.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-end border-t border-border pt-3">
                <p className="font-display text-xl text-primary">{formatMAD(r.total)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AccountLayout>
  );
}

function Badge({ label, variant }: { label: string; variant: "success" | "warn" | "danger" }) {
  const cls =
    variant === "success"
      ? "bg-emerald-100 text-emerald-700"
      : variant === "warn"
      ? "bg-amber-100 text-amber-700"
      : "bg-red-100 text-red-700";
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{label}</span>;
}
