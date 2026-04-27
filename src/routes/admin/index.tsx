import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useReservations, formatMAD } from "@/lib/cart";
import { offers } from "@/data/offers";
import { TrendingUp, Calendar, FileText, CreditCard, Package, Users, Plane } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — BIYOUU" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const reservations = useReservations();
  const monthRes = reservations.filter((r) => new Date(r.createdAt).getMonth() === new Date().getMonth());
  const revenue = reservations.filter((r) => r.paymentStatus === "paid").reduce((s, r) => s + r.total, 0);
  const pending = reservations.filter((r) => r.status === "pending").length;
  const paid = reservations.filter((r) => r.paymentStatus === "paid").length;

  return (
    <AdminLayout title="Tableau de bord">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Revenus estimés" value={formatMAD(revenue)} icon={<TrendingUp />} accent />
        <Stat label="Réservations du mois" value={monthRes.length.toString()} icon={<Calendar />} />
        <Stat label="Demandes en attente" value={pending.toString()} icon={<FileText />} />
        <Stat label="Paiements réussis" value={paid.toString()} icon={<CreditCard />} />
        <Stat label="Offres actives" value={offers.filter((o) => o.available).length.toString()} icon={<Package />} />
        <Stat label="Clients" value={new Set(reservations.map((r) => r.customer.email)).size.toString()} icon={<Users />} />
        <Stat label="Prochaines arrivées" value={reservations.filter((r) => r.status === "confirmed").length.toString()} icon={<Plane />} />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 font-display text-lg">Dernières réservations</h3>
        {reservations.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucune réservation pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="py-3 pr-4">Référence</th>
                  <th className="py-3 pr-4">Client</th>
                  <th className="py-3 pr-4">Total</th>
                  <th className="py-3">Statut</th>
                </tr>
              </thead>
              <tbody>
                {reservations.slice(0, 5).map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0">
                    <td className="py-3 pr-4 font-medium">{r.reference}</td>
                    <td className="py-3 pr-4">{r.customer.firstName} {r.customer.lastName}</td>
                    <td className="py-3 pr-4 font-semibold">{formatMAD(r.total)}</td>
                    <td className="py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function Stat({ label, value, icon, accent }: { label: string; value: string; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border border-border p-5 shadow-soft ${accent ? "bg-gradient-emerald text-ivory" : "bg-card"}`}>
      <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${accent ? "bg-white/15" : "bg-primary/10 text-primary"}`}>
        {icon}
      </div>
      <p className={`mt-3 text-xs uppercase tracking-wide ${accent ? "text-ivory/75" : "text-muted-foreground"}`}>{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
    </div>
  );
}
