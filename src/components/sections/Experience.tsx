import { useTranslation } from "react-i18next";
import { Compass, CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";
import { assets } from "@/data/assets";
import { SectionHeader } from "./Categories";

const STEPS = [
  { key: "choose", icon: Compass },
  { key: "dates", icon: CalendarCheck },
  { key: "pay", icon: ShieldCheck },
  { key: "enjoy", icon: Sparkles },
] as const;

export function Experience() {
  const { t } = useTranslation();
  return (
    <section className="relative isolate w-full max-w-full overflow-hidden px-4 py-20 text-ivory sm:px-5 sm:py-24 md:px-8 md:py-32">
      <img
        src={assets.abstractBg}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-primary/85" />
      <div className="mx-auto w-full max-w-[430px] sm:max-w-[480px] md:max-w-7xl">
        <SectionHeader
          eyebrow="Process"
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
          light
        />
        <div className="mt-12 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              className="group relative flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:bg-white/10 sm:rounded-[28px] sm:p-6 md:rounded-3xl"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-[26px] text-copper sm:text-3xl">0{i + 1}</span>
                <span className="h-px flex-1 bg-white/15" />
                <Icon className="h-5 w-5 text-copper" />
              </div>
              <h3 className="font-display text-[18px] text-ivory sm:text-xl">{t(`experience.steps.${key}.title`)}</h3>
              <p className="text-[13px] leading-relaxed text-ivory/80 sm:text-sm">{t(`experience.steps.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
