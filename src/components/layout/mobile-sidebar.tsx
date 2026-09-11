"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { FiUser, FiX } from "react-icons/fi";

interface MobileSidebarProps {
  items: NavigationItem[];
  role: string;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({
  items,
  role,
  isOpen,
  onClose,
}: MobileSidebarProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-50 lg:hidden transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shadow-brand-200">
              <span className="text-black font-bold text-lg">
                <FiUser />
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                UniLink
              </h1>
              <p className="text-sm text-muted-foreground capitalize">{role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <FiX size={20} />
          </button>
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
                onClick={onClose}
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
      </div>
    </>
  );
}
