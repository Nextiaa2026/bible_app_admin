"use client";

import Link from "next/link";
import {
  BookOpenIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  HomeIcon,
  MusicalNoteIcon,
  SparklesIcon,
  TagIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import { NavMain, type NavMainItem } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems: NavMainItem[] = [
  { title: "Tableau de bord", url: "/", icon: HomeIcon },
  { title: "Dévotions", url: "/devotionals", icon: SparklesIcon },
  { title: "Plans", url: "/plans", icon: CalendarDaysIcon },
  { title: "Méditations", url: "/meditations", icon: MusicalNoteIcon },
  { title: "Utilisateurs", url: "/users", icon: UsersIcon },
  { title: "Versions", url: "/versions", icon: BookOpenIcon },
  { title: "Abonnements", url: "/subscriptions", icon: CreditCardIcon },
  { title: "Tarifs", url: "/subscription-plans", icon: TagIcon },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <BookOpenIcon className="size-4" aria-hidden />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Le Guide du Chrétien</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">Administration</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} label="Contenu" />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
