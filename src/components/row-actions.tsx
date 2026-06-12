"use client";

import { Button } from "@/components/ui/button";

type RowActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
};

export function RowActions({ onEdit, onDelete, isDeleting }: RowActionsProps) {
  return (
    <div className="flex gap-2">
      <Button type="button" variant="outline" size="sm" onClick={onEdit}>
        Modifier
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        disabled={isDeleting}
        onClick={onDelete}
      >
        {isDeleting ? "…" : "Supprimer"}
      </Button>
    </div>
  );
}
