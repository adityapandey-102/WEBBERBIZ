"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import ContactForm from "./ContactForm";
import { Arrow } from "./ui";
import { company } from "@/lib/data";

type Ctx = { open: () => void; close: () => void };
const SurveyCtx = createContext<Ctx>({ open: () => {}, close: () => {} });

export const useSurvey = () => useContext(SurveyCtx);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    lastFocused.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus?.();
  }, []);

  // Escape to dismiss, and keep tabbing inside the panel while it is up.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const items = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    const id = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
    }, 240);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      window.clearTimeout(id);
    };
  }, [isOpen, close]);

  return (
    <SurveyCtx.Provider value={{ open, close }}>
      {children}

      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[100] transition-opacity duration-500 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Scrim */}
        <button
          type="button"
          aria-label="Close"
          tabIndex={isOpen ? 0 : -1}
          onClick={close}
          className="absolute inset-0 h-full w-full cursor-default bg-ink/25 backdrop-blur-sm"
        />

        <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="survey-title"
            /* Capped to the viewport; the body scrolls, the header and foot stay put. */
            className={`relative flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-[0_40px_120px_-30px_rgba(15,26,19,0.35)] transition-all duration-600 ease-out-expo ${
              isOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"
            }`}
          >
            <div className="flex shrink-0 items-start justify-between gap-5 border-b border-line px-6 py-5 sm:px-8 sm:py-6">
              <div>
                <span className="eyebrow">Request a survey</span>
                <h2
                  id="survey-title"
                  className="display mt-3 text-[clamp(1.35rem,2.6vw,1.8rem)] leading-[1.05]"
                >
                  Tell us what the roof <span className="display-italic">is doing.</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                tabIndex={isOpen ? 0 : -1}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-strong transition-colors hover:border-ink/40 hover:bg-surface"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
              <p className="mb-6 max-w-lg text-[13.5px] leading-[1.7] text-body">
                Send the surface, the area and what it costs to cool. We come back with the
                specification, the expected delta and the energy it saves.
              </p>
              <ContactForm bare />
            </div>

            <div className="flex shrink-0 flex-col gap-1 border-t border-line px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <span>
                {company.address.line1} · {company.address.line2}
              </span>
              <span>{company.address.country}</span>
            </div>
          </div>
        </div>
      </div>
    </SurveyCtx.Provider>
  );
}

/** Any button that should raise the survey form in place. */
export function SurveyButton({
  children,
  className = "",
  withArrow = true,
}: {
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
}) {
  const { open } = useSurvey();
  return (
    <button type="button" onClick={open} className={`group ${className}`}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}
