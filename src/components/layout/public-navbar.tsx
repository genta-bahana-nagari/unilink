"use client";

import { useEffect, useState } from "react";
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

import { useAuth } from "@/hooks/use-auth";
import { publicNavigation, getNavigationByRole } from "@/config/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { useDarkMode } from "@/providers/dark-mode-provider";

export function PublicNavbar() {
  const { user, logout, isAuthenticated, role } = useAuth();
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { isDark, toggleDark } = useDarkMode();

  const navigation =
    isAuthenticated && role ? getNavigationByRole(role) : publicNavigation;

  /* --------------------------------
     Scroll detection
  -------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* --------------------------------
     Close menus when route changes
  -------------------------------- */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  /* --------------------------------
     Close user menu when clicking outside
  -------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        !target.closest("[data-user-menu]") &&
        !target.closest("[data-user-menu-button]")
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* --------------------------------
     Desktop navigation styles
  -------------------------------- */
  const navLinkClasses = (href: string) =>
    cn(
      "relative",
      "flex items-center justify-center",
      "w-9 h-9",
      "rounded-full",
      "transition-all duration-200",
      "group",

      pathname === href
        ? "bg-black text-white dark:bg-white dark:text-black"
        : [
            "text-neutral-500 dark:text-neutral-400",
            "hover:bg-neutral-100 dark:hover:bg-neutral-800",
            "hover:text-black dark:hover:text-white",
          ],
    );

  /* --------------------------------
     Mobile navigation styles
  -------------------------------- */
  const mobileNavLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-3",
      "w-full",
      "px-4 py-3",
      "rounded-xl",
      "text-base font-medium",
      "transition-all duration-200",

      pathname === href
        ? "bg-black text-white dark:bg-white dark:text-black"
        : [
            "text-foreground",
            "hover:bg-neutral-100",
            "dark:hover:bg-neutral-800",
          ],
    );

  const handleLogoutConfirm = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      {/* =========================================================
          DESKTOP / MAIN NAVBAR
          ========================================================= */}

      <div className="sticky top-4 z-50 w-full px-3 sm:px-6 pointer-events-none">
        <nav
          className={cn(
            /* IMPORTANT:
               The navbar itself is the capsule.
               It is NOT full width.
            */
            "mx-auto",
            "w-fit max-w-[calc(100vw-1.5rem)]",

            /* Capsule */
            "rounded-full",

            /* Layout */
            "flex items-center",

            /* Border */
            "border",

            /* Glass */
            "bg-white/85 dark:bg-neutral-950/85",
            "backdrop-blur-2xl",

            /* Shadow */
            "shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
            "dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]",

            /* Animation */
            "transition-all duration-300",

            isScrolled
              ? [
                  "border-neutral-300/80",
                  "dark:border-neutral-700/80",
                  "shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
                  "dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
                ]
              : ["border-neutral-200/70", "dark:border-neutral-800/70"],

            /* Keep navbar clickable */
            "pointer-events-auto",
          )}
        >
          <div
            className={cn(
              "flex items-center",
              "h-14 sm:h-16",
              "px-2 sm:px-3 md:px-4",
              "w-full",
            )}
          >
            {/* =====================================================
                LOGO
                ===================================================== */}

            <Link
              href={isAuthenticated && role === "ADMIN" ? "/admin" : "/"}
              className="flex items-center gap-2.5 shrink-0 px-2"
            >
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-9 h-9 sm:w-10 sm:h-10",
                  "rounded-full",
                  "bg-black dark:bg-white",
                  "shadow-sm",
                )}
              >
                <span className="text-white dark:text-black font-bold text-sm">
                  U
                </span>
              </div>

              <span className="text-lg sm:text-xl font-bold tracking-tight text-black dark:text-white">
                UniLink
              </span>
            </Link>

            {/* =====================================================
                DESKTOP NAVIGATION
                ===================================================== */}

            <div className="hidden md:flex items-center gap-1 ml-3 pl-3 border-l border-neutral-200 dark:border-neutral-800">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={navLinkClasses(item.href)}
                  aria-label={item.label}
                  title={item.label}
                >
                  <item.icon size={17} />

                  {/* Tooltip */}
                  <span
                    className={cn(
                      "absolute",
                      "top-full mt-2",
                      "left-1/2 -translate-x-1/2",
                      "whitespace-nowrap",
                      "px-2 py-1",
                      "rounded-md",
                      "bg-black dark:bg-white",
                      "text-white dark:text-black",
                      "text-[11px]",
                      "opacity-0 scale-95",
                      "pointer-events-none",
                      "group-hover:opacity-100",
                      "group-hover:scale-100",
                      "transition-all duration-150",
                      "z-[100]",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* =====================================================
                DESKTOP ACTIONS
                ===================================================== */}

            <div className="hidden md:flex items-center gap-1.5 ml-3 pl-3 border-l border-neutral-200 dark:border-neutral-800">
              {/* Search */}
              <div className="relative group">
                <FiSearch
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                />

                <input
                  type="text"
                  placeholder="Search..."
                  className={cn(
                    "h-9",
                    "w-32 lg:w-40",
                    "pl-8 pr-3",
                    "rounded-full",
                    "text-sm",
                    "text-foreground",
                    "placeholder:text-neutral-400",

                    "bg-neutral-100/80",
                    "dark:bg-neutral-900/80",

                    "border border-transparent",
                    "focus:border-neutral-300",
                    "dark:focus:border-neutral-700",

                    "focus:bg-white",
                    "dark:focus:bg-neutral-900",

                    "focus:outline-none",
                    "focus:ring-2",
                    "focus:ring-black/5",
                    "dark:focus:ring-white/10",

                    "transition-all duration-200",

                    "focus:w-40 lg:focus:w-52",
                  )}
                />
              </div>

              {/* Dark Mode */}
              <button
                type="button"
                onClick={toggleDark}
                aria-label="Toggle dark mode"
                className={cn(
                  "flex items-center justify-center",
                  "w-9 h-9",
                  "rounded-full",
                  "text-neutral-600 dark:text-neutral-400",
                  "hover:bg-neutral-100",
                  "dark:hover:bg-neutral-800",
                  "hover:text-black",
                  "dark:hover:text-white",
                  "transition-colors",
                )}
              >
                {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
              </button>

              {/* Notifications */}
              {isAuthenticated && (
                <button
                  type="button"
                  aria-label="Notifications"
                  className={cn(
                    "relative",
                    "flex items-center justify-center",
                    "w-9 h-9",
                    "rounded-full",
                    "text-neutral-600 dark:text-neutral-400",
                    "hover:bg-neutral-100",
                    "dark:hover:bg-neutral-800",
                    "hover:text-black",
                    "dark:hover:text-white",
                    "transition-colors",
                  )}
                >
                  <FiBell size={17} />

                  <span
                    className={cn(
                      "absolute",
                      "top-2 right-2",
                      "w-1.5 h-1.5",
                      "rounded-full",
                      "bg-black dark:bg-white",
                    )}
                  />
                </button>
              )}

              {/* =================================================
                  USER MENU
                  ================================================= */}

              {isAuthenticated ? (
                <div className="relative ml-1" data-user-menu>
                  <button
                    type="button"
                    data-user-menu-button
                    onClick={() => setIsUserMenuOpen((current) => !current)}
                    className={cn(
                      "flex items-center gap-2",
                      "h-10",
                      "pl-1 pr-2.5",
                      "rounded-full",
                      "hover:bg-neutral-100",
                      "dark:hover:bg-neutral-800",
                      "transition-colors",
                    )}
                  >
                    <Avatar
                      fallback={user?.name?.[0]?.toUpperCase() || "U"}
                      size="sm"
                    />

                    <span className="hidden lg:block max-w-24 truncate text-sm font-medium text-foreground">
                      {user?.name || "User"}
                    </span>

                    <FiChevronDown
                      size={14}
                      className={cn(
                        "text-neutral-400",
                        "dark:text-neutral-500",
                        "transition-transform",
                        isUserMenuOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div
                      className={cn(
                        "absolute",
                        "right-0",
                        "top-[calc(100%+10px)]",
                        "w-52",
                        "overflow-hidden",
                        "rounded-2xl",
                        "border",
                        "border-neutral-200",
                        "dark:border-neutral-800",
                        "bg-white",
                        "dark:bg-neutral-950",
                        "shadow-xl",
                        "shadow-black/10",
                        "dark:shadow-black/40",
                        "p-1.5",
                        "z-[100]",
                      )}
                    >
                      <Link
                        href="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3",
                          "w-full",
                          "px-3 py-2.5",
                          "rounded-xl",
                          "text-sm",
                          "text-foreground",
                          "hover:bg-neutral-100",
                          "dark:hover:bg-neutral-800",
                          "transition-colors",
                        )}
                      >
                        <FiUser size={16} />
                        Profile
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsLogoutModalOpen(true);
                        }}
                        className={cn(
                          "flex items-center gap-3",
                          "w-full",
                          "px-3 py-2.5",
                          "rounded-xl",
                          "text-sm",
                          "text-red-600",
                          "hover:bg-red-50",
                          "dark:hover:bg-red-950/50",
                          "transition-colors",
                        )}
                      >
                        <FiLogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* =================================================
                   GUEST ACTIONS
                   ================================================= */

                <div className="flex items-center gap-1.5 ml-1">
                  <Link href="/auth/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full px-4"
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link href="/auth/register">
                    <Button size="sm" className="rounded-full px-4">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* =====================================================
                MOBILE MENU BUTTON
                ===================================================== */}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className={cn(
                "md:hidden",
                "ml-auto",
                "flex items-center justify-center",
                "w-10 h-10",
                "rounded-full",
                "text-foreground",
                "hover:bg-neutral-100",
                "dark:hover:bg-neutral-800",
                "transition-colors",
              )}
            >
              {isMobileMenuOpen ? <FiX size={21} /> : <FiMenu size={21} />}
            </button>
          </div>
        </nav>
      </div>

      {/* =========================================================
          MOBILE OVERLAY
          ========================================================= */}

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* =========================================================
          MOBILE MENU
          ========================================================= */}

      <div
        className={cn(
          "fixed",
          "z-50",
          "md:hidden",
          "top-[5.25rem]",
          "left-3 right-3 sm:left-6 sm:right-6",

          "rounded-3xl",
          "border",
          "border-neutral-200",
          "dark:border-neutral-800",

          "bg-white/95",
          "dark:bg-neutral-950/95",

          "backdrop-blur-2xl",

          "shadow-2xl",
          "shadow-black/10",
          "dark:shadow-black/40",

          "overflow-hidden",

          "transition-all duration-300 ease-out",

          isMobileMenuOpen
            ? [
                "opacity-100",
                "translate-y-0",
                "pointer-events-auto",
                "max-h-[calc(100vh-6rem)]",
              ]
            : ["opacity-0", "-translate-y-3", "pointer-events-none", "max-h-0"],
        )}
      >
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-6rem)]">
          {/* Mobile Search */}
          <div className="relative mb-3">
            <FiSearch
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className={cn(
                "w-full",
                "h-11",
                "pl-10 pr-4",
                "rounded-2xl",
                "border border-neutral-200",
                "dark:border-neutral-800",
                "bg-neutral-100",
                "dark:bg-neutral-900",
                "text-sm",
                "text-foreground",
                "placeholder:text-neutral-400",
                "outline-none",
                "focus:border-black",
                "dark:focus:border-white",
                "transition-all",
              )}
            />
          </div>

          {/* Mobile Navigation */}
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={mobileNavLinkClasses(item.href)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-3" />

          {/* Mobile Authentication */}
          {isAuthenticated ? (
            <div className="space-y-1">
              <Link
                href="/profile"
                className={cn(
                  "flex items-center gap-3",
                  "w-full",
                  "px-4 py-3",
                  "rounded-xl",
                  "text-base font-medium",
                  "text-foreground",
                  "hover:bg-neutral-100",
                  "dark:hover:bg-neutral-800",
                  "transition-colors",
                )}
              >
                <Avatar
                  fallback={user?.name?.[0]?.toUpperCase() || "U"}
                  size="sm"
                />

                <span>{user?.name || "Profile"}</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLogoutModalOpen(true);
                }}
                className={cn(
                  "flex items-center gap-3",
                  "w-full",
                  "px-4 py-3",
                  "rounded-xl",
                  "text-base font-medium",
                  "text-red-600",
                  "hover:bg-red-50",
                  "dark:hover:bg-red-950/50",
                  "transition-colors",
                )}
              >
                <FiLogOut size={20} />
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/auth/login"
                className={cn(
                  "flex items-center justify-center",
                  "w-full",
                  "h-11",
                  "rounded-xl",
                  "border border-neutral-200",
                  "dark:border-neutral-800",
                  "text-foreground",
                  "font-medium",
                  "hover:bg-neutral-100",
                  "dark:hover:bg-neutral-800",
                  "transition-colors",
                )}
              >
                <FiUser size={18} className="mr-2" />
                Sign In
              </Link>

              <Link href="/auth/register" className="block">
                <Button size="sm" className="w-full h-11 rounded-xl">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Dark Mode */}
          <button
            type="button"
            onClick={toggleDark}
            className={cn(
              "flex items-center gap-3",
              "w-full",
              "mt-2",
              "px-4 py-3",
              "rounded-xl",
              "text-base font-medium",
              "text-foreground",
              "hover:bg-neutral-100",
              "dark:hover:bg-neutral-800",
              "transition-colors",
            )}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}

            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>

      {/* =========================================================
          LOGOUT CONFIRMATION MODAL
          ========================================================= */}

      <Modal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        size="sm"
      >
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mb-4 mx-auto">
            <FiLogOut className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>

          <h3 className="text-lg font-semibold text-foreground text-center mb-2">
            Confirm Logout
          </h3>

          <p className="text-sm text-muted-foreground text-center mb-6">
            Are you sure you want to log out? You will be redirected to the
            homepage.
          </p>

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
