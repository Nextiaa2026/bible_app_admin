"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";
import { actionsColumn } from "@/lib/table-actions-column";
import type { PlanCategory } from "@/lib/api/types";

export type PlanCategoryRow = PlanCategory;

type PlanCategoriesTableProps = {
  data: PlanCategoryRow[];
  onDelete?: (row: PlanCategoryRow) => void;
  deletingId?: string | null;
};

const baseColumns: ColumnDef<PlanCategoryRow>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Identifiant" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "labelFr",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Libellé FR" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("labelFr")}</span>,
  },
  {
    accessorKey: "labelEn",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Libellé EN" />,
    cell: ({ row }) => row.getValue("labelEn"),
  },
  {
    id: "usage",
    header: "Type",
    cell: () => <Badge variant="secondary">Plan biblique</Badge>,
  },
];

export function PlanCategoriesTable({ data, onDelete, deletingId }: PlanCategoriesTableProps) {
  const columns = useMemo(() => {
    if (!onDelete) return baseColumns;

    return [
      ...baseColumns,
      actionsColumn<PlanCategoryRow>((row) => [
        {
          label: deletingId === row.id ? "Suppression…" : "Supprimer",
          onClick: () => onDelete(row),
          variant: "destructive",
          disabled: deletingId === row.id,
        },
      ]),
    ];
  }, [onDelete, deletingId]);

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="labelFr"
      searchPlaceholder="Filtrer par libellé…"
      emptyMessage="Aucune catégorie. Ajoutez-en une ci-dessous."
    />
  );
}
