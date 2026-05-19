import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { gsap } from "../lib/gsap";

const stamps = [
  { k: "Scope", v: "Fixed" },
  { k: "Timebox", v: "Weeks" },
  { k: "Receipts", v: "Weekly" },
  { k: "Lead", v: "Founder" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-h-line]", { yPercent: 110, opacity: 0 });
      gsap.set("[data-h-lede]", { y: 18, opacity: 0 });
      gsap.set("[data-h-cta]", { y: 12, opacity: 0 });
      gsap.set("[data-h-stamp]", { y: 10, opacity: 0 });

      const intro = gsap.timeline({ delay: 0.18 });
      intro
        .to("[data-h-line]", {
          yPercent: 0,
          opacity: 1,
          duration: 1.0,
          ease: "expo.out",
          stagger: 0.06,
        })
        .to("[data-h-lede]", {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
        }, "-=0.55")
        .to("[data-h-cta]", {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.08,
        }, "-=0.45")
        .to("[data-h-stamp]", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
          stagger: 0.05,
        }, "-=0.4");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate overflow-hidden"
    >
      {/* Blueprint grid background — defines the "agency" feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blueprint-grid opacity-50"
      />
      {/* Cobalt edge wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[640px] w-[800px] -translate-y-1/4 translate-x-1/4 rounded-full bg-[color:var(--color-accent)] opacity-[0.04] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-32 lg:pt-44 pb-20 lg:pb-28">
        <div className="grid gap-16 lg:gap-20 lg:grid-cols-12 items-start">
          {/* Left: Headline + CTA */}
          <div className="lg:col-span-7">
            {/* Headline */}
            <h1 className="font-display font-semibold tracking-tightest leading-[0.92] text-[color:var(--color-text-primary)] text-[clamp(2.75rem,8vw,6.5rem)] text-balance m-0">
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-h-line className="block will-change-transform">
                  Sprints,
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <span data-h-line className="block will-change-transform">
                  shipped<span className="text-[color:var(--color-accent)]">.</span>
                </span>
              </span>
            </h1>

            {/* Lede */}
            <p
              data-h-lede
              className="mt-8 max-w-xl text-lg lg:text-xl text-[color:var(--color-text-secondary)] text-pretty leading-relaxed"
            >
              Fixed-scope, fixed-price AI and automation sprints. One signed
              page, one named workflow, three metrics that move. Weeks, not
              quarters.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                data-h-cta
                href="#book"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-md bg-[color:var(--color-text-primary)] text-[color:var(--color-canvas)] text-[15px] font-medium hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-accent-fg)] transition-all duration-300"
              >
                Configure a sprint
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                data-h-cta
                href="#sprints"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)] text-[color:var(--color-text-primary)] text-[15px] font-medium transition-colors"
              >
                See the menu
              </a>
            </div>

            {/* Stamp row */}
            <ul className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stamps.map((s) => (
                <li
                  key={s.k}
                  data-h-stamp
                  className="border-t border-[color:var(--color-border-subtle)] pt-3"
                >
                  <p className="eyebrow">{s.k}</p>
                  <p className="mt-1 font-display text-base font-medium text-[color:var(--color-text-primary)]">
                    {s.v}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: what you sign card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="relative rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] overflow-hidden">
              {/* Card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]">
                <p className="eyebrow">The one-page sprint plan</p>
                <span className="font-mono text-[10px] tracking-widest text-[color:var(--color-accent)]">
                  WHAT YOU SIGN
                </span>
              </div>

              {/* Card body */}
              <div className="p-6 lg:p-7 space-y-5">
                <FieldRow k="Workflow" v="Named on the call" />
                <FieldRow k="Timebox" v="Fixed, 2–12 weeks" />
                <FieldRow k="Scope" v="Listed line-by-line on page one" />
                <FieldRow
                  k="Metrics we'll move"
                  v="Cycle time · run cost · error rate"
                />
                <FieldRow k="Stop-conditions" v="Named upfront" />
                <FieldRow k="Hand-off" v="Runbook + ownership transfer" />

                {/* Footer */}
                <div className="pt-5 border-t border-[color:var(--color-border-subtle)] flex items-end justify-between gap-4">
                  <div>
                    <p className="eyebrow">Reply window</p>
                    <p className="mt-1 font-display text-2xl font-semibold tracking-tighter text-[color:var(--color-text-primary)]">
                      48 hours
                    </p>
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-[color:var(--color-text-tertiary)] max-w-[150px] text-right leading-relaxed">
                    From scoping call to plan in your inbox.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FieldRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-12 gap-3 items-baseline">
      <p className="col-span-5 eyebrow">{k}</p>
      <p className="col-span-7 text-sm text-[color:var(--color-text-primary)] text-pretty">
        {v}
      </p>
    </div>
  );
}
