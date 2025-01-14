# Medieval Scrolls Astro
The [Medieval Scrolls Digital Archive](https://medievalscrolls.com/) is a comprehensive resource for research on scrolls in the Middle Ages. The website was originally designed as a supplementary resource for Tom Kelly's HarvardX course **Scrolls in the Age of the Book**, which provided an introduction to the making and use of scrolls in the European Middle Ages. In its first iteration it was a Wordpress + Angular application. This project is a redesign of the website using Astro, a static site generator.

## Data
- Data was migrated from Wordpress to Astro using `wordpress-export-to-markdown` (see `/migration` folder for details).
- The data source for the Astro application is stored in Google Sheets and transformed into JSON (`data/scrolls_master_list.json`) using [OpenSheet](https://github.com/benborgers/opensheet#readme) in `scrape_sheets/scrape_sheet.py`. A Github Actions workflow (`update_scrolls_data`) on a cron job is used to update the JSON file in the repository. `enhance_sheets/enhance_sheets.py` was used to add additional metadata to the Sheet on a one-time basis.

## Search
- Running `npm run build` will rebuild the Pagefind index. [`pagefind`](https://pagefind.app/) is a CloudCannon package used for static search functionality. We are currently using their Default UI, which has some limitations, such as not being able to have a `null` search (so there are no results until the user starts typing). ~~We will eventually move to using their Modular UI, but it is still in beta and presented other challenges as of June 2024.~~ We will move to using a custom Vue library developed by DARTH to wrap a Pagefind index in the future.

## CMS
- The CMS is built with [Decap CMS](https://decapcms.org/), formerly known as Netlify CMS. It's a single-page app that runs in the browser and is served from the `public/admin` directory.
- The CMS is configured in `public/admin/config.yml`.
### Running the CMS locally
  - `npm install`
  - `npx decap-server`. This runs a local Express server that serves the CMS on port `8081`.
  - `npm run build && npm run preview`. This builds the site and Pagefind index and serve it on `localhost:4321`.
### Running the CMS in production
- To be added.

## 🚀 Project Structure

- The Astro app is in `src`.
- Astro components (or Vue, React, Svelte, etc - Astro can wrap any of them) live in `src/components`.
- We are using Typescript; the type definitions are in `src/types`.
- Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name. `scrolls` has an index page (for the search) and a dynamic route for each scroll at `[...slug].astro`.
- Any static assets, like images, can be placed in the `public/` directory.
- The built application is output to the `dist/` directory.

```text
/
├── .astro
├── .git
├── .github/workflows
├── dist/
├── enhance_sheets/
├── migration/wordpress-export-to-markdown
├── public/
│   └── favicon.svg
├── scrape_sheets
├── src/
│   ├── components/
│   │   └── Footer.astro
│   │   └── Header.astro ...
│   ├── data/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   │   └── PageLayout.astro
│   │   └── ScrollLayout.astro
│   └── pages/
│   │   └── scrolls/
│   │       └── [...slug].astro
│   │       └── index.astro
│   │   └── bibliography.astro
│   │   └── houghton-library.astro
│   │   └── index.astro
│   │   └── intro.astro
│   └── styles/
│   └── types/
│   │   └── Scroll.d.ts
│   └── consts.ts
│   └── env.d.ts
└── .gitignore
└── .nojekyll
└── .nvmrc
└── .astro.config.mjs
└── package.json
└── package-lock.json
└── README.md
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |