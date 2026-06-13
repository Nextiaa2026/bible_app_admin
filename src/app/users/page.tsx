"use client";

import { AdminShell } from "@/components/admin-shell";
import { QueryState } from "@/components/query-state";
import { UsersTable } from "@/components/tables/users-table";
import { useAppUsers } from "@/hooks/use-admin-queries";

export default function UsersPage() {
  const { data: users = [], isLoading, isError, error } = useAppUsers();
  const activeCount = users.filter((u) => u.subscriptionStatus === "active").length;

  return (
    <AdminShell
      description={`${users.length} utilisateur(s) · ${activeCount} abonnement(s) actif(s)`}
    >
      <QueryState isLoading={isLoading} isError={isError} error={error}>
        <UsersTable data={users} />
      </QueryState>
    </AdminShell>
  );
}
