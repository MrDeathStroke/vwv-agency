import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "../lib/gsap";
import { AnimatedVMark } from "./AnimatedVMark";

const links = [
  { label: "Sprints", href: "#sprints" },
  { label: "Process", href: "#process" },
  { label: "Receipts", href: "#receipts" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useGSAP(
    () => {
      gsap.set(ref.current, { y: -20, opacity: 0 });
      gsap.to(ref.current, {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "expo.out",
        delay: 0.1,
      });
    },
    { scope: ref }
  );

  return (
    <>
      <header
        ref={ref}
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "backdrop-blur-xl bg-[color:var(--color-canvas)]/85 border-b border-[color:var(--color-border-subtle)]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10 h-14 sm:h-16 lg:h-18">
          {/* Brand */}
          <a
            href="#top"
            className="group flex items-center gap-2 sm:gap-2.5 text-[color:var(--color-text-primary)]"
            aria-label="vwv.agency"
            onClick={() => setOpen(false)}
          >
            <span className="inline-flex items-center text-[color:var(--color-text-primary)] transition-transform duration-500 group-hover:scale-110">
              <AnimatedVMark size={22} interval={0} />
            </span>
            <span className="font-display text-[17px] font-semibold tracking-tighter leading-none">
              VWV<span className="text-[color:var(--color-accent)]">.agency</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-3 py-2 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <a
              href="#book"
              className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-md bg-[color:var(--color-text-primary)] text-[color:var(--color-canvas)] text-sm font-medium hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-accent-fg)] transition-colors"
            >
              Configure a sprint
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden h-9 w-9 grid place-items-center rounded-md border border-[color:var(--color-border-subtle)] text-[color:var(--color-text-primary)]"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 right-0 h-px bg-current transition-all duration-300 ${
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-[color:var(--color-canvas)]"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: -16 }}
              animate={{ y: 0 }}
              exit={{ y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-24 pb-10 px-5 sm:px-6 flex flex-col h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex-1 flex flex-col gap-1 border-t border-[color:var(--color-border-subtle)] pt-6">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.05 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between py-5 border-b border-[color:var(--color-border-subtle)] text-[color:var(--color-text-primary)]"
                    >
                      <span className="font-display text-3xl font-semibold tracking-tighter">
                        {l.label}
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                        className="text-[color:var(--color-text-tertiary)] group-hover:text-[color:var(--color-accent)] transition-all group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-10"
              >
                <a
                  href="#book"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 h-14 px-6 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-accent-fg)] text-base font-medium"
                >
                  <span>Configure a sprint</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
                <p className="mt-6 eyebrow">hello@vwv.agency</p>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
