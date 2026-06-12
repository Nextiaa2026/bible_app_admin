"use client";

import { useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { PlanFormFields } from "@/components/forms/plan-form-fields";
import { FormSheet } from "@/components/form-sheet";
import { PlanDaysSheet } from "@/components/plan-days-sheet";
import { QueryState } from "@/components/query-state";
import { RowActions } from "@/components/row-actions";
import { PlansTable, type BiblePlanRow } from "@/components/tables/plans-table";
import { Button } from "@/components/ui/button";
import { useCreatePlan, useDeletePlan, useUpdatePlan } from "@/hooks/use-admin-mutations";
import { usePlan, usePlans } from "@/hooks/use-admin-queries";

export default function PlansPage() {
  const { data, isLoading, isError, error } = usePlans();
  const deleteMutation = useDeletePlan();
  const plans = (data ?? []) as BiblePlanRow[];

  const [formOpen, setFormOpen] = useState(false);
  const [daysOpen, setDaysOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [daysPlanId, setDaysPlanId] = useState<string | null>(null);
  const [daysPlanName, setDaysPlanName] = useState("");

  const create = useCreatePlan();
  const update = useUpdatePlan(editId ?? "");
  const { data: editData } = usePlan(editId ?? "");

  function openCreate() {
    setEditId(null);
    setFormOpen(true);
  }

  function openEdit(id: string) {
    setEditId(id);
    setFormOpen(true);
  }

  function openDays(plan: BiblePlanRow) {
    setDaysPlanId(plan.id);
    setDaysPlanName(plan.name);
    setDaysOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    if (editId) {
      await update.mutateAsync(formData);
      setFormOpen(false);
      setEditId(null);
    } else {
      const result = (await create.mutateAsync(formData)) as { id: string };
      setFormOpen(false);
      setDaysPlanId(result.id);
      setDaysPlanName(String(formData.get("name") ?? "Nouveau plan"));
      setDaysOpen(true);
    }
  }

  return (
    <>
      <AdminShell
        title="Plans bibliques"
        description={`${plans.length} plan(s)`}
        action={<Button onClick={openCreate}>Nouveau plan</Button>}
      >
        <QueryState isLoading={isLoading} isError={isError} error={error}>
          <PlansTable data={plans} />
          <div className="mt-6 space-y-2">
            {plans.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card p-3 shadow-card"
              >
                <button
                  type="button"
                  onClick={() => openDays(p)}
                  className="text-left text-sm font-medium text-primary hover:underline"
                >
                  {p.name}
                </button>
                <RowActions
                  onEdit={() => openEdit(p.id)}
                  onDelete={() => deleteMutation.mutate(p.id)}
                  isDeleting={deleteMutation.isPending && deleteMutation.variables === p.id}
                />
              </div>
            ))}
          </div>
        </QueryState>
      </AdminShell>

      <FormSheet
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditId(null);
        }}
        title={editId ? "Modifier le plan" : "Nouveau plan"}
        description="Configurez un plan de lecture biblique."
      >
        {editId && !editData ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : (
          <PlanFormFields
            key={editId ?? "new"}
            onSubmit={handleSubmit}
            isPending={create.isPending || update.isPending}
            defaultValues={editId ? editData : undefined}
            submitLabel={editId ? "Mettre à jour" : "Créer et configurer les jours"}
          />
        )}
      </FormSheet>

      <PlanDaysSheet
        planId={daysPlanId}
        planName={daysPlanName}
        open={daysOpen && !!daysPlanId}
        onOpenChange={setDaysOpen}
      />
    </>
  );
}
