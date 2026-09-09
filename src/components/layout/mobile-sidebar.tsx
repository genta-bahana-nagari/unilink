"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useMobile } from "@/hooks/use-mobile";
import { getNavigationByRole } from "@/config/navigation";
import { NavigationItem } from "@/config/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { isMobile } = useMobile();
  const navigation = getNavigationByRole(user?.role || null);

  if (!isMobile) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-slate-200"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-blue-600">UniLink</h1>
          <p className="text-sm text-slate-500 capitalize mt-1">
            {user?.role || "Guest"}
          </p>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <item.icon size={18} className="flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
