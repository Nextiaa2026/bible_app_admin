"use client";

import { AdminShell } from "@/components/admin-shell";
import { QueryState } from "@/components/query-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActivateSubscription, useRejectSubscription } from "@/hooks/use-admin-mutations";
import { useSubscriptions } from "@/hooks/use-admin-queries";
import type { Subscription } from "@/lib/api/types";

export default function SubscriptionsPage() {
  const { data, isLoading, isError, error } = useSubscriptions();
  const activate = useActivateSubscription();
  const reject = useRejectSubscription();
  const subs = (data ?? []) as Subscription[];
  const pending = subs.filter((s) => s.status === "pending");

  return (
    <AdminShell
      title="Abonnements"
      description={`${pending.length} en attente · ${subs.length} au total`}
    >
      <QueryState isLoading={isLoading} isError={isError} error={error}>
        <div className="space-y-3">
          {subs.length === 0 ? (
            <p className="text-muted-foreground">Aucun abonnement.</p>
          ) : (
            subs.map((sub) => (
              <div
                key={sub.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-4 shadow-card"
              >
                <div>
                  <p className="font-medium">{sub.phoneNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {sub.provider} · {sub.externalRef ?? "—"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={sub.status === "active" ? "default" : "secondary"}>{sub.status}</Badge>
                  {sub.status === "pending" ? (
                    <>
                      <Button
                        size="sm"
                        disabled={activate.isPending}
                        onClick={() => activate.mutate(sub.id)}
                      >
                        Activer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={reject.isPending}
                        onClick={() => reject.mutate(sub.id)}
                      >
                        Rejeter
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </QueryState>
    </AdminShell>
  );
}
