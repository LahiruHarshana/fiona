import { approvedPaths, getSiteOrigin, isSearchIndexingEnabled } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();

  if (!origin || !isSearchIndexingEnabled()) {
    return [];
  }

  return approvedPaths.map((path) => ({
    url: path === "/" ? origin : new URL(path, origin).toString(),
  }));
}
