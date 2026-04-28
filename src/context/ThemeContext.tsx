import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    textMain: string;
    textMuted: string;
    bg: string;
    card: string;
    border: string;
    input: string;
    success: string;
    warning: string;
    danger: string;
    violet: string;
    secondary: string;
    info: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = {
    primary: theme === "light" ? "#6366f1" : "#818cf8",
    primaryDark: theme === "light" ? "#4f46e5" : "#6366f1",
    primaryLight: theme === "light" ? "#e0e7ff" : "rgba(99, 102, 241, 0.2)",
    textMain: theme === "light" ? "#1e293b" : "#f8fafc",
    textMuted: theme === "light" ? "#64748b" : "#94a3b8",
    bg: theme === "light" ? "#f8fafc" : "#020617",
    card: theme === "light" ? "#ffffff" : "#0f172a",
    border: theme === "light" ? "#e2e8f0" : "rgba(255, 255, 255, 0.1)",
    input: theme === "light" ? "#ffffff" : "rgba(255, 255, 255, 0.05)",
    success: theme === "light" ? "#10b981" : "#34d399",
    warning: theme === "light" ? "#f59e0b" : "#fbbf24",
    danger: theme === "light" ? "#ef4444" : "#f87171",
    violet: theme === "light" ? "#8b5cf6" : "#a78bfa",
    secondary: theme === "light" ? "#64748b" : "#94a3b8",
    info: theme === "light" ? "#0ea5e9" : "#38bdf8",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
