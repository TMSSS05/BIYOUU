import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { CategoryListing } from "@/components/CategoryListing";
import { getOffersByCategory, CATEGORY_META } from "@/data/offers";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: "Packs séjour — BIYOUU" },
      { name: "description", content: "Packs séjour clés en main : logement, véhicule, activités et services privés." },
      { property: "og:title", content: "Packs séjour — BIYOUU" },
      { property: "og:description", content: "Combinez tout dans une seule réservation." },
      { property: "og:image", content: CATEGORY_META.packs.image },
    ],
  }),
  component: PacksPage,
});

function PacksPage() {
  const meta = CATEGORY_META.packs;
  const all = getOffersByCategory("packs");
  return (
    <SiteLayout>
      <PageHero eyebrow="Packs sur mesure" title={meta.title} subtitle={meta.subtitle} image={meta.image} />
      <CategoryListing offers={all} />
    </SiteLayout>
  );
}
