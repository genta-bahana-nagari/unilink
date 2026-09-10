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
          "sticky top-3 sm:top-4 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-lg"
            : "bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-md",
        )}
      >
        <div className="mx-auto max-w-fit px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 rounded-full">
            <Link
              href={isAuthenticated && role === "ADMIN" ? "/admin" : "/"}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
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
                    "px-3 py-1.5 rounded-full text-sm",
                  )}
                >
                  <item.icon size={16} />
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <div className="relative">
                <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-36 lg:w-48 pl-8 pr-3 py-1.5 text-sm rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 focus:bg-white dark:focus:bg-neutral-900 focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 outline-none transition-all"
                />
              </div>

              <button
                onClick={toggleDark}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
                aria-label="Toggle dark mode"
              >
                {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
              </button>

              {isAuthenticated && (
                <button className="relative p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400">
                  <FiBell size={16} />
                  <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-black rounded-full" />
                </button>
              )}

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Avatar
                      fallback={user?.name?.[0]?.toUpperCase() || "U"}
                      size="sm"
                    />
                    <span className="text-sm font-medium text-foreground hidden lg:inline">
                      {user?.name || "User"}
                    </span>
                    <FiChevronDown
                      size={14}
                      className="text-neutral-400 dark:text-neutral-500"
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-950 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 py-1 z-50">
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
                <div className="flex items-center gap-1.5">
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
              className="md:hidden p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden fixed inset-x-3 sm:inset-x-6 top-20 sm:top-24 bg-white dark:bg-neutral-950/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl shadow-lg transition-all duration-300 overflow-hidden z-40",
            isMobileMenuOpen
              ? "max-h-[calc(100vh-8rem)] opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          <div className="px-4 py-3 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 focus:bg-white dark:focus:bg-neutral-900 focus:border-black outline-none transition-all"
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
