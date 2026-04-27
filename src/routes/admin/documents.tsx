import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/admin/documents")({
  head: () => ({ meta: [{ title: "Admin — Documents" }] }),
  component: () => (
    <AdminLayout title="Documents clients">
      <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
        Centralisation des documents clients (pièces d'identité, passeports, permis). Module sécurisé à venir.
      </div>
    </AdminLayout>
  ),
});
