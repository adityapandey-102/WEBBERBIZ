"use client";

import { useState } from "react";
import { Arrow } from "./ui";

const surfaces = ["Metal roof / cladding", "Concrete roof or wall", "Container", "Waterproofing", "Not sure yet"];

const field =
  "w-full rounded-lg border border-line bg-bg px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-faint focus:border-ink";
const label = "block font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint";

/** `bare` drops the card chrome so the form can sit inside the survey modal. */
export default function ContactForm({ bare = false }: { bare?: boolean }) {
  const [sent, setSent] = useState(false);

  // No backend is wired up yet — this validates and shows the confirmation state.
  // TODO: point this at your form endpoint / CRM before launch.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-ink/25 bg-ink/6 px-8 py-14 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink">
          <svg
            viewBox="0 0 16 16"
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5 6.5 12 13 4" />
          </svg>
        </div>
        <h3 className="mt-6 display text-[1.9rem]">
          Thank you — we have your details.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-body">
          We will come back with a specification, the expected temperature delta and the energy it
          saves.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={bare ? "" : "rounded-2xl border border-line bg-surface px-6 py-8 sm:px-9 sm:py-10"}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={label} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required className={field} placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="company">
            Company
          </label>
          <input id="company" name="company" className={field} placeholder="Organisation" />
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={field}
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={field} placeholder="+971 ..." />
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="surface">
            Surface
          </label>
          <select id="surface" name="surface" className={field} defaultValue={surfaces[0]}>
            {surfaces.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className={label} htmlFor="area">
            Approximate area
          </label>
          <input id="area" name="area" className={field} placeholder="e.g. 50,000 sqft" />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <label className={label} htmlFor="message">
          What is the roof doing?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${field} resize-none`}
          placeholder="Heat build-up, leakage, cracking, cooling costs — tell us what you are seeing."
        />
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-black px-7 py-3.5 text-[13.5px] font-semibold text-white transition-colors duration-500 hover:bg-ink"
      >
        Request a Survey
        <Arrow />
      </button>
    </form>
  );
}
