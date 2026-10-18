"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  url: string;
  qrSvg: string;
};

export function ShareButton({ url, qrSvg }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  async function nativeShare() {
    try {
      await navigator.share({ title: document.title, url });
    } catch {
      // user cancelled
    }
  }

  function downloadQr() {
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "qr-daeng-mamangung.svg";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const displayUrl = url.replace(/^https?:\/\//, "");
  const canShare = typeof navigator !== "undefined" && "share" in navigator;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Bagikan halaman"
        className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-black/30 text-white backdrop-blur transition hover:bg-black/45"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-[#0b2a4a]/60 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="share-title"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-[1.75rem] bg-white p-6 text-center text-slate-800 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
              <h2 id="share-title" className="text-lg font-extrabold text-[#0b2a4a]">
                Bagikan halaman
              </h2>
              <p className="mt-1 text-sm text-slate-500">Pindai QR untuk membuka di HP</p>

              <div
                className="mx-auto mt-5 w-56 rounded-2xl border border-slate-200 p-4 [&>svg]:h-auto [&>svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />

              <div className="mt-5 flex items-center gap-2 rounded-full border border-slate-200 py-1.5 pl-4 pr-1.5">
                <span className="flex-1 truncate text-left text-sm font-medium">{displayUrl}</span>
                <button
                  type="button"
                  onClick={copy}
                  className="rounded-full bg-[#4a7fc1] px-4 py-2 text-xs font-bold text-white hover:bg-[#3b6fae]"
                >
                  {copied ? "Disalin ✓" : "Salin"}
                </button>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={downloadQr}
                  className="flex-1 rounded-full border border-slate-200 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  Unduh QR
                </button>
                {canShare && (
                  <button
                    type="button"
                    onClick={nativeShare}
                    className="flex-1 rounded-full bg-[#0b2a4a] py-2.5 text-sm font-semibold text-white hover:bg-[#14395f]"
                  >
                    Bagikan…
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
