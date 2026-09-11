"use client";

import { NavigationItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUser } from "react-icons/fi";

interface DashboardSidebarProps {
  items: NavigationItem[];
  role: string;
}

export function DashboardSidebar({ items, role }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 overflow-y-auto flex-shrink-0 hidden md:block">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shadow-brand-200">
            <span className="text-black font-bold text-lg">
              <FiUser />
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-black">
              Fivo
            </h1>
            <p className="text-sm text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href + "/") && !item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-brand-50 text-brand-600 font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
