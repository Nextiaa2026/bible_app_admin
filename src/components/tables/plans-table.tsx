"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";
import { actionsColumn } from "@/lib/table-actions-column";

export type BiblePlanRow = {
  id: string;
  name: string;
  description: string | null;
  durationDays: number;
  category?: string;
  isPremium?: boolean;
  thumbnailUrl?: string | null;
};

type PlansTableProps = {
  data: BiblePlanRow[];
  onEdit?: (row: BiblePlanRow) => void;
  onDelete?: (row: BiblePlanRow) => void;
  onManageDays?: (row: BiblePlanRow) => void;
  deletingId?: string | null;
};

const baseColumns: ColumnDef<BiblePlanRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nom" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="max-w-md truncate text-muted-foreground">
        {(row.getValue("description") as string | null) ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Catégorie" />,
    cell: ({ row }) => {
      const category = (row.getValue("category") as string | undefined) ?? "reading";
      return <Badge variant="secondary">{category}</Badge>;
    },
  },
  {
    accessorKey: "isPremium",
    header: "Premium",
    cell: ({ row }) =>
      row.original.isPremium ? (
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
  {
    accessorKey: "durationDays",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Durée" />,
    cell: ({ row }) => `${row.getValue("durationDays")} jours`,
  },
];

export function PlansTable({ data, onEdit, onDelete, onManageDays, deletingId }: PlansTableProps) {
  const columns = useMemo(() => {
    if (!onEdit && !onDelete && !onManageDays) return baseColumns;

    return [
      ...baseColumns,
      actionsColumn<BiblePlanRow>((row) => [
        ...(onManageDays
          ? [{ label: "Configurer les jours", onClick: () => onManageDays(row) }]
          : []),
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
  }, [onEdit, onDelete, onManageDays, deletingId]);

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Filtrer par nom…"
      emptyMessage="Aucun plan. Lancez le backend et db:seed."
    />
  );
}
