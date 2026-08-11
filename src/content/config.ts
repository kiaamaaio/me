import { defineCollection, z } from 'astro:content';

const links = defineCollection({
    schema: z.object({
        title: z.string(),
        url: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        category: z.string().optional(),
    }),
});

export const collections = { links };
