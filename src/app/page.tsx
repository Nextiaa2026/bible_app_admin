"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Headphones, Sparkles } from "lucide-react";

import { QueryState } from "@/components/query-state";
import { Badge } from "@/components/ui/badge";
import { useDashboardStats } from "@/hooks/use-admin-queries";

const cards = [
  {
    label: "Dévotions",
    valueKey: "devotionals" as const,
    href: "/devotionals",
    icon: Sparkles,
    badge: "Aujourd'hui",
  },
  {
    label: "Plans bibliques",
    valueKey: "plans" as const,
    href: "/plans",
    icon: CalendarDays,
    badge: "Guide",
  },
  {
    label: "Méditations",
    valueKey: "meditations" as const,
    href: "/meditations",
    icon: Headphones,
    badge: "Audio",
  },
  {
    label: "Versions Bible",
    valueKey: "versions" as const,
    href: "/versions",
    icon: BookOpen,
    badge: "Métadonnées",
  },
];

export default function DashboardPage() {
  const { data: stats, isLoading, isError, error } = useDashboardStats();

  return (
    <div className="mx-auto w-full max-w-7xl p-6 lg:p-8">
      <QueryState isLoading={isLoading} isError={isError} error={error}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ label, valueKey, href, icon: Icon, badge }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-lg border bg-card p-5 shadow-card transition-shadow hover:shadow-float"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <Badge variant="muted">{badge}</Badge>
              </div>
              <p className="mt-4 text-3xl font-bold">{stats?.[valueKey] ?? 0}</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground">
                {label}
                <ArrowRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </p>
            </Link>
          ))}
        </div>
      </QueryState>

      <div className="mt-8 rounded-lg border bg-card p-6 shadow-card">
        <h2 className="text-lg font-semibold">Architecture</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">app/</strong> — Application mobile Expo (Bible locale, hors ligne)
          </li>
          <li>
            <strong className="text-foreground">backend/</strong> — API Express (auth, sync, métadonnées)
          </li>
          <li>
            <strong className="text-foreground">admin/</strong> — Ce panneau (gestion du contenu)
          </li>
        </ul>
      </div>
    </div>
  );
}
