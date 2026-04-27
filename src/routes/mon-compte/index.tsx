import { createFileRoute, Link } from "@tanstack/react-router";
import { AccountLayout } from "@/components/AccountLayout";
import { useReservations, formatMAD } from "@/lib/cart";
import { Calendar, CreditCard, FileText, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/mon-compte/")({
  head: () => ({ meta: [{ title: "Mon compte — BIYOUU" }] }),
  component: Dashboard,
});

function Dashboard() {
  const reservations = useReservations();
  const pending = reservations.filter((r) => r.status === "pending").length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const totalPaid = reservations
    .filter((r) => r.paymentStatus === "paid")
    .reduce((s, r) => s + r.total, 0);

  return (
    <AccountLayout title="Tableau de bord">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Réservations confirmées" value={confirmed.toString()} icon={<Calendar className="h-5 w-5" />} />
        <Stat label="En attente" value={pending.toString()} icon={<FileText className="h-5 w-5" />} />
        <Stat label="Total payé" value={formatMAD(totalPaid)} icon={<CreditCard className="h-5 w-5" />} />
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-xl">Dernières réservations</h3>
          <Link to="/mon-compte/reservations" className="inline-flex items-center gap-1 text-sm text-primary">
            Voir tout <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {reservations.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune réservation pour le moment.</p>
        ) : (
          <ul className="space-y-3">
            {reservations.slice(0, 3).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/50 p-4">
                <div>
                  <p className="font-semibold">{r.reference}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString("fr-FR")} · {r.items.length} offre(s)
                  </p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {r.status === "confirmed" ? "Confirmée" : r.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AccountLayout>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
    </div>
  );
}
