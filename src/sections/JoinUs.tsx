import { Link } from "react-router-dom";
import { motion } from "motion/react";

const roleChips: { label: string; archetype: string }[] = [
  { label: "Sprint Strategist", archetype: "Strategy" },
  { label: "AI Build Engineer", archetype: "Build" },
  { label: "Workflow Engineer", archetype: "Build" },
  { label: "Brand & Design Operator", archetype: "Brand" },
  { label: "Funnel Operator", archetype: "Growth" },
];

export function JoinUs() {
  return (
    <section
      id="careers"
      className="relative border-t border-[color:var(--color-border-subtle)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-28">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-12 items-start">
          {/* Left: header */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                06
              </span>
              <span className="h-px w-12 bg-[color:var(--color-border)]" />
              <p className="eyebrow">Careers · join us</p>
            </div>
            <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(1.75rem,4vw,3rem)] text-balance">
              We're hiring operators, not employees.
            </h2>
          </motion.div>

          {/* Right: body */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[15px] lg:text-base leading-relaxed text-[color:var(--color-text-secondary)] text-pretty max-w-2xl">
              Five open roles to scale the on-premises sprint model.
              Strategy, build, brand, growth. No corporate-ladder titles,
              no fake levels. Each role is a real position with a real
              workflow waiting for the right operator.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {roleChips.map((r) => (
                <li
                  key={r.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[color:var(--color-canvas-raised)] border border-[color:var(--color-border-subtle)]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-accent)]">
                    {r.archetype}
                  </span>
                  <span className="text-xs text-[color:var(--color-text-primary)]">
                    {r.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/careers"
                className="group inline-flex items-center gap-2 h-12 px-6 rounded-md bg-[color:var(--color-text-primary)] text-[color:var(--color-canvas)] text-[15px] font-medium hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-accent-fg)] transition-all duration-300"
              >
                See the five roles
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
                Hybrid · Ahmedabad / Remote
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
