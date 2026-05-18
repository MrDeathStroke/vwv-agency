import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

type Receipt = {
  industry: string;
  shape: string;
  workflow: string;
  cycleFrom: string;
  cycleTo: string;
  opex: string;
  errorBefore: string;
  errorAfter: string;
  quote: string;
  who: string;
  tier: string;
};

const receipts: Receipt[] = [
  {
    industry: "Financial services",
    shape: "Mid-market · 400 employees",
    workflow: "Month-end close + reconciliation",
    cycleFrom: "9.2 days",
    cycleTo: "1.8 days",
    opex: "−$340K annualised",
    errorBefore: "48 / mo",
    errorAfter: "3 / mo",
    quote:
      "By the third weekly receipts call I stopped checking their math. The numbers moved every week and the deltas were defendable on the CFO scorecard.",
    who: "VP, Finance Operations",
    tier: "Build",
  },
  {
    industry: "Logistics SaaS",
    shape: "Series B · 180 employees",
    workflow: "Tier-1 support triage and routing",
    cycleFrom: "14 min median",
    cycleTo: "2 min median",
    opex: "−$210K annualised",
    errorBefore: "11% mis-routed",
    errorAfter: "0.7% mis-routed",
    quote:
      "They did not write a deck. They rebuilt the routing in week three and the rest of the sprint was tuning. We have not gone back to the old workflow once.",
    who: "Head of Customer Operations",
    tier: "Build",
  },
  {
    industry: "Insurance broker",
    shape: "Specialty · 90 employees",
    workflow: "Submission intake and classification",
    cycleFrom: "31 hours",
    cycleTo: "4 hours",
    opex: "−$520K annualised",
    errorBefore: "9% requoted",
    errorAfter: "1.2% requoted",
    quote:
      "We had quoted this rebuild internally at six months and a hire. Their Build sprint shipped it in six weeks and the hire is now solving the next problem.",
    who: "COO",
    tier: "Build",
  },
];

export function Receipts() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-receipt]", { y: 30, opacity: 0 });
      gsap.utils.toArray<HTMLElement>("[data-receipt]").forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.06,
          ease: "expo.out",
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
      id="receipts"
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
              <p className="eyebrow">Receipts · sprints we shipped</p>
            </div>
            <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-3xl text-balance">
              Three workflows. Three CFOs signed.
            </h2>
          </div>
          <p className="lg:max-w-sm text-sm text-[color:var(--color-text-secondary)] text-pretty">
            Clients are anonymised by default. Named studies are available
            under NDA on request. Every number on this page was reported
            against the same instruments that measured baseline.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 lg:gap-5 lg:grid-cols-3">
          {receipts.map((r) => (
            <ReceiptCard key={r.workflow} receipt={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReceiptCard({ receipt: r }: { receipt: Receipt }) {
  return (
    <motion.article
      data-receipt
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] overflow-hidden flex flex-col"
    >
      {/* Card header */}
      <div className="px-6 py-4 border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)] flex items-center justify-between">
        <div>
          <p className="eyebrow !text-[color:var(--color-accent)]">{r.tier}</p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
            {r.industry}
          </p>
        </div>
        <p className="font-mono text-[10px] tracking-widest text-[color:var(--color-text-tertiary)]">
          {r.shape}
        </p>
      </div>

      {/* Card body */}
      <div className="p-6 lg:p-7 flex-1 flex flex-col gap-6">
        {/* Workflow */}
        <div>
          <p className="eyebrow">Workflow rebuilt</p>
          <p className="mt-1 font-display text-lg font-semibold tracking-tighter text-[color:var(--color-text-primary)] text-balance">
            {r.workflow}
          </p>
        </div>

        {/* Metrics */}
        <dl className="space-y-3 border-y border-[color:var(--color-border-subtle)] py-5">
          <Row k="Cycle time" v={`${r.cycleFrom} → ${r.cycleTo}`} />
          <Row k="OPEX delta" v={r.opex} highlight />
          <Row k="Manual error rate" v={`${r.errorBefore} → ${r.errorAfter}`} />
        </dl>

        {/* Quote */}
        <blockquote className="text-sm leading-relaxed text-[color:var(--color-text-primary)] text-pretty">
          <span className="text-[color:var(--color-accent)] font-mono text-lg align-text-top">
            “
          </span>
          {r.quote}
          <span className="text-[color:var(--color-accent)] font-mono text-lg align-text-top">
            ”
          </span>
        </blockquote>

        {/* Attribution */}
        <p className="mt-auto font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
          {r.who} · anonymised
        </p>
      </div>
    </motion.article>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="eyebrow">{k}</dt>
      <dd
        className={
          highlight
            ? "font-mono text-sm font-semibold text-[color:var(--color-accent)] tabular-nums"
            : "font-mono text-sm text-[color:var(--color-text-primary)] tabular-nums"
        }
      >
        {v}
      </dd>
    </div>
  );
}
