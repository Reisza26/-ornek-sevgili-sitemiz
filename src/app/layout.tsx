import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bizim Hikayemiz — Anı & Aşk Defteri",
  description: "Çiftler için özel anı defteri, gün sayacı, mektuplar ve ortak takvim. Demo: Sevgili Sitesi",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#fff7f9] antialiased selection:bg-rose-200 selection:text-rose-900">
        {children}
      </body>
    </html>
  );
}
