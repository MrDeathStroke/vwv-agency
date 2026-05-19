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
    w: "STEP 1",
    label: "Intro call",
    title: "30 minutes. Founder on the line.",
    body: "A free 30-minute call to name the workflow you want rebuilt and the metrics that should move. If we do not see a sprint we can ship, we say so on the call.",
    deliverable: "Go / no-go decision. No obligation either way.",
  },
  {
    w: "STEP 2",
    label: "Approved · book the days",
    title: "Calendar-day booking.",
    body: "You pick days from our calendar. Days, not retainers. We tell you in writing how many days the workflow will need before you book anything. The clock starts when the days are confirmed.",
    deliverable: "Signed one-page sprint plan with commercial terms.",
  },
  {
    w: "STEP 3",
    label: "On the premises",
    title: "Your office. Your team. Our cross-functional crew.",
    body: "Strategist, technologist, branding, social, all in one room. Your major stakeholders in the same room. We arrive with the question framework. The work happens face to face for the first stretch of the sprint.",
    deliverable: "Workflow mapped as it actually runs.",
  },
  {
    w: "STEP 4",
    label: "Hackathon sprint",
    title: "Process debt, named and quantified.",
    body: "Structured question framework. We map the touch points, time the cycle, define the error rate, and name the process debt. Your stakeholders contribute, push back, and approve as we go.",
    deliverable: "Baseline dashboard. Three-metric instrumentation in writing.",
  },
  {
    w: "STEP 5",
    label: "Parallel build",
    title: "The software cycle was already running.",
    body: "Architecture review, AI orchestration layer, tool-calling agents in your stack, continuous evals against held-out tests. The build track started on day two so deployment lands inside the sprint, not after it.",
    deliverable: "Staged deployment ready for your team to operate.",
  },
  {
    w: "STEP 6",
    label: "Pivot decision",
    title: "Bespoke build, or curated tool stack.",
    body: "Two paths out. Either we ship a bespoke system built on your stack, or we recommend an existing tool stack configured against your KPIs. The choice is workflow-led, not vendor-led. We say so honestly.",
    deliverable: "Production deployment plus runbook. Or tool-stack handover with configuration.",
  },
  {
    w: "STEP 7",
    label: "KPI handover",
    title: "Three numbers, signed by your CFO.",
    body: "We measure the new workflow against the same instruments that measured the old one. The deltas are reported to your CFO and your operations lead. The dashboard you walk away with belongs to you.",
    deliverable: "Signed close-out. KPI dashboard. Ownership transfer.",
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
              04
            </span>
            <span className="h-px w-12 bg-[color:var(--color-border)]" />
            <p className="eyebrow">Process · how a sprint runs</p>
          </div>
          <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-4xl text-balance">
            Seven steps. One workflow. Stakeholders in the room.
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
