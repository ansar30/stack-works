import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stackworks.dev";

  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
