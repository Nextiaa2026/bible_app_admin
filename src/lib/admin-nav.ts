import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CalendarDays,
  CreditCard,
  FolderTree,
  HandHeart,
  Headphones,
  LayoutDashboard,
  Sparkles,
  Tag,
  Target,
  Users,
} from "lucide-react";

export type AdminNavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const adminNavLinks: AdminNavLink[] = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/prayers", label: "Prières", icon: HandHeart },
  { href: "/devotionals", label: "Dévotions", icon: Sparkles },
  { href: "/plans", label: "Plans bibliques", icon: CalendarDays },
  { href: "/expectations", label: "Attentes", icon: Target },
  { href: "/plan-categories", label: "Catégories plans", icon: FolderTree },
  { href: "/meditations", label: "Méditations", icon: Headphones },
  { href: "/users", label: "Utilisateurs", icon: Users },
  { href: "/versions", label: "Versions Bible", icon: BookOpen },
  { href: "/subscriptions", label: "Abonnements", icon: CreditCard },
  { href: "/subscription-plans", label: "Tarifs", icon: Tag },
];

export function getPageTitle(pathname: string): string {
  if (pathname === "/") return "Tableau de bord";

  const match = adminNavLinks
    .filter((link) => link.href !== "/")
    .find((link) => pathname === link.href || pathname.startsWith(`${link.href}/`));

  return match?.label ?? "Administration";
}

export function getUserInitials(name?: string | null, email?: string | null): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  if (email) {
    const local = email.split("@")[0] ?? "";
    return local.slice(0, 2).toUpperCase() || "AD";
  }

  return "AD";
}
