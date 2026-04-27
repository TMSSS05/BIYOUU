import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { LanguageCode } from "@/i18n";

export function LanguageSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { t } = useTranslation();
  const { code, languages, change } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = languages.find((l) => l.code === code) ?? languages[0];

  const colorClass =
    variant === "dark"
      ? "text-ivory hover:bg-white/10 border-white/15"
      : "text-foreground hover:bg-foreground/5 border-border/70";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${colorClass}`}
        aria-label={t("common.language")}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.flag}</span>
        <span className="uppercase tracking-wide">{current.code}</span>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-card shadow-elegant rtl:right-auto rtl:left-0">
          <ul className="py-1">
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    void change(l.code as LanguageCode);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-cream"
                >
                  <span className="text-base">{l.flag}</span>
                  <span className="flex-1 text-left rtl:text-right">{l.label}</span>
                  {code === l.code && <Check className="h-4 w-4 text-primary" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
