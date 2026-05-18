import { useRef } from "react";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

type Row = { layer: string; what: string; tools: string };

const layers: Row[] = [
  {
    layer: "Orchestration",
    what: "The graph that routes work through models, tools, evaluators, and humans.",
    tools: "LangGraph · MCP · Inngest · Trigger.dev",
  },
  {
    layer: "Reasoning",
    what: "The models that make the decisions inside the workflow. Frontier when needed, open-weights when sufficient.",
    tools: "Anthropic Claude · OpenAI · Gemini · Llama (self-hosted)",
  },
  {
    layer: "Tool layer",
    what: "How the agent reaches into your stack. Typed, audited, reversible.",
    tools: "MCP servers · Zapier · n8n · custom HTTP tools",
  },
  {
    layer: "Data plane",
    what: "Where state, traces, and embeddings live. Always in your VPC unless you say otherwise.",
    tools: "Postgres · Neon · Supabase · pgvector",
  },
  {
    layer: "Evals + monitoring",
    what: "Continuous evaluation against held-out test sets. Anomalies escalate within 24 hours.",
    tools: "LangSmith · Braintrust · custom OpenTelemetry",
  },
  {
    layer: "Surfaces",
    what: "Where your team interacts with the workflow. Familiar tools, AI behind them.",
    tools: "Slack · Linear · custom React surfaces on Vercel",
  },
];

export function Stack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.set("[data-stack-row]", { x: -24, opacity: 0 });
      gsap.utils.toArray<HTMLElement>("[data-stack-row]").forEach((el, i) => {
        gsap.to(el, {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.04,
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
      id="stack"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                04
              </span>
              <span className="h-px w-12 bg-[color:var(--color-border)]" />
              <p className="eyebrow">Stack · the layers we build with</p>
            </div>
            <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-3xl text-balance">
              Six layers. Each one chosen on purpose.
            </h2>
          </div>
          <p className="lg:max-w-sm text-sm text-[color:var(--color-text-secondary)] text-pretty">
            The stack is opinionated, not religious. We pick the layer
            components that fit the workflow at hand, document the choice in
            the sprint plan, and hand off something your team can operate
            after we leave.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] overflow-hidden">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 gap-6 px-6 py-3 border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]">
            <p className="col-span-3 eyebrow">Layer</p>
            <p className="col-span-5 eyebrow">What it does</p>
            <p className="col-span-4 eyebrow">Tools on the shortlist</p>
          </div>
          {layers.map((row) => (
            <motion.div
              key={row.layer}
              data-stack-row
              whileHover={{ backgroundColor: "var(--color-canvas-sunken)" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 px-6 py-5 border-b border-[color:var(--color-border-subtle)] last:border-b-0"
            >
              <p className="md:col-span-3 font-display text-lg font-semibold tracking-tighter text-[color:var(--color-text-primary)]">
                {row.layer}
              </p>
              <p className="md:col-span-5 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                {row.what}
              </p>
              <p className="md:col-span-4 font-mono text-xs text-[color:var(--color-text-primary)] leading-relaxed">
                {row.tools}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
          We do not build on stacks we cannot operate. We do not lock you into
          stacks you cannot leave.
        </p>
      </div>
    </section>
  );
}
