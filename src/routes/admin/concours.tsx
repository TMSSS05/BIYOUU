import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/admin/concours")({
  head: () => ({ meta: [{ title: "Admin — Concours" }] }),
  component: () => (
    <AdminLayout title="Concours & promotions">
      <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
        Gestion des concours, codes promo et opérations marketing. Module à venir.
      </div>
    </AdminLayout>
  ),
});
