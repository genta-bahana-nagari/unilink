import { NavigationItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarProps {
  items: NavigationItem[];
  role: string;
}

export function DashboardSidebar({ items, role }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto flex-shrink-0 hidden md:block">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-blue-600">UniLink</h1>
        <p className="text-sm text-slate-500 capitalize mt-1">{role}</p>
      </div>

      <nav className="p-4 space-y-1">
        {items.map(item => {
          const isActive = pathname === item.href ||
            (pathname.startsWith(item.href + "/") && !item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-slate-700 hover:bg-slate-50"
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
