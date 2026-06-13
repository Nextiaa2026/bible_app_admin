"use client";

import { AdminShell } from "@/components/admin-shell";
import { PrayerFormFields } from "@/components/forms/prayer-form-fields";
import { FormSheet } from "@/components/form-sheet";
import { QueryState } from "@/components/query-state";
import { PrayersTable, type PrayerRow } from "@/components/tables/prayers-table";
import { Button } from "@/components/ui/button";
import {
  useCreateDailyPrayer,
  useDeleteDevotional,
  useUpdateDailyPrayer,
} from "@/hooks/use-admin-mutations";
import { useDevotional, useDevotionals } from "@/hooks/use-admin-queries";
import { useState } from "react";

export default function PrayersPage() {
  const { data, isLoading, isError, error } = useDevotionals();
  const deleteMutation = useDeleteDevotional();
  const rows = (data ?? []) as PrayerRow[];

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const create = useCreateDailyPrayer();
  const update = useUpdateDailyPrayer(editId ?? "");
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
        description={`${rows.length} entrée(s)`}
        action={<Button onClick={openCreate}>Nouvelle prière</Button>}
      >
        <QueryState isLoading={isLoading} isError={isError} error={error}>
          <PrayersTable
            data={rows}
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
        title={editId ? "Modifier la prière" : "Nouvelle prière du jour"}
        description="Choisissez une date, une écriture optionnelle et rédigez la prière."
      >
        {editId && !editData ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : (
          <PrayerFormFields
            key={editId ?? "new"}
            onSubmit={handleSubmit}
            isPending={create.isPending || update.isPending}
            defaultValues={editId ? editData : undefined}
            submitLabel={editId ? "Mettre à jour" : "Publier"}
          />
        )}
      </FormSheet>
    </>
  );
}
