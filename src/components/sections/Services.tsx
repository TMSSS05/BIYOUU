import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { assets } from "@/data/assets";
import { SectionHeader } from "./Categories";

const ITEMS = [
  { key: "chef", img: assets.chef },
  { key: "housekeeping", img: assets.housekeeping },
  { key: "childcare", img: assets.childcare },
  { key: "driver", img: assets.vehicles },
  { key: "transfer", img: assets.vehicles },
] as const;

export function Services() {
  const { t } = useTranslation();
  return (
    <section id="services" className="bg-primary px-5 py-24 text-ivory md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t("services.eyebrow")} title={t("services.title")} subtitle={t("services.subtitle")} light />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <article key={it.key} className="group relative flex aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 shadow-elegant">
              <img src={it.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="relative z-10 mt-auto flex w-full flex-col gap-3 p-6 text-ivory">
                <h3 className="font-display text-2xl">{t(`services.items.${it.key}.title`)}</h3>
                <p className="text-sm text-ivory/80">{t(`services.items.${it.key}.desc`)}</p>
                <a href="#packs" className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-ivory/15 px-4 py-2 text-xs font-semibold text-ivory backdrop-blur-md transition-colors group-hover:bg-copper group-hover:text-copper-foreground">
                  {t(`services.items.${it.key}.cta`)} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
