"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";

export type BiblePlanRow = {
  id: string;
  name: string;
  description: string | null;
  durationDays: number;
  category?: string;
  thumbnailUrl?: string | null;
};

const columns: ColumnDef<BiblePlanRow>[] = [
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

export function PlansTable({ data }: { data: BiblePlanRow[] }) {
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
