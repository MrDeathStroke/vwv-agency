import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "motion/react";

/**
 * Anatomy section — three editorial diagrams that visualize what
 * a sprint actually does. Parallel structure to the Mind site's
 * OperatingModel, but agency-voiced (operational, not thesis).
 *
 *   01 · The rebuild      — workflow → AI orchestration layer
 *   02 · The room         — crew + stakeholders converging
 *   03 · The instruments  — three KPIs handed to the CFO
 *
 * Visual language matches the rest of the studio: Cobalt accent on
 * Carbon, sparse Geist Mono labels, breathing hairlines.
 */

const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

type Panel = {
  n: string;
  eyebrow: string;
  title: string;
  body: string;
  Diagram: React.FC;
};

const panels: Panel[] = [
  {
    n: "01",
    eyebrow: "The rebuild",
    title: "Workflow into AI orchestration.",
    body:
      "Process debt lives at the handoffs between manual steps. We retire the handoffs and rebuild the workflow around an orchestration layer that routes work, runs evals, and escalates to humans only where a human still beats the system.",
    Diagram: WorkflowRebuildDiagram,
  },
  {
    n: "02",
    eyebrow: "The room",
    title: "One crew. Your stakeholders. One table.",
    body:
      "Strategist, AI build engineer, workflow engineer, brand operator, funnel operator. All in the same room as your CFO, ops lead, and CEO. We arrive with the question framework. The map gets drawn together. The sprint plan gets signed on the same table.",
    Diagram: CrewDiagram,
  },
  {
    n: "03",
    eyebrow: "The instruments",
    title: "Three numbers, signed at close-out.",
    body:
      "Cycle time. Run cost. Error rate. The same instruments measure the old workflow on day one and the new one on the day we hand it back. The deltas land in the CFO's hands at the close-out call, with the dashboard you keep.",
    Diagram: InstrumentsDiagram,
  },
];

export function Anatomy() {
  return (
    <section
      id="anatomy"
      className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32 lg:py-40">
        {/* Header */}
        <div className="mb-20 lg:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-[color:var(--color-accent)]">
              04
            </span>
            <span className="h-px w-12 bg-[color:var(--color-border)]" />
            <p className="eyebrow">Anatomy · what a sprint actually does</p>
          </div>
          <h2 className="font-display font-semibold tracking-tightest leading-[1.0] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,4rem)] max-w-4xl text-balance">
            Three moves. Drawn out.
          </h2>
        </div>

        {/* Panels */}
        <div className="space-y-24 lg:space-y-32">
          {panels.map((p, i) => (
            <PanelRow key={p.n} panel={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelRow({ panel, index }: { panel: Panel; index: number }) {
  const Diagram = panel.Diagram;
  const reverse = index % 2 === 1;

  return (
    <motion.div
      className="grid gap-10 lg:gap-20 lg:grid-cols-12 items-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
    >
      <div
        className={`lg:col-span-7 ${reverse ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="relative rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] p-6 lg:p-8 aspect-[16/9] flex items-center justify-center overflow-hidden">
          <Diagram />
        </div>
      </div>

      <div
        className={`lg:col-span-5 ${reverse ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-mono text-xs text-[color:var(--color-accent)]">
            {panel.n}
          </span>
          <p className="eyebrow">{panel.eyebrow}</p>
        </div>
        <h3 className="font-display font-semibold tracking-tightest leading-[1.05] text-[color:var(--color-text-primary)] text-[clamp(1.5rem,3vw,2.5rem)] text-balance">
          {panel.title}
        </h3>
        <p className="mt-6 text-[15px] lg:text-base leading-relaxed text-[color:var(--color-text-secondary)] text-pretty max-w-md">
          {panel.body}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Diagram 01 — Workflow rebuild.
   Top track: workflow with manual handoff marks (process debt).
   Bottom: same workflow re-routed through a Cobalt AI orchestration
   bar with continuous traveling dots.
   ───────────────────────────────────────────────────────────────── */
function WorkflowRebuildDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const animate = reduced || inView ? "visible" : "hidden";

  const nodeX = [110, 230, 350, 470, 590];
  const topY = 80;
  const bottomY = 200;
  const aiBarY = 245;

  return (
    <svg
      ref={ref}
      viewBox="0 0 680 300"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Workflow rebuild — manual handoffs replaced by an AI orchestration layer"
      className="w-full h-full text-[color:var(--color-text-primary)]"
    >
      {/* Defs — AI orchestration travel path */}
      <defs>
        <path id="ai-bar-path" d="M 90 245 L 610 245" fill="none" />
      </defs>

      {/* TOP — workflow as-is */}
      <motion.line
        x1="90"
        y1={topY}
        x2="610"
        y2={topY}
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={animate === "visible" ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
      />

      {/* Top nodes */}
      {nodeX.map((x, i) => (
        <motion.g
          key={`tn-${i}`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            animate === "visible"
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.4 }
          }
          transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: EASE_OUT }}
          style={{ transformOrigin: `${x}px ${topY}px` }}
        >
          <circle
            cx={x}
            cy={topY}
            r="8"
            fill="var(--color-canvas-raised)"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
        </motion.g>
      ))}

      {/* Handoff marks between top nodes */}
      {nodeX.slice(0, -1).map((x, i) => {
        const midX = (x + nodeX[i + 1]) / 2;
        return (
          <motion.g
            key={`handoff-${i}`}
            initial={{ opacity: 0 }}
            animate={
              animate === "visible" && !reduced
                ? { opacity: [0, 0.7, 0.4, 0.7] }
                : { opacity: animate === "visible" ? 0.6 : 0 }
            }
            transition={{
              duration: 2.4,
              delay: 0.9 + i * 0.1,
              repeat: reduced ? 0 : Infinity,
              ease: "easeInOut",
            }}
          >
            <line
              x1={midX}
              y1={topY - 12}
              x2={midX}
              y2={topY + 12}
              stroke="var(--color-accent)"
              strokeOpacity="0.6"
              strokeWidth="1.2"
            />
            <line
              x1={midX - 5}
              y1={topY}
              x2={midX + 5}
              y2={topY}
              stroke="var(--color-accent)"
              strokeOpacity="0.6"
              strokeWidth="1.2"
            />
          </motion.g>
        );
      })}

      {/* Divider hairline between states */}
      <motion.line
        x1="90"
        y1="145"
        x2="610"
        y2="145"
        stroke="currentColor"
        strokeOpacity="0.06"
        strokeWidth="1"
        strokeDasharray="2 4"
        initial={{ pathLength: 0 }}
        animate={animate === "visible" ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      />

      {/* BOTTOM — workflow rebuilt */}
      <motion.line
        x1="90"
        y1={bottomY}
        x2="610"
        y2={bottomY}
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={animate === "visible" ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 0.9, delay: 1.3, ease: EASE_OUT }}
      />

      {/* Bottom nodes */}
      {nodeX.map((x, i) => (
        <motion.g
          key={`bn-${i}`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            animate === "visible"
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.4 }
          }
          transition={{ duration: 0.5, delay: 1.4 + i * 0.06, ease: EASE_OUT }}
          style={{ transformOrigin: `${x}px ${bottomY}px` }}
        >
          <circle
            cx={x}
            cy={bottomY}
            r="8"
            fill="var(--color-canvas-raised)"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
        </motion.g>
      ))}

      {/* Connections from bottom nodes down to AI bar */}
      {nodeX.map((x, i) => (
        <motion.line
          key={`drop-${i}`}
          x1={x}
          y1={bottomY + 8}
          x2={x}
          y2={aiBarY}
          stroke="var(--color-accent)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={animate === "visible" ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, delay: 1.7 + i * 0.05, ease: EASE_OUT }}
        />
      ))}

      {/* AI orchestration bar — Cobalt */}
      <motion.line
        x1="90"
        y1={aiBarY}
        x2="610"
        y2={aiBarY}
        stroke="var(--color-accent)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          animate === "visible"
            ? { pathLength: 1, opacity: 0.9 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: { duration: 1.0, delay: 1.5, ease: EASE_OUT },
          opacity: { duration: 0.3, delay: 1.5 },
        }}
      />

      {/* Travel dots on the AI bar */}
      {animate === "visible" && !reduced && (
        <>
          <circle r="4" fill="var(--color-accent)">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin="2.6s"
              calcMode="linear"
            >
              <mpath href="#ai-bar-path" />
            </animateMotion>
          </circle>
          <circle r="3" fill="currentColor" opacity="0.5">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin="3.4s"
              calcMode="linear"
            >
              <mpath href="#ai-bar-path" />
            </animateMotion>
          </circle>
        </>
      )}

      {/* Labels */}
      <motion.g
        fill="currentColor"
        fontFamily='"Geist Mono", ui-monospace, monospace'
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={animate === "visible" ? { opacity: 0.55 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <text x="90" y="48" textAnchor="start" style={{ textTransform: "uppercase" }}>
          Before
        </text>
        <text x="610" y="48" textAnchor="end" style={{ textTransform: "uppercase" }}>
          Manual handoffs · process debt
        </text>
      </motion.g>
      <motion.g
        fill="currentColor"
        fontFamily='"Geist Mono", ui-monospace, monospace'
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={animate === "visible" ? { opacity: 0.55 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 2.0 }}
      >
        <text x="90" y="168" textAnchor="start" style={{ textTransform: "uppercase" }}>
          After
        </text>
        <text
          x="610"
          y="168"
          textAnchor="end"
          fill="var(--color-accent)"
          style={{ textTransform: "uppercase" }}
        >
          AI orchestration · routed
        </text>
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Diagram 02 — The crew.
   Central client workflow node. Four crew positions at the corners.
   Three stakeholder positions on cardinals. Travel dots from each
   position converge inward.
   ───────────────────────────────────────────────────────────────── */
function CrewDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const animate = reduced || inView ? "visible" : "hidden";

  const cx = 340;
  const cy = 160;

  const crew = [
    { x: 170, y: 70, label: "Strategy" },
    { x: 510, y: 70, label: "Build" },
    { x: 170, y: 250, label: "Brand" },
    { x: 510, y: 250, label: "Growth" },
  ];

  const stakeholders = [
    { x: 340, y: 30, label: "CFO" },
    { x: 80, y: 160, label: "Ops" },
    { x: 600, y: 160, label: "CEO" },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 680 320"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Cross-functional crew and stakeholders converging on one workflow"
      className="w-full h-full text-[color:var(--color-text-primary)]"
    >
      <defs>
        {crew.map((c, i) => (
          <path
            key={`cp-${i}`}
            id={`crew-path-${i}`}
            d={`M ${c.x} ${c.y} L ${cx} ${cy}`}
            fill="none"
          />
        ))}
        {stakeholders.map((s, i) => (
          <path
            key={`sp-${i}`}
            id={`stake-path-${i}`}
            d={`M ${s.x} ${s.y} L ${cx} ${cy}`}
            fill="none"
          />
        ))}
      </defs>

      {/* Connection lines — crew */}
      {crew.map((c, i) => (
        <motion.line
          key={`cl-${i}`}
          x1={c.x}
          y1={c.y}
          x2={cx}
          y2={cy}
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={animate === "visible" ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.9, delay: 0.6 + i * 0.05, ease: EASE_OUT }}
        />
      ))}

      {/* Connection lines — stakeholders (lighter) */}
      {stakeholders.map((s, i) => (
        <motion.line
          key={`sl-${i}`}
          x1={s.x}
          y1={s.y}
          x2={cx}
          y2={cy}
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeDasharray="2 3"
          initial={{ pathLength: 0 }}
          animate={animate === "visible" ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.9, delay: 1.0 + i * 0.05, ease: EASE_OUT }}
        />
      ))}

      {/* Crew nodes — four roles at corners */}
      {crew.map((c, i) => (
        <motion.g
          key={`cr-${i}`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            animate === "visible"
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.4 }
          }
          transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: EASE_OUT }}
          style={{ transformOrigin: `${c.x}px ${c.y}px` }}
        >
          <circle
            cx={c.x}
            cy={c.y}
            r="9"
            fill="var(--color-canvas-raised)"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <text
            x={c.x}
            y={c.y - 18}
            textAnchor="middle"
            fill="currentColor"
            fontFamily='"Geist Mono", ui-monospace, monospace'
            fontSize="10"
            letterSpacing="2"
            opacity="0.7"
            style={{ textTransform: "uppercase" }}
          >
            {c.label}
          </text>
        </motion.g>
      ))}

      {/* Stakeholder nodes — three smaller */}
      {stakeholders.map((s, i) => (
        <motion.g
          key={`st-${i}`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            animate === "visible"
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.4 }
          }
          transition={{ duration: 0.5, delay: 0.7 + i * 0.06, ease: EASE_OUT }}
          style={{ transformOrigin: `${s.x}px ${s.y}px` }}
        >
          <circle
            cx={s.x}
            cy={s.y}
            r="6"
            fill="var(--color-canvas)"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <text
            x={s.x}
            y={
              s.y < cy
                ? s.y - 14
                : s.y > cy + 50
                ? s.y + 20
                : s.x < cx
                ? s.y - 14
                : s.y - 14
            }
            textAnchor="middle"
            fill="currentColor"
            fontFamily='"Geist Mono", ui-monospace, monospace'
            fontSize="9"
            letterSpacing="1.5"
            opacity="0.5"
            style={{ textTransform: "uppercase" }}
          >
            {s.label}
          </text>
        </motion.g>
      ))}

      {/* Travel dots — crew converging inward */}
      {animate === "visible" && !reduced &&
        crew.map((_, i) => (
          <circle key={`ct-${i}`} r="3" fill="var(--color-accent)" opacity="0.8">
            <animateMotion
              dur="3.6s"
              repeatCount="indefinite"
              begin={`${1.8 + i * 0.3}s`}
              calcMode="linear"
            >
              <mpath href={`#crew-path-${i}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;0.8;0"
              dur="3.6s"
              repeatCount="indefinite"
              begin={`${1.8 + i * 0.3}s`}
            />
          </circle>
        ))}

      {/* Center — workflow node with breathing halo */}
      <motion.g
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          animate === "visible"
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.4 }
        }
        transition={{ duration: 0.8, delay: 1.4, ease: EASE_OUT }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <motion.circle
          cx={cx}
          cy={cy}
          r="26"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          initial={{ strokeOpacity: 0.35 }}
          animate={
            animate === "visible" && !reduced
              ? { r: [26, 32, 26], strokeOpacity: [0.35, 0.1, 0.35] }
              : { r: 26, strokeOpacity: 0.35 }
          }
          transition={{
            duration: 3.0,
            repeat: reduced ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
        <circle
          cx={cx}
          cy={cy}
          r="16"
          fill="var(--color-canvas-raised)"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
        />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fill="var(--color-accent)"
          fontFamily='"Geist Mono", ui-monospace, monospace'
          fontSize="10"
          letterSpacing="2"
          style={{ textTransform: "uppercase" }}
        >
          Workflow
        </text>
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Diagram 03 — The instruments.
   Three horizontal KPI meter rows. Indicators slide from baseline
   (right) toward target (left), with Cobalt fill growing behind
   them. Labels: Cycle time, Run cost, Error rate.
   ───────────────────────────────────────────────────────────────── */
function InstrumentsDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduced = useReducedMotion();
  const animate = reduced || inView ? "visible" : "hidden";

  const trackX1 = 200;
  const trackX2 = 600;
  const trackW = trackX2 - trackX1;

  const meters = [
    { label: "Cycle time", y: 70, targetPct: 0.42, delay: 0.4 },
    { label: "Run cost", y: 150, targetPct: 0.55, delay: 0.6 },
    { label: "Error rate", y: 230, targetPct: 0.32, delay: 0.8 },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 680 300"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Three KPI instruments — cycle time, run cost, error rate"
      className="w-full h-full text-[color:var(--color-text-primary)]"
    >
      {/* Header labels */}
      <motion.g
        fill="currentColor"
        fontFamily='"Geist Mono", ui-monospace, monospace'
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={animate === "visible" ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <text x={trackX1} y={32} textAnchor="start" fill="var(--color-accent)" style={{ textTransform: "uppercase" }}>
          Target
        </text>
        <text x={trackX2} y={32} textAnchor="end" style={{ textTransform: "uppercase" }}>
          Baseline
        </text>
      </motion.g>

      {meters.map((m) => {
        const targetX = trackX1 + trackW * m.targetPct;
        return (
          <g key={m.label}>
            {/* Label */}
            <motion.text
              x={90}
              y={m.y + 5}
              textAnchor="start"
              fill="currentColor"
              fontFamily='"Geist Mono", ui-monospace, monospace'
              fontSize="11"
              letterSpacing="2"
              initial={{ opacity: 0, x: 80 }}
              animate={
                animate === "visible"
                  ? { opacity: 0.85, x: 90 }
                  : { opacity: 0, x: 80 }
              }
              transition={{ duration: 0.5, delay: m.delay, ease: EASE_OUT }}
              style={{ textTransform: "uppercase" }}
            >
              {m.label}
            </motion.text>

            {/* Track outline */}
            <motion.rect
              x={trackX1}
              y={m.y - 6}
              width={trackW}
              height="12"
              rx="6"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={animate === "visible" ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: m.delay + 0.1 }}
            />

            {/* Baseline tick — right edge */}
            <motion.line
              x1={trackX2}
              x2={trackX2}
              y1={m.y - 12}
              y2={m.y + 12}
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={animate === "visible" ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: m.delay + 0.15 }}
            />

            {/* Target tick — Cobalt */}
            <motion.line
              x1={targetX}
              x2={targetX}
              y1={m.y - 12}
              y2={m.y + 12}
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={animate === "visible" ? { opacity: 0.9 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: m.delay + 0.6 }}
            />

            {/* Fill — grows from target to baseline (the improvement zone) */}
            <motion.rect
              y={m.y - 5}
              height="10"
              rx="5"
              fill="var(--color-accent)"
              fillOpacity="0.7"
              x={targetX}
              initial={{ width: 0 }}
              animate={
                animate === "visible"
                  ? { width: trackX2 - targetX }
                  : { width: 0 }
              }
              transition={{
                duration: 1.0,
                delay: m.delay + 0.7,
                ease: EASE_OUT,
              }}
            />

            {/* Moving indicator — slides from baseline toward target */}
            {!reduced && (
              <motion.circle
                cy={m.y}
                r="7"
                fill="var(--color-accent)"
                stroke="var(--color-canvas-raised)"
                strokeWidth="2"
                initial={{ cx: trackX2, opacity: 0 }}
                animate={
                  animate === "visible"
                    ? {
                        cx: [trackX2, targetX, targetX],
                        opacity: [0, 1, 1],
                      }
                    : { cx: trackX2, opacity: 0 }
                }
                transition={{
                  duration: 5.0,
                  delay: m.delay + 0.4,
                  times: [0, 0.55, 1],
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: EASE_OUT,
                }}
              />
            )}

            {/* Downward arrow accent at target */}
            <motion.g
              initial={{ opacity: 0, y: -4 }}
              animate={
                animate === "visible"
                  ? { opacity: 0.7, y: 0 }
                  : { opacity: 0, y: -4 }
              }
              transition={{ duration: 0.4, delay: m.delay + 1.4 }}
            >
              <text
                x={targetX}
                y={m.y - 18}
                textAnchor="middle"
                fill="var(--color-accent)"
                fontFamily='"Geist Mono", ui-monospace, monospace'
                fontSize="10"
                letterSpacing="2"
                style={{ textTransform: "uppercase" }}
              >
                ↓
              </text>
            </motion.g>
          </g>
        );
      })}

      {/* Footer label */}
      <motion.text
        x={90}
        y={282}
        textAnchor="start"
        fill="currentColor"
        fontFamily='"Geist Mono", ui-monospace, monospace'
        fontSize="10"
        letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={animate === "visible" ? { opacity: 0.45 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        style={{ textTransform: "uppercase" }}
      >
        Close-out · signed by CFO
      </motion.text>
    </svg>
  );
}
