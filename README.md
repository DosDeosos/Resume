# Vuttipat Srisumran — Interactive Resume

Bilingual (EN/TH) resume built with Next.js 16 (App Router, webpack), React 19, TypeScript, Tailwind CSS v4 and next-intl. Every tool on the resume is demonstrated live on the page: Three.js / React Three Fiber scenes, a GLSL shader, ECharts and Recharts, React Hook Form + Zod, TanStack Query, jsPDF / ExcelJS exports, QR codes, a Driver.js tour, HeroUI + Radix components, and a Storybook toolbox.

## Requirements

- Node 24
- pnpm 12 (`corepack enable`)

## Scripts

| Script                    | What it does                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `pnpm dev`                | Next.js dev server (webpack). Syncs the Lottie WASM into `public/` first.           |
| `pnpm build`              | Lint, then production build (webpack).                                              |
| `pnpm start`              | Serve the production build.                                                         |
| `pnpm lint`               | ESLint with zero warnings allowed (SonarJS, a11y, 500-line max, complexity ≤ 15).   |
| `pnpm typecheck`          | `tsc --noEmit`.                                                                     |
| `pnpm format`             | Prettier (organize imports + Tailwind class sorting).                               |
| `pnpm test:i18n`          | Message key / placeholder parity between `messages/en.json` and `messages/th.json`. |
| `pnpm guards:test`        | No code comments in `src/`; no hard-coded user-facing strings.                      |
| `pnpm performance:budget` | Enforces `performance-budget.json` against `.next/static`.                          |
| `pnpm check`              | Everything above in order, then build and budget. CI runs this.                     |
| `pnpm e2e:smoke`          | Playwright smoke tests against `pnpm start` (or `E2E_BASE_URL`).                    |
| `pnpm storybook`          | Storybook on port 6006.                                                             |
| `pnpm storybook:embed`    | Builds Storybook into `public/storybook` so the site can link to it.                |

## Structure

```
messages/            en.json, th.json (all UI copy)
public/lottie/       Lottie icons
public/fonts/        Prompt TTF (embedded into the jsPDF export for Thai text)
src/app/             root + [locale] layouts, page, sitemap, robots, OG image
src/i18n/            next-intl routing / request / navigation
src/data/resume.ts   structured resume data (dates, links, stack categories)
src/components/      background (R3F blobs), three (orbit, shader), motion, sections, showcase, ui
src/lib/exports/     jsPDF and ExcelJS generators
src/stories/         Storybook toolbox
scripts/             guard tests, performance budget, asset sync
e2e/                 Playwright smoke tests
```

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_ORIGIN` — canonical origin for metadata and sitemap
- `NEXT_PUBLIC_STORYBOOK_URL` — where Storybook is hosted (defaults to `/storybook/index.html`)

## Docker

```
docker build -t vuttipat-resume .
docker run -p 3000:3000 vuttipat-resume
```
