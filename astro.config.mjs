import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
    site: "https://artshumrc.github.io",
    base: "/scrolls-astro",
    integrations: [mdx(), sitemap(), pagefind()],
});
