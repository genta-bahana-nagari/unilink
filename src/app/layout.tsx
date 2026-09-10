import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { DarkModeProvider } from "@/providers/dark-mode-provider";

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
    default: "UniLink - Crowdsourcing Platform",
    template: "%s | UniLink",
  },

  description:
    "UniLink connects organizations and researchers with skilled participants for events, research studies, and collaborative projects. Discover opportunities, apply, and make an impact.",

  keywords: [
    "crowdsourcing",
    "research",
    "events",
    "volunteer",
    "opportunities",
    "collaboration",
    "crowd-sourcing",
  ],

  authors: [{ name: "UniLink Team" }],
  creator: "UniLink",
  publisher: "UniLink",

  metadataBase: new URL("https://unilink-platform.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "UniLink - Crowdsourcing Platform",

    description:
      "Connect with events, research, and collaboration opportunities tailored to your skills.",

    url: "https://unilink-platform.com",

    siteName: "UniLink",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UniLink - Crowdsourcing Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "UniLink - Crowdsourcing Platform",

    description:
      "Connect with events, research, and collaboration opportunities tailored to your skills.",

    creator: "@unilink",
    site: "@unilink",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <DarkModeProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          <PublicNavbar />

          <main id="main-content">{children}</main>

          <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}
