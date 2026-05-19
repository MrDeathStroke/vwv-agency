import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

/**
 * Replaces the previous "case studies" section. We do not publish
 * fabricated client outcomes. Instead, this is an honest illustrative
 * walkthrough of how a Build sprint reads — the kind of workflow we look
 * for, the kind of receipts we report against. Every number on this
 * page is an example, clearly marked, not a claim.
 */

type ExampleMetric = {
  label: string;
  unit: string;
  baselineHint: string;
  rebuiltHint: string;
};

const exampleWorkflows = [
  {
    domain: "Finance ops",
    candidate: "Month-end reconciliation",
    why: "Multi-source data, repeating monthly, manual review steps the team already complains about.",
  },
  {
    domain: "Revenue ops",
    candidate: "Lead routing and enrichment",
    why: "Volume is high, the routing logic is documented, and the cost of mis-routing is measurable.",
  },
  {
    domain: "Customer ops",
    candidate: "Tier-1 support triage",
    why: "Defined intents, clear handoff boundaries to humans, ticket volume that justifies the rebuild.",
  },
  {
    domain: "Underwriting / intake",
    candidate: "Submission classification",
    why: "Structured-enough input, a decision boundary that already exists in the team's heads, and a rework cost.",
  },
];

const exampleMetrics: ExampleMetric[] = [
  {
    label: "Cycle time",
    unit: "days or hours, workflow-specific",
    baselineHint: "How long the workflow takes today, end to end",
    rebuiltHint: "How long it takes after rebuild, measured on the same instrument",
  },
  {
    label: "Run cost",
    unit: "annualised dollars",
    baselineHint: "Current annualised OPEX line attributable to the workflow",
    rebuiltHint: "OPEX line after rebuild, signed off by the CFO",
  },
  {
    label: "Manual error rate",
    unit: "%, workflow-specific",
    baselineHint: "Defined per workflow before any work begins",
    rebuiltHint: "Measured on the same definition, reported weekly",
  },
];

export function Receipts() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-rx-card]", { y: 24, opacity: 0 });
      gsap.utils.toArray<HTMLElement>("[data-rx-card]").forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
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
      id="receipts"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                05
              </span>
              <span className="h-px w-12 bg-[color:var(--color-border)]" />
              <p className="eyebrow">Anatomy of a sprint · illustrative</p>
            </div>
            <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-3xl text-balance">
              What a sprint actually looks like.
            </h2>
          </div>
          <p className="lg:max-w-sm text-sm text-[color:var(--color-text-secondary)] text-pretty">
            We do not publish other people's numbers as ours. Below is the
            shape of a Build sprint. The workflows we look for. The metrics
            we report against. Real receipts will live here as soon as
            pilot sprints close out, named only with client permission.
          </p>
        </div>

        {/* Two-column: candidate workflows + metric anatomy */}
        <div className="grid gap-6 lg:gap-10 lg:grid-cols-12">
          {/* Left: Candidate workflows */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                A
              </span>
              <p className="eyebrow">The shape of a good candidate workflow</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {exampleWorkflows.map((w) => (
                <motion.article
                  key={w.candidate}
                  data-rx-card
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] p-5"
                >
                  <p className="eyebrow !text-[color:var(--color-accent)]">
                    {w.domain}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tighter text-[color:var(--color-text-primary)] text-balance">
                    {w.candidate}
                  </h3>
                  <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] text-pretty leading-relaxed">
                    {w.why}
                  </p>
                </motion.article>
              ))}
            </div>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
              The first scoping call decides whether your candidate fits this shape.
            </p>
          </div>

          {/* Right: Metric anatomy */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                B
              </span>
              <p className="eyebrow">How a sprint is measured</p>
            </div>

            <motion.div
              data-rx-card
              className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] overflow-hidden"
            >
              {exampleMetrics.map((m, i) => (
                <div
                  key={m.label}
                  className={[
                    "p-5",
                    i < exampleMetrics.length - 1
                      ? "border-b border-[color:var(--color-border-subtle)]"
                      : "",
                  ].join(" ")}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-base font-semibold tracking-tighter text-[color:var(--color-text-primary)]">
                      {m.label}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
                      {m.unit}
                    </p>
                  </div>
                  <div className="mt-3 space-y-1.5 text-xs text-[color:var(--color-text-secondary)]">
                    <p>
                      <span className="font-mono text-[color:var(--color-text-tertiary)] mr-2">
                        Baseline
                      </span>
                      {m.baselineHint}
                    </p>
                    <p>
                      <span className="font-mono text-[color:var(--color-accent)] mr-2">
                        Rebuilt
                      </span>
                      {m.rebuiltHint}
                    </p>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div className="bg-[color:var(--color-canvas-sunken)] p-5">
                <p className="text-xs text-[color:var(--color-text-secondary)] text-pretty leading-relaxed">
                  Same instruments measure baseline and rebuilt state. The
                  deltas are what gets signed at close-out, by whoever owns
                  the workflow and whoever owns the budget.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Honest founder note */}
        <motion.div
          data-rx-card
          className="mt-14 relative rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)] p-6 lg:p-8 max-w-4xl"
        >
          <span
            aria-hidden
            className="absolute left-0 top-6 bottom-6 w-px bg-[color:var(--color-accent)]"
          />
          <p className="eyebrow !text-[color:var(--color-accent)] mb-3">
            A note from the founder
          </p>
          <p className="text-[15px] leading-relaxed text-[color:var(--color-text-primary)] text-pretty max-w-2xl">
            VWV is founder-led and early. There are no anonymised case
            studies on this page because there are no anonymised case
            studies to tell honestly yet. The methodology is sound and the
            stack is real. Pilot sprints are how the receipts get earned.
            If you are open to being one of the first names on this page,
            scoping calls are free and the plan is yours to keep.
          </p>
          <p className="mt-4 font-mono text-xs text-[color:var(--color-text-tertiary)]">
            Purvang Joshi, founder
          </p>
        </motion.div>
      </div>
    </section>
  );
}
