import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { CategoryListing, FilterGroup, FilterCheckbox } from "@/components/CategoryListing";
import { getOffersByCategory, CATEGORY_META } from "@/data/offers";

export const Route = createFileRoute("/logements")({
  head: () => ({
    meta: [
      { title: "Villas & appartements — BIYOUU" },
      { name: "description", content: "Villas avec piscine, appartements et riads sélectionnés dans le Nord du Maroc." },
      { property: "og:title", content: "Villas & appartements — BIYOUU" },
      { property: "og:description", content: "Adresses sélectionnées avec piscine, vue mer ou patio marocain." },
      { property: "og:image", content: CATEGORY_META.logements.image },
    ],
  }),
  component: LogementsPage,
});

function LogementsPage() {
  const meta = CATEGORY_META.logements;
  const all = getOffersByCategory("logements");
  const [types, setTypes] = useState<string[]>([]);
  const [pool, setPool] = useState(false);
  const [sea, setSea] = useState(false);
  const [minCap, setMinCap] = useState(2);
  const [maxPrice, setMaxPrice] = useState(6000);

  const toggle = (arr: string[], v: string, set: (s: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = all.filter((o) => {
    if (types.length && !types.includes(o.stayType ?? "")) return false;
    if (pool && !o.hasPool) return false;
    if (sea && !o.seaView) return false;
    if ((o.capacity ?? 0) < minCap) return false;
    if (o.price > maxPrice) return false;
    return true;
  });

  return (
    <SiteLayout>
      <PageHero eyebrow="Logements d'exception" title={meta.title} subtitle={meta.subtitle} image={meta.image} />
      <CategoryListing
        offers={filtered}
        filters={
          <>
            <FilterGroup label="Type">
              {[
                { v: "villa", l: "Villa" },
                { v: "appartement", l: "Appartement" },
              ].map((o) => (
                <FilterCheckbox
                  key={o.v}
                  checked={types.includes(o.v)}
                  onChange={() => toggle(types, o.v, setTypes)}
                  label={o.l}
                />
              ))}
            </FilterGroup>
            <FilterGroup label="Capacité (personnes)">
              <input
                type="range"
                min={1}
                max={12}
                value={minCap}
                onChange={(e) => setMinCap(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm text-foreground">{minCap}+ voyageurs</p>
            </FilterGroup>
            <FilterGroup label="Prix max / nuit">
              <input
                type="range"
                min={800}
                max={6000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm text-foreground">{maxPrice} MAD</p>
            </FilterGroup>
            <FilterGroup label="Confort">
              <FilterCheckbox checked={pool} onChange={setPool} label="Piscine" />
              <FilterCheckbox checked={sea} onChange={setSea} label="Vue mer" />
            </FilterGroup>
          </>
        }
      />
    </SiteLayout>
  );
}
