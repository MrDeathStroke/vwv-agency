import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

type Tier = {
  code: string;
  name: string;
  positioning: string;
  timebox: string;
  commitment: string;
  outcomeLabel: string;
  outcome: string;
  scope: string[];
  bestFor: string;
};

const tiers: Tier[] = [
  {
    code: "S1",
    name: "Scout",
    positioning: "Find the workflow worth rebuilding.",
    timebox: "2 weeks",
    commitment: "Fixed scope · one signature",
    outcomeLabel: "Outcome",
    outcome:
      "One named workflow, an instrumented baseline, and a one-page sprint plan with the metric we will move. If there is no workflow worth rebuilding, the deliverable is that conclusion in writing.",
    scope: [
      "Discovery interviews with the workflow owners",
      "Baseline measurement of cycle time, run cost, and error rate",
      "One-page sprint plan, signed before any Build kicks off",
      "Risk register and stop-conditions",
    ],
    bestFor:
      "Teams that suspect a workflow is broken but cannot yet point to the number that proves it.",
  },
  {
    code: "S2",
    name: "Build",
    positioning: "Rebuild it. Ship it. Report receipts.",
    timebox: "6 weeks",
    commitment: "Fixed scope · weekly receipts",
    outcomeLabel: "Outcome",
    outcome:
      "The named workflow is rebuilt around AI orchestration and automation, deployed in production, and reported against the three metrics signed on the plan.",
    scope: [
      "Architecture review and rebuild plan",
      "AI orchestration layer with tool-calling agents in your stack",
      "Continuous evals against a held-out test set",
      "Weekly 15-minute receipts call. Three metrics, no slides.",
      "Production hand-off with runbook and ownership transfer",
    ],
    bestFor:
      "Teams ready to deploy a real change to an operational workflow this quarter.",
  },
  {
    code: "S3",
    name: "Scale",
    positioning: "Multiply the win across the next workflows.",
    timebox: "12 weeks",
    commitment: "Fixed scope · multi-workflow program",
    outcomeLabel: "Outcome",
    outcome:
      "A sequence of Build sprints across related workflows, sharing one orchestration substrate the team owns by the end, and one dashboard reporting the metrics signed for each.",
    scope: [
      "Three Build sprints, sequenced and dependency-aware",
      "Shared orchestration substrate across the workflows",
      "Unified metrics dashboard, exported to your existing BI",
      "Champion training so the team operates the substrate without us",
      "Sprint retrospective with the operations lead and the CFO",
    ],
    bestFor:
      "Teams that have completed a Build with us and want to compound the gain across adjacent operations.",
  },
];

export function SprintTiers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-tier]", { y: 32, opacity: 0 });
      gsap.utils.toArray<HTMLElement>("[data-tier]").forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="sprints"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                03
              </span>
              <span className="h-px w-12 bg-[color:var(--color-border)]" />
              <p className="eyebrow">Sprints · the shape</p>
            </div>
            <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-3xl text-balance">
              Three productized sprints. Pick the shape. Scope it on the call.
            </h2>
          </div>
          <p className="lg:max-w-sm text-sm text-[color:var(--color-text-secondary)] text-pretty">
            Every sprint has a fixed scope and a fixed end date. Pricing is
            scoped per workflow because the workflow drives the price, and the
            scoping call costs you nothing.
          </p>
        </div>

        {/* Tier grid */}
        <div className="grid gap-4 lg:gap-6 md:grid-cols-3 items-start">
          {tiers.map((t) => (
            <TierCard key={t.code} tier={t} />
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-12 font-mono text-xs uppercase tracking-widest text-[color:var(--color-text-tertiary)] text-center">
          Scoping call is free · Sprint quoted in writing within 48 hours
        </p>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <motion.article
      data-tier
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] p-6 lg:p-8 flex flex-col gap-6 h-full"
    >
      {/* Header */}
      <header>
        <div className="flex items-baseline justify-between mb-3">
          <span className="font-mono text-xs text-[color:var(--color-accent)]">
            {tier.code}
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-[color:var(--color-text-tertiary)]">
            {tier.timebox}
          </span>
        </div>
        <h3 className="font-display text-3xl lg:text-4xl font-semibold tracking-tightest leading-none text-[color:var(--color-text-primary)]">
          {tier.name}
        </h3>
        <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] text-pretty">
          {tier.positioning}
        </p>
      </header>

      {/* Commitment + pricing note */}
      <div className="border-y border-[color:var(--color-border-subtle)] py-5 space-y-3">
        <div>
          <p className="eyebrow">Commitment</p>
          <p className="mt-1 font-display text-base font-medium text-[color:var(--color-text-primary)]">
            {tier.commitment}
          </p>
        </div>
        <div>
          <p className="eyebrow">Pricing</p>
          <p className="mt-1 font-mono text-sm text-[color:var(--color-text-primary)]">
            Scoped per workflow on the call.
          </p>
        </div>
      </div>

      {/* Outcome */}
      <div>
        <p className="eyebrow !text-[color:var(--color-accent)] mb-2">
          {tier.outcomeLabel}
        </p>
        <p className="text-sm leading-relaxed text-[color:var(--color-text-primary)] text-pretty">
          {tier.outcome}
        </p>
      </div>

      {/* Scope */}
      <div>
        <p className="eyebrow mb-3">In scope</p>
        <ul className="space-y-2">
          {tier.scope.map((s) => (
            <li
              key={s}
              className="flex items-start gap-2.5 text-sm text-[color:var(--color-text-secondary)] text-pretty"
            >
              <svg
                className="mt-1 shrink-0 text-[color:var(--color-accent)]"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 6.5 5 9.5 10 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Best for */}
      <div className="mt-auto">
        <p className="eyebrow mb-2">Best for</p>
        <p className="text-xs text-[color:var(--color-text-secondary)] text-pretty leading-relaxed">
          {tier.bestFor}
        </p>
      </div>

      {/* CTA */}
      <a
        href="#book"
        className="mt-2 inline-flex items-center justify-between gap-2 h-12 px-5 rounded-md text-sm font-medium bg-[color:var(--color-text-primary)] text-[color:var(--color-canvas)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-accent-fg)] transition-colors"
      >
        <span>Scope a {tier.name} sprint</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </a>
    </motion.article>
  );
}
