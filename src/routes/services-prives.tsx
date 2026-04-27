import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { CategoryListing, FilterGroup, FilterCheckbox } from "@/components/CategoryListing";
import { getOffersByCategory, CATEGORY_META } from "@/data/offers";

export const Route = createFileRoute("/services-prives")({
  head: () => ({
    meta: [
      { title: "Services privés — BIYOUU" },
      { name: "description", content: "Chef à domicile, ménage, garde d'enfants, chauffeur privé et transferts aéroport." },
      { property: "og:title", content: "Services privés — BIYOUU" },
      { property: "og:description", content: "Une équipe discrète et vérifiée à votre service." },
      { property: "og:image", content: CATEGORY_META["services-prives"].image },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const meta = CATEGORY_META["services-prives"];
  const all = getOffersByCategory("services-prives");
  const [types, setTypes] = useState<string[]>([]);
  const [home, setHome] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1500);

  const toggle = (arr: string[], v: string, set: (s: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = all.filter((o) => {
    if (types.length && !types.includes(o.serviceType ?? "")) return false;
    if (home && !o.atHome) return false;
    if (o.price > maxPrice) return false;
    return true;
  });

  return (
    <SiteLayout>
      <PageHero eyebrow="Services privés" title={meta.title} subtitle={meta.subtitle} image={meta.image} />
      <CategoryListing
        offers={filtered}
        filters={
          <>
            <FilterGroup label="Type de service">
              {[
                { v: "chef", l: "Chef à domicile" },
                { v: "menage", l: "Ménage" },
                { v: "garde", l: "Garde d'enfants" },
                { v: "chauffeur", l: "Chauffeur privé" },
                { v: "transfert", l: "Transfert" },
              ].map((o) => (
                <FilterCheckbox
                  key={o.v}
                  checked={types.includes(o.v)}
                  onChange={() => toggle(types, o.v, setTypes)}
                  label={o.l}
                />
              ))}
            </FilterGroup>
            <FilterGroup label="Lieu">
              <FilterCheckbox checked={home} onChange={setHome} label="Intervention à domicile" />
            </FilterGroup>
            <FilterGroup label="Prix max">
              <input
                type="range"
                min={100}
                max={1500}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm text-foreground">{maxPrice} MAD</p>
            </FilterGroup>
          </>
        }
      />
    </SiteLayout>
  );
}
