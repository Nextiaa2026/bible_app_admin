"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";
import type { SubscriptionPlan } from "@/lib/api/types";

export type SubscriptionPlanRow = SubscriptionPlan;

const columns: ColumnDef<SubscriptionPlanRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nom" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "priceXaf",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Prix (XAF)" />,
    cell: ({ row }) => `${row.getValue("priceXaf")} XAF`,
  },
  {
    accessorKey: "durationDays",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Durée" />,
    cell: ({ row }) => `${row.getValue("durationDays")} jours`,
  },
  {
    accessorKey: "isActive",
    header: "Statut",
    cell: ({ row }) =>
      row.getValue("isActive") ? (
        <Badge variant="default">Active</Badge>
      ) : (
        <Badge variant="secondary">Inactive</Badge>
      ),
  },
];

export function SubscriptionPlansTable({ data }: { data: SubscriptionPlanRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Filtrer par nom…"
      emptyMessage="Aucune formule d'abonnement."
    />
  );
}
