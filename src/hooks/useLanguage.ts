import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGES, RTL_LANGS, type LanguageCode } from "@/i18n";

export function useLanguage() {
  const { i18n } = useTranslation();
  const code = (i18n.language?.split("-")[0] as LanguageCode) ?? "fr";

  useEffect(() => {
    if (typeof document === "undefined") return;
    const isRtl = RTL_LANGS.includes(code);
    document.documentElement.lang = code;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [code]);

  return {
    code,
    isRtl: RTL_LANGS.includes(code),
    languages: LANGUAGES,
    change: (lng: LanguageCode) => i18n.changeLanguage(lng),
  };
}
