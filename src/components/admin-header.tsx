"use client";

import { usePathname } from "next/navigation";

import { UserMenu } from "@/components/user-menu";
import { getPageTitle } from "@/lib/admin-nav";

export function AdminHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
        <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">{title}</h1>
        <UserMenu />
      </div>
    </header>
  );
}
