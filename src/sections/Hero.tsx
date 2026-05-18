import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

const stamps = [
  { k: "Scope", v: "Fixed" },
  { k: "Price", v: "Fixed" },
  { k: "Timebox", v: "Weeks" },
  { k: "Receipts", v: "Weekly" },
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

      // Live counter
      const counter = document.querySelector<HTMLElement>("[data-counter]");
      if (counter) {
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: counter,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: 47,
              duration: 1.8,
              ease: "expo.out",
              onUpdate: () => {
                counter.textContent = String(Math.round(obj.v));
              },
            });
          },
        });
      }
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
            {/* Eyebrow with availability stamp */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 mb-10 px-3 py-1.5 rounded-full bg-[color:var(--color-canvas-raised)] border border-[color:var(--color-border-subtle)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#2E8F6A] opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2E8F6A]" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-secondary)]">
                Booking 2 sprints · May–July
              </span>
            </motion.div>

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

          {/* Right: Receipts callout card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <div className="relative rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] overflow-hidden">
              {/* Card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]">
                <p className="eyebrow">Sprint receipts · sample</p>
                <span className="font-mono text-[10px] tracking-widest text-[color:var(--color-text-tertiary)]">
                  WEEK 4 / 6
                </span>
              </div>

              {/* Card body — workflow shipped */}
              <div className="p-6 lg:p-7">
                <p className="font-mono text-xs text-[color:var(--color-text-tertiary)]">
                  WORKFLOW
                </p>
                <p className="mt-1 font-display text-lg font-semibold tracking-tighter text-[color:var(--color-text-primary)]">
                  Month-end financial close
                </p>

                {/* Metric rows */}
                <div className="mt-6 space-y-5">
                  <MetricRow
                    label="Cycle time"
                    from="9.2 days"
                    to="1.8 days"
                    delta="−80%"
                  />
                  <MetricRow
                    label="Annualised OPEX out"
                    from="—"
                    to="$340K"
                    delta="−31%"
                  />
                  <MetricRow
                    label="Manual reconciliation errors"
                    from="48 / mo"
                    to="3 / mo"
                    delta="−94%"
                  />
                </div>

                {/* Footer — sprints shipped this year counter */}
                <div className="mt-7 pt-5 border-t border-[color:var(--color-border-subtle)] flex items-end justify-between">
                  <div>
                    <p className="eyebrow">Sprints shipped · YTD</p>
                    <p className="mt-1 font-display text-4xl font-semibold tracking-tighter text-[color:var(--color-text-primary)] tabular-nums">
                      <span data-counter>0</span>
                    </p>
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-[color:var(--color-text-tertiary)] max-w-[140px] text-right">
                    Receipts signed by every CFO.
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

function MetricRow({
  label,
  from,
  to,
  delta,
}: {
  label: string;
  from: string;
  to: string;
  delta: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-[color:var(--color-text-secondary)]">
          {label}
        </p>
        <p className="font-mono text-xs font-semibold text-[color:var(--color-accent)] tabular-nums">
          {delta}
        </p>
      </div>
      <div className="mt-1 flex items-baseline gap-2 font-mono text-sm tabular-nums">
        <span className="text-[color:var(--color-text-tertiary)] line-through decoration-[color:var(--color-text-tertiary)]/40">
          {from}
        </span>
        <span className="text-[color:var(--color-text-tertiary)]">→</span>
        <span className="text-[color:var(--color-text-primary)] font-semibold">
          {to}
        </span>
      </div>
      {/* Bar visualization */}
      <div className="mt-2 h-1 w-full bg-[color:var(--color-border-subtle)] rounded-full overflow-hidden">
        <div className="h-full w-[18%] bg-[color:var(--color-accent)] rounded-full" />
      </div>
    </div>
  );
}
