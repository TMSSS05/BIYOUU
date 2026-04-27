import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { getOffersByCategory } from "@/data/offers";
import { formatMAD } from "@/lib/cart";

export const Route = createFileRoute("/admin/packs")({
  head: () => ({ meta: [{ title: "Admin — Packs" }] }),
  component: () => {
    const packs = getOffersByCategory("packs");
    return (
      <AdminLayout title="Packs séjour">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {packs.map((p) => (
            <article key={p.slug} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="font-display text-lg">{p.title}</h3>
              <p className="text-xs text-muted-foreground">{p.duration} · {p.range}</p>
              <p className="mt-3 font-display text-xl text-primary">{formatMAD(p.price)}</p>
              <ul className="mt-3 space-y-1 text-sm text-foreground/85">
                {p.highlights.map((h) => <li key={h}>· {h}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </AdminLayout>
    );
  },
});
