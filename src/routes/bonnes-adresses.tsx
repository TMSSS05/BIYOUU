import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { CategoryListing } from "@/components/CategoryListing";
import { getOffersByCategory, CATEGORY_META } from "@/data/offers";

export const Route = createFileRoute("/bonnes-adresses")({
  head: () => ({
    meta: [
      { title: "Bonnes adresses — BIYOUU" },
      { name: "description", content: "Tables d'exception et expériences privées sélectionnées dans le Nord du Maroc." },
      { property: "og:title", content: "Bonnes adresses — BIYOUU" },
      { property: "og:description", content: "Réservations accompagnées par notre conciergerie." },
      { property: "og:image", content: CATEGORY_META["bonnes-adresses"].image },
    ],
  }),
  component: AddressesPage,
});

function AddressesPage() {
  const meta = CATEGORY_META["bonnes-adresses"];
  const all = getOffersByCategory("bonnes-adresses");
  return (
    <SiteLayout>
      <PageHero eyebrow="Bonnes adresses" title={meta.title} subtitle={meta.subtitle} image={meta.image} />
      <CategoryListing offers={all} />
    </SiteLayout>
  );
}
