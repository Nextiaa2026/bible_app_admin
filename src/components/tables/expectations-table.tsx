"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";
import { actionsColumn } from "@/lib/table-actions-column";

export type ExpectationRow = {
  id: string;
  labelFr: string;
  labelEn: string;
  planCategoryTag: string | null;
  estimatedMinutes: number;
  sortOrder: number;
  isActive: boolean;
  thumbnailUrl?: string | null;
  verses?: unknown[];
};

type ExpectationsTableProps = {
  data: ExpectationRow[];
  onEdit?: (row: ExpectationRow) => void;
  onDelete?: (row: ExpectationRow) => void;
  deletingId?: string | null;
};

const baseColumns: ColumnDef<ExpectationRow>[] = [
  {
    accessorKey: "labelFr",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Libellé" />,
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.getValue("labelFr")}</p>
        <p className="text-xs text-muted-foreground">{row.original.id}</p>
      </div>
    ),
  },
  {
    accessorKey: "planCategoryTag",
    header: "Catégorie plan",
    cell: ({ row }) => (
      <Badge variant="outline">{(row.getValue("planCategoryTag") as string | null) ?? "—"}</Badge>
    ),
  },
  {
    accessorKey: "estimatedMinutes",
    header: "Durée",
    cell: ({ row }) => `${row.getValue("estimatedMinutes")} min`,
  },
  {
    accessorKey: "verses",
    header: "Versets",
    cell: ({ row }) => {
      const verses = row.original.verses;
      return Array.isArray(verses) ? verses.length : 0;
    },
  },
  {
    accessorKey: "sortOrder",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ordre" />,
  },
  {
    accessorKey: "isActive",
    header: "Actif",
    cell: ({ row }) =>
      row.original.isActive ? (
        <Badge variant="default">Oui</Badge>
      ) : (
        <span className="text-muted-foreground">Non</span>
      ),
  },
  {
    accessorKey: "thumbnailUrl",
    header: "Vignette",
    cell: ({ row }) => {
      const url = row.getValue("thumbnailUrl") as string | null | undefined;
      return url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="h-8 w-8 rounded-lg object-cover" />
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
];

export function ExpectationsTable({
  data,
  onEdit,
  onDelete,
  deletingId,
}: ExpectationsTableProps) {
  const columns = useMemo(() => {
    if (!onEdit && !onDelete) return baseColumns;

    return [
      ...baseColumns,
      actionsColumn<ExpectationRow>((row) => [
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
      searchKey="labelFr"
      searchPlaceholder="Filtrer par libellé…"
      emptyMessage="Aucune attente. Lancez db:seed ou créez-en une."
    />
  );
}
