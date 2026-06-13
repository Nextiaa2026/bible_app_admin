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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-full rounded-lg" />
          ))}
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
