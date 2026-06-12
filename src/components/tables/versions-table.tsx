"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";

export type BibleVersionRow = {
  id: string;
  code: string;
  name: string;
  language: string;
  isDefault: boolean;
  downloadUrl: string | null;
  bundleSize: number | null;
};

const columns: ColumnDef<BibleVersionRow>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Code" />,
    cell: ({ row }) => <span className="font-mono text-primary">{row.getValue("code")}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nom" />,
  },
  {
    accessorKey: "language",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Langue" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="uppercase">
        {row.getValue("language")}
      </Badge>
    ),
  },
  {
    accessorKey: "isDefault",
    header: "Défaut",
    cell: ({ row }) =>
      row.getValue("isDefault") ? (
        <Badge variant="default">Oui</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    accessorKey: "bundleSize",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Taille" />,
    cell: ({ row }) => {
      const size = row.getValue("bundleSize") as number | null;
      return size ? `${Math.round(size / 1024)} Ko` : "—";
    },
  },
];

export function VersionsTable({ data }: { data: BibleVersionRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Filtrer par nom…"
      emptyMessage="Aucune version. Lancez le backend et db:seed."
    />
  );
}
