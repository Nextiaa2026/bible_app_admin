"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AdminHeader } from "@/components/admin-header";
import { FloatingNav } from "@/components/floating-nav";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AdminLayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-svh flex-col">
        <AdminHeader />
        <main className="flex-1 pr-[4.5rem]">{children}</main>
        <FloatingNav />
      </div>
    </TooltipProvider>
  );
}
