import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const links = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/links' }),
    schema: z.object({
        title: z.string(),
        url: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        category: z.string().optional(),
    }),
});

export const collections = { links };
