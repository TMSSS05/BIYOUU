import { useTranslation } from "react-i18next";
import { Check, ArrowRight, Star } from "lucide-react";
import { assets } from "@/data/assets";
import { SectionHeader } from "./Categories";

export function Vehicles() {
  const { t } = useTranslation();
  const points = ["verified", "delivery", "driver", "docs"] as const;
  const fleet = [
    { key: "city", price: 350 },
    { key: "suv", price: 650 },
    { key: "gclass", price: 2200 },
    { key: "moto", price: 280 },
  ] as const;

  return (
    <section id="vehicles" className="w-full max-w-full px-4 py-20 sm:px-5 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto grid w-full max-w-[430px] gap-10 sm:max-w-[480px] sm:gap-12 md:max-w-7xl md:grid-cols-2 md:items-center md:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-elegant sm:rounded-[28px] md:rounded-[2rem]">
          <img src={assets.vehicles} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-x-4 bottom-4 rounded-xl glass p-3 sm:inset-x-6 sm:bottom-6 sm:rounded-2xl sm:p-4">
            <div className="flex items-center gap-2 text-[12px] font-medium text-foreground sm:text-sm">
              <Star className="h-4 w-4 fill-copper text-copper" /> 4.9 / 5 — 220+ avis
            </div>
          </div>
        </div>
        <div>
          <SectionHeader eyebrow={t("vehicles.eyebrow")} title={t("vehicles.title")} subtitle={t("vehicles.subtitle")} />
          <ul className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[13px] text-foreground/85 sm:text-sm">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {t(`vehicles.points.${p}`)}
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3">
            {fleet.map((f) => (
              <div key={f.key} className="rounded-xl border border-border/70 bg-card p-3.5 transition-shadow hover:shadow-soft sm:rounded-2xl sm:p-4">
                <p className="text-[13px] font-semibold text-foreground sm:text-sm">{t(`vehicles.fleet.${f.key}`)}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground sm:mt-1 sm:text-xs">{f.price} MAD {t("vehicles.perDay")}</p>
              </div>
            ))}
          </div>

          <a href="#packs" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:mt-8 sm:px-6 sm:py-3.5">
            {t("vehicles.cta")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </section>
  );
}
