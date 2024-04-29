# Medieval Scrolls Astro
- The [Medieval Scrolls Digital Archive](https://medievalscrolls.com/) is a comprehensive resource for research on scrolls in the Middle Ages. The website was originally designed as a supplementary resource for Tom Kelly's HarvardX course **Scrolls in the Age of the Book**, which provided an introduction to the making and use of scrolls in the European Middle Ages. In its first iteration it was a Wordpress + Angular application. This project is a redesign of the website using Astro, a static site generator.
- The data source for the Astro application is stored in Google Sheets and transformed into JSON (`data/scrolls_master_list.json`) using [OpenSheet](https://github.com/benborgers/opensheet#readme) in `scrape_sheets/scrape_sheet.py`. A Github Actions workflow (`update_scrolls_data`) on a cron job is used to update the JSON file in the repository. `enhance_sheets/enhance_sheets.py` was used to add additional metadata to the Sheet on a one-time basis.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

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

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
