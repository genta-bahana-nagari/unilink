import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/organizer", "/participant", "/auth"],
      },
    ],
    sitemap: "https://unilink-platform.com/sitemap.xml",
  };
}
