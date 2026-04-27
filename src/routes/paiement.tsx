import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  useCart,
  cartStore,
  computeCartTotal,
  formatMAD,
  reservationsStore,
  generateId,
  generateReference,
} from "@/lib/cart";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";

export const Route = createFileRoute("/paiement")({
  head: () => ({ meta: [{ title: "Paiement sécurisé — BIYOUU" }] }),
  component: PaymentPage,
});

function PaymentPage() {
  const items = useCart();
  const navigate = useNavigate();
  const total = computeCartTotal(items);
  const [processing, setProcessing] = useState(false);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Maroc",
    language: "fr",
    specialRequest: "",
  });
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" });

  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <h1 className="font-display text-3xl">Aucune offre à payer</h1>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Retour à l'accueil
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const onPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.firstName || !info.lastName || !/^\S+@\S+\.\S+$/.test(info.email) || !info.phone) {
      alert("Merci de compléter vos informations.");
      return;
    }
    if (card.number.replace(/\s/g, "").length < 12 || !card.expiry || !card.cvc) {
      alert("Merci de compléter votre carte (simulation).");
      return;
    }
    setProcessing(true);
    const reference = generateReference();
    setTimeout(() => {
      reservationsStore.add({
        id: generateId(),
        reference,
        createdAt: new Date().toISOString(),
        status: "confirmed",
        paymentStatus: "paid",
        customer: { ...info, guestCount: items[0]?.guestCount ?? 1 },
        items,
        total,
        documents: [],
      });
      cartStore.clear();
      navigate({ to: "/confirmation", search: { ref: reference } });
    }, 1200);
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="font-display text-4xl">Paiement sécurisé</h1>
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" /> Paiement chiffré — démo BIYOUU
        </p>

        <form onSubmit={onPay} className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Section title="Vos informations">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Prénom" value={info.firstName} onChange={(v) => setInfo({ ...info, firstName: v })} />
                <Input label="Nom" value={info.lastName} onChange={(v) => setInfo({ ...info, lastName: v })} />
                <Input label="Email" type="email" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} />
                <Input label="Téléphone" type="tel" value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} />
                <Input label="Pays" value={info.country} onChange={(v) => setInfo({ ...info, country: v })} />
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Langue</span>
                  <select value={info.language} onChange={(e) => setInfo({ ...info, language: e.target.value })} className="biy-input">
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="ar">العربية</option>
                    <option value="nl">Nederlands</option>
                  </select>
                </label>
              </div>
            </Section>

            <Section title="Méthode de paiement">
              <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-xs text-muted-foreground">
                <Lock className="mr-2 inline h-3.5 w-3.5 text-primary" />
                Aucune vraie transaction — environnement de démonstration.
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input label="Numéro de carte" value={card.number} onChange={(v) => setCard({ ...card, number: v })} placeholder="4242 4242 4242 4242" />
                <Input label="Nom sur la carte" value={card.name} onChange={(v) => setCard({ ...card, name: v })} />
                <Input label="Expiration (MM/AA)" value={card.expiry} onChange={(v) => setCard({ ...card, expiry: v })} placeholder="12/27" />
                <Input label="CVC" value={card.cvc} onChange={(v) => setCard({ ...card, cvc: v })} placeholder="123" />
              </div>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant">
              <h2 className="font-display text-xl">Votre commande</h2>
              <ul className="mt-4 space-y-3 border-b border-border pb-4">
                {items.map((i) => (
                  <li key={i.id} className="flex items-start justify-between gap-2 text-sm">
                    <div>
                      <p className="font-medium">{i.title}</p>
                      <p className="text-xs text-muted-foreground">{i.quantity} × {formatMAD(i.unitPrice)}</p>
                    </div>
                    <p className="font-medium">{formatMAD(i.unitPrice * i.quantity)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total à payer</span>
                <span className="font-display text-2xl text-primary">{formatMAD(total)}</span>
              </div>
              <button
                type="submit"
                disabled={processing}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-copper py-3.5 text-sm font-semibold text-copper-foreground shadow-copper disabled:opacity-60"
              >
                <CreditCard className="h-4 w-4" />
                {processing ? "Traitement…" : "Confirmer le paiement"}
              </button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                <ShieldCheck className="mr-1 inline h-3 w-3 text-primary" /> Paiement sécurisé — données chiffrées
              </p>
            </div>
          </aside>
        </form>
      </div>
      <style>{`.biy-input{display:block;width:100%;border-radius:12px;border:1px solid var(--color-border);background:var(--color-card);padding:0.7rem 0.9rem;font-size:0.875rem;outline:none}.biy-input:focus{border-color:var(--color-primary)}`}</style>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <h2 className="mb-5 font-display text-xl">{title}</h2>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="biy-input" />
    </label>
  );
}
