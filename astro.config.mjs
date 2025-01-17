import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
    site: "https://medievalscrolls.com",
    base: process.env.BASE_PATH || "/",
    integrations: [mdx(), sitemap(), pagefind()],
});