"use client";

import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";

export type DevotionalRow = {
  id: string;
  title: string;
  body: string;
  date: string;
  scriptureReference?: string | null;
  prayer?: string | null;
};

const columns: ColumnDef<DevotionalRow>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Titre" />,
    cell: ({ row }) => <span className="font-medium text-primary">{row.getValue("title")}</span>,
  },
  {
    accessorKey: "scriptureReference",
    header: "Écriture",
    cell: ({ row }) => (row.getValue("scriptureReference") as string | null) ?? "—",
  },
  {
    accessorKey: "body",
    header: "Aperçu",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-lg text-muted-foreground">
        {row.getValue("body") as string}
      </span>
    ),
  },
];

export function DevotionalsTable({ data }: { data: DevotionalRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="title"
      searchPlaceholder="Filtrer par titre…"
      emptyMessage="Aucune dévotion pour aujourd'hui."
    />
  );
}
