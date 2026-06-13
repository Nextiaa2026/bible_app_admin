"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";
import { actionsColumn } from "@/lib/table-actions-column";
import type { Subscription } from "@/lib/api/types";

export type SubscriptionRow = Subscription;

type SubscriptionsTableProps = {
  data: SubscriptionRow[];
  onActivate?: (row: SubscriptionRow) => void;
  onReject?: (row: SubscriptionRow) => void;
  pendingId?: string | null;
};

const baseColumns: ColumnDef<SubscriptionRow>[] = [
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Téléphone" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("phoneNumber")}</span>,
  },
  {
    accessorKey: "provider",
    header: "Fournisseur",
    cell: ({ row }) => row.getValue("provider"),
  },
  {
    accessorKey: "externalRef",
    header: "Référence",
    cell: ({ row }) => (row.getValue("externalRef") as string | null) ?? "—",
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Statut" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>{status}</Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Créé le" />,
    cell: ({ row }) =>
      new Date(row.getValue("createdAt") as string).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
];

export function SubscriptionsTable({
  data,
  onActivate,
  onReject,
  pendingId,
}: SubscriptionsTableProps) {
  const columns = useMemo(() => {
    if (!onActivate && !onReject) return baseColumns;

    return [
      ...baseColumns,
      actionsColumn<SubscriptionRow>((row) => {
        if (row.status !== "pending") return [];

        return [
          ...(onActivate
            ? [
                {
                  label: pendingId === row.id ? "Activation…" : "Activer",
                  onClick: () => onActivate(row),
                  disabled: pendingId === row.id,
                },
              ]
            : []),
          ...(onReject
            ? [
                {
                  label: pendingId === row.id ? "Rejet…" : "Rejeter",
                  onClick: () => onReject(row),
                  variant: "destructive" as const,
                  disabled: pendingId === row.id,
                },
              ]
            : []),
        ];
      }),
    ];
  }, [onActivate, onReject, pendingId]);

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="phoneNumber"
      searchPlaceholder="Filtrer par téléphone…"
      emptyMessage="Aucun abonnement."
    />
  );
}
