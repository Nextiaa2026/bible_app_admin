"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";
import { actionsColumn } from "@/lib/table-actions-column";

export type MeditationRow = {
  id: string;
  title: string;
  description: string | null;
  durationSec: number;
  category: string;
  isPremium?: boolean;
  audioUrl?: string | null;
  thumbnailUrl?: string | null;
};

type MeditationsTableProps = {
  data: MeditationRow[];
  onEdit?: (row: MeditationRow) => void;
  onDelete?: (row: MeditationRow) => void;
  deletingId?: string | null;
};

const baseColumns: ColumnDef<MeditationRow>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Titre" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("title")}</span>,
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
    cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
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
    accessorKey: "audioUrl",
    header: "Audio",
    cell: ({ row }) =>
      row.getValue("audioUrl") ? (
        <Badge variant="default">Oui</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "durationSec",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Durée" />,
    cell: ({ row }) => `${Math.round((row.getValue("durationSec") as number) / 60)} min`,
  },
];

export function MeditationsTable({
  data,
  onEdit,
  onDelete,
  deletingId,
}: MeditationsTableProps) {
  const columns = useMemo(() => {
    if (!onEdit && !onDelete) return baseColumns;

    return [
      ...baseColumns,
      actionsColumn<MeditationRow>((row) => [
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
      searchKey="title"
      searchPlaceholder="Filtrer par titre…"
      emptyMessage="Aucune méditation. Lancez le backend et db:seed."
    />
  );
}
