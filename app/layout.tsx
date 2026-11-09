import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
  verification: {
    google: "gyVaz2OoScHGNTlVrtWiGtAn6CzofalUBqScikrvwqg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1814" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <div className="page">
          <header className="site-header">
            <Link href="/" className="home">
              Sayar
            </Link>
            <Nav />
          </header>
          <main className="site-main">{children}</main>
          <footer className="site-footer">
            <a href={site.github} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
