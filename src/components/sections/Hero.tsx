import { useTranslation } from "react-i18next";
import { ShieldCheck, Clock, Sparkles, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { assets } from "@/data/assets";

export function Hero() {
  const { t } = useTranslation();

  const badges = [
    { icon: Clock, key: "available" as const },
    { icon: ShieldCheck, key: "secure" as const },
    { icon: Sparkles, key: "premium" as const },
    { icon: MapPin, key: "north" as const },
  ];

  const stats: (keyof ReturnType<typeof statKeys>)[] = ["experiences", "support", "payment", "verified"];
  function statKeys() {
    return { experiences: "", support: "", payment: "", verified: "" };
  }

  return (
    <section id="top" className="relative isolate min-h-[100svh] w-full max-w-full overflow-hidden text-ivory">
      {/* Background images - full width */}
      <picture>
        <source media="(min-width: 768px)" srcSet={assets.heroDesktop} />
        <img
          src={assets.heroMobile}
          alt=""
          aria-hidden
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 45%" }}
        />
      </picture>

      {/* Overlays */}
      <div className="absolute inset-0 bg-hero-overlay-mobile md:bg-hero-overlay" aria-hidden />
      <div
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 80% at 20% 40%, rgba(0,0,0,0.55) 0%, transparent 60%)",
        }}
      />

      {/* Mobile-first container: centered, max-width mobile */}
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[430px] flex-col justify-end px-5 pb-6 pt-20 sm:max-w-[480px] md:min-h-[92vh] md:max-w-7xl md:justify-center md:px-8 md:pb-24 md:pt-32">
        <div className="max-w-xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" />
            {t("hero.eyebrow")}
          </span>

          <h1 className="mt-5 font-display text-[34px] leading-[1.02] text-balance text-ivory sm:text-[38px] md:text-6xl lg:text-7xl">
            {t("hero.title")}
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-[15px] leading-[1.65] text-ivory/85 sm:text-base md:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map(({ icon: Icon, key }) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/8 px-2.5 py-1 text-[11px] font-medium text-ivory/90 backdrop-blur-md"
              >
                <Icon className="h-3 w-3 text-copper" />
                {t(`hero.badges.${key}`)}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#packs"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-copper px-6 py-3.5 text-sm font-semibold text-copper-foreground shadow-copper transition-all hover:-translate-y-0.5 hover:shadow-elegant sm:px-7 sm:py-4"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-ivory backdrop-blur-md transition-colors hover:bg-white/20 sm:px-7 sm:py-4"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>

          <p className="mt-4 flex items-center gap-2 text-[11px] text-ivory/70">
            <MessageCircle className="h-3.5 w-3.5 text-copper" />
            {t("hero.micro")}
          </p>
        </div>

        {/* Floating stats - desktop only */}
        <div className="relative mt-10 hidden max-w-xl gap-3 md:grid md:grid-cols-2 lg:mt-12">
          {stats.map((s) => (
            <div
              key={s}
              className="rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-ivory/90 backdrop-blur-md"
            >
              <span className="block h-1 w-8 rounded-full bg-copper" />
              <span className="mt-2 block text-sm font-medium">{t(`hero.stats.${s}`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Soft fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-background md:h-24" aria-hidden />
    </section>
  );
}
