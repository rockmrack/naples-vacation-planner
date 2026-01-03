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
