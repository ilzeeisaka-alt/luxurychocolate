# Architecture rules
- Keep visitor chat history private behind the session-token function; administrator reads validate the JWT and protected admin role, and completed exchanges trigger fixed-recipient managed email notifications deduplicated by message ID.
- Compose the homepage gingerbread gallery as a sibling of the shop band in shared ShopSection so all language homepages have the same navigation target without duplicating page wiring.
- Use the shared ProductImageViewer for shop and product-page image enlargement, keeping image previews separate from product navigation and reusing accessible dialog controls.
- Keep legacy SEO URL aliases in `src/lib/seoPaths.ts` and route them to real pages; this prevents editorial links from landing on noindex pages.
- Keep `public/sitemap.xml` and `public/katalogs.html` synchronized with published product/blog URLs when the catalog changes; the HTML directory supplies crawlable links without a database query per crawler visit.
- Keep route metadata and HTML language in `useSeo`, using `useCurrentLang` for the selected language, and article JSON-LD in the article page; static HTML remains a fallback, not proof of server-rendered metadata.
- Editorial pages using the shared SEO landing layout explicitly opt into Article metadata; commercial pages do not, and organization references reuse the sitewide entity to avoid incomplete duplicates.