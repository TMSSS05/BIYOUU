import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/admin/parametres")({
  head: () => ({ meta: [{ title: "Admin — Paramètres" }] }),
  component: () => (
    <AdminLayout title="Paramètres">
      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display text-lg">Informations entreprise</h3>
          <p className="mt-2 text-sm text-muted-foreground">BIYOUU — Conciergerie privée Nord du Maroc</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display text-lg">Contact</h3>
          <p className="mt-2 text-sm text-muted-foreground">WhatsApp : +212 600 000 000</p>
        </div>
      </div>
    </AdminLayout>
  ),
});
