export const siteConfig = {
  name: "CrowdLink",
  description:
    "Crowdsourcing platform connecting organizations, researchers, and participants for impactful collaborations.",
  url: "https://crowdlink-platform.com",
  ogImage: "https://crowdlink-platform.com/images/og-image.jpg",
  logo: {
    light: "/images/logo-light.svg",
    dark: "/images/logo-dark.svg",
  },
  contact: {
    email: "hello@crowdlink.com",
    twitter: "@crowdlink",
    github: "https://github.com/crowdlink",
  },
  links: {
    twitter: "https://twitter.com/crowdlink",
    github: "https://github.com/crowdlink",
    linkedin: "https://linkedin.com/company/crowdlink",
    discord: "https://discord.gg/crowdlink",
  },
  navigation: [
    { label: "Events", href: "/events" },
    { label: "Research", href: "/research" },
    { label: "Announcements", href: "/announcements" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;