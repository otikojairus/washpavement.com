# washpavement.com

Commercial exterior pressure washing pSEO site for Canada — **120 pages** (5 national services × 23 cities + 5 pillars).

Design inspired by the **Jadoo** travel landing style (Volkhov + Poppins, orange CTAs, soft blobs, destination-style city cards) — separate from RV Leak Guard.

## Data

Regenerate from the Excel workbook:

```bash
python3 scripts/generate-pages.py
```

Source file: `pSEO - Canada Exterior Pressure Washing.xlsx` (path set in the script).

## Dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**If the site shows 500, a blank page, or “missing required error components”:**

1. Stop **all** running dev servers (every terminal tab running `next dev`).
2. Run a clean dev start:

```bash
npm run dev:clean
```

That deletes `.next` and starts one fresh server. Multiple stale `next dev` processes on the same project (common after big edits) will break every URL until you do this.

## Build

**Stop `npm run dev` before building** — both use the `.next` folder; building while dev is running breaks local URLs with 500 errors.

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000).

Smoke-test every route (with the server running):

```bash
npm run test:pages
# or: node scripts/check-pages.mjs http://localhost:3000
```

This project sets `output: "standalone"` for container deploys. Local preview uses `next start` as above.

## Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

Or with Docker directly:

```bash
docker build -t washpavement .
docker run -p 3000:3000 washpavement
```

Site: [http://localhost:3000](http://localhost:3000).

## Config

- Brand / phone / domain: `lib/site.ts`
- Service copy & icons: `lib/services.ts`
- SEO content: `lib/page-seo-content.ts`

## Services (national slugs)

1. `commercial-pressure-washing-services`
2. `industrial-pressure-washing`
3. `parking-lot-pressure-washing`
4. `commercial-awning-cleaning`
5. `building-exterior-pressure-washing`

## SEO

Automated content checks (word counts, orphans, duplicate titles/H1/intros):

```bash
npm run seo:audit
```

### Pre-launch checklist

- [ ] Unique title (50–60 chars) + meta (150–160 chars) on every page — generated in `lib/page-seo-content.ts`
- [ ] One H1 per page (keyword + location) — `SeoServicePage` / homepage
- [ ] Self-referencing canonical — `app/[slug]/page.tsx`, homepage metadata
- [ ] All pages in `app/sitemap.ts`, none noindexed, `app/robots.ts` allows crawl
- [ ] Schema: `JsonLdBreadcrumbs`, `JsonLdFaq`, `JsonLdLocalService` on city pages — validate in [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Zero orphan pages — `seo:audit` inbound link simulation
- [ ] FAQPage schema on FAQ sections
- [ ] Service images: descriptive `alt`, hero `priority`, cards lazy via Next `Image`
- [ ] Phone CTAs: `tel:` links, min 48×48px touch targets (`.hero-call`, `.side-call`)
- [ ] PageSpeed ≥ 70 mobile per template — run Lighthouse on `/` and one city URL
- [ ] Breadcrumbs match slug structure — `breadcrumbItems()`

Internal linking: pillars → all city pages; city pages → pillar + other services in city + hub slug; homepage → pillars and featured cities.
