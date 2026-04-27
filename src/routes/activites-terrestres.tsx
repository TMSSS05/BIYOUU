import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { CategoryListing, FilterGroup, FilterCheckbox } from "@/components/CategoryListing";
import { getOffersByCategory, CATEGORY_META } from "@/data/offers";

export const Route = createFileRoute("/activites-terrestres")({
  head: () => ({
    meta: [
      { title: "Activités terrestres — BIYOUU" },
      { name: "description", content: "Quad, paintball, excursions et aventures encadrées dans le Nord du Maroc." },
      { property: "og:title", content: "Activités terrestres — BIYOUU" },
      { property: "og:description", content: "Aventures encadrées par des professionnels." },
      { property: "og:image", content: CATEGORY_META["activites-terrestres"].image },
    ],
  }),
  component: LandPage,
});

function LandPage() {
  const meta = CATEGORY_META["activites-terrestres"];
  const all = getOffersByCategory("activites-terrestres");
  const [levels, setLevels] = useState<string[]>([]);
  const [minCap, setMinCap] = useState(1);
  const [maxPrice, setMaxPrice] = useState(2000);

  const toggle = (arr: string[], v: string, set: (s: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = all.filter((o) => {
    if (levels.length && !levels.includes(o.level ?? "")) return false;
    if ((o.capacity ?? 0) < minCap) return false;
    if (o.price > maxPrice) return false;
    return true;
  });

  return (
    <SiteLayout>
      <PageHero eyebrow="Aventures terrestres" title={meta.title} subtitle={meta.subtitle} image={meta.image} />
      <CategoryListing
        offers={filtered}
        filters={
          <>
            <FilterGroup label="Niveau">
              {["detente", "famille", "aventure"].map((l) => (
                <FilterCheckbox
                  key={l}
                  checked={levels.includes(l)}
                  onChange={() => toggle(levels, l, setLevels)}
                  label={l.charAt(0).toUpperCase() + l.slice(1)}
                />
              ))}
            </FilterGroup>
            <FilterGroup label="Personnes">
              <input
                type="range"
                min={1}
                max={20}
                value={minCap}
                onChange={(e) => setMinCap(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm text-foreground">{minCap}+ personnes</p>
            </FilterGroup>
            <FilterGroup label="Prix max / personne">
              <input
                type="range"
                min={200}
                max={2000}
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
