// src/components/ModeToggle.jsx
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

/**
 * Light/Dark mode toggle using Tailwind's class strategy.
 * Remembers user preference in localStorage.
 */
export default function ModeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      // Default to dark mode if no theme is set
      return localStorage.theme === "dark" || !("theme" in localStorage);
    }
    return true; // Default to dark on server
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  return (
    <button
      className="fixed top-6 right-6 bg-white/60 dark:bg-black/40 rounded-full shadow-lg p-2 transition-colors backdrop-blur-md z-20"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <SunIcon className="h-6 w-6 text-yellow-400 transition-colors duration-300" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700 transition-colors duration-300" />
      )}
    </button>
  );
}
