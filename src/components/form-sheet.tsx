"use client";

import type { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type FormSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Wider centered column for list-style sheets (e.g. plan days). */
  wide?: boolean;
};

export function FormSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  wide = false,
}: FormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn(
          "inset-0 h-dvh w-screen max-w-none gap-0 overflow-hidden border-0 bg-background p-0",
          "data-[side=right]:w-screen data-[side=right]:sm:max-w-none",
          className,
        )}
      >
        <SheetHeader className="shrink-0 border-b px-6 py-5 text-center sm:px-8">
          <SheetTitle className="text-xl font-semibold">{title}</SheetTitle>
          {description ? (
            <SheetDescription className="mx-auto max-w-lg">{description}</SheetDescription>
          ) : null}
        </SheetHeader>

        <div className="flex flex-1 justify-center overflow-y-auto px-6 py-8 sm:px-8">
          <div className={cn("w-full", wide ? "max-w-3xl" : "max-w-xl")}>{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
