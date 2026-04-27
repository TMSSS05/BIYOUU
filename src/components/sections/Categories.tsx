import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { assets } from "@/data/assets";

const ITEMS = [
  { key: "vehicles", img: assets.vehicles, anchor: "#vehicles" },
  { key: "villas", img: assets.villas, anchor: "#stays" },
  { key: "aquatic", img: assets.aquaticDesktop, anchor: "#aquatic" },
  { key: "land", img: assets.landDesktop, anchor: "#land" },
  { key: "services", img: assets.chef, anchor: "#services" },
  { key: "restaurants", img: assets.restaurants, anchor: "#restaurants" },
] as const;

export function Categories() {
  const { t } = useTranslation();
  return (
    <section id="categories" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="BIYOUU"
          title={t("categories.title")}
          subtitle={t("categories.subtitle")}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <a
              key={item.key}
              href={item.anchor}
              className="group relative isolate flex aspect-[4/5] overflow-hidden rounded-3xl border border-border/60 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={item.img}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
              <div className="relative z-10 mt-auto flex w-full flex-col gap-3 p-6 text-ivory">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-copper">
                  {t("categories.from")} {t(`categories.items.${item.key}.price`)}
                </span>
                <h3 className="font-display text-2xl leading-tight text-ivory md:text-3xl">
                  {t(`categories.items.${item.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-ivory/85">
                  {t(`categories.items.${item.key}.desc`)}
                </p>
                <span className="mt-2 inline-flex items-center gap-2 self-start rounded-full bg-ivory/15 px-4 py-2 text-sm font-medium text-ivory backdrop-blur-md transition-all group-hover:bg-copper group-hover:text-copper-foreground">
                  {t("categories.discover")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  const titleColor = light ? "text-ivory" : "text-foreground";
  const subColor = light ? "text-ivory/80" : "text-muted-foreground";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && (
        <span className={`text-xs font-semibold uppercase tracking-[0.22em] ${light ? "text-copper" : "text-copper"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-3 font-display text-3xl leading-tight md:text-5xl text-balance ${titleColor}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base leading-relaxed md:text-lg text-pretty ${subColor}`}>{subtitle}</p>}
    </div>
  );
}
