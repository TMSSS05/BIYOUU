import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { suppliers, getOfferBySlug } from "@/data/offers";
import { Phone, Mail, MessageCircle, Copy } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/fournisseurs")({
  head: () => ({ meta: [{ title: "Admin — Fournisseurs" }] }),
  component: AdminSuppliers,
});

function AdminSuppliers() {
  const [copied, setCopied] = useState<string | null>(null);

  const buildMessage = (offerTitle: string) =>
    `Bonjour, nous avons une demande de réservation pour ${offerTitle} du [date début] au [date fin]. Pouvez-vous confirmer la disponibilité ?`;

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {/* noop */}
  };

  return (
    <AdminLayout title="Fournisseurs">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((s) => {
          const firstOffer = s.offerSlugs.map(getOfferBySlug).find(Boolean);
          const message = buildMessage(firstOffer?.title ?? "[offre]");
          return (
            <article key={s.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h3 className="font-display text-lg">{s.name}</h3>
              <div className="mt-3 space-y-1.5 text-sm text-foreground/85">
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-muted-foreground" /> {s.phone}</p>
                <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-muted-foreground" /> {s.email}</p>
              </div>
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Biens liés</p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {s.offerSlugs.map((slug) => {
                    const o = getOfferBySlug(slug);
                    return o ? <li key={slug} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{o.title}</li> : null;
                  })}
                </ul>
              </div>
              {s.notes && <p className="mt-3 rounded-xl bg-secondary/50 p-3 text-xs text-foreground/80"><span className="font-semibold">Notes : </span>{s.notes}</p>}
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
                <button
                  onClick={() => copy(s.id, message)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-secondary"
                >
                  <Copy className="h-3.5 w-3.5" /> {copied === s.id ? "Copié !" : "Copier message"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </AdminLayout>
  );
}
