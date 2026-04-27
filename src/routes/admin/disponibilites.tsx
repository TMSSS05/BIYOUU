import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { offers } from "@/data/offers";

export const Route = createFileRoute("/admin/disponibilites")({
  head: () => ({ meta: [{ title: "Admin — Disponibilités" }] }),
  component: () => (
    <AdminLayout title="Disponibilités">
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr><th className="px-4 py-3">Offre</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3">Action</th></tr>
          </thead>
          <tbody>
            {offers.map((o) => (
              <tr key={o.slug} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{o.title}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${o.available ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                    {o.available ? "Disponible" : "Indisponible"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs"><button className="text-primary hover:underline">Modifier</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  ),
});
