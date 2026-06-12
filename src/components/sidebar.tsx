"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Tableau de bord", icon: "📊" },
  { href: "/devotionals", label: "Dévotions", icon: "✨" },
  { href: "/plans", label: "Plans bibliques", icon: "📅" },
  { href: "/meditations", label: "Méditations", icon: "🎧" },
  { href: "/versions", label: "Versions Bible", icon: "📖" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-5">
        <h1 className="text-lg font-bold text-primary">Le Guide du Chrétien</h1>
        <p className="text-xs text-gray-500">Administration</p>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-50 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-4">
        <p className="text-xs text-gray-400">Backend: {process.env.NEXT_PUBLIC_API_URL}</p>
      </div>
    </aside>
  );
}
