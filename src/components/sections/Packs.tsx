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
    <section id="restaurants" className="w-full max-w-full px-4 py-20 sm:px-5 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto grid w-full max-w-[430px] gap-8 sm:max-w-[480px] sm:gap-10 md:max-w-7xl md:grid-cols-2 md:items-center md:gap-12">
        <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-elegant sm:rounded-[28px] md:rounded-[2rem]">
          <img src={assets.restaurants} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <SectionHeader eyebrow={t("restaurants.eyebrow")} title={t("restaurants.title")} subtitle={t("restaurants.subtitle")} />
          <a href="#packs" className="mt-6 inline-flex items-center gap-2 rounded-full bg-copper px-5 py-3 text-sm font-semibold text-copper-foreground shadow-copper transition-transform hover:-translate-y-0.5 sm:mt-8 sm:px-6 sm:py-3.5">
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
    <section id="packs" className="bg-cream/60 w-full max-w-full px-4 py-20 sm:px-5 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-[430px] sm:max-w-[480px] md:max-w-7xl">
        <SectionHeader eyebrow={t("packs.eyebrow")} title={t("packs.title")} subtitle={t("packs.subtitle")} align="center" />
        <div className="mx-auto mt-10 grid w-full max-w-[430px] gap-4 sm:mt-12 sm:max-w-[480px] sm:gap-5 md:max-w-6xl md:grid-cols-2 lg:grid-cols-4">
          {PACKS.map((p) => {
            const incl = t(`packs.items.${p.key}.incl`, { returnObjects: true }) as string[];
            const isReco = p.recommended;
            return (
              <article
                key={p.key}
                className={`relative flex w-full flex-col rounded-2xl border p-5 transition-all hover:-translate-y-1 sm:rounded-[28px] sm:p-6 md:p-7 ${
                  isReco
                    ? "border-copper/40 bg-primary text-ivory shadow-elegant"
                    : "border-border/70 bg-card text-foreground shadow-soft"
                }`}
              >
                {isReco && (
                  <span className="absolute -top-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-copper px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-copper-foreground shadow-copper sm:text-[10px] sm:tracking-[0.18em]">
                    <Sparkles className="h-3 w-3" /> {t("packs.recommended")}
                  </span>
                )}
                <h3 className="font-display text-[22px] sm:text-2xl">{t(`packs.items.${p.key}.name`)}</h3>
                <p className={`mt-0.5 text-[11px] sm:mt-1 sm:text-xs ${isReco ? "text-ivory/70" : "text-muted-foreground"}`}>
                  {t("packs.duration", { n: p.nights })}
                </p>
                <div className="mt-4 flex items-baseline gap-2 sm:mt-5">
                  <span className={`text-sm line-through ${isReco ? "text-ivory/50" : "text-muted-foreground"}`}>
                    {t(`packs.items.${p.key}.old`)} MAD
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-[32px] sm:text-4xl">{t(`packs.items.${p.key}.new`)}</span>
                  <span className="text-sm font-medium opacity-80">MAD</span>
                </div>
                <p className={`mt-2 text-[13px] ${isReco ? "text-ivory/80" : "text-foreground/70"} sm:mt-3 sm:text-sm`}>
                  {t(`packs.items.${p.key}.desc`)}
                </p>
                <ul className={`mt-4 space-y-2 border-t pt-4 text-[13px] sm:mt-5 sm:border-t sm:pt-5 ${
                  isReco ? "border-white/10" : "border-border"
                }`}>
                  {incl.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isReco ? "text-copper" : "text-primary"}`} />
                      <span className={isReco ? "text-ivory/90" : "text-foreground/80"}>{i}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[13px] font-semibold transition-transform hover:-translate-y-0.5 sm:mt-6 sm:px-5 sm:py-3 sm:text-sm ${
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
