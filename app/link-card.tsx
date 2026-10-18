"use client";

import { useEffect, useRef, useState } from "react";
import type { LinkItem } from "./links";

export function LinkCard({ title, href }: LinkItem) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copy() {
    if (!href) return;
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1200);
    } catch {
      setOpen(false);
    }
  }

  const label = title.toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 w-full items-center justify-center rounded-full bg-[#4a7fc1] px-14 py-4 text-center text-sm font-bold tracking-wide text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#5a8fd1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
        >
          {label}
        </a>
      ) : (
        <div
          aria-disabled="true"
          className="flex min-h-14 w-full cursor-not-allowed flex-col items-center justify-center rounded-full bg-[#4a7fc1]/60 px-14 py-3 text-center text-sm font-bold tracking-wide text-white/80 shadow-lg shadow-black/10"
        >
          {label}
          <span className="text-[11px] font-medium normal-case tracking-normal text-white/70">
            Segera hadir
          </span>
        </div>
      )}

      {href && (
        <>
          <button
            type="button"
            aria-label={`Opsi untuk ${title}`}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
          {open && (
            <div className="absolute right-2 top-full z-20 mt-2 w-44 overflow-hidden rounded-2xl bg-white py-1 text-sm text-slate-800 shadow-xl">
              <button
                type="button"
                onClick={copy}
                className="w-full px-4 py-2.5 text-left hover:bg-slate-100"
              >
                {copied ? "Tautan disalin ✓" : "Salin tautan"}
              </button>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 hover:bg-slate-100"
              >
                Buka di tab baru
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
