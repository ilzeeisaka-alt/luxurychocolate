# Customer price proposals
- [x] Add product price proposal form, private saved submissions, owner email and admin overview; verified a EUR 20 unit-price / 50-piece submission against a EUR 25 catalog price, saved data, sent owner email, mobile/shop controls and four validation tests; removed only the test submission.
- [ ] Verify signed-in administrator price-proposal overview. Blocked: no app auth account matches the requesting user; preview administrator sign-in is needed.

# Product visualizations
- [x] Remove forced square composition, enlarge natural-ratio previews and add full-image enlargement; eight tests passed, desktop/mobile dialogs checked, and real generation returned a 1536×1024 landscape image with the whole box, lid, separate card and styled surrounding background. Generator technical resolution limits still apply.
- [x] Add cumulative multi-file logo/design references without a count cap; verified 11-file selection, adding a 12th, removing one, and real generation with all remaining references.
- [x] Add iterative customer-directed editing of any visual element; verified real multi-instruction revision, both versions restored after reload, notification sent for both versions and private-parent permission tests.
- [x] Add product logo/idea visualization, private saved images and download; verified real generation, PNG download and restoration after reload, plus product-detail button and mobile width.
- [x] Notify administrator and add client/product/idea/image overview; verified saved identity/idea/image and managed email sent to Ilze.
- [x] Verify generation, saved result, email and permission rules; five tests pass and anonymous admin reads, stranger history and private file listing were denied.
- [ ] Verify signed-in administrator visualization overview. Blocked: requesting user's email has no matching app auth account; preview sign-in is needed.

# AI conversation reporting
- [x] Keep complete chat exchanges saved and add an administrator-only conversation tab; verified question and answer restoration after reload and anonymous denial, with three role-access tests passing.
- [x] Notify Ilze by email after each completed exchange; verified managed email sent event and stored exchange.
- [ ] Verify signed-in administrator list/detail on desktop and mobile. Blocked: no requesting-user auth account matches and multiple accounts exist; user must sign in to the preview or identify the account to test.

# SEO corrections
- [x] Copied the 5-7 cm cupcakes into a separate product named with chocolate logo decoration and berries at EUR 10 per piece, reusing the original photo; synchronized catalog and sitemap links, verified the product page, category list and English version in the browser, and passed the price test confirming the original remains EUR 5.
- [x] Copied mini cupcakes into a separate product with the supplied berry/logo photo at EUR 5 per piece; synchronized catalog links, verified the rendered photo and price, and passed the price test confirming the original remains EUR 2.50.
- [x] Highlighted Christmas and New Year chocolate gifts with festive symbols in the gift-box section; verified the link and existing Christmas page title, description, keywords and H1 in the browser. Google indexing/rankings were not verified; live changes need publishing.
- [x] Added the Piparkūkas gallery to all language homepages with seven supplied photos and top navigation; verified full-image display, enlargement, next-image controls, the shop-category link and return navigation in Latvian and English. Local browser asset requests were forwarded to the actual preview asset service for verification.
- [x] Copied the 3 cm gingerbread box as a ribbon bag ("3 garšu maisiņš ar lentīti – Piparkūkas 3 cm, 9 gab. iepakojumā") for EUR 15 including VAT, without images; synchronized catalog links, verified the product and category pages and passed three catalog tests.
- [x] Added the Šokolādes Oskara statuete category and product at EUR 25 per piece; synchronized catalog links, verified category-to-product navigation and passed the catalog price test. No product photo was supplied.
- [x] Duplicated the personalized cake chocolate squares as a 2 cm product at EUR 0.38 with the original image; synchronized crawlable links and verified the price, dimensions and rendered image.
- [x] Limited search titles without changing visible product names and expanded short descriptions; verified six representative URLs (titles at most 70 characters, descriptions 110–155, one H1) and 10 existing tests passed.
- [x] Removed the shared noscript H1 that Ahrefs counted alongside route headings; preview has one H1 on the home, LT conference, contact, review and advertising pages. Title/description/H1 change reports are informational.
- [x] Added Article metadata to the editorial chocolate-business-card page and referenced the full organization from the service; verified Article on all three screenshot examples and full Organization on six pages. IndexNow submission is optional and was not enabled.
- [x] Match HTML language to the selected page language; verified LT/RU/ET/EN self-hreflang alignment and direct catalog links for the additional Ahrefs product examples (10 tests passed).
- [x] Correct route canonical handling and invalid localized links; restore existing SV/NO/FI/DA landing pages.
- [x] Reconcile sitemap and internal links: 1163 URLs, including 906 published products and 48 articles, linked in a static HTML directory.
- [x] Add article metadata and structured data; verify existing organization data and assign its stable ID.
- [x] Verify representative pages and four URL tests; no preview runtime or build errors.

## Verification limits
- Live site changes require publishing and a new Ahrefs crawl; screenshot counts are historical, not a fresh verdict.
- Route canonical and Article/hreflang metadata are still client-rendered. Removed the misleading homepage canonical fallback on every route; fully route-specific initial HTML needs hosting prerendering or a separate approved SSR migration.
- GPTBot sample responses were 0.24–0.40 seconds today; the historical AI-crawler latency was not reproduced and hosting-side timing is not controlled by these edits.