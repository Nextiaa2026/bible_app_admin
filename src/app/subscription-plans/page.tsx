"use client";

import { useState } from "react";
import Link from "next/link";

import { AdminShell } from "@/components/admin-shell";
import { ContentForm, FormField } from "@/components/content-form";
import { FormSheet } from "@/components/form-sheet";
import { QueryState } from "@/components/query-state";
import { Button } from "@/components/ui/button";
import { useCreateSubscriptionPlan } from "@/hooks/use-admin-mutations";
import { useSubscriptionPlans } from "@/hooks/use-admin-queries";

export default function SubscriptionPlansPage() {
  const { data: plans = [], isLoading, isError, error } = useSubscriptionPlans();
  const createPlan = useCreateSubscriptionPlan();
  const [sheetOpen, setSheetOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await createPlan.mutateAsync(formData);
    setSheetOpen(false);
  }

  return (
    <>
      <AdminShell
        title="Tarifs d'abonnement"
        description={`${plans.length} formule(s)`}
        action={
          <Button onClick={() => setSheetOpen(true)}>
            Nouvelle formule
          </Button>
        }
      >
        <QueryState isLoading={isLoading} isError={isError} error={error}>
          <div className="space-y-2">
            {plans.map((p) => (
              <div key={p.id} className="rounded-lg border bg-card p-4 shadow-card">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-muted-foreground">
                  {p.priceXaf} XAF · {p.durationDays} jours · {p.isActive ? "active" : "inactive"}
                </p>
              </div>
            ))}
          </div>
        </QueryState>

        <Button asChild className="mt-4" variant="outline">
          <Link href="/subscriptions">Voir les abonnements</Link>
        </Button>
      </AdminShell>

      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Nouvelle formule"
        description="Définissez un tarif d'abonnement premium."
      >
        <ContentForm onSubmit={handleSubmit} isPending={createPlan.isPending} submitLabel="Créer">
          <FormField label="Nom" name="name" required />
          <FormField label="Prix (XAF)" name="priceXaf" type="number" defaultValue={2500} required />
          <FormField label="Durée (jours)" name="durationDays" type="number" defaultValue={30} required />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" defaultChecked />
            Active
          </label>
        </ContentForm>
      </FormSheet>
    </>
  );
}
