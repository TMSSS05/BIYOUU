import { useTranslation } from "react-i18next";
import { Lock, CalendarCheck, FileLock2, Headset, BadgeCheck, RefreshCw, ArrowRight, MessageCircle } from "lucide-react";
import { assets } from "@/data/assets";
import { SectionHeader } from "./Categories";
import { Logo } from "../Logo";

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
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Confiance" title={t("trust.title")} subtitle={t("trust.subtitle")} align="center" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST.map(({ key, icon: Icon }) => (
            <div key={key} className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl text-foreground">{t(`trust.items.${key}.t`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`trust.items.${key}.d`)}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm italic text-muted-foreground">{t("trust.note")}</p>
      </div>
    </section>
  );
}

export function FinalCta() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="relative isolate overflow-hidden px-5 py-24 text-ivory md:px-8 md:py-32">
      <img src={assets.abstractBg} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-primary/90" />
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl text-balance text-ivory md:text-6xl">{t("finalCta.title")}</h2>
        <p className="mt-5 text-base text-ivory/85 md:text-lg">{t("finalCta.subtitle")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#packs" className="inline-flex items-center gap-2 rounded-full bg-copper px-7 py-4 text-sm font-semibold text-copper-foreground shadow-copper transition-transform hover:-translate-y-0.5">
            {t("finalCta.primary")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
          <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-ivory backdrop-blur-md hover:bg-white/20">
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
    <footer className="bg-[oklch(0.22_0.04_158)] px-5 py-16 text-ivory/85 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm text-ivory/70">{t("footer.tagline")}</p>
            <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-ivory hover:bg-white/10">
              <MessageCircle className="h-3.5 w-3.5 text-copper" /> +212 6 00 00 00 00
            </a>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">{g.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
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
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ivory/60 md:flex-row">
          <span>{t("footer.copyright", { year })}</span>
          <span>Made with care in Northern Morocco.</span>
        </div>
      </div>
    </footer>
  );
}
