import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { CategoryListing, FilterGroup, FilterCheckbox } from "@/components/CategoryListing";
import { getOffersByCategory, CATEGORY_META } from "@/data/offers";

export const Route = createFileRoute("/vehicules")({
  head: () => ({
    meta: [
      { title: "Véhicules premium — BIYOUU" },
      { name: "description", content: "Citadines, SUV, G-Class et deux-roues livrés à votre villa ou aéroport. Réservation simple, vérifiée et sécurisée." },
      { property: "og:title", content: "Véhicules premium — BIYOUU" },
      { property: "og:description", content: "Mobilité privée vérifiée dans le Nord du Maroc." },
      { property: "og:image", content: CATEGORY_META.vehicules.image },
    ],
  }),
  component: VehiculesPage,
});

function VehiculesPage() {
  const meta = CATEGORY_META.vehicules;
  const all = getOffersByCategory("vehicules");
  const [types, setTypes] = useState<string[]>([]);
  const [ranges, setRanges] = useState<string[]>([]);
  const [airport, setAirport] = useState(false);
  const [available, setAvailable] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2500);

  const toggle = (arr: string[], v: string, set: (s: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = all.filter((o) => {
    if (types.length && !types.includes(o.vehicleType ?? "")) return false;
    if (ranges.length && !ranges.includes(o.range ?? "")) return false;
    if (airport && !o.airportDelivery) return false;
    if (available && !o.available) return false;
    if (o.price > maxPrice) return false;
    return true;
  });

  return (
    <SiteLayout>
      <PageHero eyebrow="Mobilité privée" title={meta.title} subtitle={meta.subtitle} image={meta.image} />
      <CategoryListing
        offers={filtered}
        filters={
          <>
            <FilterGroup label="Type">
              {[
                { v: "citadine", l: "Citadine" },
                { v: "suv", l: "SUV" },
                { v: "luxe", l: "Luxe" },
                { v: "moto", l: "Deux-roues" },
              ].map((o) => (
                <FilterCheckbox
                  key={o.v}
                  checked={types.includes(o.v)}
                  onChange={() => toggle(types, o.v, setTypes)}
                  label={o.l}
                />
              ))}
            </FilterGroup>
            <FilterGroup label="Gamme">
              {["standard", "premium", "luxe"].map((r) => (
                <FilterCheckbox
                  key={r}
                  checked={ranges.includes(r)}
                  onChange={() => toggle(ranges, r, setRanges)}
                  label={r.charAt(0).toUpperCase() + r.slice(1)}
                />
              ))}
            </FilterGroup>
            <FilterGroup label="Prix max / jour">
              <input
                type="range"
                min={300}
                max={2500}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm text-foreground">{maxPrice} MAD</p>
            </FilterGroup>
            <FilterGroup label="Options">
              <FilterCheckbox checked={airport} onChange={setAirport} label="Livraison aéroport" />
              <FilterCheckbox checked={available} onChange={setAvailable} label="Disponible immédiatement" />
            </FilterGroup>
          </>
        }
      />
    </SiteLayout>
  );
}
