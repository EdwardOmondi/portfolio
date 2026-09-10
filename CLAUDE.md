# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Edward Omondi's personal portfolio: a Nuxt 4 + Nuxt UI 4 static site, forked from the
`nuxt-ui-templates/portfolio` template (README.md is still the upstream template's).
It is prerendered and deployed to GitHub Pages.

## Commands

Package manager is **pnpm** (`packageManager` field + CI). `deploy.sh` uses npm — leave it alone
unless changing deployment.

```bash
pnpm dev              # dev server on http://localhost:3000
pnpm lint             # eslint (CI runs this)
pnpm lint:fix
pnpm typecheck        # nuxt typecheck / vue-tsc (CI runs this)
pnpm build            # nuxt build --preset github_pages -> .output/public
pnpm preview
```

There is no test suite. CI (`.github/workflows/ci.yml`) runs lint + typecheck only, on every push.

## Deployment

Two independent paths exist:

- `.github/workflows/deploy.yml` — builds and publishes to GitHub Pages on push to `main`.
- `./deploy.sh` — manual: builds, clones `EdwardOmondi.github.io`, replaces its contents with
  `.output/public`, commits and pushes to that repo's `main`. This is the path actually used.

Note the branch layout: the default branch here is `master`, active development is on `v3`, and the
Pages workflow only fires on `main`. `.env.example` documents `NUXT_PUBLIC_SITE_URL` (needed for OG
image generation during `generate`) and `NUXT_APP_BASE_URL`.

## Architecture

**Content-driven.** Almost nothing is hardcoded in components — page copy lives in `content/` and is
validated by Zod schemas in `content.config.ts`. Adding or changing a field means editing the schema
there *and* the YAML/Markdown, or the build fails.

Collections (`content.config.ts`):

| Collection | Source | Rendered by |
|---|---|---|
| `index` | `content/index.yml` | `app/pages/index.vue` + `app/components/landing/*` |
| `pages` | `content/projects.yml`, `content/blog.yml` | hero/meta for the projects & blog list pages |
| `projects` | `content/projects/*.yml` (data) | `app/pages/projects.vue` |
| `blog` | `content/blog/*.md` (page) | `app/pages/blog/index.vue`, `blog/[...slug].vue` |
| `certification` | `content/certification.yml` | `app/pages/certification.vue` |
| `about` | `content/about.yml` | `app/pages/about.vue` |

**Standard page shape.** Every page follows the same pattern: `useAsyncData` +
`queryCollection(...)`, `throw createError({ statusCode: 404, ..., fatal: true })` when empty, then
`useSeoMeta` sourced from `page.seo?.* || page.*`. Copy this pattern for new pages.

**Chrome.** `app/app.vue` wraps everything in `UApp` + `NuxtLayout` and mounts the `meta_k` content
search (`LazyUContentSearch`). `app/layouts/default.vue` is the only layout: container + `AppHeader`
+ slot + `AppFooter`. Navigation is a single source of truth in `app/utils/links.ts` (`navLinks`),
consumed by both the header and the search palette — add new routes there.

**Site-wide settings** live in `app/app.config.ts`: the `global` block (profile picture, email,
`meetingLink`, availability flag) is read by pages via `useAppConfig()`, plus Nuxt UI color tokens
and footer links.

**Styling.** Tailwind v4 configured through CSS, not JS: `app/assets/css/main.css` holds the
`@theme` block, `--ui-container`, and `@source "../../../content/**/*"` so classes written in
content YAML survive purging. The root `tailwind.config.js` is a leftover from an Angular project
(`content: ['./src/**/*']`) and is **not** used by this build — don't add theme changes there.

**Static rendering.** `nuxt.config.ts` prerenders `/` with `crawlLinks: true`, so every page must be
reachable by a crawlable link from the homepage or it won't be in the build output.

`app/pages/cv.vue` is a thin wrapper around `app/components/EdwardOmondiCV.vue`, a hand-written
(non-content-driven) CV layout — the one deliberate exception to the content-collection rule.

## Conventions

ESLint uses the Nuxt stylistic config with `commaDangle: 'never'` and `braceStyle: '1tbs'`; icons are
Iconify classes (`i-lucide-*`, `i-simple-icons-*`) from the installed `@iconify-json` packages.
