import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CrowdLink - Crowdsourcing Platform",
    template: "%s | CrowdLink",
  },
  description:
    "CrowdLink connects organizations and researchers with skilled participants for events, research studies, and collaborative projects. Discover opportunities, apply, and make an impact.",
  keywords: [
    "crowdsourcing",
    "research",
    "events",
    "volunteer",
    "opportunities",
    "collaboration",
    "crowd-sourcing",
  ],
  authors: [{ name: "CrowdLink Team" }],
  creator: "CrowdLink",
  publisher: "CrowdLink",
  metadataBase: new URL("https://crowdlink-platform.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CrowdLink - Crowdsourcing Platform",
    description:
      "Connect with events, research, and collaboration opportunities tailored to your skills.",
    url: "https://crowdlink-platform.com",
    siteName: "CrowdLink",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CrowdLink - Crowdsourcing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrowdLink - Crowdsourcing Platform",
    description:
      "Connect with events, research, and collaboration opportunities tailored to your skills.",
    creator: "@crowdlink",
    site: "@crowdlink",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        "h-full scroll-smooth antialiased"
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <PublicNavbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}