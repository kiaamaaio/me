
import { defineConfig } from 'astro/config';

export default defineConfig({
    output: 'static',
    site: 'https://roguesch.net',
    server: {
        host: true,
        port: 3000
    }
});