import { defineConfig } from 'astro/config';
import { plainTextPlugin } from "@barnabask/astro-minisearch";

// https://astro.build/config
export default defineConfig({
    // integrations: [mdx(), sitemap()],
    markdown: {
        rehypePlugins: [plainTextPlugin()]
    },
});
