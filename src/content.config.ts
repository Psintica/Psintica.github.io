import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const initiativesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/initiatives' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    leader: z.string(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['active', 'completed']).default('active'),
    order: z.number().default(99),
  }),
});

const teamCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string().default('/images/team/placeholder.png'),
    social: z.object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      twitter: z.string().url().optional(),
      scholar: z.string().url().optional(),
      email: z.string().email().optional(),
    }).optional(),
    order: z.number().default(99),
  }),
});

const publicationsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    journal: z.string(),
    year: z.number(),
    status: z.enum(['published', 'preprint', 'under-review']).default('published'),
    url: z.string().url().optional(),
    doi: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

export const collections = {
  initiatives: initiativesCollection,
  team: teamCollection,
  publications: publicationsCollection,
};
