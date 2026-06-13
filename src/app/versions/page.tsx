"use client";

import { AdminShell } from "@/components/admin-shell";
import { QueryState } from "@/components/query-state";
import { VersionsTable } from "@/components/tables/versions-table";
import { useBibleVersions } from "@/hooks/use-admin-queries";

export default function VersionsPage() {
  const { data: versions = [], isLoading, isError, error } = useBibleVersions();

  return (
    <AdminShell description="Métadonnées uniquement — le texte est embarqué dans l'app mobile">
      <QueryState isLoading={isLoading} isError={isError} error={error}>
        <VersionsTable data={versions} />
      </QueryState>
    </AdminShell>
  );
}
