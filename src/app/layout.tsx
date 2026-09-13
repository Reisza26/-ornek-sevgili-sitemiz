import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ece ve Can — Bizim Hikayemiz",
  description: "Ece ve Can icin ozel ani defteri. 14 Haziran 2023’ten beri.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${serif.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#fcfaf8] antialiased text-stone-900">{children}</body>
    </html>
  );
}
