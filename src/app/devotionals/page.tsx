"use client";

import { AdminShell } from "@/components/admin-shell";
import { DevotionalFormFields } from "@/components/forms/devotional-form-fields";
import { FormSheet } from "@/components/form-sheet";
import { QueryState } from "@/components/query-state";
import { RowActions } from "@/components/row-actions";
import { DevotionalsTable, type DevotionalRow } from "@/components/tables/devotionals-table";
import { Button } from "@/components/ui/button";
import {
  useCreateDevotional,
  useDeleteDevotional,
  useUpdateDevotional,
} from "@/hooks/use-admin-mutations";
import { useDevotional, useDevotionals } from "@/hooks/use-admin-queries";
import { useState } from "react";

export default function DevotionalsPage() {
  const { data, isLoading, isError, error } = useDevotionals();
  const deleteMutation = useDeleteDevotional();
  const rows = (data ?? []) as DevotionalRow[];

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const create = useCreateDevotional();
  const update = useUpdateDevotional(editId ?? "");
  const { data: editData } = useDevotional(editId ?? "");

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
        title="Dévotions"
        description={`${rows.length} dévotion(s)`}
        action={
          <Button onClick={openCreate}>
            Nouvelle dévotion
          </Button>
        }
      >
        <QueryState isLoading={isLoading} isError={isError} error={error}>
          <DevotionalsTable data={rows} />
          <div className="mt-6 space-y-2">
            {rows.map((row) => (
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
        title={editId ? "Modifier la dévotion" : "Nouvelle dévotion"}
        description="Remplissez les champs ci-dessous pour publier une dévotion."
      >
        {editId && !editData ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : (
          <DevotionalFormFields
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
