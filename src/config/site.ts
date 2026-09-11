export const siteConfig = {
  name: "Fivo",
  description:
    "Crowdsourcing platform connecting organizations, researchers, and participants for impactful collaborations.",
  url: "https://unilink-platform.com",
  ogImage: "https://unilink-platform.com/images/og-image.jpg",
  logo: {
    light: "/images/logo-light.svg",
    dark: "/images/logo-dark.svg",
  },
  contact: {
    email: "hello@unilink.com",
    twitter: "@unilink",
    github: "https://github.com/unilink",
  },
  links: {
    twitter: "https://twitter.com/unilink",
    github: "https://github.com/unilink",
    linkedin: "https://linkedin.com/company/unilink",
    discord: "https://discord.gg/unilink",
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
