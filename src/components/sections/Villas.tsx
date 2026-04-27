import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { assets } from "@/data/assets";
import { SectionHeader } from "./Categories";

export function Villas() {
  const { t } = useTranslation();
  const tags = t("villas.tags", { returnObjects: true }) as string[];

  return (
    <section id="stays" className="bg-cream/60 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <SectionHeader eyebrow={t("villas.eyebrow")} title={t("villas.title")} subtitle={t("villas.subtitle")} />
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-foreground/80">
                {tag}
              </span>
            ))}
          </div>
          <a href="#packs" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">
            {t("villas.cta")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
        <div className="order-1 grid gap-3 sm:grid-cols-2 lg:order-2">
          <div className="aspect-[3/4] overflow-hidden rounded-[2rem] shadow-elegant sm:row-span-2">
            <img src={assets.villas} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden rounded-3xl shadow-soft">
            <img src={assets.restaurants} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden rounded-3xl shadow-soft">
            <img src={assets.housekeeping} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
