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
    <section id="vehicles" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-elegant">
          <img src={assets.vehicles} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-x-6 bottom-6 rounded-2xl glass p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Star className="h-4 w-4 fill-copper text-copper" /> 4.9 / 5 — 220+ avis
            </div>
          </div>
        </div>
        <div>
          <SectionHeader eyebrow={t("vehicles.eyebrow")} title={t("vehicles.title")} subtitle={t("vehicles.subtitle")} />
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground/85">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {t(`vehicles.points.${p}`)}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {fleet.map((f) => (
              <div key={f.key} className="rounded-2xl border border-border/70 bg-card p-4 transition-shadow hover:shadow-soft">
                <p className="text-sm font-semibold text-foreground">{t(`vehicles.fleet.${f.key}`)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{f.price} MAD {t("vehicles.perDay")}</p>
              </div>
            ))}
          </div>

          <a href="#packs" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">
            {t("vehicles.cta")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </section>
  );
}
