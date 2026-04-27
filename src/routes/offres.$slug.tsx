import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { getOfferBySlug, getSupplierById, CATEGORY_META } from "@/data/offers";
import type { Offer } from "@/types";
import { formatMAD } from "@/lib/cart";
import { Star, MapPin, Check, FileText, MessageCircle, ArrowRight, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/offres/$slug")({
  loader: ({ params }): { offer: Offer } => {
    const offer = getOfferBySlug(params.slug);
    if (!offer) throw notFound();
    return { offer };
  },
  head: ({ loaderData }) => {
    const o = loaderData?.offer;
    if (!o) return { meta: [{ title: "Offre — BIYOUU" }] };
    return {
      meta: [
        { title: `${o.title} — BIYOUU` },
        { name: "description", content: o.shortDescription },
        { property: "og:title", content: `${o.title} — BIYOUU` },
        { property: "og:description", content: o.shortDescription },
        { property: "og:image", content: o.images[0] },
      ],
    };
  },
  component: OfferDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl">Offre introuvable</h1>
        <p className="mt-3 text-muted-foreground">Cette offre n'existe pas ou a été retirée.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          Retour à l'accueil
        </Link>
      </div>
    </SiteLayout>
  ),
});

function OfferDetail() {
  const { offer } = Route.useLoaderData() as { offer: Offer };
  const supplier = getSupplierById(offer.supplierId);
  const cat = CATEGORY_META[offer.category];

  const waMessage = encodeURIComponent(
    `Bonjour BIYOUU, je suis intéressé(e) par l'offre "${offer.title}". Pouvez-vous me confirmer la disponibilité ?`,
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Accueil</Link>
          <span>/</span>
          <Link to={cat.route as "/vehicules"} className="hover:text-foreground">{cat.title}</Link>
          <span>/</span>
          <span className="text-foreground">{offer.title}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 md:px-8 lg:grid-cols-[1fr_380px]">
        <div>
          {/* Gallery */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="relative col-span-1 sm:col-span-2 overflow-hidden rounded-3xl">
              <img src={offer.images[0]} alt={offer.title} className="aspect-[4/3] h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              {(offer.images[1] ? [offer.images[1], offer.images[1]] : [offer.images[0], offer.images[0]]).map((src, i) => (
                <div key={i} className="overflow-hidden rounded-2xl">
                  <img src={src} alt="" className="aspect-[4/3] h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Header */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">{cat.title}</p>
            <h1 className="mt-2 font-display text-4xl text-foreground md:text-5xl">{offer.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {offer.location}</span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-copper text-copper" /> {offer.rating} ({offer.reviews} avis)
              </span>
              {offer.duration && <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {offer.duration}</span>}
              {offer.capacity && <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {offer.capacity} pers.</span>}
            </div>
          </div>

          <div className="prose prose-neutral mt-8 max-w-none">
            <h2 className="font-display text-2xl">Description</h2>
            <p className="text-foreground/80">{offer.description}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg">Avantages</h3>
              <ul className="space-y-2.5">
                {offer.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 font-display text-lg">Conditions</h3>
              <ul className="space-y-2.5">
                {offer.conditions.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" /> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {offer.documents.length > 0 && (
            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg">
                <FileText className="h-5 w-5 text-primary" /> Documents requis
              </h3>
              <div className="flex flex-wrap gap-2">
                {offer.documents.map((d) => (
                  <span key={d} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium">
                    {d === "id" && "Pièce d'identité"}
                    {d === "passport" && "Passeport"}
                    {d === "license" && "Permis de conduire"}
                  </span>
                ))}
              </div>
            </div>
          )}

          {supplier && (
            <div className="mt-6 rounded-2xl bg-gradient-emerald p-6 text-ivory">
              <p className="text-xs uppercase tracking-wide opacity-80">Partenaire vérifié</p>
              <p className="mt-1 font-display text-xl">{supplier.name}</p>
              <p className="mt-2 text-sm opacity-90">Réservation organisée et accompagnée par BIYOUU.</p>
            </div>
          )}
        </div>

        {/* Sticky reservation card */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant">
            {offer.price > 0 ? (
              <>
                <p className="text-xs text-muted-foreground">À partir de</p>
                <p className="font-display text-3xl text-primary">
                  {formatMAD(offer.price)}{" "}
                  <span className="text-sm font-sans text-muted-foreground">/ {offer.unit}</span>
                </p>
              </>
            ) : (
              <p className="font-display text-2xl text-primary">Sur recommandation</p>
            )}

            <div className="mt-5 flex flex-col gap-3">
              <Link
                to="/reservation/$slug"
                params={{ slug: offer.slug }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-copper py-3.5 text-sm font-semibold text-copper-foreground shadow-copper transition-transform hover:-translate-y-0.5"
              >
                Réserver maintenant <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/212600000000?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card py-3.5 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" /> Demander sur WhatsApp
              </a>
            </div>

            <div className="mt-6 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Annulation encadrée</p>
              <p className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Paiement sécurisé</p>
              <p className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Assistance 24/7</p>
            </div>
          </div>
        </aside>
      </div>
    </SiteLayout>
  );
}
