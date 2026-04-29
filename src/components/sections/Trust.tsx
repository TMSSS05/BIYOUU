import { useTranslation } from "react-i18next";
import { Lock, CalendarCheck, FileLock2, Headset, BadgeCheck, RefreshCw, ArrowRight, MessageCircle } from "lucide-react";
import { assets } from "@/data/assets";
import { SectionHeader } from "./Categories";
import { Logo } from "@/components/Logo";

const TRUST = [
  { key: "payment", icon: Lock },
  { key: "availability", icon: CalendarCheck },
  { key: "documents", icon: FileLock2 },
  { key: "support", icon: Headset },
  { key: "partners", icon: BadgeCheck },
  { key: "cancel", icon: RefreshCw },
] as const;

export function Trust() {
  const { t } = useTranslation();
  return (
    <section className="w-full max-w-full px-4 py-20 sm:px-5 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-[430px] sm:max-w-[480px] md:max-w-7xl">
        <SectionHeader eyebrow="Confiance" title={t("trust.title")} subtitle={t("trust.subtitle")} align="center" />
        <div className="mt-12 grid gap-4 sm:mt-14 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST.map(({ key, icon: Icon }) => (
            <div key={key} className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant sm:rounded-[28px] sm:p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11 sm:rounded-2xl">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-display text-[18px] text-foreground sm:mt-4 sm:text-xl">{t(`trust.items.${key}.t`)}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">{t(`trust.items.${key}.d`)}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-[12px] italic text-muted-foreground sm:mt-10 sm:text-sm">{t("trust.note")}</p>
      </div>
    </section>
  );
}

export function FinalCta() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="relative isolate w-full max-w-full overflow-hidden px-4 py-20 text-ivory sm:px-5 sm:py-24 md:px-8 md:py-32">
      <img src={assets.abstractBg} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-primary/90" />
      <div className="mx-auto w-full max-w-[430px] text-center sm:max-w-[480px] md:max-w-3xl">
        <h2 className="font-display text-[32px] text-balance text-ivory sm:text-[36px] md:text-5xl lg:text-6xl">{t("finalCta.title")}</h2>
        <p className="mt-4 text-[15px] text-ivory/85 sm:mt-5 sm:text-base md:text-lg">{t("finalCta.subtitle")}</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row">
          <a href="#packs" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-copper px-6 py-3.5 text-sm font-semibold text-copper-foreground shadow-copper transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-7 sm:py-4">
            {t("finalCta.primary")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
          <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-ivory backdrop-blur-md hover:bg-white/20 sm:w-auto sm:px-7 sm:py-4">
            <MessageCircle className="h-4 w-4" /> {t("finalCta.secondary")}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const groups = [
    { title: t("footer.company"), links: ["about", "contact", "press", "careers"] },
    { title: t("footer.services"), links: ["vehicles", "stays", "activities", "packs"] },
    { title: t("footer.legal"), links: ["terms", "privacy", "cookies", "legal"] },
  ];
  return (
    <footer className="bg-[oklch(0.22_0.04_158)] px-4 py-12 text-ivory/85 sm:px-5 sm:py-14 md:px-8 md:py-16">
      <div className="mx-auto w-full max-w-[430px] sm:max-w-[480px] md:max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-10">
          <div>
            <Logo variant="light" />
            <p className="mt-3 max-w-xs text-[13px] text-ivory/70 sm:mt-4 sm:text-sm">{t("footer.tagline")}</p>
            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-2 text-[11px] font-medium text-ivory hover:bg-white/10 sm:mt-5 sm:text-xs">
              <MessageCircle className="h-3.5 w-3.5 text-copper" /> +212 6 00 00 00 00
            </a>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper sm:text-xs sm:tracking-[0.18em]">{g.title}</h4>
              <ul className="mt-3 space-y-2 text-[13px] sm:mt-4 sm:space-y-2.5 sm:text-sm">
                {g.links.map((k) => (
                  <li key={k}>
                    <a href="#" className="text-ivory/80 transition-colors hover:text-ivory">
                      {t(`footer.links.${k}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-5 text-[11px] text-ivory/60 sm:mt-12 sm:flex-row sm:pt-6 sm:text-xs">
          <span>{t("footer.copyright", { year })}</span>
          <span>Made with care in Northern Morocco.</span>
        </div>
      </div>
    </footer>
  );
}
