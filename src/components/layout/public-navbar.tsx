// src/components/layout/public-navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { publicNavigation, getNavigationByRole } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Search,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
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

  const navigation = isAuthenticated && role 
    ? getNavigationByRole(role) 
    : publicNavigation;

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
      "hover:text-blue-600",
      pathname === href
        ? "text-blue-600"
        : "text-slate-600"
    );

  const mobileNavLinkClasses = (href: string) =>
    cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200",
      "hover:bg-blue-50 hover:text-blue-600",
      pathname === href
        ? "bg-blue-50 text-blue-600"
        : "text-slate-700"
    );

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/50"
            : "bg-white border-b border-slate-200"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href={isAuthenticated && role === "ADMIN" ? "/admin" : "/"}
              className="flex items-center gap-2 shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md shadow-blue-200">
                <span className="text-white font-bold text-sm sm:text-base">U</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
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
                    "px-3 py-2 rounded-lg"
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 lg:w-64 pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Notifications */}
              {isAuthenticated && (
                <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600">
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>
              )}

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Avatar 
                      fallback={user?.name?.[0]?.toUpperCase() || "U"} 
                      size="sm" 
                    />
                    <span className="text-sm font-medium text-slate-700 hidden lg:inline">
                      {user?.name || "User"}
                    </span>
                    <ChevronDown size={16} className="text-slate-400" />
                  </button>
                  
                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={16} />
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
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
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden fixed inset-x-0 top-16 sm:top-20 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-lg transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 py-3 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {/* Search Bar Mobile */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-3 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 outline-none transition-all"
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

            <div className="h-px bg-slate-200 my-3" />

            {/* Auth Section Mobile */}
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Avatar 
                    fallback={user?.name?.[0]?.toUpperCase() || "U"} 
                    size="sm" 
                  />
                  <span>{user?.name || "Profile"}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <User size={20} className="mr-2" />
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
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