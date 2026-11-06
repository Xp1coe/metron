import type { Metadata } from "next";
import { integrationCatalog } from "@/data/integrations";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);
export const categoryCount = new Set(
  integrationCatalog.flatMap((item) => item.categories),
).size;
export const siteTitle = "Case Snapshots | Metron Security Integrations";
export const siteDescription = `Explore ${integrationCatalog.length} security and ITOps platforms across ${categoryCount} categories in Metron Security's integration catalog. Search platforms and filter by category.`;

// App Router's server-rendered head management replaces React Helmet.
export const siteMetadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Metron Security",
    title: siteTitle,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export const integrationStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Metron Security integration platform catalog",
  numberOfItems: integrationCatalog.length,
  itemListElement: integrationCatalog.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.platform,
    description: `${item.platform} is listed under ${item.categories.join(" and ")} in the platform catalog.`,
    image: {
      "@type": "ImageObject",
      url: new URL(item.image.src, siteUrl).toString(),
      caption: item.image.alt,
    },
  })),
};
