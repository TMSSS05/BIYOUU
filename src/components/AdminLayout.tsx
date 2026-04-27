import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import {
  LayoutDashboard,
  Package,
  Calendar,
  CreditCard,
  Users,
  FileText,
  CalendarCheck,
  Briefcase,
  Boxes,
  Trophy,
  Settings,
} from "lucide-react";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/admin/offres", label: "Offres", icon: Package },
  { to: "/admin/reservations", label: "Réservations", icon: Calendar },
  { to: "/admin/paiements", label: "Paiements", icon: CreditCard },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/documents", label: "Documents", icon: FileText },
  { to: "/admin/disponibilites", label: "Disponibilités", icon: CalendarCheck },
  { to: "/admin/fournisseurs", label: "Fournisseurs", icon: Briefcase },
  { to: "/admin/packs", label: "Packs", icon: Boxes },
  { to: "/admin/concours", label: "Concours", icon: Trophy },
  { to: "/admin/parametres", label: "Paramètres", icon: Settings },
];

export function AdminLayout({ children, title }: { children: ReactNode; title: string }) {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-secondary/40">
      <aside className="hidden w-64 shrink-0 flex-col bg-primary text-ivory lg:flex">
        <div className="flex h-20 items-center px-6 border-b border-white/10">
          <Logo variant="light" />
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          {NAV.map((n) => {
            const active = n.exact ? location.pathname === n.to : location.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`mb-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-copper text-copper-foreground" : "text-ivory/85 hover:bg-white/10"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4 text-xs text-ivory/60">
          <Link to="/" className="hover:text-ivory">← Retour au site</Link>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur md:px-8">
          <h1 className="font-display text-xl text-foreground">{title}</h1>
          <div className="text-xs text-muted-foreground">Admin BIYOUU</div>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-background px-3 py-2 lg:hidden">
          {NAV.map((n) => {
            const active = n.exact ? location.pathname === n.to : location.pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
