import { useMemo, useState, type ReactNode } from "react";
import { OfferCard } from "./OfferCard";
import type { Offer } from "@/types";
import { Search, SlidersHorizontal, X } from "lucide-react";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

export function CategoryListing({
  offers,
  filters,
}: {
  offers: Offer[];
  filters?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = offers.filter((o) =>
      q ? o.title.toLowerCase().includes(q) || o.location.toLowerCase().includes(q) : true,
    );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [offers, query, sort]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une offre, une ville…"
            className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-3">
          {filters && (
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-secondary md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filtres
            </button>
          )}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-12 rounded-full border border-border bg-card px-4 text-sm outline-none focus:border-primary"
          >
            <option value="recommended">Recommandés</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Mieux notés</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {filters && (
          <>
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h3 className="mb-4 font-display text-lg">Filtres</h3>
                {filters}
              </div>
            </aside>
            {showFilters && (
              <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
                <div className="flex items-center justify-between border-b border-border p-5">
                  <h3 className="font-display text-xl">Filtres</h3>
                  <button onClick={() => setShowFilters(false)} aria-label="Fermer">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-5">{filters}</div>
                <div className="border-t border-border p-5">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Voir {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <div>
          <p className="mb-6 text-sm text-muted-foreground">
            {filtered.length} offre{filtered.length > 1 ? "s" : ""} disponible
            {filtered.length > 1 ? "s" : ""}
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">Aucune offre ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((o) => (
                <OfferCard key={o.slug} offer={o} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-5 border-b border-border pb-5 last:border-0 last:pb-0">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function FilterCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/85">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-border accent-primary"
      />
      {label}
    </label>
  );
}
