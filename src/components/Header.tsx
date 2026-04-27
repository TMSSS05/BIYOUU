import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ShoppingBag, User, ChevronDown, Aperture } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCart } from "@/lib/cart";

const NAV: { key: string; to?: string; label: string; children?: { key: string; to: string; label: string }[] }[] = [
  { key: "home", to: "/", label: "Accueil" },
  { key: "vehicles", to: "/vehicules", label: "Véhicules" },
  { key: "stays", to: "/logements", label: "Logements" },
  { 
    key: "activities", 
    label: "Activités",
    children: [
      { key: "activities-aqua", to: "/activites-aquatiques", label: "Aquatique" },
      { key: "activities-land", to: "/activites-terrestres", label: "Terrestre" },
    ]
  },
  { key: "services", to: "/services-prives", label: "Services" },
  { key: "packs", to: "/packs", label: "Packs" },
  { key: "addresses", to: "/bonnes-adresses", label: "Adresses" },
];

export function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const cart = useCart();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  const transparent = isHome && !scrolled;
  const headerClass = transparent
    ? "bg-transparent border-b border-transparent"
    : "bg-ivory/90 backdrop-blur-xl border-b border-border/60 shadow-soft";

  const linkClass = transparent
    ? "text-ivory/90"
    : "text-foreground/80";

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${headerClass}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" aria-label="BIYOUU" className="shrink-0 -ml-2">
          <Logo variant={transparent ? "light" : "dark"} />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((n) => 
            n.children ? (
              <div key={n.key} ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onMouseEnter={() => setDropdownOpen(true)}
                  className={`group relative flex items-center gap-1.5 text-[0.95rem] font-medium tracking-wide px-4 py-2.5 rounded-full transition-all duration-300 ${linkClass}`}
                >
                  {n.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  <span className={`absolute bottom-1.5 left-4 right-4 h-px rounded-full bg-copper scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${transparent ? 'bg-ivory/60' : 'bg-copper'} ${dropdownOpen ? 'scale-x-100' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-1/2 mt-1.5 w-44 -translate-x-1/2 rounded-2xl border border-border/40 bg-ivory/98 py-2 shadow-xl backdrop-blur-md animate-fade-in">
                    {n.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.to}
                        onClick={() => setDropdownOpen(false)}
                        className={`block px-5 py-3 text-[0.95rem] font-medium transition-colors first:rounded-t-2xl last:rounded-b-2xl text-foreground/80 hover:bg-secondary hover:text-primary`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={n.key}
                to={n.to}
                className={`group relative text-[0.95rem] font-medium tracking-wide px-4 py-2.5 rounded-full transition-all duration-300 ${linkClass}`}
                activeProps={{ 
                  className: transparent 
                    ? "text-ivory after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-px after:rounded-full after:bg-ivory/70 after:scale-x-100" 
                    : "text-primary after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-px after:rounded-full after:bg-copper after:scale-x-100" 
                }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
                <span className={`absolute bottom-1.5 left-4 right-4 h-px rounded-full bg-copper scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${transparent ? 'bg-ivory/70' : 'bg-copper'}`} />
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 md:gap-2.5">
          <LanguageSwitcher variant={transparent ? "dark" : "light"} />

          <Link
            to="/panier"
            aria-label="Panier"
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              transparent ? "text-ivory hover:bg-white/15" : "text-foreground hover:bg-secondary"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-copper text-[10px] font-bold text-copper-foreground">
                {cart.length}
              </span>
            )}
          </Link>

          <Link
            to="/mon-compte"
            aria-label="Mon compte"
            className={`hidden h-10 w-10 items-center justify-center rounded-full transition-colors md:inline-flex ${
              transparent ? "text-ivory hover:bg-white/15" : "text-foreground hover:bg-secondary"
            }`}
          >
            <User className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full xl:hidden ${
              transparent ? "text-ivory" : "text-foreground"
            }`}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-primary text-ivory animate-fade-in">
          <div className="flex h-20 shrink-0 items-center justify-between px-5">
            <Logo variant="light" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ivory hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-6 pb-10 pt-6">
            {NAV.map((n) => (
              n.children ? (
                <div key={n.key}>
                  <div className="border-b border-white/10 py-4 font-display text-2xl tracking-wide text-ivory">
                    {n.label}
                  </div>
                  {n.children.map((child) => (
                    <Link
                      key={child.key}
                      to={child.to}
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/10 py-4 pl-6 font-display text-xl tracking-wide text-ivory/80"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={n.key}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-4 font-display text-2xl tracking-wide text-ivory"
                >
                  {n.label}
                </Link>
              )
            ))}
            <Link
              to="/mon-compte"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 font-display text-2xl tracking-wide text-ivory"
            >
              Mon compte
            </Link>
            <div className="mt-8 flex justify-center">
              <LanguageSwitcher variant="dark" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
