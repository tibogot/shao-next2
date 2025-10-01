import { MetadataRoute } from "next";
import { siteConfig } from "../lib/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SHAO Cosmetics",
    short_name: "SHAO",
    description:
      "Premium natural skincare and cosmetics powered by innovative bio-fermentation technology",
    start_url: "/",
    display: "standalone",
    background_color: "#FBFBFB",
    theme_color: "#FBFBFB",
    orientation: "portrait",
    scope: "/",
    lang: "en",
    categories: ["beauty", "health", "lifestyle"],
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/logo.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/logo.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/images/og-image.jpg",
        sizes: "1280x720",
        type: "image/jpeg",
        form_factor: "wide",
        label: "SHAO Homepage",
      },
      {
        src: "/images/og-image.jpg",
        sizes: "750x1334",
        type: "image/jpeg",
        form_factor: "narrow",
        label: "SHAO Mobile View",
      },
    ],
  };
}
