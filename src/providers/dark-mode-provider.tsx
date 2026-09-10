"use client";

import { useTheme } from "next-themes";

export function useDarkMode() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const toggleDark = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { isDark, toggleDark, theme, setTheme };
}
