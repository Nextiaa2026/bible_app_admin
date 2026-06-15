"use client";

import { useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { ExpectationFormFields } from "@/components/forms/expectation-form-fields";
import { FormSheet } from "@/components/form-sheet";
import { QueryState } from "@/components/query-state";
import {
  ExpectationsTable,
  type ExpectationRow,
} from "@/components/tables/expectations-table";
import { Button } from "@/components/ui/button";
import {
  useCreateExpectation,
  useDeleteExpectation,
  useUpdateExpectation,
} from "@/hooks/use-admin-mutations";
import { useExpectation, useExpectations } from "@/hooks/use-admin-queries";

export default function ExpectationsPage() {
  const { data, isLoading, isError, error } = useExpectations();
  const deleteMutation = useDeleteExpectation();
  const items = (data ?? []) as ExpectationRow[];

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const create = useCreateExpectation();
  const update = useUpdateExpectation(editId ?? "");
  const { data: editData } = useExpectation(editId ?? "");

  function openCreate() {
    setEditId(null);
    setSheetOpen(true);
  }

  function openEdit(id: string) {
    setEditId(id);
    setSheetOpen(true);
  }

  async function handleSubmit(formData: FormData) {
    if (editId) {
      await update.mutateAsync(formData);
    } else {
      await create.mutateAsync(formData);
    }
    setSheetOpen(false);
    setEditId(null);
  }

  return (
    <>
      <AdminShell
        description={`${items.length} attente(s) spirituelle(s) pour l'onboarding`}
        action={<Button onClick={openCreate}>Nouvelle attente</Button>}
      >
        <QueryState isLoading={isLoading} isError={isError} error={error}>
          <ExpectationsTable
            data={items}
            onEdit={(row) => openEdit(row.id)}
            onDelete={(row) => deleteMutation.mutate(row.id)}
            deletingId={deleteMutation.isPending ? (deleteMutation.variables as string) : null}
          />
        </QueryState>
      </AdminShell>

      <FormSheet
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setEditId(null);
        }}
        title={editId ? "Modifier l'attente" : "Nouvelle attente"}
        description="Objectifs spirituels proposés lors de l'onboarding (foi, paix, sagesse…)."
      >
        {editId && !editData ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : (
          <ExpectationFormFields
            key={editId ?? "new"}
            mode={editId ? "update" : "create"}
            onSubmit={handleSubmit}
            isPending={create.isPending || update.isPending}
            defaultValues={editId ? editData : undefined}
            submitLabel={editId ? "Mettre à jour" : "Créer"}
          />
        )}
      </FormSheet>
    </>
  );
}
