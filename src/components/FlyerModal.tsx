"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { lockScroll, unlockScroll } from "./SmoothScroll";
import type { Product } from "@/lib/data";

/** Share caption per product, drawn from the catalogue's own figures. */
const CAPTION: Record<string, string> = {
  "heatplug-containers":
    "HEAT PLUG for metal containers — a nanotechnology ceramic composite that cut a 10-ft container roof from 70.7°C to 46.3°C, and the ceiling below it from 46.1°C to 30.8°C.",
  "heatplug-metal":
    "HEAT PLUG for all metal surfaces — thermal coating built for the 63°C to 79°C surface band observed across the UAE. Roof reductions of 24°C to 30°C.",
  "heatplug-concrete":
    "HEAT PLUG for cemented surfaces — reduces concrete surface temperature by up to 24°C, crack resistant and anti-fungal. For rooftops and walls.",
  aquaplug:
    "AQUAPLUG — nanotechnology waterproofing that travels with water into the crack and seals it from within. Proven 20 years; leakage stops in 8 hours.",
  surfaklean:
    "SURFAKLEAN — eco-friendly surface cleaning and preparation compound. Removes micro dust and loose mortar without damaging reinforcement.",
  coolg:
    "COOL G — thermal coating for glass of all types, blocking ultraviolet and infrared radiations. Coming soon from Webberbiz.",
};

type Share = { id: string; label: string; href: (url: string, text: string) => string };

const SHARES: Share[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: (u, t) => `https://wa.me/?text=${encodeURIComponent(`${t}\n\n${u}`)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
  },
  {
    id: "x",
    label: "X",
    href: (u, t) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    href: (u, t) =>
      `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
  {
    id: "email",
    label: "Email",
    href: (u, t) =>
      `mailto:?subject=${encodeURIComponent("Webberbiz product flyer")}&body=${encodeURIComponent(`${t}\n\n${u}`)}`,
  },
];

const ICONS: Record<string, string> = {
  whatsapp:
    "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.1 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1a12 12 0 0 1-5.9-5.2c-.4-.7-.9-1.6-.9-2.5 0-.9.5-1.3.7-1.5.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.3.4c-.1.1-.2.3-.1.5.4.7 1 1.4 1.7 1.9.3.2.5.2.7 0l.5-.6c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3v.6Z",
  linkedin:
    "M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C21.4 8.65 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21h-4V9Z",
  x: "M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1-5.8 6.1H1.5l7.5-8.6L1.2 3h6.6l4.5 5.6L17.5 3Z",
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z",
  telegram:
    "M21.9 4.3 18.7 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.2 13.1 1.4 11.6c-1-.3-1-1 .2-1.5l19-7.3c.9-.3 1.6.2 1.3 1.5Z",
  email: "M3 5h18v14H3V5Zm2 2v.4l7 4.4 7-4.4V7H5Zm14 10V9.9l-6.5 4a1 1 0 0 1-1 0L5 9.9V17h14Z",
};

function FlyerModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const isOpen = !!product;

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [isOpen, onClose]);

  useEffect(() => setCopied(false), [product]);

  const shareUrl =
    typeof window !== "undefined" && product
      ? `${window.location.origin}/flyers/${product.slug}-full.png`
      : "";
  const caption = product ? (CAPTION[product.slug] ?? product.blurb) : "";

  const copyCaption = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${caption}\n\n${shareUrl}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  }, [caption, shareUrl]);

  const nativeShare = useCallback(async () => {
    if (!navigator.share || !product) return;
    try {
      await navigator.share({ title: `${product.name} — flyer`, text: caption, url: shareUrl });
    } catch {
      /* dismissed */
    }
  }, [caption, shareUrl, product]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[110] transition-opacity duration-500 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink-strong/45 backdrop-blur-sm"
      />

      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={product ? `${product.name} flyer` : "Flyer"}
          className={`relative flex max-h-[94svh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-[0_40px_120px_-30px_rgba(35,26,20,0.4)] transition-all duration-600 ease-out-expo ${
            isOpen ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"
          }`}
        >
          {/* Head */}
          <div className="flex shrink-0 items-start justify-between gap-5 border-b border-line px-6 py-5 sm:px-8">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
                Product flyer
              </span>
              <h2 className="display mt-2 text-[clamp(1.3rem,2.4vw,1.7rem)] leading-tight">
                {product?.name}
              </h2>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                {product?.category}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              tabIndex={isOpen ? 0 : -1}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-strong transition-colors hover:border-ink/40 hover:bg-surface"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          </div>

          {/* Body — the whole flyer is fitted into view; only the side panel scrolls */}
          <div className="grid min-h-0 flex-1 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex min-h-0 items-center justify-center bg-surface p-4 sm:p-6">
              {product && (
                <Image
                  src={`/flyers/${product.slug}.webp`}
                  alt={`${product.name} flyer`}
                  width={1400}
                  height={1964}
                  /* Letterboxed to whatever room the panel has, so the full
                     flyer is readable end to end without scrolling. */
                  className="h-auto max-h-[58svh] w-auto max-w-full rounded-xl border border-line object-contain shadow-sm lg:max-h-[74svh]"
                />
              )}
            </div>

            <div className="min-h-0 overflow-y-auto overscroll-contain border-t border-line px-6 py-6 sm:px-8 lg:border-l lg:border-t-0">
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
                Caption
              </span>
              <p className="mt-3 text-[13.5px] leading-[1.7] text-body">{caption}</p>

              <button
                type="button"
                onClick={copyCaption}
                tabIndex={isOpen ? 0 : -1}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[12px] font-medium text-ink-strong transition-colors hover:border-ink/40 hover:bg-surface"
              >
                {copied ? "Caption copied" : "Copy caption + link"}
              </button>

              <div className="mt-8">
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-faint">
                  Share
                </span>
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  {SHARES.map((s) => (
                    <a
                      key={s.id}
                      href={s.href(shareUrl, caption)}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isOpen ? 0 : -1}
                      className="group flex flex-col items-center gap-2 rounded-xl border border-line px-2 py-3 transition-all duration-400 hover:-translate-y-0.5 hover:border-ink/30 hover:bg-surface"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink" fill="currentColor" aria-hidden>
                        <path d={ICONS[s.id]} />
                      </svg>
                      <span className="text-[10.5px] text-body">{s.label}</span>
                    </a>
                  ))}
                </div>

                {/* Phones can hand the file to the OS share sheet */}
                <button
                  type="button"
                  onClick={nativeShare}
                  tabIndex={isOpen ? 0 : -1}
                  className="mt-3 hidden w-full items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-[12px] font-medium text-ink-strong max-lg:inline-flex"
                >
                  More sharing options
                </button>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <a
                  href={product ? `/flyers/${product.slug}-full.png` : "#"}
                  download
                  tabIndex={isOpen ? 0 : -1}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent-soft px-6 py-3.5 text-[13.5px] font-semibold text-white transition-colors duration-500 hover:bg-ink"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 20h16" />
                  </svg>
                  Download flyer
                </a>
                <p className="mt-3 text-center text-[10.5px] text-faint">
                  Full resolution PNG
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ------------------------------------------------------- provider + button */

const FlyerCtx = createContext<(p: Product) => void>(() => {});

/** Wraps the product list so any card can raise the flyer. */
export function FlyerProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Product | null>(null);
  const show = useCallback((p: Product) => setActive(p), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <FlyerCtx.Provider value={show}>
      {children}
      <FlyerModal product={active} onClose={close} />
    </FlyerCtx.Provider>
  );
}

export function FlyerButton({ product }: { product: Product }) {
  const show = useContext(FlyerCtx);
  return (
    <button
      type="button"
      onClick={() => show(product)}
      className="group inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3 text-[13px] font-semibold text-ink-strong transition-all duration-500 ease-out-expo hover:border-ink/45 hover:bg-surface"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 2h9l5 5v15H6V2Zm9 0v5h5M9 12h6M9 16h6" />
      </svg>
      Show flyer
    </button>
  );
}
