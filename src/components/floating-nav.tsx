"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavLinks } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-1 rounded-2xl border border-border/60 bg-background/90 p-2 shadow-float backdrop-blur-md"
    >
      {adminNavLinks.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Tooltip key={href}>
            <TooltipTrigger asChild>
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-[18px]" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={12}>
              {label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}
