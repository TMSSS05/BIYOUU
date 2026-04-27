import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteLayout } from "./SiteLayout";
import { Calendar, CreditCard, FileText, User } from "lucide-react";

const NAV = [
  { to: "/mon-compte", label: "Tableau de bord", icon: User, exact: true },
  { to: "/mon-compte/reservations", label: "Réservations", icon: Calendar, exact: false },
  { to: "/mon-compte/paiements", label: "Paiements", icon: CreditCard, exact: false },
  { to: "/mon-compte/documents", label: "Documents", icon: FileText, exact: false },
  { to: "/mon-compte/profil", label: "Profil", icon: User, exact: false },
] as const;

export function AccountLayout({ children, title }: { children: ReactNode; title: string }) {
  const location = useLocation();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="font-display text-4xl">Mon compte</h1>
        <p className="mt-2 text-muted-foreground">Gérez vos réservations, paiements et documents.</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside>
            <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-card p-2 lg:flex-col lg:overflow-visible">
              {NAV.map((n) => {
                const active = n.exact ? location.pathname === n.to : location.pathname.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <n.icon className="h-4 w-4" />
                    {n.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <section>
            <h2 className="mb-6 font-display text-2xl">{title}</h2>
            {children}
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
