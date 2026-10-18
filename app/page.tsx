import Image from "next/image";
import { LinkCard } from "./link-card";
import { links } from "./links";
import { SITE_URL, siteQrSvg } from "./qr";
import { ShareButton } from "./share-button";

export default async function Home() {
  const qrSvg = await siteQrSvg();

  return (
    <div className="relative flex min-h-dvh flex-1 items-center justify-center px-4 py-10 sm:py-12">
      <div className="fixed inset-0 -z-10" aria-hidden>
        <Image
          src="/bg.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0b2a4a]/35" />
      </div>

      <main className="relative w-full max-w-[640px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#3b6a9c]/35 px-6 pb-8 pt-16 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:px-7">
        <ShareButton url={SITE_URL} qrSvg={qrSvg} />

        <div className="flex flex-col items-center text-center text-white">
          <div className="grid size-24 place-items-center rounded-full border-2 border-white/50 bg-white/15 text-2xl font-extrabold tracking-tight shadow-inner">
            
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">
            Daeng Mamangung
          </h1>
          <span className="mt-2 rounded-full bg-white px-3 py-0.5 text-xs font-semibold text-[#2f5f95]">
            KKN-PPM UGM Periode II
          </span>
          <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-white/90">
            Siruntu Selayar - Kec. Bontosikuyu, Kab. Kepulauan Selayar,
            Sulawesi Selatan
          </p>
        </div>

        <nav className="mt-8 flex flex-col gap-3.5">
          {links.map((link) => (
            <LinkCard key={link.title} {...link} />
          ))}
        </nav>

        <footer className="mt-8 text-center text-xs text-white/75">
          KKN Daeng Mamangung · Siruntu Selayar
        </footer>
      </main>

      <aside className="fixed bottom-5 right-5 hidden flex-col items-center gap-1.5 lg:flex">
        <span className="text-[11px] font-semibold text-white drop-shadow">
          Buka di HP
        </span>
        <div
          className="size-24 rounded-xl bg-white p-2 shadow-lg shadow-black/30 [&>svg]:size-full"
          role="img"
          aria-label={`QR code ke ${SITE_URL}`}
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
      </aside>
    </div>
  );
}
