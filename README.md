# naples-vacation-planner
```markdown# Naples Vacation Planner — Enterprise Build Spec (Next.js + MDX + SEO + Affiliate)**Domain:** https://naplesvacationplanner.com **Registrar/DNS:** Hostinger (default nameservers) **Hosting:** Vercel (Next.js) **Business Model:** Affiliate (tours, hotels, car rentals, add-ons) **Geography:** Naples, Florida (with optional Southwest Florida expansion: Marco Island, Bonita Springs, Everglades City/Chokoloskee)
---
## 0) Executive Summary (What This Builds)Naples Vacation Planner is an SEO-first travel planning website designed to rank for high-intent queries like:
- “Naples Florida 3 day itinerary”- “Where to stay in Naples FL”- “Naples vs Marco Island”- “Everglades day trip from Naples”- “Best time to visit Naples Florida month by month”
It monetizes primarily via affiliate links and focuses on:- Itinerary pages (2/3/5/7 days)- Where-to-stay neighborhood guides- Day trips (Marco Island, Everglades City, Ten Thousand Islands)- Planning logistics (best time to visit, rainy day, do you need a car, beach parking)
**Core differentiation:** We do NOT compete with giant list sites by publishing generic “Top 25 Things To Do.” We win with itinerary-first content, Naples-specific logistics, trust signals (E-E-A-T), and fast performance.
---
## 1) Non-Negotiable Requirements (Enterprise Standards)### Technical- Next.js App Router + TypeScript + Tailwind- Static-first rendering (SSG) for content pages- MDX content stored in repo (`/content`) and validated by Zod at build time- Dynamic routes prebuilt via `generateStaticParams()`- Sitemap + robots implemented- Canonical URLs correct (no www vs non-www duplication)- Minimal JS; excellent Core Web Vitals
### SEO + Content- Strong internal linking (hub-and-spoke)- Every itinerary includes: quick summary, day-by-day plan, “book ahead” section, FAQs, internal links- Schema: Organization, WebSite, Article, BreadcrumbList, FAQPage (when FAQs exist)
### Affiliate Compliance- Site-wide affiliate disclosure page + per-page disclosure near top- Every affiliate link uses: `rel="sponsored nofollow noopener noreferrer"`- No misleading language (“official” unless official)- No unauthorized price scraping
### Naples-Specific Accuracy- Avoid false claims about hours/fees; when stating specifics, cite official sources where possible- Seasonality reflected in content (peak Jan–Apr; hurricane season Jun–Nov; shoulder Nov–Dec & May)
---
## 2) Key Business KPIs (What “Success” Looks Like)### SEO KPIs- Indexed pages count (Google Search Console)- Top 10 rankings for itinerary + where-to-stay long-tail keywords- Organic sessions growth (especially Oct–Apr)
### Monetization KPIs- Outbound affiliate CTR (clicks per 1,000 sessions)- Affiliate EPC (earnings per click)- Email capture rate (lead magnets like “Naples 3-Day Itinerary PDF”)
### Trust/Quality KPIs- “Last updated” visible on every guide- Low bounce rate on itinerary pages- Strong time on page and scroll depth
---
## 3) Tech Stack### Core- Node.js 20 LTS- Next.js (App Router)- React- TypeScript- Tailwind CSS + Typography plugin- MDX rendering: `next-mdx-remote` (RSC mode)- Frontmatter parsing: `gray-matter`- Frontmatter validation: `zod`- Reading time: `reading-time`
### SEO utilities (recommended)- `rehype-slug`- `rehype-autolink-headings`- `remark-gfm`
### Optional (recommended later)- Sentry (error tracking)- Microsoft Clarity (UX insights)- Consent banner library (if targeting EU/UK visitors)
---
## 4) Repository Structure (Required)```.├─ app/│ ├─ (site)/│ │ ├─ layout.tsx│ │ ├─ page.tsx│ │ ├─ itineraries/│ │ │ ├─ page.tsx│ │ │ └─ [slug]/page.tsx│ │ ├─ where-to-stay/│ │ │ ├─ page.tsx│ │ │ └─ [slug]/page.tsx│ │ ├─ day-trips/│ │ │ ├─ page.tsx│ │ │ └─ [slug]/page.tsx│ │ ├─ travel-tips/│ │ │ ├─ page.tsx│ │ │ └─ [slug]/page.tsx│ │ ├─ maps/│ │ │ ├─ page.tsx│ │ │ └─ [slug]/page.tsx│ │ ├─ about/page.tsx│ │ ├─ contact/page.tsx│ │ ├─ privacy/page.tsx│ │ ├─ terms/page.tsx│ │ └─ affiliate-disclosure/page.tsx│ ├─ sitemap.ts│ └─ robots.ts├─ content/│ ├─ itineraries/*.mdx│ ├─ where-to-stay/*.mdx│ ├─ day-trips/*.mdx│ ├─ travel-tips/*.mdx│ └─ maps/*.mdx├─ public/│ ├─ images/│ ├─ og/│ └─ favicon.ico├─ src/│ ├─ config/│ │ └─ site.ts│ ├─ data/│ │ └─ affiliate-links.json│ ├─ lib/│ │ ├─ content-schema.ts│ │ ├─ content.ts│ │ ├─ seo.ts│ │ └─ toc.ts│ ├─ components/│ │ ├─ AffiliateCta.tsx│ │ ├─ Disclosure.tsx│ │ ├─ QuickSummary.tsx│ │ ├─ Breadcrumbs.tsx│ │ ├─ FAQ.tsx│ │ ├─ RelatedPosts.tsx│ │ └─ Prose.tsx│ └─ styles/│ └─ globals.css├─ scripts/│ └─ check-links.mjs├─ .github/workflows/│ └─ ci.yml├─ .env.example├─ next.config.mjs├─ tailwind.config.ts├─ tsconfig.json└─ README.md```
---
## 5) Site Configuration (Single Source of Truth)Create: `src/config/site.ts`
```tsexport const site = { name: "Naples Vacation Planner", domain: "naplesvacationplanner.com", url: "https://naplesvacationplanner.com", locale: "en_US", region: "US-FL", defaultTitle: "Naples Vacation Planner (Naples, Florida)", defaultDescription: "Naples, Florida itineraries, where to stay guides, day trips, and practical planning tips—built for first-time visitors, families, and nature lovers.", social: { // optional; set later instagram: "", youtube: "", tiktok: "" }};```
---
## 6) Content System (MDX + Frontmatter Validation)### Content types- itinerary- where-to-stay- day-trip- travel-tip- map
### Frontmatter schema (Zod)Create: `src/lib/content-schema.ts`
```tsimport { z } from "zod";
export const ContentTypeEnum = z.enum([ "itinerary", "where-to-stay", "day-trip", "travel-tip", "map",]);
export const ContentStatusEnum = z.enum(["draft", "published"]);
export const BaseFrontmatterSchema = z.object({ title: z.string().min(10), description: z.string().min(50).max(180), slug: z.string().min(3), type: ContentTypeEnum, status: ContentStatusEnum, publishedAt: z.string(), // ISO date updatedAt: z.string(), // ISO date author: z.string().min(2).default("Naples Vacation Planner"), tags: z.array(z.string()).default([]), featuredImage: z.string().min(1), canonicalUrl: z.string().url().optional(),});
export const ItineraryFrontmatterSchema = BaseFrontmatterSchema.extend({ type: z.literal("itinerary"), days: z.number().int().min(1).max(14), pace: z.enum(["relaxed", "balanced", "fast"]), audience: z.enum(["couples", "families", "luxury", "nature", "all"]), bookAhead: z.array(z.string()).default([]), mapEmbedUrl: z.string().url().optional(),});
export const WhereToStayFrontmatterSchema = BaseFrontmatterSchema.extend({ type: z.literal("where-to-stay"), areaName: z.string().min(3), bestFor: z.array(z.string()).default([]), avoidIf: z.array(z.string()).default([]), nearbyHighlights: z.array(z.string()).default([]),});
export const DayTripFrontmatterSchema = BaseFrontmatterSchema.extend({ type: z.literal("day-trip"), driveTimeFromNaples: z.string().min(2), bestSeason: z.string().min(2), mustBook: z.array(z.string()).default([]),});
export const TravelTipFrontmatterSchema = BaseFrontmatterSchema.extend({ type: z.literal("travel-tip"),});
export const MapFrontmatterSchema = BaseFrontmatterSchema.extend({ type: z.literal("map"), downloadUrl: z.string().url().optional(), mapEmbedUrl: z.string().url().optional(),});
export const FrontmatterSchema = z.discriminatedUnion("type", [ ItineraryFrontmatterSchema, WhereToStayFrontmatterSchema, DayTripFrontmatterSchema, TravelTipFrontmatterSchema, MapFrontmatterSchema,]);
export type Frontmatter = z.infer<typeof FrontmatterSchema>;```
### Content loaderCreate: `src/lib/content.ts`
```tsimport fs from "node:fs";import path from "node:path";import matter from "gray-matter";import readingTime from "reading-time";import { FrontmatterSchema, type Frontmatter } from "./content-schema";
const CONTENT_ROOT = path.join(process.cwd(), "content");
export type ContentDoc = { frontmatter: Frontmatter; body: string; // MDX without frontmatter readingTime: string; // e.g., "6 min read" filePath: string;};
function getDirForType(type: Frontmatter["type"]) { return path.join(CONTENT_ROOT, `${type === "where-to-stay" ? "where-to-stay" : type}s`); // note: "day-trip" -> "day-trips" etc. Adjust if needed.}
// More explicit mapping (recommended to avoid pluralization mistakes):const TYPE_DIR: Record<Frontmatter["type"], string> = { itinerary: "itineraries", "where-to-stay": "where-to-stay", "day-trip": "day-trips", "travel-tip": "travel-tips", map: "maps",};
function dirFor(type: Frontmatter["type"]) { return path.join(CONTENT_ROOT, TYPE_DIR[type]);}
export function getAllDocsByType(type: Frontmatter["type"], { includeDrafts = false } = {}) { const folder = dirFor(type); const files = fs.readdirSync(folder).filter((f) => f.endsWith(".mdx"));
 const docs: ContentDoc[] = files.map((file) => { const filePath = path.join(folder, file); const raw = fs.readFileSync(filePath, "utf8"); const { data, content } = matter(raw);
 const parsed = FrontmatterSchema.parse({ ...data, type });
 if (!includeDrafts && parsed.status !== "published") { return null; }
 const rt = readingTime(content);
 return { frontmatter: parsed, body: content, readingTime: rt.text, filePath, }; }).filter(Boolean) as ContentDoc[];
 // Sort newest first return docs.sort((a, b) => (a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1));}
export function getDocBySlug(type: Frontmatter["type"], slug: string, { includeDrafts = false } = {}) { const docs = getAllDocsByType(type, { includeDrafts }); const match = docs.find((d) => d.frontmatter.slug === slug); if (!match) return null; return match;}
export function getAllSlugs(type: Frontmatter["type"], { includeDrafts = false } = {}) { return getAllDocsByType(type, { includeDrafts }).map((d) => d.frontmatter.slug);}```
> Build must FAIL if frontmatter is invalid. This prevents silent SEO errors.
---
## 7) Affiliate Links (Centralized + Trackable + Compliant)Create: `src/data/affiliate-links.json`
```json{ "viator_sunset_cruise_naples": { "label": "Book a Sunset Cruise (Naples Area)", "url": "https://example.com/REPLACE_WITH_AFFILIATE_LINK", "partner": "viator" }, "booking_hotels_naples": { "label": "Search Hotels in Naples, FL", "url": "https://example.com/REPLACE_WITH_AFFILIATE_LINK", "partner": "booking" }, "cars_rental_naples": { "label": "Compare Rental Cars (Naples/RSW)", "url": "https://example.com/REPLACE_WITH_AFFILIATE_LINK", "partner": "cars" }}```
Create: `src/components/AffiliateCta.tsx`
```tsximport affiliateLinks from "@/src/data/affiliate-links.json";
type Props = { title: string; linkId: keyof typeof affiliateLinks; placement?: string;};
export function AffiliateCta({ title, linkId, placement = "inline" }: Props) { const link = affiliateLinks[linkId];
 if (!link) return null;
 return ( <div className="my-6 rounded-xl border p-4 bg-white"> <p className="font-semibold">{title}</p> <a href={link.url} target="_blank" rel="sponsored nofollow noopener noreferrer" className="inline-block mt-3 rounded-lg bg-black px-4 py-2 text-white" data-affiliate-link-id={String(linkId)} data-affiliate-partner={link.partner} data-affiliate-placement={placement} > {link.label} </a> <p className="mt-2 text-xs text-gray-600"> Affiliate link. We may earn a commission at no extra cost to you. </p> </div> );}```
### Global click tracking without turning every CTA into client JSAdd a tiny click listener in the site layout (see Layout section) that:- Detects clicks on `a[data-affiliate-link-id]`- Fires GA4 event `affiliate_click` with partner/linkId/placement/page_path
This keeps performance excellent.
---
## 8) Required Legal/Trust ComponentsCreate: `src/components/Disclosure.tsx`
```tsxexport function Disclosure() { return ( <div className="my-4 rounded-lg border bg-gray-50 p-3 text-sm text-gray-800"> <strong>Disclosure:</strong> Some links on this site are affiliate links. If you book through them, we may earn a commission at no extra cost to you. </div> );}```
Create: `src/components/QuickSummary.tsx`
```tsxtype Props = { whoFor: string; pace: "relaxed" | "balanced" | "fast"; bestSeason: string; mustBook: string[];};
export function QuickSummary({ whoFor, pace, bestSeason, mustBook }: Props) { return ( <div className="my-6 rounded-xl border p-4 bg-white"> <h2 className="text-lg font-semibold">Quick Summary</h2> <ul className="mt-3 space-y-2"> <li><strong>Best for:</strong> {whoFor}</li> <li><strong>Pace:</strong> {pace}</li> <li><strong>Best season:</strong> {bestSeason}</li> <li> <strong>Book ahead:</strong> <ul className="list-disc ml-6"> {mustBook.map((x) => <li key={x}>{x}</li>)} </ul> </li> </ul> </div> );}```
---
## 9) Layout + Global SEO + TrackingCreate: `app/(site)/layout.tsx`
**Requirements:**- Defines global metadata- Adds GA4 script if `NEXT_PUBLIC_GA4_ID` exists- Adds affiliate click tracking listener (small, inline script)- Nav + footer + legal links- Canonical base URL uses site config
Skeleton:
```tsximport type { Metadata } from "next";import { site } from "@/src/config/site";import "@/src/styles/globals.css";import Script from "next/script";
export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: site.defaultTitle, template: `%s | ${site.name}` }, description: site.defaultDescription, openGraph: { type: "website", url: site.url, title: site.defaultTitle, description: site.defaultDescription, siteName: site.name, locale: site.locale }, alternates: { canonical: site.url }};
export default function RootLayout({ children }: { children: React.ReactNode }) { const gaId = process.env.NEXT_PUBLIC_GA4_ID;
 return ( <html lang="en"> <body className="min-h-screen bg-gray-50 text-gray-900"> {/* Header/Nav */} <header className="border-b bg-white"> <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between"> <a href="/" className="font-bold">{site.name}</a> <nav className="text-sm space-x-4"> <a href="/itineraries">Itineraries</a> <a href="/where-to-stay">Where to Stay</a> <a href="/day-trips">Day Trips</a> <a href="/travel-tips">Travel Tips</a> <a href="/maps">Maps</a> </nav> </div> </header>
 <main className="mx-auto max-w-5xl px-4 py-10"> {children} </main>
 {/* Footer */} <footer className="border-t bg-white"> <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-700 space-y-2"> <p><strong>{site.name}</strong> — Naples, Florida itineraries and planning tips.</p> <div className="space-x-4"> <a href="/affiliate-disclosure">Affiliate Disclosure</a> <a href="/privacy">Privacy</a> <a href="/terms">Terms</a> <a href="/contact">Contact</a> </div> </div> </footer>
 {/* GA4 (optional; set later) */} {gaId ? ( <> <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} /> <Script id="ga4-init" strategy="afterInteractive">{` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${gaId}', { anonymize_ip: true }); `}</Script>
 {/* Affiliate click tracking (event delegation) */} <Script id="affiliate-click-tracking" strategy="afterInteractive">{` document.addEventListener('click', function (e) { var a = e.target && e.target.closest ? e.target.closest('a[data-affiliate-link-id]') : null; if (!a) return; if (!window.gtag) return;
 var linkId = a.getAttribute('data-affiliate-link-id') || ''; var partner = a.getAttribute('data-affiliate-partner') || ''; var placement = a.getAttribute('data-affiliate-placement') || ''; var pagePath = window.location.pathname;
 window.gtag('event', 'affiliate_click', { partner: partner, link_id: linkId, placement: placement, page_path: pagePath }); }, { capture: true }); `}</Script> </> ) : null} </body> </html> );}```
---
## 10) MDX Rendering in Pages (SSG)Install:- `next-mdx-remote`- `gray-matter`- `zod`- `reading-time`- (optional) `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`
In each dynamic route page:- Use `generateStaticParams()` from filesystem slugs- Use `generateMetadata()` from frontmatter- Render MDX body with shared components (Disclosure, AffiliateCta, FAQ, QuickSummary)
Example: `app/(site)/itineraries/[slug]/page.tsx`
```tsximport { getAllSlugs, getDocBySlug } from "@/src/lib/content";import { site } from "@/src/config/site";import { MDXRemote } from "next-mdx-remote/rsc";import { Disclosure } from "@/src/components/Disclosure";import { AffiliateCta } from "@/src/components/AffiliateCta";import { QuickSummary } from "@/src/components/QuickSummary";
export const dynamicParams = false;
export function generateStaticParams() { return getAllSlugs("itinerary").map((slug) => ({ slug }));}
export function generateMetadata({ params }: { params: { slug: string } }) { const doc = getDocBySlug("itinerary", params.slug); if (!doc) return {};
 const url = `${site.url}/itineraries/${doc.frontmatter.slug}`;
 return { title: doc.frontmatter.title, description: doc.frontmatter.description, alternates: { canonical: doc.frontmatter.canonicalUrl ?? url }, openGraph: { title: doc.frontmatter.title, description: doc.frontmatter.description, url, images: [doc.frontmatter.featuredImage] } };}
const mdxComponents = { Disclosure, AffiliateCta, QuickSummary};
export default function Page({ params }: { params: { slug: string } }) { const doc = getDocBySlug("itinerary", params.slug); if (!doc) return <div>Not found</div>;
 return ( <article className="prose prose-slate max-w-none"> <h1>{doc.frontmatter.title}</h1> <p className="text-sm text-gray-600"> Last updated: {doc.frontmatter.updatedAt} · {doc.readingTime} </p>
 <MDXRemote source={doc.body} components={mdxComponents} /> </article> );}```
> Repeat this pattern for the other types with correct base paths.
---
## 11) Sitemap + Robots (SEO-critical)Create: `app/sitemap.ts`
```tsimport { site } from "@/src/config/site";import { getAllDocsByType } from "@/src/lib/content";
export default function sitemap() { const now = new Date();
 const staticUrls = [ "", "/itineraries", "/where-to-stay", "/day-trips", "/travel-tips", "/maps", "/about", "/contact", "/privacy", "/terms", "/affiliate-disclosure" ].map((p) => ({ url: `${site.url}${p}`, lastModified: now }));
 const itineraries = getAllDocsByType("itinerary").map((d) => ({ url: `${site.url}/itineraries/${d.frontmatter.slug}`, lastModified: new Date(d.frontmatter.updatedAt) }));
 const whereToStay = getAllDocsByType("where-to-stay").map((d) => ({ url: `${site.url}/where-to-stay/${d.frontmatter.slug}`, lastModified: new Date(d.frontmatter.updatedAt) }));
 const dayTrips = getAllDocsByType("day-trip").map((d) => ({ url: `${site.url}/day-trips/${d.frontmatter.slug}`, lastModified: new Date(d.frontmatter.updatedAt) }));
 const tips = getAllDocsByType("travel-tip").map((d) => ({ url: `${site.url}/travel-tips/${d.frontmatter.slug}`, lastModified: new Date(d.frontmatter.updatedAt) }));
 const maps = getAllDocsByType("map").map((d) => ({ url: `${site.url}/maps/${d.frontmatter.slug}`, lastModified: new Date(d.frontmatter.updatedAt) }));
 return [ ...staticUrls, ...itineraries, ...whereToStay, ...dayTrips, ...tips, ...maps ];}```
Create: `app/robots.ts`
```tsimport { site } from "@/src/config/site";
export default function robots() { const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
 if (!isProd) { return { rules: [{ userAgent: "*", disallow: "/" }] }; }
 return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${site.url}/sitemap.xml`, host: site.url };}```
---
## 12) Naples-Specific Content Rules (Editorial SOP)### Every itinerary MUST include:- `<Disclosure />` near top- `<QuickSummary />` near top- Day-by-day sections: - Morning / Afternoon / Evening- “What to book early (Jan–Apr)” section- “If you have one extra day…” section (internal links)- 3–8 FAQs (use `<FAQ />` if implemented)- At least 3 internal links (itinerary ↔ where-to-stay ↔ day-trips ↔ travel-tips)
### Naples-specific places to reference (when relevant)- Old Naples, 5th Avenue South, 3rd Street South- Naples Pier area (verify status seasonally)- Lowdermilk Park, Vanderbilt Beach, Delnor-Wiggins Pass- Naples Botanical Garden- Corkscrew Swamp Sanctuary- Rookery Bay- Tin City / Bayfront- Naples Zoo at Caribbean Gardens- C’mon (Golisano Children’s Museum of Naples)- Artis—Naples / Baker Museum
### Seasonality guidance (must be honest)- Peak: Jan–Apr (book tours/hotels early)- Shoulder: Nov–Dec, May- Summer: Jun–Sep (heat, afternoon storms; suggest early mornings, indoor backups)- Hurricane season: Jun–Nov (factual notes + flexible cancellation tips; avoid alarmism)
---
## 13) Initial Content Backlog (MVP = 12–15 pages)### Itineraries (5)- Naples 2-day itinerary (couples)- Naples 3-day itinerary (first timers)- Naples 5-day itinerary (families)- Naples 7-day itinerary (relaxed + day trips)- Naples + Marco Island combo itinerary
### Where to stay (4)- Old Naples (walkable, classic)- Vanderbilt Beach (beach-forward)- Park Shore / Venetian Village area- Pelican Bay (upscale, resort-like)
### Day trips (2)- Marco Island from Naples (how to do it)- Everglades City from Naples (realistic day trip plan)
### Travel tips (2)- Best time to visit Naples FL (month-by-month)- Rainy day in Naples: what to do (families + couples)
### Legal (3)- Affiliate disclosure- Privacy policy- Terms
---
## 14) Environment VariablesCreate: `.env.example`
```bashNEXT_PUBLIC_SITE_URL=https://naplesvacationplanner.comNEXT_PUBLIC_GA4_ID=```
---
## 15) Deployment: GitHub → Vercel (Required)### Vercel deployment steps1. Push repo to GitHub2. Create Vercel account3. Import project from GitHub4. Set env vars in Vercel: - `NEXT_PUBLIC_SITE_URL=https://naplesvacationplanner.com`5. Deploy6. Confirm the `*.vercel.app` preview works BEFORE touching DNS
---
## 16) Domain Connection (Hostinger Domain + Vercel Hosting)**Goal:** Keep domain at Hostinger, but serve website from Vercel.
### Step A — Add domain in Vercel firstVercel → Project → Settings → Domains:- Add `naplesvacationplanner.com`- Add `www.naplesvacationplanner.com`- Set Primary = `naplesvacationplanner.com`
Vercel will show required DNS records.
### Step B — Update DNS in HostingerHostinger hPanel → Domains → naplesvacationplanner.com → DNS Zone Editor
**Typical Vercel records (most common):**- A record: `@` → `76.76.21.21`- CNAME: `www` → `cname.vercel-dns.com`
**Critical DNS rules:**- Remove conflicting A/AAAA records for `@` and `www` that point elsewhere- Keep MX records if using Hostinger email- If Vercel requests a TXT verification record, add it exactly
### Step C — Verify- Vercel domain status should become “Valid Configuration”- SSL will be provisioned automatically after DNS propagates
---
## 17) Email (Hostinger)If using Hostinger email, keep these record types in DNS:- MX (mail routing)- TXT SPF- TXT DKIM- TXT DMARC (recommended)
Do NOT delete MX records while editing A/CNAME for Vercel.
---
## 18) Google Search Console (After Domain is Live)1. Create Search Console Domain property for `naplesvacationplanner.com`2. Verify via DNS TXT record (add in Hostinger DNS)3. Submit sitemap: `https://naplesvacationplanner.com/sitemap.xml`
---
## 19) CI (Minimum)Create: `.github/workflows/ci.yml`
Run:- install- lint- typecheck- build
(Implement according to your preferred Node package manager.)
---
## 20) Quality Gates (Release Checklist)Before public launch:- [ ] Lighthouse: Performance 90+, SEO 90+, Accessibility 90+- [ ] `/robots.txt` and `/sitemap.xml` are live- [ ] Canonical domain correct (www redirects or consistent)- [ ] Affiliate disclosure visible- [ ] No broken internal links- [ ] No “thin content” placeholder pages indexed
---
## 21) Notes on Legal/ComplianceThis project is not a travel agency and does not provide guarantees for third-party services.Always disclose affiliate relationships clearly.
---
## 22) Implementation Order (Builder Task List)1. Scaffold Next.js app (TS + Tailwind)2. Create repo structure + configs3. Implement site config (`site.ts`)4. Implement MDX content loader + Zod validation5. Implement content pages (hub pages + [slug] detail pages)6. Implement affiliate CTA + tracking7. Implement legal pages + contact8. Implement sitemap + robots9. Deploy to Vercel10. (Later) Connect Hostinger DNS to Vercel + set up email + GSC + GA4

---
## 23) Handoff Instructions — “Google Antigravity” (Continue Work)

You are taking over an existing Next.js + MDX affiliate SEO site repo. Your job is to keep improving the site quality and SEO based on the audit goals (fix trust-killers, fill thin hubs, and ship publishable starter content).

### Operating rules
- Do NOT add new UI/UX features beyond what is required to fix the audit issues (no new pages, no new themes, no animations).
- Prefer small, surgical PRs. Keep changes minimal and consistent with existing patterns.
- Build must remain green: `npm run build` must pass.
- Run Snyk Code scan on any new/changed first-party code and fix issues it reports.

### 0) Ground truth about the repo structure (IMPORTANT)
- The real app lives at the repo root: `app/`, `content/`, `src/`, `public/`, etc.
- There may also be a nested folder named `naples-vacation-planner/` created accidentally during earlier work. Treat that nested folder as a duplicate and do not develop there. Only edit the root app.

### 1) Immediate P0 objectives (trust + SEO)
1) Remove “broken image” experiences site-wide.
	- If `featuredImage` points to a file that doesn’t exist, cards and detail pages currently show broken thumbnails.
	- Implement a safe fallback strategy:
	  - Add placeholder images in `public/images/placeholders/` (SVG is fine).
	  - Use a resilient image component (e.g., a tiny client wrapper) that swaps to a placeholder on error.
	  - Update listing cards (hub pages, related posts, homepage) to use the safe component.

2) Ensure hubs are not “thin” placeholders.
	- Each hub page (itineraries, where-to-stay, day-trips, travel-tips, maps) should have:
	  - A real intro paragraph (who it’s for + what it covers)
	  - At least a few items so the grid doesn’t look empty
	- If inventory is still low (1–2 items), center the grid and cap width so it doesn’t look broken.

3) Maps section must not be a placeholder.
	- Create at least 1–2 real map MDX entries.
	- Prefer practical “how to use it” guidance (parking/access, neighborhoods, etc.).

### 2) Content creation requirements (MDX)
This codebase uses strict Zod frontmatter validation. When adding MDX, you MUST satisfy the per-type schema:
- All types: `title`, `description`, `slug`, `type`, `status`, `publishedAt`, `updatedAt`, `author`, `tags`, `featuredImage` (required).
- Itinerary: `days`, `pace`, `audience`, `bookAhead` (and optional `mapEmbedUrl`).
- Where-to-stay: `areaName`, `bestFor`, `avoidIf`, `nearbyHighlights`.
- Day-trip: `driveTimeFromNaples`, `bestSeason`, `mustBook`.
- Map: optional `downloadUrl`, optional `mapEmbedUrl`.

Create a minimum “starter pack” so hubs look real:
- 1 new itinerary
- 1 new where-to-stay
- 1 new day-trip
- 1 new travel-tip
- 1 new map

Avoid unverifiable specifics (hours/fees) unless you cite an official source.

### 3) SEO/internal linking checklist (apply to every new guide)
- Add `<Disclosure />` near the top.
- Add a quick summary section if the page type supports it.
- Include 3–6 internal links across hubs (itinerary ↔ where-to-stay ↔ day-trips ↔ travel-tips ↔ maps).
- Add a small FAQ where appropriate.
- Add/update “Last updated” metadata in frontmatter (`updatedAt`) and keep it current.

### 4) Validation steps (run these before shipping)
1) Install: `npm install`
2) Build: `npm run build`
3) Snyk Code scan the project root (fix any findings)
4) Sanity-check a few pages in dev: `npm run dev`

### 5) Deliverable expectation
- The site should have no broken thumbnails, hubs should feel populated, and the Maps section should be real.
- Keep everything consistent with the existing design system and component patterns.

---

# Naples Vacation Planner — Improvement & Monetization Build Plan
**Goal:** Turn the existing UI shell into a production-grade, SEO-ready, affiliate-monetized Naples, Florida tourism planning site.

This document is a detailed backlog + implementation instructions to fix the current gaps (no content/images) and to make the site earn revenue.

---

## 1) Current State (Observed)
### Working
- Brand + navigation exist (Itineraries / Where to Stay / Day Trips / Travel Tips / Maps).
- Homepage funnel exists (hero CTAs + planning cards + “Latest Guides” section).
- Breadcrumb pattern exists on hub pages.
- Footer exists (with legal link categories shown in screenshot).

### Broken / Missing
- No images exist → broken thumbnails and gray blocks.
- Minimal/no articles exist → hub pages show 1 card and lots of empty space.
- Maps page is “Coming Soon” → thin/low-value page if indexed.
- Monetization not implemented (no affiliate links, no tracking, no email capture).
- SEO fundamentals need verification (metadata/canonical/sitemap/robots/schema).

---

## 2) Success Criteria (Definition of “Done”)
### UX/Trust
- No broken images anywhere (cards always show a valid thumbnail).
- Hub pages look intentional even with small inventory (center layout + “More coming soon”).
- Every content page shows: title, last updated, disclosure, internal links.

### SEO
- `/robots.txt` and `/sitemap.xml` return 200 and reflect only “published” pages.
- Canonical URLs are consistent (`naplesvacationplanner.com` chosen as primary later).
- Schema exists: Organization + WebSite + Article + BreadcrumbList + FAQPage (where applicable).
- Core Web Vitals are strong (fast, minimal JS, optimized images).

### Monetization
- Affiliate CTA system exists (central link dictionary + compliant rel attributes).
- Outbound affiliate clicks are tracked (GA4 event).
- Email lead magnet + signup exists (to build an owned audience).

---

## 3) Phase 0 — Safety / Indexing Control (Do Immediately)
**Problem:** Vercel preview/production URLs can accidentally get indexed before the real domain is connected.

### Task: Add a launch indexing switch
- Add env var: `ALLOW_INDEXING=false` (Vercel + local).
- In `app/robots.ts`, disallow indexing unless `ALLOW_INDEXING=true`.

**Acceptance test:**
- When `ALLOW_INDEXING=false`, `robots.txt` disallows all.
- When `ALLOW_INDEXING=true`, `robots.txt` allows and references sitemap.

---

## 4) Phase 1 — Fix Broken Images (P0)
**Problem:** Cards show broken thumbnails because there are no images.

### Task A: Add placeholder images (fastest correct fix)
Create:
- `/public/images/placeholders/itinerary.svg`
- `/public/images/placeholders/where-to-stay.svg`
- `/public/images/placeholders/day-trip.svg`
- `/public/images/placeholders/travel-tip.svg`
- `/public/images/placeholders/map.svg`

These SVGs should be high-resolution (1200x630) and on-brand.

### Task B: Add a default/fallback card image
In your Card component (or wherever thumbnails are rendered):
- If `featuredImage` is missing/empty → fall back to a type-based placeholder:
	- itinerary → `/images/placeholders/itinerary.svg`
	- where-to-stay → `/images/placeholders/where-to-stay.svg`
	- day-trip → `/images/placeholders/day-trip.svg`
	- travel-tip → `/images/placeholders/travel-tip.svg`
	- map → `/images/placeholders/map.svg`

**Acceptance tests:**
- Delete/omit featuredImage in one post and confirm UI still looks clean (no broken image icon, no blank gray box).
- Lighthouse: no layout shift from image loading.

---

## 5) Phase 2 — Create MVP Content (P0)
**Problem:** The site cannot rank or earn without real pages.

### Content rules (MVP quality)
Each guide must include:
- Affiliate disclosure near top (even if no affiliate links yet)
- Clear sections (H2/H3)
- Practical Naples-specific details (seasonality and “book ahead” notes)
- 3–8 FAQs at bottom
- At least 3 internal links to other site pages

### Minimum MVP library (publish these first)
Create MDX files in `/content`:

#### Itineraries (at least 3)
- Naples 2-day itinerary (couples weekend)
- Naples 3-day itinerary (first timers)
- Naples 5-day itinerary (families) **(high priority; family searches are huge)**

#### Where to stay (at least 4)
- Old Naples guide (walkability, classic vibe)
- Vanderbilt Beach guide (beach-first base)
- Park Shore / Venetian Village guide (upscale, central)
- Pelican Bay guide (resort-like upscale)

#### Day trips (at least 3)
- Everglades day trip from Naples (realistic plan)
- Marco Island day trip from Naples
- Ten Thousand Islands: how to choose tours (boat vs kayak)

#### Travel tips (at least 3)
- Best time to visit Naples (month-by-month)
- Rainy day Naples (families + couples)
- Do you need a car in Naples?

#### Maps (at least 1 “real” page)
- Naples Beach Parking & Access Map (starter guide)
	- If map embed is not ready, include a structured “how to plan parking/timing” guide and mark it as “map embed coming soon” inside content, but the page must still be useful.

**Important:** Do NOT keep “Maps Coming Soon” as the only content. Either:
- publish at least 1 real Maps guide, OR
- remove Maps from top nav until it has at least 1 published page.

**Acceptance tests:**
- Home “Latest Guides” shows 3–6 real posts.
- Each hub page (Itineraries/Where to Stay/Day Trips/Travel Tips/Maps) shows at least 2 items (Maps at least 1).

---

## 6) Phase 3 — Fix Hub Page Layout for Small Inventory (P0)
**Problem:** When there’s only 1 post, it sits left and looks unfinished.

### Task: Responsive “empty state” rules
If a hub has:
- 0 posts → show an intentional empty state + link back to Home + newsletter signup
- 1–2 posts → center the grid and add a “More coming weekly” block
- 3+ posts → normal grid

**Acceptance test:**
- With 1 post, the card is centered and the page looks intentional.

---

## 7) Phase 4 — Article Template Upgrades (P1)
**Goal:** Make every content page conversion-ready and SEO-friendly.

### Must-have components/sections
1. **Disclosure** (FTC) near top
2. **Quick Summary** (especially for itineraries)
	 - who it’s for, pace, best season, must-book items
3. **Table of contents** (auto-generated)
4. **“What to book early (Jan–Apr)”** section for Naples seasonality
5. **FAQs** (3–8) + FAQ schema output
6. **Related Posts** block
7. **Last updated date** visible

**Acceptance tests:**
- Every itinerary page has quick summary + book-ahead + FAQs + related.
- Only one H1 per page.

---

## 8) Phase 5 — Technical SEO Checklist (P1)
### A) Metadata rules
- Title template: `{{Page Title}} | Naples Vacation Planner`
- Meta description: 120–160 chars, includes “Naples, Florida”
- OpenGraph/Twitter cards set
- Canonical URL set (must match production domain when launched)

### B) Sitemap + robots
- `/sitemap.xml` includes only published content
- `/robots.txt` controlled by `ALLOW_INDEXING`

### C) Schema (JSON-LD)
Implement:
- Organization (site-wide)
- WebSite + SearchAction (site-wide)
- BreadcrumbList (content pages + hubs)
- Article (content pages)
- FAQPage (when FAQs exist)

**Acceptance test:**
- Validate with Google Rich Results Test (no errors).

---

## 9) Phase 6 — Analytics & Tracking (P1)
### GA4
- Add GA4 only after cookie consent strategy is decided (best practice), but minimally:
	- track page views
	- track affiliate clicks

### Affiliate click event
Event name: `affiliate_click`
Params:
- `partner`
- `link_id`
- `placement`
- `page_path`

**Acceptance test:**
- Click any affiliate CTA and see event in GA4 DebugView.

---

## 10) Phase 7 — Monetization Implementation (P1/P2)
### Step A: Affiliate stack (recommended order for Naples)
1) **Hotels** (highest payout potential in Naples)
2) **Tours/activities** (sunset cruises, wildlife tours, Everglades)
3) **Car rentals** (day trips convert well)
4) Add-ons: travel insurance, eSIM, Amazon packing list

### Step B: Centralize affiliate URLs
Create `src/data/affiliate-links.json` with:
- id
- label
- url (with affiliate ID + UTMs)
- partner name

### Step C: Place CTAs in “decision moments”
- Itineraries: CTA after each day plan (“Book a sunset cruise”)
- Where-to-stay: CTA in “Booking strategy” section (“Search hotels in Old Naples”)
- Day trips: CTA after explaining tour style choice (“Compare tours”)

### Compliance requirements
- Per-page disclosure near top
- Affiliate link `rel="sponsored nofollow noopener noreferrer"`
- Dedicated `/affiliate-disclosure` page

---

## 11) Phase 8 — Email List (High ROI for affiliate)
### Lead magnet
Create a free download:
- “Naples 3-Day Itinerary PDF + Packing Checklist”

### Email provider
Choose one:
- ConvertKit
- MailerLite
- Beehiiv

### Email capture placement
- Homepage (mid-page + footer)
- End of every itinerary post
- Exit-intent optional later

### Welcome sequence (minimum 5 emails)
1) Deliver itinerary PDF
2) Where to stay: Old Naples vs Vanderbilt
3) Day trip: Everglades vs Marco Island
4) What to book early in Jan–Apr
5) Packing + rainy-day plan

**Acceptance test:**
- Subscriber receives email 1 instantly and sequence is scheduled.

---

## 12) Deployment Plan (Hostinger domain → Vercel, later)
When ready for production:
1) Add `naplesvacationplanner.com` + `www` in Vercel Domains
2) Update Hostinger DNS:
	 - `A` @ → `76.76.21.21`
	 - `CNAME` www → `cname.vercel-dns.com`
3) Set primary domain in Vercel
4) Flip `ALLOW_INDEXING=true`
5) Add Google Search Console + submit sitemap

---

## 13) Ongoing Operations (SOP)
### Monthly
- Update “Best time to visit Naples” month-by-month notes
- Refresh any guides with seasonal changes
- Check Google Search Console queries:
	- improve titles/meta where impressions are high but CTR is low

### Quarterly
- Broken link check
- Update affiliate links/UTMs
- Add 5–10 new content pieces (focus on high-intent itinerary + where-to-stay)

---

## 14) Naples-Specific Content Roadmap (High-Intent Targets)
Prioritize these topics early because they convert:
- “Naples vs Marco Island: where to stay”
- “Best area to stay in Naples for first time visitors”
- “Naples Florida 5-day itinerary with kids”
- “Best beaches in Naples with easiest parking”
- “Everglades City day trip from Naples itinerary”

Seasonality pages:
- “Naples in February: what to book early”
- “Naples in July: realistic plan (heat + storms)”

---

# How you can make money with this website (realistic, step-by-step)

## 1) Reasoning and analysis (best monetization for Naples + your model)
You’re building:

- A planning-focused website (itineraries + where to stay + day trips)
- In an affluent, high-spend destination (Naples)
- With strong seasonality (Jan–Apr peak)

This is ideal for affiliate monetization because:

- Where-to-stay content converts into hotel bookings (often the biggest commission dollars).
- Itinerary and day-trip content converts into tour bookings and car rentals.
- The “book early” dynamic in Naples peak season increases urgency and conversion.

The obstacle: early traffic is low. So your monetization must:

- Work even with low traffic (affiliate can)
- Improve as traffic grows (ads later, sponsorship later)

## 2) Conclusions and actionable recommendations (exact monetization roadmap)

### Phase 1 (Weeks 1–4): Monetize immediately with affiliate links in high-intent pages
**What to do**

- Join 1 tours affiliate + 1 hotels affiliate + 1 car rental affiliate.
- Tours/activities: Viator or GetYourGuide (broad inventory; good for Everglades / boat tours)
- Hotels: Booking/Expedia-style program (or via an affiliate network if direct is hard)
- Car rentals: Discover Cars (or similar)
- Implement your centralized link file (affiliate-links.json) and CTA blocks.
- Add CTAs only in places that match user intent:
	- itinerary day sections
	- “where to stay” booking strategy
	- day trip “choose your tour type” section

**Where the money will come from first**

- “Search hotels in Naples” CTAs inside Old Naples / Vanderbilt guides
- “Book a tour” CTAs inside Everglades day trip and Ten Thousand Islands guides

### Phase 2 (Month 2–3): Build an email list (this multiplies affiliate earnings)
**What to do**

- Create a lead magnet (PDF itinerary).
- Put email opt-in on:
	- homepage
	- end of each itinerary
- Build a 5-email sequence with affiliate links (with disclosure).

**Why this matters**

- Email converts better than cold search traffic.
- It’s insurance against Google algorithm changes.

### Phase 3 (After consistent traffic): Add display ads
**When to do it**

- If you start hitting meaningful traffic (example: several thousand sessions/month), you can test Google AdSense.
- Later, if you reach higher thresholds, you can apply to premium networks (requirements vary; don’t count on them early).

**Important**

- Ads can reduce UX; don’t add them until you have enough volume that it’s worth it.

### Phase 4 (Later, optional): Sponsored posts + direct local referral deals
Even if you’re “mostly digital,” you can still do low-ops partnerships:

- Local tour operator pays a fixed monthly “featured placement” fee
- Or fixed referral fee per booking (tracked via code/link)

This becomes easier once you have:

- traffic
- rankings
- email list

### Phase 5 (Optional, high margin): Sell digital products
Once your content is strong:

- $9–$29 PDF bundle:
	- “Naples 3-day / 5-day itineraries”
	- “Beach parking map”
	- “Family plan + rainy day plan”

This can be layered on top of affiliate revenue.

### What to expect (realistic)
- Early phase: you may earn little to nothing until you have content + some traffic.
- Once you have 20–50 quality pages + some rankings plus a basic email list, you can start seeing meaningful affiliate revenue, especially during Jan–Apr.
- No one can guarantee numbers, but Naples is a strong market for higher-value bookings.

### Optional: “Earnings Architecture” (next step)
If you share which affiliate programs you plan to use first, we can define:

- exact CTA placements per page type
- which pages to write first for fastest commissions
- a 12-week publishing schedule timed for Naples seasonality (peak season ramp)


