"use client";

import { useAuth } from "@/hooks/use-auth";
import { publicNavigation } from "@/config/navigation";
import { NavigationItem } from "@/config/navigation";
import Link from "next/link";
import {
  Calendar,
  FlaskConical,
  Bell,
  User,
  LogOut,
} from "lucide-react";

export function PublicNavbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          UniLink
        </Link>
        <div className="flex items-center gap-4">
          {publicNavigation.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 transition-colors"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-slate-700 hover:text-red-600 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 transition-colors"
            >
              <User size={16} />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
