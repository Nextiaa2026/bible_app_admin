"use client";

import Link from "next/link";
import { useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { PlanCategoryFormFields } from "@/components/forms/plan-category-form-fields";
import { FormSheet } from "@/components/form-sheet";
import { QueryState } from "@/components/query-state";
import {
  PlanCategoriesTable,
  type PlanCategoryRow,
} from "@/components/tables/plan-categories-table";
import { Button } from "@/components/ui/button";
import { useCreatePlanCategory, useDeletePlanCategory } from "@/hooks/use-admin-mutations";
import { usePlanCategories } from "@/hooks/use-admin-queries";

export default function PlanCategoriesPage() {
  const { data, isLoading, isError, error } = usePlanCategories();
  const deleteMutation = useDeletePlanCategory();
  const create = useCreatePlanCategory();
  const rows = (data ?? []) as PlanCategoryRow[];
  const [sheetOpen, setSheetOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await create.mutateAsync(formData);
    setSheetOpen(false);
  }

  return (
    <>
      <AdminShell
        description={`${rows.length} catégorie(s) · utilisées pour filtrer les plans dans l'app`}
        action={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/plans">Retour aux plans</Link>
            </Button>
            <Button onClick={() => setSheetOpen(true)}>Nouvelle catégorie</Button>
          </div>
        }
      >
        <QueryState isLoading={isLoading} isError={isError} error={error}>
          <PlanCategoriesTable
            data={rows}
            onDelete={(row) => deleteMutation.mutate(row.id)}
            deletingId={deleteMutation.isPending ? (deleteMutation.variables as string) : null}
          />
        </QueryState>
      </AdminShell>

      <FormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Nouvelle catégorie"
        description="Créez une catégorie pour organiser les plans bibliques dans l'application."
      >
        <PlanCategoryFormFields
          key={sheetOpen ? "open" : "closed"}
          onSubmit={handleSubmit}
          isPending={create.isPending}
        />
      </FormSheet>
    </>
  );
}
