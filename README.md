# Edward Omondi — Portfolio

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![Deploy to GitHub Pages](https://github.com/EdwardOmondi/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/EdwardOmondi/portfolio/actions/workflows/deploy.yml)

Personal portfolio and blog of Edward Omondi, a full-stack Software Engineer based in Nairobi, Kenya. Built with [Nuxt 4](https://nuxt.com) and [Nuxt UI](https://ui.nuxt.com), content-driven via [Nuxt Content](https://content.nuxt.com), and deployed as a static site to GitHub Pages.

**Live site:** https://edwardomondi.github.io

## Features

- Home, About, Projects, Blog, Certifications, and CV pages, all sourced from YAML/Markdown in `content/`
- Light/dark mode throughout, built on Nuxt UI's theme-aware color tokens
- Full-text `⌘K` content search across blog posts
- SEO: auto-generated `sitemap.xml` and `robots.txt`, per-page canonical URLs and Open Graph images, a site-wide JSON-LD `Person` schema, and an `llms.txt` summary for AI crawlers
- Fully static — prerendered at build time, no server required

## Tech Stack

- [Nuxt 4](https://nuxt.com) + [Vue 3](https://vuejs.org)
- [Nuxt UI](https://ui.nuxt.com) + [Tailwind CSS v4](https://tailwindcss.com)
- [Nuxt Content](https://content.nuxt.com) for YAML/Markdown-driven pages
- [Nuxt Image](https://image.nuxt.com), [Nuxt OG Image](https://nuxtseo.com/og-image), [Nuxt Sitemap](https://nuxtseo.com/sitemap), [Nuxt Robots](https://nuxtseo.com/robots)

## Getting Started

This project uses [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:3000`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build for production (GitHub Pages preset) → `.output/public` |
| `pnpm generate` | Static site generation |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` / `pnpm lint:fix` | Lint (and fix) with ESLint |
| `pnpm typecheck` | Type-check with `nuxt typecheck` |

## Content

Page copy, projects, and blog posts live in `content/` and are validated against Zod schemas in `content.config.ts`:

```
content/
├── index.yml           # Home page (hero, about, experience, testimonials, FAQ)
├── about.yml            # About page
├── projects.yml         # Projects page hero/meta
├── projects/*.yml        # Individual project entries
├── blog.yml              # Blog index hero/meta
├── blog/*.md              # Blog posts
└── certification.yml     # Certifications & courses
```

Site-wide settings (profile picture, contact links, availability, footer) are in `app/app.config.ts`.

## Deployment

The site deploys to [`EdwardOmondi.github.io`](https://github.com/EdwardOmondi/EdwardOmondi.github.io) via [`./deploy.sh`](./deploy.sh), which builds the site and pushes `.output/public` to that repo's `main` branch. A GitHub Actions workflow (`.github/workflows/deploy.yml`) is also available to deploy directly from this repo's `main` branch to GitHub Pages.

## License

[MIT](./LICENSE)
