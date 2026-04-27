import { useTranslation } from "react-i18next";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { assets } from "@/data/assets";
import { SectionHeader } from "./Categories";

const PACKS = [
  { key: "standard", nights: 3, recommended: false },
  { key: "comfort", nights: 5, recommended: false },
  { key: "premium", nights: 7, recommended: true },
  { key: "luxury", nights: 7, recommended: false },
] as const;

export function Restaurants() {
  const { t } = useTranslation();
  return (
    <section id="restaurants" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="aspect-square overflow-hidden rounded-[2rem] shadow-elegant">
          <img src={assets.restaurants} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <SectionHeader eyebrow={t("restaurants.eyebrow")} title={t("restaurants.title")} subtitle={t("restaurants.subtitle")} />
          <a href="#packs" className="mt-8 inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3.5 text-sm font-semibold text-copper-foreground shadow-copper transition-transform hover:-translate-y-0.5">
            {t("restaurants.cta")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Packs() {
  const { t } = useTranslation();
  return (
    <section id="packs" className="bg-cream/60 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t("packs.eyebrow")} title={t("packs.title")} subtitle={t("packs.subtitle")} align="center" />
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PACKS.map((p) => {
            const incl = t(`packs.items.${p.key}.incl`, { returnObjects: true }) as string[];
            const isReco = p.recommended;
            return (
              <article
                key={p.key}
                className={`relative flex flex-col rounded-3xl border p-7 transition-all hover:-translate-y-1 ${
                  isReco
                    ? "border-copper/40 bg-primary text-ivory shadow-elegant"
                    : "border-border/70 bg-card text-foreground shadow-soft"
                }`}
              >
                {isReco && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-copper px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-copper-foreground shadow-copper">
                    <Sparkles className="h-3 w-3" /> {t("packs.recommended")}
                  </span>
                )}
                <h3 className="font-display text-2xl">{t(`packs.items.${p.key}.name`)}</h3>
                <p className={`mt-1 text-xs ${isReco ? "text-ivory/70" : "text-muted-foreground"}`}>
                  {t("packs.duration", { n: p.nights })}
                </p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className={`text-sm line-through ${isReco ? "text-ivory/50" : "text-muted-foreground"}`}>
                    {t(`packs.items.${p.key}.old`)} MAD
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl">{t(`packs.items.${p.key}.new`)}</span>
                  <span className="text-sm font-medium opacity-80">MAD</span>
                </div>
                <p className={`mt-3 text-sm ${isReco ? "text-ivory/80" : "text-foreground/70"}`}>
                  {t(`packs.items.${p.key}.desc`)}
                </p>
                <ul className={`mt-5 space-y-2 border-t pt-5 text-sm ${isReco ? "border-white/10" : "border-border"}`}>
                  {incl.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isReco ? "text-copper" : "text-primary"}`} />
                      <span className={isReco ? "text-ivory/90" : "text-foreground/80"}>{i}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                    isReco
                      ? "bg-copper text-copper-foreground shadow-copper"
                      : "bg-primary text-primary-foreground shadow-soft"
                  }`}
                >
                  {t("packs.cta")}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
