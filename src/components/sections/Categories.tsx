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
    <section id="categories" className="w-full max-w-full px-4 py-20 sm:px-5 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-[430px] sm:max-w-[480px] md:max-w-7xl">
        <SectionHeader
          eyebrow="BIYOUU"
          title={t("categories.title")}
          subtitle={t("categories.subtitle")}
        />

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <a
              key={item.key}
              href={item.anchor}
              className="group relative isolate flex aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/60 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant sm:aspect-[4/5] sm:rounded-[28px] md:aspect-[4/5] md:rounded-3xl"
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
              <div className="relative z-10 mt-auto flex w-full flex-col gap-2.5 p-5 text-ivory sm:gap-3 sm:p-6 md:gap-3 md:p-6">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-copper sm:text-[11px] sm:tracking-[0.18em]">
                  {t("categories.from")} {t(`categories.items.${item.key}.price`)}
                </span>
                <h3 className="font-display text-[22px] leading-tight text-ivory sm:text-2xl md:text-3xl">
                  {t(`categories.items.${item.key}.title`)}
                </h3>
                <p className="text-[12px] leading-relaxed text-ivory/85 sm:text-sm">
                  {t(`categories.items.${item.key}.desc`)}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full bg-ivory/15 px-3 py-1.5 text-[11px] font-medium text-ivory backdrop-blur-md transition-all group-hover:bg-copper group-hover:text-copper-foreground sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                  {t("categories.discover")}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
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
    <div className={`max-w-2xl sm:max-w-3xl ${alignCls}`}>
      {eyebrow && (
        <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.22em] ${light ? "text-copper" : "text-copper"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-2 font-display text-[28px] leading-[1.1] text-balance sm:mt-3 sm:text-[32px] md:text-4xl lg:text-5xl ${titleColor}`}>{title}</h2>
      {subtitle && <p className={`mt-3 text-[14px] leading-[1.65] sm:mt-4 sm:text-base md:text-lg text-pretty ${subColor}`}>{subtitle}</p>}
    </div>
  );
}
