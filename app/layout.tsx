import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daeng Mamangung · KKN Siruntu Selayar",
  description:
    "Tautan resmi Tim KKN-PPM UGM Daeng Mamangung — Siruntu Selayar, Kab. Kepulauan Selayar.",
};

export const viewport: Viewport = {
  themeColor: "#0b2a4a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
