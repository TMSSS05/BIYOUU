import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { assets } from "@/data/assets";
import { SectionHeader } from "./Categories";

export function Villas() {
  const { t } = useTranslation();
  const tags = t("villas.tags", { returnObjects: true }) as string[];

  return (
    <section id="stays" className="bg-cream/60 w-full max-w-full px-4 py-20 sm:px-5 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto grid w-full max-w-[430px] gap-10 sm:max-w-[480px] sm:gap-12 md:max-w-7xl md:grid-cols-2 md:items-center">
        <div className="order-2 md:order-1">
          <SectionHeader eyebrow={t("villas.eyebrow")} title={t("villas.title")} subtitle={t("villas.subtitle")} />
          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-foreground/80 sm:px-4 sm:py-1.5 sm:text-xs">
                {tag}
              </span>
            ))}
          </div>
          <a href="#packs" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:mt-8 sm:px-6 sm:py-3.5">
            {t("villas.cta")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
        <div className="order-1 grid w-full gap-3 sm:grid-cols-2 md:order-2">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-elegant sm:row-span-2 sm:rounded-[28px] md:aspect-[3/4] md:rounded-[2rem]">
            <img src={assets.villas} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-soft sm:rounded-[28px] md:rounded-3xl">
            <img src={assets.restaurants} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-soft sm:rounded-[28px] md:rounded-3xl">
            <img src={assets.housekeeping} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
