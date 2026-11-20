import { brand, contact, siteCopy } from "@/lib/site";
import { villaImages } from "@/lib/villaMedia";
import type { Metadata } from "next";

export const approvedPaths = [
  "/",
  "/apartments",
  "/experiences",
  "/explore-galle",
  "/gallery",
  "/about",
  "/contact",
] as const;

export type ApprovedPath = (typeof approvedPaths)[number];

export const socialShareImage = {
  src: villaImages.outdoor[0],
  alt: "Tropical garden and veranda at Fiona Green Serenity",
  width: 1600,
  height: 1067,
} as const;

export const seoPages = {
  home: {
    path: "/" as const,
    title: "Fiona Green Serenity | Stay Near Dalawella Beach, Galle",
    description: siteCopy.defaultDescription,
  },
  apartments: {
    path: "/apartments" as const,
    title: "Holiday Apartments in Galle | Fiona Green Serenity",
    description:
      "Stay in the A/C Luxury Green Garden Apartment or the Scenic Balcony 2-Bed Suite at Fiona Green Serenity in Mihiripenna, Thalpe, Galle. Enquire directly — this website does not take instant bookings.",
  },
  experiences: {
    path: "/experiences" as const,
    title: "Experiences Near Unawatuna & Galle | Fiona",
    description:
      "Garden living, balcony time and nearby coastal visits from Fiona Green Serenity near Unawatuna and Galle. Independent activities are arranged locally; Fiona does not operate tours.",
  },
  exploreGalle: {
    path: "/explore-galle" as const,
    title: "Best Places to Visit in Galle | Fiona Green Serenity",
    description:
      "Discover beaches, heritage, nature and independent coastal activities around Galle from Fiona Green Serenity in Mihiripenna, Thalpe. A peaceful apartment base for exploring Southern Sri Lanka.",
  },
  gallery: {
    path: "/gallery" as const,
    title: "Fiona Green Serenity Villa Gallery",
    description:
      "Browse genuine photographs of Fiona Green Serenity in Mihiripenna, Thalpe — tropical garden, apartments, kitchens, balcony and guest details.",
  },
  about: {
    path: "/about" as const,
    title: "About Fiona Green Serenity | Galle, Sri Lanka",
    description:
      "Learn about Fiona Green Serenity in Mihiripenna, Thalpe, Galle — a peaceful tropical retreat with two apartment stays and personal Sri Lankan hospitality.",
  },
  contact: {
    path: "/contact" as const,
    title: "Contact & Book Fiona Green Serenity | Galle",
    description:
      "Send a WhatsApp booking request to Fiona Green Serenity in Mihiripenna, Thalpe, Galle, or contact us by email or telephone. This is not instant online booking; the host confirms availability personally.",
  },
} as const;

export type SeoPageKey = keyof typeof seoPages;

const PLATFORM_PREVIEW_SUFFIXES = [
  ".vercel.app",
  ".netlify.app",
  ".netlify.com",
  ".pages.dev",
  ".herokuapp.com",
  ".railway.app",
  ".onrender.com",
] as const;

function isLoopbackOrPrivateIpv4(host: string) {
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);

  if (!match) {
    return false;
  }

  const octets = match.slice(1).map(Number);

  if (octets.some((octet) => octet > 255)) {
    return false;
  }

  const [a, b] = octets;

  if (a === 0 || a === 10 || a === 127) {
    return true;
  }

  if (a === 169 && b === 254) {
    return true;
  }

  if (a === 172 && b >= 16 && b <= 31) {
    return true;
  }

  if (a === 192 && b === 168) {
    return true;
  }

  return false;
}

function isRejectedHostname(host: string) {
  if (
    host === "localhost" ||
    host === "::1" ||
    host === "[::1]" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return true;
  }

  if (isLoopbackOrPrivateIpv4(host)) {
    return true;
  }

  return PLATFORM_PREVIEW_SUFFIXES.some((suffix) => host.endsWith(suffix));
}

/**
 * Sanitized HTTPS origin from NEXT_PUBLIC_SITE_URL.
 * A value here is not proof of domain ownership. Trailing slashes are stripped via `url.origin`.
 * HTTP, localhost, private IPs and common preview hosts are rejected.
 */
export function getSiteOrigin(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    return undefined;
  }

  try {
    const url = new URL(raw);

    if (url.protocol !== "https:") {
      return undefined;
    }

    if (url.username || url.password) {
      return undefined;
    }

    const host = url.hostname.toLowerCase();

    if (!host || isRejectedHostname(host)) {
      return undefined;
    }

    return url.origin;
  } catch {
    return undefined;
  }
}

/**
 * Indexing is off unless a sanitized HTTPS origin exists AND this is a production
 * deployment. A URL in env is not owner approval.
 *
 * - Vercel preview/dev: always noindex (`VERCEL_ENV` not `production`).
 * - Vercel production: index when origin is valid.
 * - Non-Vercel: require server-only `SEARCH_INDEXING_ENABLED=true` (never NEXT_PUBLIC_).
 */
export function isSearchIndexingEnabled(): boolean {
  if (!getSiteOrigin()) {
    return false;
  }

  const vercelEnv = process.env.VERCEL_ENV?.trim();

  if (vercelEnv && vercelEnv !== "production") {
    return false;
  }

  if (vercelEnv === "production") {
    return true;
  }

  return process.env.SEARCH_INDEXING_ENABLED === "true";
}

export function pageMetadata(key: SeoPageKey): Metadata {
  const page = seoPages[key];
  const origin = getSiteOrigin();
  const canonical = origin ? new URL(page.path, origin).toString() : undefined;
  const imageUrl = origin ? new URL(socialShareImage.src, origin).toString() : undefined;

  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: "en_LK",
      title: page.title,
      description: page.description,
      url: canonical,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: socialShareImage.alt,
              width: socialShareImage.width,
              height: socialShareImage.height,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: page.title,
      description: page.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: isSearchIndexingEnabled()
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true },
  };
}

export function lodgingBusinessJsonLd(): Record<string, unknown> {
  const origin = getSiteOrigin();

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: brand.name,
    description: siteCopy.defaultDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mihiripenna",
      addressRegion: "Thalpe, Galle",
      addressCountry: "LK",
    },
    telephone: contact.phoneE164,
    email: contact.email,
    sameAs: [contact.instagram, contact.facebook],
  };

  if (origin) {
    data.url = origin;
    data.image = new URL(socialShareImage.src, origin).toString();
  }

  return data;
}
