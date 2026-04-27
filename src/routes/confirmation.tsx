import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { SiteLayout } from "@/components/SiteLayout";
import { CheckCircle2, MessageCircle, User } from "lucide-react";
import { reservationsStore } from "@/lib/cart";
import { useEffect, useState } from "react";
import type { Reservation } from "@/types";

const search = z.object({
  ref: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/confirmation")({
  validateSearch: zodValidator(search),
  head: () => ({ meta: [{ title: "Confirmation — BIYOUU" }] }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { ref } = Route.useSearch();
  const [res, setRes] = useState<Reservation | undefined>();

  useEffect(() => {
    setRes(reservationsStore.get().find((r) => r.reference === ref));
  }, [ref]);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-5 py-16 text-center md:py-24">
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="font-display text-4xl">Réservation confirmée</h1>
        <p className="mt-3 text-muted-foreground">
          Merci ! Votre réservation a bien été enregistrée. Notre équipe vous contacte sous peu.
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 text-left shadow-soft">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Numéro de réservation</p>
          <p className="font-display text-2xl text-primary">{ref || "—"}</p>
          {res && (
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <p><span className="text-muted-foreground">Statut :</span> <span className="ml-1 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Confirmée</span></p>
              <p><span className="text-muted-foreground">Paiement :</span> <span className="ml-1 inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Réussi</span></p>
              <p><span className="text-muted-foreground">Total :</span> <span className="font-semibold">{res.total} MAD</span></p>
              <p className="pt-2 text-xs text-muted-foreground">Un récapitulatif a été préparé dans votre compte.</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground shadow-copper"
          >
            <MessageCircle className="h-4 w-4" /> Contacter sur WhatsApp
          </a>
          <Link
            to="/mon-compte"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            <User className="h-4 w-4" /> Voir mon compte
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
