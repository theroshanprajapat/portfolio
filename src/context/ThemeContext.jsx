import { useEffect, useState, useCallback } from "react";
import { ThemeContext } from "./theme-context";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const isExplicitPreference = () => {
  const saved = localStorage.getItem("theme");
  return saved === "light" || saved === "dark";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return getSystemTheme();
  });

  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      const next = event.matches ? "dark" : "light";
      setSystemTheme(next);
      if (!isExplicitPreference()) setTheme(next);
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setExplicitTheme = useCallback((next) => {
    if (next !== "light" && next !== "dark") return;
    localStorage.setItem("theme", next);
    setTheme(next);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, systemTheme, toggleTheme, setTheme: setExplicitTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
