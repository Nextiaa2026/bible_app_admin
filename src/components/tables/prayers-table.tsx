"use client";

import { useMemo } from "react";

import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";
import { actionsColumn } from "@/lib/table-actions-column";

export type PrayerRow = {
  id: string;
  date: string;
  prayerText?: string | null;
  prayer?: string | null;
  scriptureReference?: string | null;
  scriptureText?: string | null;
  title?: string;
};

type PrayersTableProps = {
  data: PrayerRow[];
  onEdit?: (row: PrayerRow) => void;
  onDelete?: (row: PrayerRow) => void;
  deletingId?: string | null;
};

const baseColumns: ColumnDef<PrayerRow>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
  },
  {
    accessorKey: "scriptureReference",
    header: "Référence",
    cell: ({ row }) => (row.getValue("scriptureReference") as string | null) ?? "—",
  },
  {
    accessorKey: "scriptureText",
    header: "Écriture",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-md text-muted-foreground">
        {(row.getValue("scriptureText") as string | null) ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "prayerText",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prière" />,
    cell: ({ row }) => (
      <span className="line-clamp-3 max-w-2xl text-muted-foreground">
        {(row.getValue("prayerText") as string | null) ||
          row.original.prayer ||
          "—"}
      </span>
    ),
  },
];

export function PrayersTable({ data, onEdit, onDelete, deletingId }: PrayersTableProps) {
  const columns = useMemo(() => {
    if (!onEdit && !onDelete) return baseColumns;

    return [
      ...baseColumns,
      actionsColumn<PrayerRow>((row) => [
        ...(onEdit ? [{ label: "Modifier", onClick: () => onEdit(row) }] : []),
        ...(onDelete
          ? [
              {
                label: deletingId === row.id ? "Suppression…" : "Supprimer",
                onClick: () => onDelete(row),
                variant: "destructive" as const,
                disabled: deletingId === row.id,
              },
            ]
          : []),
      ]),
    ];
  }, [onEdit, onDelete, deletingId]);

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="prayerText"
      searchPlaceholder="Filtrer par texte…"
      emptyMessage="Aucune prière publiée."
    />
  );
}
