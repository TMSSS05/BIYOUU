import { useTranslation } from "react-i18next";
import { ArrowRight, Waves, Mountain } from "lucide-react";
import { assets } from "@/data/assets";

export function Activities() {
  const { t } = useTranslation();
  const aqua = t("aquatic.items", { returnObjects: true }) as string[];
  const land = t("land.items", { returnObjects: true }) as string[];

  return (
    <section id="activities" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <ActivityCard
          id="aquatic"
          icon={Waves}
          eyebrow={t("aquatic.eyebrow")}
          title={t("aquatic.title")}
          subtitle={t("aquatic.subtitle")}
          items={aqua}
          cta={t("aquatic.cta")}
          imgDesktop={assets.aquaticDesktop}
          imgMobile={assets.aquaticMobile}
          tone="ocean"
        />
        <ActivityCard
          id="land"
          icon={Mountain}
          eyebrow={t("land.eyebrow")}
          title={t("land.title")}
          subtitle={t("land.subtitle")}
          items={land}
          cta={t("land.cta")}
          imgDesktop={assets.landDesktop}
          imgMobile={assets.landMobile}
          tone="sand"
        />
      </div>
    </section>
  );
}

function ActivityCard({
  id, icon: Icon, eyebrow, title, subtitle, items, cta, imgDesktop, imgMobile, tone,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string; title: string; subtitle: string; items: string[]; cta: string;
  imgDesktop: string; imgMobile: string; tone: "ocean" | "sand";
}) {
  const overlay = tone === "ocean"
    ? "from-[oklch(0.22_0.06_240)]/90 via-[oklch(0.32_0.08_220)]/55"
    : "from-[oklch(0.28_0.06_45)]/90 via-[oklch(0.4_0.08_55)]/55";

  return (
    <article id={id} className="group relative isolate flex aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elegant md:aspect-[5/6]">
      <picture>
        <source media="(min-width: 768px)" srcSet={imgDesktop} />
        <img src={imgMobile} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </picture>
      <div className={`absolute inset-0 bg-gradient-to-t ${overlay} to-transparent`} />
      <div className="relative z-10 mt-auto flex w-full flex-col gap-4 p-7 text-ivory md:p-9">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-copper" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">{eyebrow}</span>
        </div>
        <h3 className="font-display text-3xl leading-tight text-ivory md:text-4xl">{title}</h3>
        <p className="max-w-md text-sm leading-relaxed text-ivory/85">{subtitle}</p>
        <ul className="flex flex-wrap gap-2">
          {items.map((it) => (
            <li key={it} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-ivory backdrop-blur-md">
              {it}
            </li>
          ))}
        </ul>
        <a href="#packs" className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-copper px-5 py-3 text-sm font-semibold text-copper-foreground shadow-copper transition-transform hover:-translate-y-0.5">
          {cta} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </a>
      </div>
    </article>
  );
}
