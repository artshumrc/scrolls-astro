import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from "astro-pagefind";
import orama from "@orama/plugin-astro";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    site: "https://medievalscrolls.com",
    base: "/",
    integrations: [mdx(), sitemap(), pagefind(), orama({
        // We can generate more than one DB, with different configurations
        scrolls: {
          pathMatcher: /scrolls\/.+$/,
          language: "english",
          contentSelectors: ["main"],
        },
      }), vue()],
});