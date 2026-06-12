"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableColumnHeader, type ColumnDef } from "@/components/ui/data-table";
import type { AppUser } from "@/lib/api/types";

export type UserRow = AppUser;

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function subscriptionVariant(status: string): "default" | "secondary" | "outline" {
  if (status === "active") return "default";
  if (status === "pending") return "secondary";
  return "outline";
}

const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nom" />,
    cell: ({ row }) => {
      const name = row.getValue("name") as string | null;
      const email = row.original.email;
      return (
        <div className="flex items-center gap-3">
          {row.original.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.original.avatarUrl}
              alt=""
              className="h-8 w-8 rounded-lg object-cover"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs font-medium">
              {(name?.[0] ?? email[0] ?? "?").toUpperCase()}
            </span>
          )}
          <div>
            <p className="font-medium">{name ?? "—"}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => row.getValue("email"),
  },
  {
    accessorKey: "subscriptionStatus",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Abonnement" />,
    cell: ({ row }) => {
      const status = row.getValue("subscriptionStatus") as string;
      return <Badge variant={subscriptionVariant(status)}>{status}</Badge>;
    },
  },
  {
    accessorKey: "subscriptionExpiresAt",
    header: "Expire le",
    cell: ({ row }) => formatDate(row.getValue("subscriptionExpiresAt") as string | null),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Inscrit le" />,
    cell: ({ row }) => formatDate(row.getValue("createdAt") as string),
  },
];

export function UsersTable({ data }: { data: UserRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="email"
      searchPlaceholder="Filtrer par email…"
      emptyMessage="Aucun utilisateur inscrit."
    />
  );
}
