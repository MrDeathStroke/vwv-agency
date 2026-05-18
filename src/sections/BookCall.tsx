import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { AnimatedVMark } from "../components/AnimatedVMark";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "error"; message: string };

const tierOptions = [
  { value: "scout", label: "Scout · 2 weeks · $18K" },
  { value: "build", label: "Build · 6 weeks · $72K" },
  { value: "scale", label: "Scale · 12 weeks · $160K" },
  { value: "unsure", label: "Not sure yet — help us scope" },
];

export function BookCall() {
  const root = useRef<HTMLElement>(null);
  const [state, setState] = useState<State>({ kind: "idle" });

  useGSAP(
    () => {
      gsap.set("[data-bk-headline]", { y: 30, opacity: 0 });
      gsap.set("[data-bk-card]", { y: 40, opacity: 0 });

      gsap.to("[data-bk-headline]", {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "expo.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          once: true,
        },
      });
      gsap.to("[data-bk-card]", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: root }
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      tier: String(data.get("tier") || ""),
      workflow: String(data.get("workflow") || ""),
    };
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/inquiry", {
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
    <section
      ref={root}
      id="book"
      className="relative isolate overflow-hidden border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]"
    >
      {/* Watermark V mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-10 lg:-right-32 opacity-[0.04] text-[color:var(--color-text-primary)]"
      >
        <AnimatedVMark size={680} interval={0} />
      </div>
      {/* Cobalt wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-[1100px] -translate-x-1/2 rounded-full bg-[color:var(--color-accent)] opacity-[0.08] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid gap-14 lg:gap-20 lg:grid-cols-12 items-start">
          {/* Left: Pitch */}
          <div data-bk-headline className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-[color:var(--color-accent)]">
                06
              </span>
              <span className="h-px w-12 bg-[color:var(--color-border)]" />
              <p className="eyebrow">Book a sprint · scoping call</p>
            </div>
            <h2 className="font-display font-semibold tracking-tightest leading-[0.95] text-[color:var(--color-text-primary)] text-[clamp(2.5rem,7vw,5.5rem)] text-balance">
              30 minutes.<br />
              One workflow.<br />
              <span className="text-[color:var(--color-accent)]">
                A signed plan back to you in 48 hours.
              </span>
            </h2>
            <p className="mt-8 max-w-xl text-lg text-[color:var(--color-text-secondary)] text-pretty leading-relaxed">
              No deck. No retainer. We come back with a one-page sprint plan,
              a fixed price, and the three numbers we will move. If we cannot
              see a sprint worth shipping, we say so on the call.
            </p>

            <ul className="mt-10 space-y-3 max-w-md">
              {[
                "Founder-led: Purvang on the call, not a salesperson.",
                "No obligation. The plan is yours to share internally.",
                "If we say no, we say it on the call.",
              ].map((bullet) => (
                <li
                  key={bullet}
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
                    <path d="M2 6.5 5 9.5 10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form card */}
          <motion.div
            data-bk-card
            className="lg:col-span-6"
          >
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-canvas-raised)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]">
                <p className="eyebrow">Inquiry form</p>
                <p className="font-mono text-[10px] tracking-widest text-[color:var(--color-text-tertiary)]">
                  Reply within 24h
                </p>
              </div>

              <AnimatePresence mode="wait">
                {state.kind === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 lg:p-10 text-center"
                  >
                    <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[color:var(--color-accent-soft)] grid place-items-center text-[color:var(--color-accent)]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12.5 10 17 19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-tighter text-[color:var(--color-text-primary)]">
                      Got it. Reply within 24 hours.
                    </h3>
                    <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] max-w-sm mx-auto">
                      Purvang will reach out with two or three time options for the
                      30-minute call. If your inquiry is urgent, email{" "}
                      <a
                        href="mailto:hello@vwv.agency"
                        className="text-[color:var(--color-accent)] hover:underline"
                      >
                        hello@vwv.agency
                      </a>{" "}
                      directly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    className="p-6 lg:p-7 grid gap-4"
                    initial={{ opacity: 1 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Name" name="name" required />
                      <Field label="Email" name="email" type="email" required />
                    </div>
                    <Field label="Company" name="company" required />

                    <div>
                      <label
                        htmlFor="tier"
                        className="block eyebrow mb-2"
                      >
                        Sprint of interest
                      </label>
                      <select
                        id="tier"
                        name="tier"
                        required
                        defaultValue=""
                        className="w-full h-11 px-3 rounded-md bg-[color:var(--color-canvas-sunken)] border border-[color:var(--color-border)] text-[15px] text-[color:var(--color-text-primary)] focus:outline-none focus:border-[color:var(--color-accent)]"
                      >
                        <option value="" disabled>
                          Pick one...
                        </option>
                        {tierOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="workflow"
                        className="block eyebrow mb-2"
                      >
                        The workflow you want rebuilt
                      </label>
                      <textarea
                        id="workflow"
                        name="workflow"
                        rows={3}
                        required
                        placeholder="e.g. We close the books in 9 days. The reconciliation step alone takes 4 days and three FTEs."
                        className="w-full px-3 py-2.5 rounded-md bg-[color:var(--color-canvas-sunken)] border border-[color:var(--color-border)] text-[15px] text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-tertiary)] focus:outline-none focus:border-[color:var(--color-accent)] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={state.kind === "loading"}
                      className="mt-2 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-accent-fg)] text-sm font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors disabled:opacity-60"
                    >
                      {state.kind === "loading" && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden>
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
                          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {state.kind === "loading"
                        ? "Sending"
                        : "Send the inquiry"}
                    </button>

                    <AnimatePresence>
                      {state.kind === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-sm text-[#E84A18]"
                        >
                          {state.message}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-text-tertiary)]">
                      We read every inquiry. We do not add you to any list.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        autoComplete={
          name === "email" ? "email" : name === "name" ? "name" : "organization"
        }
        className="w-full h-11 px-3 rounded-md bg-[color:var(--color-canvas-sunken)] border border-[color:var(--color-border)] text-[15px] text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-tertiary)] focus:outline-none focus:border-[color:var(--color-accent)]"
      />
    </div>
  );
}
