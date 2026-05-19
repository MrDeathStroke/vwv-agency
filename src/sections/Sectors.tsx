import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

/**
 * The sectors VWV delivers into. All shipped, not aspirational.
 * Each row gets a short reason the sector matters and a one-line example
 * of the kind of workflow we look for.
 */

type Sector = {
  name: string;
  why: string;
  workflow: string;
};

const sectors: Sector[] = [
  {
    name: "Sales-led organisations",
    why: "Pipeline lives in spreadsheets and DMs.",
    workflow: "Lead routing, enrichment, and outbound orchestration.",
  },
  {
    name: "Manufacturing",
    why: "Floor data lives on paper and WhatsApp.",
    workflow: "Production scheduling, quality reporting, supplier portals.",
  },
  {
    name: "Real estate",
    why: "Brokers run on parallel, incompatible CRMs.",
    workflow: "Lead capture, property matching, deal pipeline.",
  },
  {
    name: "Healthcare",
    why: "Patient flow defines outcomes more than software does.",
    workflow: "Intake, triage, follow-up tracking, claims handoff.",
  },
  {
    name: "Hospitality",
    why: "Booking, ops, and guest experience sit in three different systems.",
    workflow: "Reservation orchestration, F&B operations, guest CRM.",
  },
  {
    name: "Restaurants",
    why: "Margins live in the kitchen workflow nobody's instrumenting.",
    workflow: "Inventory, food-cost tracking, supplier negotiation.",
  },
  {
    name: "Entertainment & media",
    why: "Content production cycles are the workflow.",
    workflow: "Project intake, asset routing, post-production handoff.",
  },
  {
    name: "Luxury jewellers",
    why: "Custom orders break every template CRM.",
    workflow: "Bespoke order capture, artisan handoff, client follow-through.",
  },
  {
    name: "DTC ecom brands",
    why: "The funnel is the workflow, the workflow is the funnel.",
    workflow: "Customer-data unification, retention triggers, ops automation.",
  },
  {
    name: "Offline large events",
    why: "Coordination is the product. Spreadsheets are the bottleneck.",
    workflow: "Vendor orchestration, attendee flow, on-the-day operations.",
  },
  {
    name: "Education institutes",
    why: "Admissions, ops, and academics still run in silos.",
    workflow: "Admissions, attendance, faculty workflow, parent communication.",
  },
  {
    name: "Production companies",
    why: "Each project is a one-off, but the process repeats.",
    workflow: "Pre-production, shoot scheduling, post review cycles.",
  },
  {
    name: "Supply chain operators",
    why: "Cross-party data sync is the daily friction.",
    workflow: "Shipment tracking, document workflow, partner-portal integration.",
  },
];

export function Sectors() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-sector]", { y: 18, opacity: 0 });
      gsap.utils.toArray<HTMLElement>("[data-sector]").forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: (i % 4) * 0.04,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
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
      id="sectors"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                02
              </span>
              <span className="h-px w-12 bg-[color:var(--color-border)]" />
              <p className="eyebrow">Sectors · where we have shipped</p>
            </div>
            <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-3xl text-balance">
              Thirteen non-tech sectors. All delivered.
            </h2>
          </div>
          <p className="lg:max-w-sm text-sm text-[color:var(--color-text-secondary)] text-pretty">
            We chose non-tech firms on purpose. They are where the SaaS-template
            era left the deepest process debt, and where AI-built bespoke
            systems pay back the fastest.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3 bg-[color:var(--color-border-subtle)] border border-[color:var(--color-border-subtle)] rounded-lg overflow-hidden">
          {sectors.map((s, i) => (
            <motion.article
              key={s.name}
              data-sector
              whileHover={{ backgroundColor: "var(--color-canvas-sunken)" }}
              transition={{ duration: 0.2 }}
              className="bg-[color:var(--color-canvas-raised)] p-6 lg:p-7"
            >
              <p className="font-mono text-[10px] text-[color:var(--color-text-tertiary)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tighter text-[color:var(--color-text-primary)] text-balance">
                {s.name}
              </h3>
              <p className="mt-3 text-xs text-[color:var(--color-text-secondary)] text-pretty">
                {s.why}
              </p>
              <p className="mt-4 pt-3 border-t border-[color:var(--color-border-subtle)] font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
                Typical workflow
              </p>
              <p className="mt-1 text-xs text-[color:var(--color-text-primary)] text-pretty leading-relaxed">
                {s.workflow}
              </p>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-text-tertiary)] text-center">
          Your sector isn't listed? Send it on the intro call. The structural
          shape is what matters, not the category.
        </p>
      </div>
    </section>
  );
}
