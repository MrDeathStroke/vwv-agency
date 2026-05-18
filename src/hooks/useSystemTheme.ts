import { useEffect } from "react";

/**
 * Mirrors the device's `prefers-color-scheme` setting onto the
 * `<html class="dark">` toggle. Reactive — flips immediately when the
 * user changes their system setting (macOS auto, iOS focus modes, etc.).
 *
 * Returns nothing because nothing in React state needs to know the theme:
 * Tailwind v4's `.dark` variant + our CSS custom properties handle the rest.
 */
export function useSystemTheme() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (matches: boolean) => {
      document.documentElement.classList.toggle("dark", matches);
    };
    apply(mq.matches);
    const onChange = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
}
