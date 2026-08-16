import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const links = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/links' }),
    schema: z.object({
        title: z.string(),
        url: z.string(),
        description: z.string(),
        category: z.string().optional(),
        // 頭文字アイコンの背景色。省略時はタイトルから自動で決まる
        color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
        order: z.number(),
    }),
});

export const collections = { links };
