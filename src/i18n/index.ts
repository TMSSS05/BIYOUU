import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import ar from "./locales/ar.json";
import nl from "./locales/nl.json";

export const LANGUAGES = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇲🇦" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const RTL_LANGS: LanguageCode[] = ["ar"];

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      es: { translation: es },
      ar: { translation: ar },
      nl: { translation: nl },
    },
    lng: "fr",
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
