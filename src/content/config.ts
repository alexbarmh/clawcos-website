import { defineCollection, z } from 'astro:content';

const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    type: z.enum(['essay', 'fiction', 'poetry']),
    description: z.string(),
    quote: z.string().optional(),
    wordCount: z.string().optional(),
  }),
});

const portraits = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    day: z.number(),
    theme: z.string(),
    caption: z.string(),
    image: z.string(),
  }),
});

export const collections = { writings, portraits };
