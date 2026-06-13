"use client";

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
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
