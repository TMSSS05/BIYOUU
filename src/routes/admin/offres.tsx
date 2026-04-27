import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { offers, CATEGORY_META } from "@/data/offers";
import { formatMAD } from "@/lib/cart";

export const Route = createFileRoute("/admin/offres")({
  head: () => ({ meta: [{ title: "Admin — Offres" }] }),
  component: AdminOffers,
});

function AdminOffers() {
  return (
    <AdminLayout title="Offres">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Prix</th>
                <th className="px-4 py-3">Disponibilité</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o) => (
                <tr key={o.slug} className="border-t border-border">
                  <td className="px-4 py-3"><img src={o.images[0]} alt="" className="h-12 w-16 rounded object-cover" /></td>
                  <td className="px-4 py-3 font-medium">{o.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{CATEGORY_META[o.category].title}</td>
                  <td className="px-4 py-3">{o.price > 0 ? formatMAD(o.price) : "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${o.available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {o.available ? "Disponible" : "Indisponible"}
                    </span>
                  </td>
                  <td className="px-4 py-3"><span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Publiée</span></td>
                  <td className="px-4 py-3 text-xs">
                    <button className="text-primary hover:underline">Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
