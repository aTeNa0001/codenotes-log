import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 競プロ用（最小・確実）
const base = z.object({
  title: z.string(),
  tags: z.array(z.string()).default([]),
  createdAt: z.coerce.date(),
  draft: z.boolean().default(false),
});

const problems = defineCollection({
  loader: glob({ base: "./src/content/problems", pattern: ["**/*.md", "!@template.md"] }),
  schema: base.extend({
    contest: z.string().optional(),
    problem: z.string().optional(),
    difficulty: z.string().optional(),
    sourceUrl: z.string().url(),
  }),
});


const concepts = defineCollection({
  loader: glob({ base: "./src/content/concepts", pattern: "**/*.md" }),
  schema: base.extend({
    concept: z.string(),
  }),
});

const series = defineCollection({
  loader: glob({ base: "./src/content/series", pattern: "**/*.md" }),
  schema: base.extend({
    series: z.string(),
  }),
});

export const collections = { blog, problems, concepts, series };


