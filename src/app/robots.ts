import { MetadataRoute } from "next";
import { siteConfig } from "../lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart",
          "/account",
          "/api/",
          "/auth/",
          "/_next/",
          "/admin/",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
