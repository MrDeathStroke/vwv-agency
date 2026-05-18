import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type QA = { q: string; a: string };

const faqs: QA[] = [
  {
    q: "How much does a sprint cost?",
    a: "Pricing is scoped per workflow because the workflow drives the price. The scoping call is free and the quote comes back in writing within 48 hours, tied to the one-page sprint plan. We do not have public price tiers because we do not want to start a workflow we cannot ship at the priced level.",
  },
  {
    q: "What if you don't move the metrics?",
    a: "The sprint plan names stop-conditions on the front page. If the three signed metrics are not moving by mid-sprint, we trigger one of those stop-conditions together — scope shrinks, or the sprint pauses, or we refund the balance. We would rather end a sprint honestly than ship a workflow that does not earn its keep.",
  },
  {
    q: "Do you take equity instead of cash?",
    a: "No. Sprints are priced in cash because the contract is falsifiable in cash. Equity introduces incentives that work against a fixed timebox and a CFO who has to sign the close-out.",
  },
  {
    q: "Can you sign an NDA?",
    a: "Yes — mutual NDA before the scoping call. Once signed, we can name the workflow and discuss baselines openly. If you become a public case study, it is only with your written permission.",
  },
  {
    q: "What if the workflow takes longer than the timebox?",
    a: "Sprints are fixed-timebox. If a workflow is too big for the timebox, we say so during Scout and split it into two sprints. If a sprint we already started begins to slip, we shrink scope to hit the date. We do not extend the date to absorb scope.",
  },
  {
    q: "Do we have to use your stack?",
    a: "No. We default to the orchestration and eval tools listed on the Stack page, but we build inside your existing data plane, your security model, and the SaaS surfaces your team already uses. The runbook on hand-off is operable by your team without us.",
  },
  {
    q: "What's the smallest engagement you'll take?",
    a: "A 2-week Scout sprint. Scout exists for teams that want a falsifiable, instrumented plan before committing to a Build. If Scout finds nothing worth rebuilding, the deliverable is that conclusion in writing — and the next conversation can happen six months later.",
  },
  {
    q: "Who actually does the work?",
    a: "Purvang leads every sprint personally. A small, deliberately constant team rebuilds the workflow alongside your engineers. We do not subcontract, do not staff-augment, and do not change the team mid-sprint.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-12 items-start">
          {/* Left: header */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                05
              </span>
              <span className="h-px w-12 bg-[color:var(--color-border)]" />
              <p className="eyebrow">FAQ · sharp questions only</p>
            </div>
            <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,3.5rem)] text-balance">
              The eight questions every buyer asks. Answered before you ask them.
            </h2>
            <p className="mt-6 text-[color:var(--color-text-secondary)] text-pretty max-w-md">
              If your question is not here, send it to{" "}
              <a
                href="mailto:hello@vwv.agency"
                className="text-[color:var(--color-accent)] hover:underline"
              >
                hello@vwv.agency
              </a>{" "}
              and we will answer in writing within a working day.
            </p>
          </div>

          {/* Right: accordion */}
          <ul className="lg:col-span-8 divide-y divide-[color:var(--color-border-subtle)] border-y border-[color:var(--color-border-subtle)]">
            {faqs.map((qa, i) => (
              <FaqItem key={qa.q} qa={qa} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ qa, index }: { qa: QA; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group w-full grid grid-cols-12 gap-4 items-start py-6 lg:py-7 text-left"
      >
        <span className="col-span-1 font-mono text-xs text-[color:var(--color-text-tertiary)] mt-1.5">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="col-span-10 font-display text-lg lg:text-xl font-semibold tracking-tighter text-[color:var(--color-text-primary)] text-pretty leading-snug">
          {qa.q}
        </span>
        <span
          className={`col-span-1 grid place-items-center h-7 w-7 rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] transition-all duration-300 mt-0.5 ${
            open
              ? "rotate-45 bg-[color:var(--color-accent)] border-[color:var(--color-accent)] text-[color:var(--color-accent-fg)]"
              : "group-hover:border-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent)]"
          }`}
          aria-hidden
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="grid grid-cols-12 gap-4 pb-6 lg:pb-7">
              <span className="col-span-1" />
              <span className="col-span-11 lg:col-span-10 text-[15px] leading-relaxed text-[color:var(--color-text-secondary)] text-pretty max-w-2xl">
                {qa.a}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
