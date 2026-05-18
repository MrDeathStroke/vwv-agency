import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * After every route change: if the URL has a hash, scroll the matching
 * element into view. If it doesn't, scroll to top. Avoids the dead-anchor
 * problem when navigating from /dispatches/* back to /#thesis.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the page one tick to mount the target element.
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}
