import type { Metadata } from "next";

import { PublicNavbar } from "@/components/layout/public-navbar";
import { Footer } from "@/components/layout/footer";
import { DarkModeProvider } from "@/providers/dark-mode-provider";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fivo - Crowdsourcing Platform",
    template: "%s | Fivo",
  },

  description:
    "Fivo connects organizations and researchers with skilled participants for events, research studies, and collaborative projects. Discover opportunities, apply, and make an impact.",
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
