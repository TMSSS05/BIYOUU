import { createFileRoute } from "@tanstack/react-router";
import { AccountLayout } from "@/components/AccountLayout";
import { FileText, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/mon-compte/documents")({
  head: () => ({ meta: [{ title: "Mes documents — BIYOUU" }] }),
  component: DocsPage,
});

function DocsPage() {
  const docs = [
    { name: "Pièce d'identité.pdf", date: "15/03/2026", status: "Vérifié" },
    { name: "Permis de conduire.pdf", date: "15/03/2026", status: "Vérifié" },
  ];
  return (
    <AccountLayout title="Mes documents">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        <ShieldCheck className="mr-2 inline h-4 w-4" /> Vos documents sont chiffrés et accessibles uniquement aux personnes autorisées.
      </div>
      <ul className="mt-6 space-y-3">
        {docs.map((d) => (
          <li key={d.name} className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{d.name}</p>
                <p className="text-xs text-muted-foreground">Envoyé le {d.date}</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{d.status}</span>
          </li>
        ))}
      </ul>
    </AccountLayout>
  );
}
