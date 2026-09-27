export interface Principle {
  title: string;
  subtitle: string;
  description: string;
}

export const principles: Principle[] = [
  {
    title: "Business-first",
    subtitle: "Technology serves the problem.",
    description: "We don't over-engineer or chase technology trends. Every architectural decision is driven by real business utility, maintainability, and return on investment.",
  },
  {
    title: "End-to-end",
    subtitle: "From architecture to deployment.",
    description: "We handle the complete product cycle—from initial data schema design and API integration to responsive frontend UI, cloud hosting, and production monitoring.",
  },
  {
    title: "Production-minded",
    subtitle: "Security, reliability and maintainability matter.",
    description: "We build software meant to last. Strict TypeScript typing, server-side validation, clean error boundaries, and scalable data models come standard.",
  },
  {
    title: "Clear communication",
    subtitle: "No black-box development.",
    description: "You deal directly with senior engineering expertise. Expect structured updates, staging previews, transparent progress, and clear technical trade-offs.",
  },
];
