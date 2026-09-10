"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";

interface DarkModeContextType {
  isDark: boolean;
  toggleDark: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDark: false,
  toggleDark: () => {},
});

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const isDarkMode = root.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDark = () => {
    const root = document.documentElement;
    const newDark = !root.classList.contains("dark");
    root.classList.toggle("dark");
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
