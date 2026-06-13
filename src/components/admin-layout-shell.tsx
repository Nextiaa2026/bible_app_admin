"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { TopNav } from "@/components/top-nav";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AdminLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex min-h-svh flex-col">
        <TopNav />
        <main className="flex-1">{children}</main>
      </div>
    </TooltipProvider>
  );
}
