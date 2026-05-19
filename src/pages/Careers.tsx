import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { roles } from "../careers/content";
import type { Role } from "../careers/content";

type FormState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function Careers() {
  const root = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedRole, setSelectedRole] = useState<string>(roles[0].slug);
  const [state, setState] = useState<FormState>({ kind: "idle" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useGSAP(
    () => {
      gsap.set("[data-c-line]", { yPercent: 110, opacity: 0 });
      gsap.set("[data-c-lede]", { y: 18, opacity: 0 });
      gsap.set("[data-c-role]", { y: 30, opacity: 0 });

      const intro = gsap.timeline({ delay: 0.18 });
      intro
        .to("[data-c-line]", {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          ease: "expo.out",
          stagger: 0.07,
        })
        .to(
          "[data-c-lede]",
          { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" },
          "-=0.5"
        );

      gsap.utils.toArray<HTMLElement>("[data-c-role]").forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.05,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: root }
  );

  function scrollToApply(slug: string) {
    setSelectedRole(slug);
    const el = document.getElementById("apply");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      role: String(data.get("role") || ""),
      location: String(data.get("location") || ""),
      linkedin: String(data.get("linkedin") || ""),
      portfolio: String(data.get("portfolio") || ""),
      why: String(data.get("why") || ""),
    };
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setState({
          kind: "error",
          message: json.error || "Could not send. Try again.",
        });
        return;
      }
      setState({ kind: "success" });
      form.reset();
    } catch {
      setState({
        kind: "error",
        message: "Network error. Try again in a moment.",
      });
    }
  }

  return (
    <article ref={root}>
      {/* Hero header */}
      <header className="relative isolate overflow-hidden border-b border-[color:var(--color-border-subtle)]">
        {/* Blueprint grid background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 blueprint-grid opacity-50"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-[500px] w-[700px] -translate-y-1/4 translate-x-1/4 rounded-full bg-[color:var(--color-accent)] opacity-[0.05] blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-32 lg:pt-44 pb-16 lg:pb-24">
          {/* Crumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-3 mb-10"
          >
            <Link
              to="/"
              className="eyebrow hover:text-[color:var(--color-accent)] transition-colors"
            >
              VWV.agency
            </Link>
            <span className="text-[10px] text-[color:var(--color-text-tertiary)]">
              /
            </span>
            <span className="eyebrow text-[color:var(--color-text-secondary)]">
              Join us
            </span>
          </nav>

          {/* Headline */}
          <h1 className="font-display font-semibold tracking-tightest leading-[0.95] text-[color:var(--color-text-primary)] text-[clamp(2.5rem,7vw,5.5rem)] text-balance max-w-4xl m-0">
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-c-line className="block">
                Build the studio
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <span data-c-line className="block">
                that retires process debt<span className="text-[color:var(--color-accent)]">.</span>
              </span>
            </span>
          </h1>

          {/* Lede */}
          <p
            data-c-lede
            className="mt-8 max-w-2xl text-lg lg:text-xl text-[color:var(--color-text-secondary)] text-pretty leading-relaxed"
          >
            VWV is hiring the small cross-functional team that ships AI
            automation against real workflows in real businesses. Strategy
            and execution under one roof, founder-led, hackathon-style. Five
            open roles. Hybrid in Ahmedabad, fully remote where the work
            allows.
          </p>

          {/* Stamp row */}
          <ul className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
            {[
              { k: "Open roles", v: `${roles.length}` },
              { k: "Locations", v: "Ahmedabad · Remote" },
              { k: "Team shape", v: "Cross-functional" },
              { k: "Lead", v: "Founder" },
            ].map((s) => (
              <li
                key={s.k}
                className="border-t border-[color:var(--color-border-subtle)] pt-3"
              >
                <p className="eyebrow">{s.k}</p>
                <p className="mt-1 font-display text-base font-medium text-[color:var(--color-text-primary)]">
                  {s.v}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Roles */}
      <section
        id="roles"
        className="bg-[color:var(--color-canvas)] border-b border-[color:var(--color-border-subtle)]"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
          <div className="flex items-center gap-3 mb-12">
            <span className="font-mono text-xs text-[color:var(--color-accent)]">
              01
            </span>
            <span className="h-px w-12 bg-[color:var(--color-border)]" />
            <p className="eyebrow">Open roles</p>
          </div>

          <ul className="grid gap-4 lg:gap-6 md:grid-cols-2">
            {roles.map((role) => (
              <RoleCard
                key={role.slug}
                role={role}
                onApply={() => scrollToApply(role.slug)}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Apply form */}
      <section
        id="apply"
        className="relative isolate overflow-hidden bg-[color:var(--color-canvas-sunken)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] blueprint-grid"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
          <div className="grid gap-14 lg:gap-20 lg:grid-cols-12 items-start">
            {/* Left — pitch */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-xs text-[color:var(--color-accent)]">
                  02
                </span>
                <span className="h-px w-12 bg-[color:var(--color-border)]" />
                <p className="eyebrow">Apply</p>
              </div>

              <h2 className="font-display font-semibold tracking-tightest leading-[0.95] text-[color:var(--color-text-primary)] text-[clamp(2rem,5vw,3.75rem)] text-balance">
                Tell us about the workflow you would rebuild first<span className="text-[color:var(--color-accent)]">.</span>
              </h2>

              <p className="mt-6 text-lg text-[color:var(--color-text-secondary)] text-pretty leading-relaxed max-w-md">
                One form. We read every application personally. If we see a
                fit, you hear back within 5 working days with two or three
                time options for a 30-minute call.
              </p>

              <ul className="mt-8 space-y-3 max-w-md">
                {[
                  "No résumé. Send a LinkedIn URL and a portfolio if you have one.",
                  "Tell us what to fix at our last client. Specific beats polished.",
                  "If we say no, we say it directly within the same week.",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 text-sm text-[color:var(--color-text-secondary)]"
                  >
                    <svg
                      className="mt-1 shrink-0 text-[color:var(--color-accent)]"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 6.5 5 9.5 10 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form card */}
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-canvas-raised)] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]">
                  <p className="eyebrow">Application</p>
                  <p className="font-mono text-[10px] tracking-widest text-[color:var(--color-text-tertiary)]">
                    Reply within 5 working days
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {state.kind === "success" ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="p-8 lg:p-10 text-center"
                    >
                      <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[color:var(--color-accent-soft)] grid place-items-center text-[color:var(--color-accent)]">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M5 12.5 10 17 19 7" />
                        </svg>
                      </div>
                      <h3 className="font-display text-2xl font-semibold tracking-tighter text-[color:var(--color-text-primary)]">
                        Got it. Reply within 5 working days.
                      </h3>
                      <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] max-w-sm mx-auto">
                        We read every application personally. If we see a
                        fit, you hear back with time options for a 30-minute
                        call. If not, we say so directly within the same
                        week.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      ref={formRef}
                      key="form"
                      onSubmit={onSubmit}
                      className="p-6 lg:p-7 grid gap-4"
                      initial={{ opacity: 1 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Your name" name="name" required />
                        <Field label="Email" name="email" type="email" required />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                          label="Role"
                          name="role"
                          value={selectedRole}
                          onChange={setSelectedRole}
                          options={roles.map((r) => ({
                            value: r.slug,
                            label: r.title,
                          }))}
                        />
                        <Select
                          label="Where you'll work"
                          name="location"
                          options={[
                            { value: "ahmedabad", label: "Hybrid · Ahmedabad" },
                            { value: "remote", label: "Remote" },
                            { value: "open", label: "Open to either" },
                          ]}
                        />
                      </div>

                      <Field
                        label="LinkedIn URL"
                        name="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/…"
                        required
                      />

                      <Field
                        label="Portfolio, GitHub, or work you're proud of (optional)"
                        name="portfolio"
                        type="url"
                        placeholder="https://…"
                      />

                      <div>
                        <label htmlFor="why" className="block eyebrow mb-2">
                          What would you rebuild at our last client?
                        </label>
                        <textarea
                          id="why"
                          name="why"
                          rows={5}
                          required
                          placeholder="Specific beats polished. Name the workflow, the metric you'd move, the way you'd ship it. 3-5 sentences."
                          className="w-full px-3 py-2.5 rounded-md bg-[color:var(--color-canvas-sunken)] border border-[color:var(--color-border)] text-[15px] text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-tertiary)] focus:outline-none focus:border-[color:var(--color-accent)] resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={state.kind === "loading"}
                        className="mt-2 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-accent-fg)] text-sm font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors disabled:opacity-60"
                      >
                        {state.kind === "loading" && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="animate-spin"
                            aria-hidden
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeOpacity="0.25"
                            />
                            <path
                              d="M22 12a10 10 0 0 0-10-10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {state.kind === "loading"
                          ? "Sending"
                          : "Send the application"}
                      </button>

                      <AnimatePresence>
                        {state.kind === "error" && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm text-[#B91C1C]"
                          >
                            {state.message}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
                        One form, one inbox. No talent pipeline list, no
                        recruiters in the loop.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to home */}
      <div className="bg-[color:var(--color-canvas)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              className="transition-transform group-hover:-translate-x-0.5"
              aria-hidden
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to VWV.agency
          </Link>
        </div>
      </div>
    </article>
  );
}

function RoleCard({
  role,
  onApply,
}: {
  role: Role;
  onApply: () => void;
}) {
  return (
    <motion.li
      data-c-role
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative rounded-lg border border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-raised)] p-6 lg:p-8 flex flex-col gap-5 h-full"
    >
      {/* Top row */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-accent)]">
            {role.archetype}
          </span>
          <span className="h-px w-8 bg-[color:var(--color-border)]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
            {role.location}
          </span>
        </div>
        <h3 className="font-display text-2xl lg:text-3xl font-semibold tracking-tightest leading-none text-[color:var(--color-text-primary)]">
          {role.title}
        </h3>
        <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] text-pretty leading-relaxed">
          {role.shape}
        </p>
      </div>

      {/* Scope */}
      <div>
        <p className="eyebrow mb-3">What you ship</p>
        <ul className="space-y-2">
          {role.scope.map((s) => (
            <li
              key={s}
              className="flex items-start gap-2.5 text-sm text-[color:var(--color-text-secondary)] text-pretty"
            >
              <svg
                className="mt-1 shrink-0 text-[color:var(--color-accent)]"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 6.5 5 9.5 10 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Fit */}
      <div>
        <p className="eyebrow mb-3">Who fits</p>
        <ul className="space-y-2">
          {role.fit.map((s) => (
            <li
              key={s}
              className="flex items-start gap-2.5 text-sm text-[color:var(--color-text-secondary)] text-pretty"
            >
              <span
                aria-hidden
                className="mt-[0.55em] inline-block h-1 w-1 rounded-full bg-[color:var(--color-text-tertiary)] shrink-0"
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Anti-fit */}
      <div className="border-t border-[color:var(--color-border-subtle)] pt-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)] mb-2">
          Not for you if
        </p>
        <p className="text-sm text-[color:var(--color-text-secondary)] text-pretty leading-relaxed">
          {role.not}
        </p>
      </div>

      {/* Apply CTA */}
      <button
        onClick={onApply}
        className="mt-auto inline-flex items-center justify-between gap-2 h-12 px-5 rounded-md text-sm font-medium bg-[color:var(--color-text-primary)] text-[color:var(--color-canvas)] hover:bg-[color:var(--color-accent)] hover:text-[color:var(--color-accent-fg)] transition-colors"
      >
        <span>Apply for {role.title}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          aria-hidden
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </button>
    </motion.li>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block eyebrow mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={
          name === "email"
            ? "email"
            : name === "name"
            ? "name"
            : name === "linkedin" || name === "portfolio"
            ? "url"
            : "off"
        }
        className="w-full h-11 px-3 rounded-md bg-[color:var(--color-canvas-sunken)] border border-[color:var(--color-border)] text-[15px] text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-tertiary)] focus:outline-none focus:border-[color:var(--color-accent)]"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value?: string;
  onChange?: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={name} className="block eyebrow mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        defaultValue={value ? undefined : ""}
        className="w-full h-11 px-3 rounded-md bg-[color:var(--color-canvas-sunken)] border border-[color:var(--color-border)] text-[15px] text-[color:var(--color-text-primary)] focus:outline-none focus:border-[color:var(--color-accent)]"
      >
        {!value && (
          <option value="" disabled>
            Pick one…
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
