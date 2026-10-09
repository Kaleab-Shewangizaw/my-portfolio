import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getProjects } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/work", "/about", "/contact", "/testimonials"].map((p) => ({
    url: site.url + p,
    lastModified: new Date(),
    priority: p === "" ? 1 : 0.8,
  }));
  const work = (await getProjects()).map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified: new Date(), priority: 0.7 }));
  return [...pages, ...work];
}
