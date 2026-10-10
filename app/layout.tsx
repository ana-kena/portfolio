import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { person, hero } from "@/content";
import { plain } from "@/components/T";
import "./globals.css";

// One display weight, Latin subset only, self-hosted: 11 KB.
const archivo = localFont({
  src: "./fonts/archivo-narrow-latin-700-normal.woff2",
  weight: "700",
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: `${plain(person.name)}, ${person.role}`,
  description: hero.headline,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1813" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
