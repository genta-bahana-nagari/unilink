"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { publicNavigation, getNavigationByRole } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiBell,
  FiUser,
  FiLogOut,
  FiSearch,
  FiMoon,
  FiSun,
  FiChevronDown,
} from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useDarkMode } from "@/providers/dark-mode-provider";

export function PublicNavbar() {
  const { user, logout, isAuthenticated, role } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isDark, toggleDark } = useDarkMode();

  const navigation =
    isAuthenticated && role ? getNavigationByRole(role) : publicNavigation;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const navLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-2 text-sm font-medium transition-colors duration-200",
      pathname === href ? "text-black dark:text-white" : "text-neutral-500 dark:text-neutral-400",
    );

  const mobileNavLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200",
      pathname === href
        ? "bg-black text-white dark:bg-white dark:text-black"
        : "text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800",
    );

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm"
            : "bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link
              href={isAuthenticated && role === "ADMIN" ? "/admin" : "/"}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
                UniLink
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    navLinkClasses(item.href),
                    "px-3 py-2 rounded-lg",
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 lg:w-64 pl-9 pr-4 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:bg-white dark:focus:bg-neutral-900 focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 outline-none transition-all"
                />
              </div>

              <button
                onClick={toggleDark}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 dark:text-neutral-400"
                aria-label="Toggle dark mode"
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              {isAuthenticated && (
                <button className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500 dark:text-neutral-400">
                  <FiBell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />
                </button>
              )}

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Avatar
                      fallback={user?.name?.[0]?.toUpperCase() || "U"}
                      size="sm"
                    />
                    <span className="text-sm font-medium text-foreground hidden lg:inline">
                      {user?.name || "User"}
                    </span>
                    <FiChevronDown
                      size={16}
                      className="text-neutral-400 dark:text-neutral-500"
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-950 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-800 py-1 z-50">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiUser size={16} />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                      >
                        <FiLogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden fixed inset-x-0 top-16 sm:top-20 bg-white dark:bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 shadow-lg transition-all duration-300 overflow-hidden",
            isMobileMenuOpen
              ? "max-h-[calc(100vh-4rem)] opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          <div className="px-4 py-3 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-3 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:bg-white dark:focus:bg-neutral-900 focus:border-black outline-none transition-all"
              />
            </div>

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={mobileNavLinkClasses(item.href)}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-3" />

            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Avatar
                    fallback={user?.name?.[0]?.toUpperCase() || "U"}
                    size="sm"
                  />
                  <span>{user?.name || "Profile"}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                >
                  <FiLogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-medium text-foreground border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <FiUser size={20} className="mr-2" />
                  Sign In
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            <button
              onClick={toggleDark}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
