"use client";

import { useState } from "react";

import { ContentForm, FormField } from "@/components/content-form";
import { FormSheet } from "@/components/form-sheet";
import { QueryState } from "@/components/query-state";
import { Button } from "@/components/ui/button";
import { useCreatePlanDay, useDeletePlanDay } from "@/hooks/use-admin-mutations";
import { usePlanDays } from "@/hooks/use-admin-queries";

type PlanDaysSheetProps = {
  planId: string | null;
  planName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PlanDaysSheet({ planId, planName, open, onOpenChange }: PlanDaysSheetProps) {
  const { data: days = [], isLoading, isError, error } = usePlanDays(planId ?? "");
  const createDay = useCreatePlanDay(planId ?? "");
  const deleteDay = useDeletePlanDay(planId ?? "");
  const [addOpen, setAddOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    if (!planId) return;
    await createDay.mutateAsync(formData);
    setAddOpen(false);
  }

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={(next) => {
          onOpenChange(next);
          if (!next) setAddOpen(false);
        }}
        title={`Jours — ${planName ?? "Plan"}`}
        description={`${days.length} jour(s) configuré(s)`}
        wide
      >
        <div className="mb-4 flex justify-end">
          <Button type="button" size="sm" onClick={() => setAddOpen(true)}>
            Ajouter un jour
          </Button>
        </div>

        <QueryState isLoading={isLoading && !!planId} isError={isError} error={error}>
          <div className="space-y-3">
            {days.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun jour configuré.</p>
            ) : (
              days.map((day) => (
                <div
                  key={day.id}
                  className="flex items-center justify-between rounded-lg border bg-card p-4"
                >
                  <div>
                    <p className="font-medium">Jour {day.dayNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {day.readings.map((r) => `${r.book} ${r.chapterStart}`).join(", ")}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={deleteDay.isPending && deleteDay.variables === day.id}
                    onClick={() => deleteDay.mutate(day.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              ))
            )}
          </div>
        </QueryState>
      </FormSheet>

      <FormSheet
        open={addOpen && open}
        onOpenChange={setAddOpen}
        title="Ajouter un jour"
        description="Définissez le numéro du jour et les lectures bibliques."
      >
        <ContentForm
          onSubmit={handleSubmit}
          isPending={createDay.isPending}
          submitLabel="Ajouter"
        >
          <FormField label="Numéro du jour" name="dayNumber" type="number" required />
          <FormField
            label='Lectures (JSON) ex: [{"book":"Genèse","chapterStart":1}]'
            name="readings"
            defaultValue='[{"book":"Genèse","chapterStart":1}]'
            as="textarea"
            required
          />
        </ContentForm>
      </FormSheet>
    </>
  );
}
