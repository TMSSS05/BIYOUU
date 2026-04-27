import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AccountLayout } from "@/components/AccountLayout";

export const Route = createFileRoute("/mon-compte/profil")({
  head: () => ({ meta: [{ title: "Mon profil — BIYOUU" }] }),
  component: ProfilPage,
});

function ProfilPage() {
  const [info, setInfo] = useState({
    firstName: "Sarah",
    lastName: "Bennani",
    email: "sarah@example.com",
    phone: "+212 6 00 00 00 00",
    country: "Maroc",
    language: "fr",
  });
  const [saved, setSaved] = useState(false);

  return (
    <AccountLayout title="Mon profil">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
        className="rounded-3xl border border-border bg-card p-6 md:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {([
            ["firstName", "Prénom"],
            ["lastName", "Nom"],
            ["email", "Email"],
            ["phone", "Téléphone"],
            ["country", "Pays"],
          ] as const).map(([k, l]) => (
            <label key={k} className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{l}</span>
              <input
                value={info[k]}
                onChange={(e) => setInfo({ ...info, [k]: e.target.value })}
                className="block w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary"
              />
            </label>
          ))}
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Langue</span>
            <select
              value={info.language}
              onChange={(e) => setInfo({ ...info, language: e.target.value })}
              className="block w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="ar">العربية</option>
              <option value="nl">Nederlands</option>
            </select>
          </label>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button type="submit" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
            Enregistrer
          </button>
          {saved && <p className="text-sm text-emerald-700">✓ Modifications enregistrées</p>}
        </div>
      </form>
    </AccountLayout>
  );
}
