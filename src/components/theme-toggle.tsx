"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

type Theme = "light" | "dark";

const STORAGE_KEY = "ts-theme";
const QUERY = "(prefers-color-scheme: dark)";

/** The theme in effect: the visitor's choice (<html data-theme>) or, until they choose, the system setting. */
function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "dark" || set === "light") return set;
  return window.matchMedia(QUERY).matches ? "dark" : "light";
}

/**
 * Light / dark switch. The page colours come from CSS (see "Dark theme" in globals.css); this only sets
 * <html data-theme> and remembers the choice. The script in layout.tsx restores it before first paint.
 * Which icon shows is decided by CSS too, so the server and browser render the same markup.
 */
export function ThemeToggle({ label, className = "" }: { label?: string; className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
    // Until a choice is made the theme follows the system, so keep the button state in step with it.
    const mq = window.matchMedia(QUERY);
    const onChange = () => setTheme(currentTheme());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setTheme(next);
  }

  // With a text label the words say what the button will do ("Dark mode" in light, "Light mode" in dark), so
  // no pressed state is needed. The icon-only version is a switch named "Dark theme" with a pressed state.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={label || theme === null ? undefined : theme === "dark"}
      aria-label={label ? undefined : "Dark theme"}
      // No display class here: the caller sets it (inline-flex, or hidden below a width), and two display
      // utilities on one element would fight.
      className={`theme-toggle min-h-11 items-center justify-center gap-2 transition-colors ${className}`}
    >
      <span className="theme-icon-moon">
        <MoonIcon />
      </span>
      <span className="theme-icon-sun">
        <SunIcon />
      </span>
      {label && (
        <>
          <span className="theme-icon-moon">{label}</span>
          <span className="theme-icon-sun">Light mode</span>
        </>
      )}
    </button>
  );
}
