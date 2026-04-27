import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { getOfferBySlug } from "@/data/offers";
import { cartStore, computeItemTotal, formatMAD, generateId } from "@/lib/cart";
import type { CartItem, Offer, OfferOption } from "@/types";
import { Check, ArrowRight, ArrowLeft, Upload } from "lucide-react";

export const Route = createFileRoute("/reservation/$slug")({
  loader: ({ params }): { offer: Offer } => {
    const offer = getOfferBySlug(params.slug);
    if (!offer) throw notFound();
    return { offer };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Réservation — ${loaderData?.offer.title ?? ""} — BIYOUU` }],
  }),
  component: ReservationPage,
});

const STEPS = ["Dates", "Options", "Informations", "Documents", "Résumé"] as const;

function ReservationPage() {
  const { offer } = Route.useLoaderData() as { offer: Offer };
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Maroc",
    language: "fr",
    specialRequest: "",
  });
  const [documents, setDocuments] = useState<{ type: string; name: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const quantity = useMemo(() => {
    if (offer.unit === "personne") return guestCount;
    if (offer.unit === "session" || offer.unit === "service") return 1;
    const s = new Date(startDate).getTime();
    const e = new Date(endDate).getTime();
    const days = Math.max(1, Math.round((e - s) / 86400000));
    return Math.max(1, days);
  }, [offer.unit, startDate, endDate, guestCount]);

  const options: OfferOption[] = offer.options.filter((o) => selectedOptions.includes(o.id));

  const tempItem: CartItem = {
    id: "preview",
    slug: offer.slug,
    title: offer.title,
    image: offer.images[0],
    category: offer.category,
    unit: offer.unit,
    unitPrice: offer.price,
    quantity,
    startDate,
    endDate,
    options,
    guestCount,
  };
  const total = computeItemTotal(tempItem);

  const validateInfo = () => {
    const e: Record<string, string> = {};
    if (!info.firstName.trim()) e.firstName = "Requis";
    if (!info.lastName.trim()) e.lastName = "Requis";
    if (!/^\S+@\S+\.\S+$/.test(info.email)) e.email = "Email invalide";
    if (!info.phone.trim() || info.phone.length < 6) e.phone = "Téléphone invalide";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 2 && !validateInfo()) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const addToCart = () => {
    const item: CartItem = { ...tempItem, id: generateId() };
    cartStore.add(item);
    navigate({ to: "/panier" });
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <Link to="/offres/$slug" params={{ slug: offer.slug }} className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Retour à l'offre
        </Link>
        <h1 className="font-display text-3xl md:text-4xl">Réserver — {offer.title}</h1>

        {/* Stepper */}
        <ol className="mt-8 grid grid-cols-5 gap-2">
          {STEPS.map((s, i) => (
            <li key={s} className={`flex flex-col items-center gap-2 text-center text-xs ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className="hidden sm:block">{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="font-display text-xl">Choisissez vos dates</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Date d'arrivée">
                    <input type="date" min={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} className="biy-input" />
                  </Field>
                  <Field label="Date de départ">
                    <input type="date" min={startDate} value={endDate} onChange={(e) => setEndDate(e.target.value)} className="biy-input" />
                  </Field>
                </div>
                <Field label="Nombre de voyageurs">
                  <input type="number" min={1} max={20} value={guestCount} onChange={(e) => setGuestCount(Number(e.target.value))} className="biy-input" />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl">Options disponibles</h2>
                {offer.options.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune option supplémentaire pour cette offre.</p>
                ) : (
                  offer.options.map((o) => (
                    <label key={o.id} className="flex cursor-pointer items-center justify-between rounded-2xl border border-border p-4 hover:bg-secondary/40">
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(o.id)}
                          onChange={(e) =>
                            setSelectedOptions((prev) =>
                              e.target.checked ? [...prev, o.id] : prev.filter((id) => id !== o.id),
                            )
                          }
                          className="h-4 w-4 accent-primary"
                        />
                        <span className="text-sm font-medium">{o.label}</span>
                      </span>
                      <span className="text-sm font-semibold text-primary">+ {formatMAD(o.price)}</span>
                    </label>
                  ))
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl">Vos informations</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Prénom" error={errors.firstName}>
                    <input value={info.firstName} onChange={(e) => setInfo({ ...info, firstName: e.target.value })} className="biy-input" />
                  </Field>
                  <Field label="Nom" error={errors.lastName}>
                    <input value={info.lastName} onChange={(e) => setInfo({ ...info, lastName: e.target.value })} className="biy-input" />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className="biy-input" />
                  </Field>
                  <Field label="Téléphone" error={errors.phone}>
                    <input type="tel" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className="biy-input" />
                  </Field>
                  <Field label="Pays">
                    <input value={info.country} onChange={(e) => setInfo({ ...info, country: e.target.value })} className="biy-input" />
                  </Field>
                  <Field label="Langue préférée">
                    <select value={info.language} onChange={(e) => setInfo({ ...info, language: e.target.value })} className="biy-input">
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="ar">العربية</option>
                      <option value="nl">Nederlands</option>
                    </select>
                  </Field>
                </div>
                <Field label="Demande spéciale (facultatif)">
                  <textarea rows={3} value={info.specialRequest} onChange={(e) => setInfo({ ...info, specialRequest: e.target.value })} className="biy-input resize-none" />
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl">Documents requis</h2>
                {offer.documents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucun document n'est nécessaire pour cette offre.</p>
                ) : (
                  offer.documents.map((d) => {
                    const labels: Record<string, string> = {
                      id: "Pièce d'identité",
                      passport: "Passeport",
                      license: "Permis de conduire",
                    };
                    const uploaded = documents.find((doc) => doc.type === d);
                    return (
                      <label key={d} className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-border p-5 hover:border-primary">
                        <div>
                          <p className="text-sm font-semibold">{labels[d]}</p>
                          <p className="text-xs text-muted-foreground">
                            {uploaded ? `Téléchargé : ${uploaded.name}` : "PDF, JPG ou PNG — 5 Mo max"}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            setDocuments((prev) => [...prev.filter((p) => p.type !== d), { type: d, name: f.name }]);
                          }}
                        />
                        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium">
                          <Upload className="h-3.5 w-3.5" /> {uploaded ? "Remplacer" : "Téléverser"}
                        </span>
                      </label>
                    );
                  })
                )}
                <p className="text-xs text-muted-foreground">
                  Vos documents sont chiffrés et accessibles uniquement à l'équipe BIYOUU.
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="font-display text-xl">Résumé de votre réservation</h2>
                <SummaryRow label="Offre" value={offer.title} />
                <SummaryRow label="Dates" value={`${startDate} → ${endDate}`} />
                <SummaryRow label="Voyageurs" value={`${guestCount} personne${guestCount > 1 ? "s" : ""}`} />
                <SummaryRow label="Client" value={`${info.firstName} ${info.lastName} — ${info.email}`} />
                {options.length > 0 && (
                  <SummaryRow label="Options" value={options.map((o) => o.label).join(", ")} />
                )}
                <SummaryRow label="Documents" value={documents.length ? `${documents.length} fichier(s)` : "Aucun"} />
                <div className="rounded-2xl bg-secondary/60 p-4 text-sm">
                  Notre équipe confirmera la disponibilité dans un délai de quelques heures après réception du paiement.
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Précédent
              </button>
              {step < STEPS.length - 1 ? (
                <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
                  Suivant <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={addToCart} className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-sm font-semibold text-copper-foreground shadow-copper">
                  Ajouter au panier <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sidebar total */}
          <aside className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-28 lg:self-start">
            <img src={offer.images[0]} alt="" className="mb-4 aspect-video w-full rounded-2xl object-cover" />
            <p className="font-display text-lg">{offer.title}</p>
            <p className="text-xs text-muted-foreground">{offer.location}</p>

            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{offer.unit === "personne" ? "Personnes" : offer.unit === "service" || offer.unit === "session" ? "Quantité" : "Durée"}</dt>
                <dd className="font-medium">{quantity}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Prix de base</dt>
                <dd className="font-medium">{formatMAD(offer.price * quantity)}</dd>
              </div>
              {options.map((o) => (
                <div key={o.id} className="flex justify-between text-xs text-muted-foreground">
                  <dt>{o.label}</dt>
                  <dd>+ {formatMAD(o.price * quantity)}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-xl text-primary">{formatMAD(total)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-emerald-700">✓ Disponibilité estimée</p>
          </aside>
        </div>
      </div>

      <style>{`.biy-input{display:block;width:100%;border-radius:12px;border:1px solid var(--color-border);background:var(--color-card);padding:0.7rem 0.9rem;font-size:0.875rem;outline:none;transition:border-color .2s}.biy-input:focus{border-color:var(--color-primary)}`}</style>
    </SiteLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
