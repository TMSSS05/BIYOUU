import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart, cartStore, computeItemTotal, computeCartTotal, formatMAD } from "@/lib/cart";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/panier")({
  head: () => ({ meta: [{ title: "Panier — BIYOUU" }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const total = computeCartTotal(items);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="font-display text-4xl">Mon panier</h1>
        <p className="mt-2 text-muted-foreground">{items.length} offre{items.length > 1 ? "s" : ""} sélectionnée{items.length > 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-border bg-card p-16 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 font-display text-xl">Votre panier est vide</p>
            <p className="mt-2 text-sm text-muted-foreground">Découvrez nos offres et composez votre séjour idéal.</p>
            <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              Explorer les offres
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {items.map((item) => {
                const itemTotal = computeItemTotal(item);
                return (
                  <li key={item.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
                    <img src={item.image} alt="" className="h-28 w-28 shrink-0 rounded-xl object-cover sm:h-32 sm:w-32" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link to="/offres/$slug" params={{ slug: item.slug }} className="font-display text-lg hover:text-copper">
                            {item.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {item.startDate} → {item.endDate} · {item.guestCount} pers.
                          </p>
                          {item.options.length > 0 && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Options : {item.options.map((o) => o.label).join(", ")}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => cartStore.remove(item.id)}
                          aria-label="Supprimer"
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                        <div className="flex items-center gap-2 text-xs">
                          <label className="text-muted-foreground">Quantité</label>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              cartStore.update(item.id, { quantity: Math.max(1, Number(e.target.value)) })
                            }
                            className="h-8 w-16 rounded-md border border-border bg-card px-2 text-center"
                          />
                        </div>
                        <p className="font-display text-lg text-primary">{formatMAD(itemTotal)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant">
                <h2 className="font-display text-xl">Récapitulatif</h2>
                <dl className="mt-5 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Sous-total</dt>
                    <dd className="font-medium">{formatMAD(total)}</dd>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <dt>Frais de service</dt>
                    <dd>Inclus</dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3 text-base">
                    <dt className="font-semibold">Total</dt>
                    <dd className="font-display text-2xl text-primary">{formatMAD(total)}</dd>
                  </div>
                </dl>
                <Link
                  to="/paiement"
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-copper py-3.5 text-sm font-semibold text-copper-foreground shadow-copper"
                >
                  Passer au paiement <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => cartStore.clear()}
                  className="mt-3 w-full text-xs text-muted-foreground hover:text-destructive"
                >
                  Vider le panier
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
