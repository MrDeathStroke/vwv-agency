/**
 * Open roles at VWV. Each role is a real position Purvang is hiring for
 * to scale the hackathon-style sprint model. Voice: operator-grade,
 * outcomes-first, no corporate-ladder titles, no fake levels.
 */

export type Role = {
  slug: string;
  title: string;
  archetype: "Strategy" | "Build" | "Brand" | "Growth";
  location: string;
  shape: string;
  scope: string[];
  fit: string[];
  not: string;
};

export const roles: Role[] = [
  {
    slug: "sprint-strategist",
    title: "Sprint Strategist",
    archetype: "Strategy",
    location: "Hybrid · Ahmedabad / Remote",
    shape:
      "Lead on-premises hackathon-style sprints. Diagnose process debt. Co-author the one-page sprint plan. Sit with the CFO on close-out.",
    scope: [
      "Run the question-card framework in the client room and map workflows as they actually run.",
      "Write the sprint plan: scope, timebox, the three metrics, stop-conditions.",
      "Stay in the room through the parallel build cycle so strategy never ages mid-sprint.",
      "Run the receipts call weekly, own the operator handover at close.",
    ],
    fit: [
      "4-8 years across consulting, ops, or product, with at least one tour inside a non-tech firm.",
      "Reads workflows the way a senior partner reads a P&L.",
      "Comfortable challenging a CXO on day one when the workflow doesn't match the org chart.",
      "Fluent enough in AI orchestration to design specs the build team can ship.",
    ],
    not: "If your last decade was deck-writing without a deployment in production, this is not the role.",
  },
  {
    slug: "ai-build-engineer",
    title: "AI Build Engineer",
    archetype: "Build",
    location: "Hybrid · Ahmedabad / Remote",
    shape:
      "Design and ship the AI orchestration layer that retires process debt. Tool-calling agents, evals, integrations against the client's existing stack.",
    scope: [
      "Architect the orchestration graph for each workflow: routing, agents, evaluators, human-in-the-loop boundaries.",
      "Ship in the client's data plane: Postgres, Supabase, Neon, whatever they already run.",
      "Wire continuous evals against held-out test sets and instrument anomaly escalation.",
      "Hand over a runbook the client's engineers can operate without us.",
    ],
    fit: [
      "Strong React + TypeScript, comfortable with Node, Python, or both.",
      "Has shipped at least one production AI workflow using MCP, LangGraph, Inngest, or similar.",
      "Opinionated about evals. Knows when a model is the wrong tool.",
      "Reads architecture diagrams faster than they read marketing copy.",
    ],
    not: "If 'AI' for you means a chat box bolted to the side of a SaaS, this is not the role.",
  },
  {
    slug: "workflow-engineer",
    title: "Workflow Engineer",
    archetype: "Build",
    location: "Remote · open to Ahmedabad",
    shape:
      "Full-stack who ships the bespoke replacement: the dashboards, the integration glue, the operator-facing surfaces that make a rebuilt workflow easy to run.",
    scope: [
      "Build the operator UI for each sprint deliverable: React + Tailwind, on Vercel.",
      "Wire the integrations between AI orchestration, the client's existing tools, and the KPI dashboard.",
      "Ship the KPI dashboard that hands over at close-out and keeps process debt visible afterwards.",
      "Maintain the internal component library so each sprint starts ahead of zero.",
    ],
    fit: [
      "Senior React + TypeScript. Production-grade taste in shadcn / Tailwind.",
      "Has shipped against KPIs, not just specs.",
      "Comfortable inside a non-tech firm's stack: knows how to talk to a CFO and read a Postgres schema in the same morning.",
      "Bias to ship in the sprint window, not the sprint after.",
    ],
    not: "If your loop is feature branches that never merge, this is not the role.",
  },
  {
    slug: "brand-design-operator",
    title: "Brand & Design Operator",
    archetype: "Brand",
    location: "Hybrid · Ahmedabad / Remote",
    shape:
      "Run visual identity for client systems and for VWV itself. Operator-grade design, on-premises during sprints. Think Linear or Vercel design culture, deployed against non-tech firms.",
    scope: [
      "Design the client's operator UI: dashboards, internal tools, the surfaces their team actually runs on.",
      "Brand the rebuilt workflow: small marks, OG cards, onboarding decks, the things that make the deliverable feel owned.",
      "Maintain the VWV brand system: tokens, motion, OG cards, the dispatches surface.",
      "Sit in the hackathon room so design decisions ship in the sprint, not after.",
    ],
    fit: [
      "Senior designer with engineering empathy. Reads CSS, writes Figma fluently.",
      "Studio-Mono-grade restraint. Knows when to use the accent and when to leave whitespace.",
      "Has shipped product surfaces for non-tech firms before, or has wanted to.",
      "Comfortable owning brand decisions on a 6-week sprint timeline.",
    ],
    not: "If you need a creative brief and three rounds before you can sketch, this is not the role.",
  },
  {
    slug: "funnel-operator",
    title: "Funnel Operator",
    archetype: "Growth",
    location: "Remote · open to Ahmedabad",
    shape:
      "Run the marketing + sales funnel programmes we extend to clients. Branding through paid performance through CRM automation, all KPI-driven.",
    scope: [
      "Build digital funnels end to end: landing, capture, qualification, sales handoff.",
      "Own paid performance: search, social, retargeting, against named CAC and LTV targets.",
      "Wire CRM automation so leads don't sit waiting on a human's calendar.",
      "Report against the client's funnel metrics weekly, the same shape as a sprint receipts call.",
    ],
    fit: [
      "5+ years in growth or performance with proof against real CAC / LTV / pipeline numbers.",
      "Fluent in HubSpot, Customer.io, Klaviyo, or whatever the client already runs.",
      "Knows what to automate and what to leave to the sales team.",
      "Comfortable carrying a target.",
    ],
    not: "If your last campaign optimised for vanity metrics, this is not the role.",
  },
];

export function getRole(slug: string) {
  return roles.find((r) => r.slug === slug);
}
