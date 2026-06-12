"use client";

import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";

type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  children: ReactNode;
  skeleton?: ReactNode;
};

export function QueryState({ isLoading, isError, error, children, skeleton }: QueryStateProps) {
  if (isLoading) {
    return (
      skeleton ?? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        {error?.message ?? "Impossible de charger les données."}
      </p>
    );
  }

  return children;
}
