"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light" | "system";

interface DarkModeContextType {
  isDark: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleDark: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  isDark: false,
  theme: "system",
  setTheme: () => {},
  toggleDark: () => {},
});

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    try {
      return (localStorage.getItem("theme") as Theme) || "system";
    } catch {
      return "system";
    }
  });
  const [isDark, setIsDark] = useState(false);

  const getSystemTheme = useCallback(() => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement;
    const resolved = t === "system" ? getSystemTheme() : t;
    if (resolved === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    setIsDark(resolved === "dark");
  }, [getSystemTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }, []);

  const toggleDark = useCallback(() => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
  }, [isDark, setTheme]);

  return (
    <DarkModeContext.Provider value={{ isDark, theme, setTheme, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
