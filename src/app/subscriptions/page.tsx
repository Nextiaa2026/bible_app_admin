"use client";

import { AdminShell } from "@/components/admin-shell";
import { QueryState } from "@/components/query-state";
import { SubscriptionsTable, type SubscriptionRow } from "@/components/tables/subscriptions-table";
import { useActivateSubscription, useRejectSubscription } from "@/hooks/use-admin-mutations";
import { useSubscriptions } from "@/hooks/use-admin-queries";

export default function SubscriptionsPage() {
  const { data, isLoading, isError, error } = useSubscriptions();
  const activate = useActivateSubscription();
  const reject = useRejectSubscription();
  const subs = (data ?? []) as SubscriptionRow[];
  const pending = subs.filter((s) => s.status === "pending");
  const pendingId =
    activate.isPending || reject.isPending
      ? ((activate.variables ?? reject.variables) as string)
      : null;

  return (
    <AdminShell
      description={`${pending.length} en attente · ${subs.length} au total`}
    >
      <QueryState isLoading={isLoading} isError={isError} error={error}>
        <SubscriptionsTable
          data={subs}
          onActivate={(row) => activate.mutate(row.id)}
          onReject={(row) => reject.mutate(row.id)}
          pendingId={pendingId}
        />
      </QueryState>
    </AdminShell>
  );
}
