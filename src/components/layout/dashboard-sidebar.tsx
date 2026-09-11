"use client";

import { useState } from "react";
import { NavigationItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface DashboardSidebarProps {
  items: NavigationItem[];
  role: string;
}

export function DashboardSidebar({
  items,
  role,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { logout } = useAuth();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 overflow-y-auto flex-shrink-0 hidden md:flex flex-col">
        {/* Header */}
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

              <p className="text-sm text-muted-foreground capitalize">
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1">
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

        {/* Logout */}
        <div className="p-4 border-t border-border mt-auto">
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className={cn(
              "w-full",
              "flex items-center gap-3",
              "px-3 py-2.5",
              "rounded-lg",
              "text-sm",
              "text-red-500",
              "transition-colors",
              "hover:bg-red-50",
              "hover:text-red-600",
              "dark:hover:bg-red-950/30",
            )}
          >
            <FiLogOut size={18} className="flex-shrink-0" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        size="sm"
      >
        <div className="p-6">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4 mx-auto">
            <FiLogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground text-center mb-2">
            Confirm Logout
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground text-center mb-6">
            Are you sure you want to log out? You will be redirected to the
            homepage.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleLogoutConfirm}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
