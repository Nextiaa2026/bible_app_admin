"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  BookOpen,
  CalendarDays,
  CreditCard,
  Headphones,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api/client";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/devotionals", label: "Dévotions", icon: Sparkles },
  { href: "/plans", label: "Plans", icon: CalendarDays },
  { href: "/meditations", label: "Méditations", icon: Headphones },
  { href: "/users", label: "Utilisateurs", icon: Users },
  { href: "/versions", label: "Versions", icon: BookOpen },
  { href: "/subscriptions", label: "Abonnements", icon: CreditCard },
  { href: "/subscription-plans", label: "Tarifs", icon: Tag },
] as const;

export function TopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/login") return null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            LG
          </span>
          <span className="hidden font-semibold sm:inline">Le Guide du Chrétien</span>
        </Link>

        <nav className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <p className="hidden max-w-[180px] truncate text-xs text-muted-foreground lg:block">
            {session?.user?.email ?? API_URL.replace(/^https?:\/\//, "")}
          </p>
          <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/login" })}>
            <LogOut className="size-4" />
            <span className="sr-only">Déconnexion</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
