import { Link } from "react-router-dom";
import { AnimatedVMark } from "./AnimatedVMark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[color:var(--color-border-subtle)] bg-[color:var(--color-canvas-sunken)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 text-[color:var(--color-text-primary)]">
              <AnimatedVMark size={28} interval={8} />
              <span className="font-display text-xl font-semibold tracking-tighter">
                VWV<span className="text-[color:var(--color-accent)]">.agency</span>
              </span>
            </div>
            <p className="mt-6 max-w-md text-[color:var(--color-text-secondary)] text-pretty">
              Fixed-scope sprints that ship AI automation against the
              workflows your team actually runs. On your premises. In days.
            </p>
          </div>

          {/* Site map */}
          <div className="lg:col-span-3">
            <p className="eyebrow mb-4">Site</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#sectors" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">Sectors</Link></li>
              <li><Link to="/#sprints" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">Sprints</Link></li>
              <li><Link to="/#process" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">Process</Link></li>
              <li><Link to="/careers" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">Join us</Link></li>
              <li><Link to="/#faq" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">FAQ</Link></li>
              <li><Link to="/#book" className="text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)] transition-colors">Book a call</Link></li>
            </ul>
          </div>

          {/* Cross-link to the dispatches */}
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Read the thinking</p>
            <a
              href="https://valuewithvelocity.com"
              className="group block rounded-lg border border-[color:var(--color-border-subtle)] hover:border-[color:var(--color-accent)] p-5 transition-colors bg-[color:var(--color-canvas-raised)]"
            >
              <p className="font-display text-lg font-semibold text-[color:var(--color-text-primary)]">
                valuewithvelocity.com
              </p>
              <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                Long-form essays from Purvang on the end of the SaaS-template era, process debt, and AI-native operations.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--color-accent)]">
                Read dispatches
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[color:var(--color-border-subtle)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[color:var(--color-text-tertiary)]">
          <p className="font-mono">© {year} VWV. Value With Velocity. All rights reserved.</p>
          <p className="font-mono">
            <a href="mailto:hello@vwv.agency" className="hover:text-[color:var(--color-accent)] transition-colors">
              hello@vwv.agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
