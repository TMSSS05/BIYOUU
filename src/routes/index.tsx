import { createFileRoute } from "@tanstack/react-router";
import "@/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { SearchBar } from "@/components/sections/SearchBar";
import { Categories } from "@/components/sections/Categories";
import { Experience } from "@/components/sections/Experience";
import { Vehicles } from "@/components/sections/Vehicles";
import { Villas } from "@/components/sections/Villas";
import { Activities } from "@/components/sections/Activities";
import { Services } from "@/components/sections/Services";
import { Restaurants, Packs } from "@/components/sections/Packs";
import { Trust, FinalCta, Footer } from "@/components/sections/Trust";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BIYOUU — Conciergerie privée premium dans le Nord du Maroc" },
      { name: "description", content: "Villas, véhicules premium, activités, chef à domicile, chauffeur privé et services sur mesure. Réservation sécurisée, équipe disponible 24h/24." },
      { property: "og:title", content: "BIYOUU — Conciergerie privée Nord du Maroc" },
      { property: "og:description", content: "Réservez villas, véhicules, activités et services privés au Nord du Maroc avec une équipe disponible 24h/24." },
      { property: "og:image", content: "/images/hero-desktop.webp" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Cairo:wght@400;600;700&display=swap" },
      { rel: "preload", as: "image", href: "/images/hero-desktop.webp", media: "(min-width: 768px)" },
      { rel: "preload", as: "image", href: "/images/hero-mobile.webp", media: "(max-width: 767px)" },
    ],
  }),
  component: Index,
});

function Index() {
  useLanguage(); // sets <html lang/dir>
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <SearchBar />
      <Categories />
      <Experience />
      <Vehicles />
      <Villas />
      <Activities />
      <Services />
      <Restaurants />
      <Packs />
      <Trust />
      <FinalCta />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
