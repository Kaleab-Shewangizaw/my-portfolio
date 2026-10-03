import type { MetadataRoute } from "next";
import { projects, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/contact", "/testimonials"].map((p) => ({
    url: site.url + p,
    lastModified: new Date(),
    priority: p === "" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified: new Date(), priority: 0.7 }));
  return [...pages, ...work];
}
