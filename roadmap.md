# SEO corrections
- [x] Match HTML language to the selected page language; verified LT/RU/ET/EN self-hreflang alignment and direct catalog links for the additional Ahrefs product examples (10 tests passed).
- [x] Correct route canonical handling and invalid localized links; restore existing SV/NO/FI/DA landing pages.
- [x] Reconcile sitemap and internal links: 1163 URLs, including 906 published products and 48 articles, linked in a static HTML directory.
- [x] Add article metadata and structured data; verify existing organization data and assign its stable ID.
- [x] Verify representative pages and four URL tests; no preview runtime or build errors.

## Verification limits
- Live site changes require publishing and a new Ahrefs crawl; screenshot counts are historical, not a fresh verdict.
- Route canonical and Article/hreflang metadata are still client-rendered. Removed the misleading homepage canonical fallback on every route; fully route-specific initial HTML needs hosting prerendering or a separate approved SSR migration.
- GPTBot sample responses were 0.24–0.40 seconds today; the historical AI-crawler latency was not reproduced and hosting-side timing is not controlled by these edits.