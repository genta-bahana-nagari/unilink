"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type DarkModeContextType = {
  isDark: boolean;
  toggleDark: () => void;
  setDark: (dark: boolean) => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "unilink-theme";

export function DarkModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  /*
   * Apply the theme to <html>.
   *
   * Tailwind's `dark:` classes will react to this class.
   */
  const applyTheme = useCallback((dark: boolean) => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, []);

  /*
   * Load saved theme on first client render.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "dark") {
      setIsDark(true);
      applyTheme(true);
    } else if (savedTheme === "light") {
      setIsDark(false);
      applyTheme(false);
    } else {
      /*
       * No saved preference:
       * use the user's system preference.
       */
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      setIsDark(systemDark);
      applyTheme(systemDark);
    }

    setMounted(true);
  }, [applyTheme]);

  /*
   * Toggle theme.
   */
  const toggleDark = useCallback(() => {
    setIsDark((current) => {
      const next = !current;

      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");

      return next;
    });
  }, [applyTheme]);

  /*
   * Explicitly set theme.
   */
  const setDark = useCallback(
    (dark: boolean) => {
      setIsDark(dark);
      applyTheme(dark);
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    },
    [applyTheme],
  );

  /*
   * Prevent hydration mismatch from causing the icon
   * to flash between moon/sun.
   */
  if (!mounted) {
    return (
      <DarkModeContext.Provider
        value={{
          isDark: false,
          toggleDark,
          setDark,
        }}
      >
        {children}
      </DarkModeContext.Provider>
    );
  }

  return (
    <DarkModeContext.Provider
      value={{
        isDark,
        toggleDark,
        setDark,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error(
      "useDarkMode must be used inside a DarkModeProvider",
    );
  }

  return context;
}