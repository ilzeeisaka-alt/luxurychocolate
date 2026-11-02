# Architecture rules
- Keep legacy SEO URL aliases in `src/lib/seoPaths.ts` and route them to real pages; this prevents editorial links from landing on noindex pages.
- Keep `public/sitemap.xml` and `public/katalogs.html` synchronized with published product/blog URLs when the catalog changes; the HTML directory supplies crawlable links without a database query per crawler visit.
- Keep route metadata in `useSeo` and article JSON-LD in the article page; static HTML remains a fallback, not proof of server-rendered metadata.