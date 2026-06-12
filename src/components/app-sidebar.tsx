"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  CreditCard,
  Headphones,
  LayoutDashboard,
  Sparkles,
  Users,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Tableau de bord", url: "/", icon: LayoutDashboard },
  { title: "Dévotions", url: "/devotionals", icon: Sparkles },
  { title: "Plans", url: "/plans", icon: CalendarDays },
  { title: "Méditations", url: "/meditations", icon: Headphones },
  { title: "Utilisateurs", url: "/users", icon: Users },
  { title: "Versions", url: "/versions", icon: BookOpen },
  { title: "Abonnements", url: "/subscriptions", icon: CreditCard },
  { title: "Tarifs", url: "/subscription-plans", icon: CreditCard },
] as const;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Le Guide du Chrétien</span>
                  <span className="truncate text-xs text-muted-foreground">Administration</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Contenu</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map(({ title, url, icon: Icon }) => {
              const active = url === "/" ? pathname === "/" : pathname.startsWith(url);
              return (
                <SidebarMenuItem key={url}>
                  <SidebarMenuButton asChild isActive={active} tooltip={title}>
                    <Link href={url}>
                      <Icon className="size-4" />
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
