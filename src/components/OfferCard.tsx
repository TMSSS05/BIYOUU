import { Link } from "@tanstack/react-router";
import type { Offer } from "@/types";
import { formatMAD } from "@/lib/cart";
import { Star, MapPin, ArrowRight } from "lucide-react";

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
      <Link
        to="/offres/$slug"
        params={{ slug: offer.slug }}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <img
          src={offer.images[0]}
          alt={offer.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {offer.range && (
          <span className="absolute left-4 top-4 rounded-full bg-copper px-3 py-1 text-xs font-semibold uppercase tracking-wide text-copper-foreground shadow-copper">
            {offer.range}
          </span>
        )}
        {!offer.available && (
          <span className="absolute right-4 top-4 rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
            Indisponible
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-foreground">{offer.title}</h3>
          <div className="flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-copper text-copper" />
            <span className="font-semibold text-foreground">{offer.rating}</span>
            <span className="text-muted-foreground">({offer.reviews})</span>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {offer.location}
        </p>
        <p className="line-clamp-2 text-sm text-foreground/75">{offer.shortDescription}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            {offer.price > 0 ? (
              <>
                <p className="text-xs text-muted-foreground">À partir de</p>
                <p className="font-display text-xl text-primary">
                  {formatMAD(offer.price)}{" "}
                  <span className="text-sm font-sans text-muted-foreground">/ {offer.unit}</span>
                </p>
              </>
            ) : (
              <p className="font-display text-base text-primary">Sur recommandation</p>
            )}
          </div>
          <Link
            to="/offres/$slug"
            params={{ slug: offer.slug }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform group-hover:translate-x-0.5"
          >
            Voir <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
