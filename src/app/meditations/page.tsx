"use client";

import { useState } from "react";

import { AdminShell } from "@/components/admin-shell";
import { MeditationFormFields } from "@/components/forms/meditation-form-fields";
import { FormSheet } from "@/components/form-sheet";
import { QueryState } from "@/components/query-state";
import { RowActions } from "@/components/row-actions";
import { MeditationsTable, type MeditationRow } from "@/components/tables/meditations-table";
import { Button } from "@/components/ui/button";
import {
  useCreateMeditation,
  useDeleteMeditation,
  useUpdateMeditation,
} from "@/hooks/use-admin-mutations";
import { useMeditation, useMeditations } from "@/hooks/use-admin-queries";

export default function MeditationsPage() {
  const { data, isLoading, isError, error } = useMeditations();
  const deleteMutation = useDeleteMeditation();
  const items = (data ?? []) as MeditationRow[];

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const create = useCreateMeditation();
  const update = useUpdateMeditation(editId ?? "");
  const { data: editData } = useMeditation(editId ?? "");

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
        title="Méditations"
        description={`${items.length} méditation(s)`}
        action={
          <Button onClick={openCreate}>
            Nouvelle méditation
          </Button>
        }
      >
        <QueryState isLoading={isLoading} isError={isError} error={error}>
          <MeditationsTable data={items} />
          <div className="mt-6 space-y-2">
            {items.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between rounded-lg border bg-card p-3 shadow-card"
              >
                <span className="text-sm font-medium">{row.title}</span>
                <RowActions
                  onEdit={() => openEdit(row.id)}
                  onDelete={() => deleteMutation.mutate(row.id)}
                  isDeleting={deleteMutation.isPending && deleteMutation.variables === row.id}
                />
              </div>
            ))}
          </div>
        </QueryState>
      </AdminShell>

      <FormSheet
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setEditId(null);
        }}
        title={editId ? "Modifier la méditation" : "Nouvelle méditation"}
        description="Ajoutez ou modifiez une méditation audio."
      >
        {editId && !editData ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : (
          <MeditationFormFields
            key={editId ?? "new"}
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
