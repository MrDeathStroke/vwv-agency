import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

type Step = {
  w: string;
  label: string;
  title: string;
  body: string;
  deliverable: string;
};

const steps: Step[] = [
  {
    w: "WEEK 0",
    label: "Scoping call",
    title: "30 minutes. One workflow. Three metrics.",
    body: "A free 30-minute call to name the workflow you want rebuilt and the three numbers we will move. If we do not see a sprint we can ship, we say so on the call.",
    deliverable: "Go / no-go decision, no obligation.",
  },
  {
    w: "WEEK 1",
    label: "Plan",
    title: "One page. One signature.",
    body: "We come back with a one-page sprint plan: scope, timebox, the three metrics we will move, the stop-conditions, and the commercial terms. You sign one page. The clock starts when the page is signed.",
    deliverable: "Signed sprint plan and commercial terms.",
  },
  {
    w: "WEEK 2",
    label: "Instrument",
    title: "Measure the workflow as it is today.",
    body: "Before we change anything, we measure. Baseline Cycle Time, baseline OPEX line, baseline error rate. Nothing else gets reported against numbers we did not record on day one.",
    deliverable: "Baseline dashboard, shared with you in your stack.",
  },
  {
    w: "WEEK 3–4",
    label: "Rebuild",
    title: "Architecture, agents, evals.",
    body: "We rebuild the workflow around AI orchestration. Tool-calling agents handle the autonomous path, humans handle the boundaries. Continuous evals run against a held-out test set every night.",
    deliverable: "Staged deployment, your team's review.",
  },
  {
    w: "WEEK 5",
    label: "Ship",
    title: "Production. Quietly. With monitoring.",
    body: "We ship the rebuilt workflow into production with monitoring, dashboards, and a rollback path. Your team operates the new workflow for the last week with us in the room.",
    deliverable: "Production deployment + runbook.",
  },
  {
    w: "WEEK 6",
    label: "Receipts",
    title: "Close-out: three numbers, signed.",
    body: "We measure the new workflow against the same instruments that measured the old one. The deltas are reported to your CFO and your operations lead. Final invoice settles on receipts, not hours.",
    deliverable: "Sprint close-out, signed by both sides.",
  },
];

export function Process() {
  const root = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  // Progress bar along the timeline
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      ref={root}
      id="process"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-[color:var(--color-accent)]">
              02
            </span>
            <span className="h-px w-12 bg-[color:var(--color-border)]" />
            <p className="eyebrow">Process · a Build sprint, week by week</p>
          </div>
          <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-4xl text-balance">
            Six weeks. One workflow. Three signed numbers.
          </h2>
        </div>

        {/* Timeline */}
        <ol className="relative grid gap-10 lg:gap-12">
          {/* Vertical track */}
          <div
            aria-hidden
            className="absolute left-[7px] lg:left-[11px] top-2 bottom-2 w-px bg-[color:var(--color-border-subtle)]"
          />
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="absolute left-[7px] lg:left-[11px] top-2 w-px bg-[color:var(--color-accent)] origin-top"
          />

          {steps.map((s, i) => (
            <Row key={s.w} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Row({ step, index }: { step: Step; index: number }) {
  return (
    <motion.li
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pl-8 lg:pl-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dot on track */}
      <span
        aria-hidden
        className="absolute left-0 top-2 grid place-items-center w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-[color:var(--color-canvas-sunken)] border border-[color:var(--color-accent)]"
      >
        <span className="block w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[color:var(--color-accent)]" />
      </span>

      {/* Week label */}
      <div className="lg:col-span-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-accent)]">
          {step.w}
        </p>
        <p className="mt-1 font-display text-2xl font-semibold tracking-tighter text-[color:var(--color-text-primary)]">
          {step.label}
        </p>
      </div>

      {/* Body */}
      <div className="lg:col-span-9">
        <h3 className="font-display text-xl lg:text-2xl font-semibold tracking-tighter leading-snug text-[color:var(--color-text-primary)] text-balance">
          {step.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-text-secondary)] text-pretty max-w-3xl">
          {step.body}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:var(--color-canvas-raised)] border border-[color:var(--color-border-subtle)]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
            Deliverable
          </span>
          <span className="text-xs text-[color:var(--color-text-primary)]">
            {step.deliverable}
          </span>
        </p>
      </div>
    </motion.li>
  );
}
