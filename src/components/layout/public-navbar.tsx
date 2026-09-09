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

export function PublicNavbar() {
  const { user, logout, isAuthenticated, role } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigation =
    isAuthenticated && role ? getNavigationByRole(role) : publicNavigation;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-2 text-sm font-medium transition-colors duration-200",
      "hover:text-brand-600",
      pathname === href ? "text-brand-600" : "text-muted-foreground",
    );

  const mobileNavLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200",
      "hover:bg-brand-50 hover:text-brand-600",
      pathname === href ? "bg-brand-50 text-brand-600" : "text-foreground",
    );

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-card/90 backdrop-blur-md shadow-sm border-b border-border/50"
            : "bg-card border-b border-border",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href={isAuthenticated && role === "ADMIN" ? "/admin" : "/"}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shadow-brand-200">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                UniLink
              </span>
            </Link>

            {/* Desktop Navigation */}
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

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              {/* Search Bar */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 lg:w-64 pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-muted/50 focus:bg-card focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none transition-all"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              {/* Notifications */}
              {isAuthenticated && (
                <button className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
                  <FiBell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full animate-pulse" />
                </button>
              )}

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
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
                      className="text-muted-foreground"
                    />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border py-1 z-50">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
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
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-danger hover:bg-danger-bg transition-colors"
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
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden fixed inset-x-0 top-16 sm:top-20 bg-card/95 backdrop-blur-lg border-b border-border shadow-lg transition-all duration-300 overflow-hidden",
            isMobileMenuOpen
              ? "max-h-[calc(100vh-4rem)] opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          <div className="px-4 py-3 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {/* Search Bar Mobile */}
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-3 text-sm rounded-lg border border-border bg-muted focus:bg-card focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 outline-none transition-all"
              />
            </div>

            {/* Navigation Links */}
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

            <div className="h-px bg-border my-3" />

            {/* Auth Section Mobile */}
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-brand-50 hover:text-brand-600 transition-colors"
                >
                  <Avatar
                    fallback={user?.name?.[0]?.toUpperCase() || "U"}
                    size="sm"
                  />
                  <span>{user?.name || "Profile"}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-danger hover:bg-danger-bg transition-colors"
                >
                  <FiLogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-medium text-foreground border border-border hover:bg-muted transition-colors"
                >
                  <FiUser size={20} className="mr-2" />
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
