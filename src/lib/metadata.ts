import type { Metadata } from "next";

export const siteConfig = {
  name: "SHAO",
  description:
    "Premium natural skincare and cosmetics powered by innovative bio-fermentation technology. Sustainable beauty that delivers real results.",
  url: "https://shao-next.vercel.app", // Update this with your actual domain
  ogImage: "/images/og-image.jpg", // You'll need to add this image
  links: {
    twitter: "https://twitter.com/shaocosmetics",
    instagram: "https://instagram.com/shaocosmetics",
    tiktok: "https://tiktok.com/@shaocosmetics",
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: "SHAO - Premium Natural Skincare & Cosmetics",
    template: "%s | SHAO Cosmetics",
  },
  description:
    "Discover SHAO's innovative bio-fermentation skincare technology. Premium natural ingredients, sustainable beauty practices, and proven results for radiant, healthy skin.",
  keywords: [
    "natural skincare",
    "bio-fermentation",
    "sustainable beauty",
    "premium cosmetics",
    "natural ingredients",
    "eco-friendly beauty",
    "skincare technology",
    "clean beauty",
    "organic skincare",
    "anti-aging",
    "hydration",
    "brightening",
    "acne treatment",
    "sensitive skin",
    "luxury skincare",
    "vegan beauty",
    "cruelty-free",
    "environmentally conscious",
    "beauty innovation",
    "skin health",
  ],
  authors: [{ name: "SHAO Cosmetics" }],
  creator: "SHAO Cosmetics",
  publisher: "SHAO Cosmetics",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "SHAO - Premium Natural Skincare & Cosmetics",
    description:
      "Discover SHAO's innovative bio-fermentation skincare technology. Premium natural ingredients, sustainable beauty practices, and proven results for radiant, healthy skin.",
    siteName: "SHAO Cosmetics",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "SHAO - Premium Natural Skincare & Cosmetics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAO - Premium Natural Skincare & Cosmetics",
    description:
      "Discover SHAO's innovative bio-fermentation skincare technology. Premium natural ingredients, sustainable beauty practices, and proven results for radiant, healthy skin.",
    images: [siteConfig.ogImage],
    creator: "@shaocosmetics",
    site: "@shaocosmetics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    yandex: "your-yandex-verification-code", // Optional: Add if you use Yandex
    yahoo: "your-yahoo-verification-code", // Optional: Add if you use Yahoo
  },
  category: "beauty",
  classification: "cosmetics",
  other: {
    "theme-color": "#FBFBFB", // Your brand color
    "color-scheme": "light",
    "msapplication-TileColor": "#FBFBFB",
    "msapplication-config": "/browserconfig.xml",
  },
  appleWebApp: {
    title: "SHAO",
    statusBarStyle: "default",
    startupImage: ["/logo.svg"],
  },
};

// Page-specific metadata
export const pageMetadata = {
  home: {
    title: "SHAO - Premium Natural Skincare & Cosmetics",
    description:
      "Discover SHAO's innovative bio-fermentation skincare technology. Premium natural ingredients, sustainable beauty practices, and proven results for radiant, healthy skin.",
    keywords: [
      "natural skincare",
      "bio-fermentation",
      "sustainable beauty",
      "premium cosmetics",
      "natural ingredients",
      "eco-friendly beauty",
      "skincare technology",
      "clean beauty",
      "organic skincare",
      "anti-aging",
      "hydration",
      "brightening",
      "acne treatment",
      "sensitive skin",
      "luxury skincare",
      "vegan beauty",
      "cruelty-free",
      "environmentally conscious",
      "beauty innovation",
      "skin health",
    ],
    openGraph: {
      title: "SHAO - Premium Natural Skincare & Cosmetics",
      description:
        "Discover SHAO's innovative bio-fermentation skincare technology. Premium natural ingredients, sustainable beauty practices, and proven results for radiant, healthy skin.",
    },
  },
  shop: {
    title: "Shop SHAO - Premium Natural Skincare Products",
    description:
      "Shop SHAO's premium natural skincare collection. From bio-fermented serums to sustainable beauty essentials, discover products that transform your skin naturally.",
    keywords: [
      "buy natural skincare",
      "shop SHAO cosmetics",
      "natural skincare products",
      "bio-fermented skincare",
      "sustainable beauty products",
      "premium skincare collection",
      "natural ingredients skincare",
      "eco-friendly beauty products",
      "clean beauty products",
      "organic skincare products",
      "anti-aging products",
      "hydration products",
      "brightening products",
      "acne treatment products",
      "sensitive skin products",
      "luxury skincare products",
      "vegan beauty products",
      "cruelty-free products",
    ],
    openGraph: {
      title: "Shop SHAO - Premium Natural Skincare Products",
      description:
        "Shop SHAO's premium natural skincare collection. From bio-fermented serums to sustainable beauty essentials, discover products that transform your skin naturally.",
    },
  },
  about: {
    title: "About SHAO - Our Story & Mission",
    description:
      "Learn about SHAO's journey in revolutionizing natural skincare through bio-fermentation technology. Discover our commitment to sustainability, innovation, and natural beauty.",
    keywords: [
      "about SHAO",
      "SHAO story",
      "SHAO mission",
      "bio-fermentation technology",
      "sustainable beauty company",
      "natural skincare innovation",
      "SHAO cosmetics history",
      "eco-conscious beauty brand",
      "natural ingredients research",
      "beauty technology innovation",
      "sustainability commitment",
      "natural beauty mission",
    ],
    openGraph: {
      title: "About SHAO - Our Story & Mission",
      description:
        "Learn about SHAO's journey in revolutionizing natural skincare through bio-fermentation technology. Discover our commitment to sustainability, innovation, and natural beauty.",
    },
  },
  product: {
    title: "Product Name - SHAO Natural Skincare",
    description:
      "Discover Product Name by SHAO. Premium natural skincare powered by bio-fermentation technology. Sustainable beauty that delivers real results.",
    keywords: [
      "natural skincare product",
      "bio-fermented skincare",
      "sustainable beauty product",
      "premium skincare",
      "natural ingredients",
      "eco-friendly beauty",
      "clean beauty product",
      "organic skincare",
      "anti-aging product",
      "hydration product",
      "brightening product",
      "acne treatment product",
      "sensitive skin product",
      "luxury skincare product",
      "vegan beauty product",
      "cruelty-free product",
    ],
    openGraph: {
      title: "Product Name - SHAO Natural Skincare",
      description:
        "Discover Product Name by SHAO. Premium natural skincare powered by bio-fermentation technology. Sustainable beauty that delivers real results.",
    },
  },
  cart: {
    title: "Shopping Cart - SHAO Cosmetics",
    description:
      "Your SHAO shopping cart. Review and checkout your selected natural skincare products.",
    keywords: [
      "shopping cart",
      "checkout",
      "SHAO cosmetics",
      "natural skincare products",
    ],
    openGraph: {
      title: "Shopping Cart - SHAO Cosmetics",
      description:
        "Your SHAO shopping cart. Review and checkout your selected natural skincare products.",
    },
    robots: {
      index: false,
      follow: false,
    },
  },
  account: {
    title: "My Account - SHAO Cosmetics",
    description:
      "Manage your SHAO account, view orders, and update your profile.",
    keywords: [
      "my account",
      "SHAO account",
      "order history",
      "profile management",
    ],
    openGraph: {
      title: "My Account - SHAO Cosmetics",
      description:
        "Manage your SHAO account, view orders, and update your profile.",
    },
    robots: {
      index: false,
      follow: false,
    },
  },
  signin: {
    title: "Sign In - SHAO Cosmetics",
    description:
      "Sign in to your SHAO account to access your orders, wishlist, and personalized recommendations.",
    keywords: ["sign in", "login", "SHAO account", "authentication"],
    openGraph: {
      title: "Sign In - SHAO Cosmetics",
      description:
        "Sign in to your SHAO account to access your orders, wishlist, and personalized recommendations.",
    },
    robots: {
      index: false,
      follow: false,
    },
  },
  signup: {
    title: "Sign Up - SHAO Cosmetics",
    description:
      "Create your SHAO account to start your natural skincare journey with personalized recommendations and exclusive offers.",
    keywords: ["sign up", "register", "create account", "SHAO membership"],
    openGraph: {
      title: "Sign Up - SHAO Cosmetics",
      description:
        "Create your SHAO account to start your natural skincare journey with personalized recommendations and exclusive offers.",
    },
    robots: {
      index: false,
      follow: false,
    },
  },
};

// Helper function to generate metadata for any page
export function generateMetadata(
  page: keyof typeof pageMetadata,
  customData?: Partial<Metadata>,
): Metadata {
  const baseMetadata = pageMetadata[page] || pageMetadata.home;

  return {
    ...defaultMetadata,
    title: baseMetadata.title,
    description: baseMetadata.description,
    keywords: baseMetadata.keywords,
    robots: (baseMetadata as any).robots || defaultMetadata.robots,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: baseMetadata.openGraph.title,
      description: baseMetadata.openGraph.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: baseMetadata.openGraph.title,
      description: baseMetadata.openGraph.description,
    },
    ...customData,
  };
}

// Helper function to generate product-specific metadata
export function generateProductMetadata(
  productName: string,
  productDescription: string,
  productImage?: string,
): Metadata {
  const keywords = Array.isArray(defaultMetadata.keywords)
    ? defaultMetadata.keywords
    : [];
  const openGraph = defaultMetadata.openGraph || {};
  const twitter = defaultMetadata.twitter || {};

  return {
    ...defaultMetadata,
    title: `${productName} - SHAO Natural Skincare`,
    description: productDescription,
    keywords: [
      ...keywords,
      productName.toLowerCase(),
      "natural skincare product",
      "bio-fermented skincare",
      "sustainable beauty product",
    ],
    openGraph: {
      ...openGraph,
      title: `${productName} - SHAO Natural Skincare`,
      description: productDescription,
      images: productImage
        ? [
            {
              url: productImage,
              width: 1200,
              height: 630,
              alt: `${productName} - SHAO Natural Skincare`,
            },
          ]
        : openGraph.images || [],
    },
    twitter: {
      ...twitter,
      title: `${productName} - SHAO Natural Skincare`,
      description: productDescription,
      images: productImage ? [productImage] : twitter.images || [],
    },
  };
}
