import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { plainTextPlugin } from "@barnabask/astro-minisearch";
import sitemap from '@astrojs/sitemap';
// import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    // integrations: [mdx(), sitemap()],
    site: "https://medievalscrolls.com",
    integrations: [mdx(), sitemap()],
    markdown: {
      rehypePlugins: [plainTextPlugin()],
      extendDefaultPlugins: true,
    },
    // output: "server",
    // adapter: node({
    //   mode: "standalone"
    // })
});
