import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About CrowdLink",
  description: `Learn more about CrowdLink - ${siteConfig.description}`,
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
        About CrowdLink
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        CrowdLink is a crowdsourcing platform that connects organizations,
        researchers, and skilled participants. We believe in the power of
        collective intelligence to drive innovation and meaningful research.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
          <p className="text-sm text-muted-foreground">
            To democratize access to research and events by creating a seamless
            bridge between organizers and participants.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-lg font-semibold mb-2">Our Vision</h3>
          <p className="text-sm text-muted-foreground">
            A world where collaboration knows no bounds and every voice
            contributes to progress.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="text-lg font-semibold mb-2">Our Values</h3>
          <p className="text-sm text-muted-foreground">
            Transparency, inclusivity, and excellence guide everything we do.
          </p>
        </div>
      </div>
    </div>
  );
}