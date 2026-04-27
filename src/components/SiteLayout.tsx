import { type ReactNode } from "react";
import "@/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { Header } from "./Header";
import { Footer } from "./sections/Trust";
import { WhatsAppFab } from "./WhatsAppFab";

export function SiteLayout({ children }: { children: ReactNode }) {
  useLanguage();
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[44vh] min-h-[320px] w-full md:h-[52vh]">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-10 md:px-8 md:pb-16">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-copper">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl font-display text-4xl text-ivory md:text-6xl">{title}</h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-ivory/85 md:text-lg">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
