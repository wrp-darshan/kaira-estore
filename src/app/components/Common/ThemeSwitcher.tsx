"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeProvider() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Load theme from localStorage or system preference
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const appliedTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(appliedTheme);
    document.documentElement.classList.toggle("dark", appliedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="flex items-center gap-3 justify-center">
      <span className="text-gray-900 dark:text-gray-100">Theme:</span>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6 text-yellow-400" />}
      </button>
    </div>
  );
}
