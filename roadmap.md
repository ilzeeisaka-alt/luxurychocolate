# Homepage speed and contact review
- [x] Verified an existing H1 and five direct contact links; contacts and heading were below the first screen. The quoted live PageSpeed result has not been reproduced.
- [x] Reduced hero artwork from roughly 3.2 MB to 227 KB, added a 47 KB video poster, delayed video start, served Satoshi locally and deferred heavy below-fold galleries. Initial preview media elements dropped from 133 to 43.
- [x] Made chocolate lettering the single H1, added top phone/email/form controls and a useful loading screen; checked mobile/desktop layout, contact targets and form opening with no runtime errors. New published PageSpeed measurement still requires publishing.

# TalTap 15-piece gingerbread bag
- [x] Matched ribbon to TalTap blue and shortened localized product names by removing ribbon/sticker exclusions; verified the updated image and heading in the browser and passed five existing tests.
- [x] Copied the linked product into Christmas gingerbread with TalTap logos on chocolate decorations, plain ribbon and no bag sticker; retained EUR 18.15 source price, added photo/catalog links, passed five tests and verified the loaded photo, title and price on the product page.

# Order visualization documents
- [x] Restore repeat-customer contact/registration/address defaults from saved owner orders across devices; account-scoped editable drafts, legal-address/registration preservation and existing private logo/portrait reuse verified with real TalTap data; 21 tests passed.
- [x] Automatically reuse saved logo/contact portrait on repeat purchases for the same owner and contact; verified the requested TalTap customer document and reload with both images loaded, passed seventeen tests, and saved existing media mappings for this order for the current published page.
- [x] Load saved client logos consistently in both order views and show them automatically beside the manufacturer logo in the centered header with uploaded-logo fallback; 17 tests passed, real TalTap/ALPS headers checked, owner-view persistence verified, mobile has no overflow and TalTap prints on one A4 page. Removed temporary test order.
- [x] Added a "Vizualizācija" button on the customer invoice page (/rekins) that confirms the order and opens its Order Sheet directly; verified signed-in navigation, rendered customer visualization and email function behavior (test addresses suppressed as expected).
- [x] Fill missing Latvian company registration from valid VAT data; real ALPS document shows 40003771232 with no remaining client-data dashes, seven tests passed and preview checked.
- [x] Show the client's company email domain as website and normalize both contacts' address/locality rows; real signed-in ALPS Order Sheet shows www.alps.archi and matching LV-postcode/Latvija rows, vertical alignment verified and eighteen tests passed.
- [x] Give customers owner-filtered on-screen invoice/Order Sheet links after order confirmation, paid return and in account history; administrator portrait/logo mappings remain protected.
- [x] Add saved-recipient, event-deduplicated managed customer document emails to confirmation and verified payment hooks; functions deployed, confirmation send to company test recipient verified. Paid Stripe flow not exercised with a charge.
- [x] Verify real test-customer order confirmation, both one-page PDFs, account links, mobile layout, successful customer email and repeated-send deduplication, and foreign-order/email plus signed-out email denial; nineteen tests passed. Removed test purchases after verification.
- [x] Align both contact blocks in ten shared rows with placeholders for missing details; all corresponding rows verified at desktop/mobile widths, portraits and centered logos retained, PDF downloaded and sixteen existing tests passed.
- [x] Make Order Sheet headings, labels and dates follow the purchased product language with 55-language document copy; preserve client names, original job titles and addresses. Sixteen tests passed; real signed-in Latvian, English and Russian orders and English three-page PDF verified.
- [x] Removed the English translation from the client contact's job title in the six ALPS orders, so the document shows only "Sociālo Tīklu Administratore"; verified in the database and in the signed-in order sheet.
- [x] Formatted both order-sheet contact blocks equally — contact names in capitals, job titles in small unbolded letters (client title split from the order's name field, manufacturer title "Valdes locekle"); seven tests passed and the real signed-in ALPS order verified in the browser.
- [x] Added private administrator contact-person photo upload, replacement and removal; six tests passed and real-order upload, reload persistence, removal, replacement, mobile width and downloaded PDF verified.
- [x] Added the permitted public Agnese Reķe portrait from Salaspils library to the requested order using the new upload control.
- [x] Matched the supplied Order Sheet layout with manufacturer/client header, central seal, red visualization heading, large product photo and supplied four-logo footer; verified the real signed-in order, mobile width and downloaded single-page PDF, corrected logo crop artifacts, and passed four existing tests.
- [x] Added administrator order visualization beside invoices/delivery documents with buyer/seller details, exact product photos, customer logos, Ilze photo and site branding; four tests passed, two real signed-in orders including an uploaded client logo rendered with all images, PDF downloads and mobile layout verified.

# Fortune cookie SEO
- [x] Added /laimes-cepumi with targeted metadata, WebPage/BreadcrumbList data, existing photo and product links; linked from homepage and static catalog and added to sitemap. Verified desktop/mobile, loaded photo, offer dialog and shop navigation; live changes need publishing.

# Project monitoring
- [x] Swept cart/invoice/card, confirmation, payment hooks, saved-order documents, account/reorder/tracking, email jobs and live order triggers; fixed draft restoration, discounted subtotal/shipping preservation, billing-address substitution and omitted confirmation details. 35 tests passed; signed-in reload and both card handoffs verified without a charge; payment/notification functions deployed. Settled records untouched; full charged-order/email flow remains unverified.
- [x] Corrected card checkout's account-scoped buyer draft; ten tests passed and a signed-in product → invoice → card checkout request retained the 20% agency discount, event name/date and delivery address despite conflicting legacy values. Verification stopped before card payment.
- [x] Corrected recent AI chat context and deployed ai-chat; four tests passed, a real eleventh question answered correctly and restored after reload, and only the test conversation was removed. Monitoring returned one pending finding rather than three; it is resolved.

# ERVY chocolates
- [x] Moved the five-hazelnut-praline product immediately after the ERVY chocolate bar and added a main design photo with black ERVY logos on every white chocolate, leaving the box unprinted; order test passed and live category/product image verified, existing price retained.

# Truffles
- [x] Copied Red Dot truffles into the supplied gold-lined 22.5 × 17.5 cm box with an equally sized clear lid alongside; retained EUR 120 source price and source product, synchronized catalog, passed 27 tests and verified category-to-product navigation and loaded photo on desktop/mobile.
- [x] Added Red Dot logo inner-lid and outer-lid photos to the wooden truffle box, retained original photo and EUR 120 price; both loaded gallery views verified in the browser.
- [x] Added wooden truffle gift box at EUR 120 including VAT with edited supplied box photo and catalog links; 24 catalog tests passed, category-to-product navigation, price and loaded image verified on desktop/mobile.
- [x] Copied the five-truffle BDO three-panel product into a separate twelve-truffle box using the supplied contents reference and matching design; retained the source and copied EUR 25 price, synchronized catalog links, passed 23 tests and verified the live price and 1536×1920 image on desktop/mobile.
- [x] Added a separate 30-truffle three-piece gift product with a winter-scene lid, full-size branded card and white/burgundy/green/navy previews; source product retained, copied EUR 50 price, 21 tests passed and all gallery variants verified live.
- [x] Added burgundy, forest-green and navy-blue design preview photos to the 30-truffle box, retaining white and EUR 50; verified selecting all three in the live gallery.
- [x] Copied the branded box into a 30-truffle EUR 50 product with a square BDO Christmas design, a red cranberry row and catalog links; 20 tests passed and live product price, contents and 1536px image verified.
- [x] Added a branded 12-truffle Christmas gift box at EUR 25 including VAT, with BDO preview logo and LV/RU/EN greetings on the same box; synchronized catalog links, passed 18 tests and verified the live product price, contents, greetings and loaded image.
- [x] Added Belgian-cookie milk-chocolate and Black Balsam ganache dark-chocolate truffles at EUR 3 per piece including VAT with supplied main photos; synchronized catalog links, passed 17 tests and verified both live product prices and loaded images.
- [x] Matched supplied photos by visible decoration (not verified filling), added cookie/mocha/coconut products at EUR 3 with detailed descriptions left for the user, and verified 12 loaded primary photos across 14 products on the live shop plus all three new product pages; 15 catalog tests passed. Blackcurrant and white-chocolate variants remain without photos because supplied images do not match them. Uploaded originals are only 100px thumbnails.
- [x] Added six decorated cream-filled truffle products at EUR 3 per piece including VAT, retaining previous products and leaving photos unset; synchronized catalog links, passed 12 catalog tests and verified all six prices, decorations and product pages through the 11-product category.
- [x] Added the four requested cranberry, caramel/spice, hazelnut and white-chocolate truffle products at EUR 3 per piece including VAT, without photos; synchronized catalog links, passed six catalog tests and verified all four product pages through the five-product Trifeles category.
- [x] Created “Trifeles” as the second top-level shop category and added milk-chocolate truffles with gingerbread-flavoured cream filling at EUR 3 per piece including VAT, without an invented product photo; synchronized catalog links, passed two price/order tests and verified category-to-product navigation and the displayed price in the browser.

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
- [x] Added the supplied "Super Vision" white-chocolate-bar photo as the first and only image of "8.7 x 19.7 cm Šokolāde ar apdruku" (previously had none); verified the live product page renders it at 1536×1024 and the asset returns 200 image/png.
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

# Chocolate in 3D gun shape product
- [x] Add "Šokolāde 3D ieroča formā" as a published product at EUR 15.00 per piece including VAT in its own shop category, with LV/EN/RU names and descriptions, a preparation service copied from the Oscar statuette category, an AI preview photo, catalog and sitemap entries, and one passing price/category test; live product page checked for the EUR 15.00 price and the full-size photo.
- [x] Move "Šokolāde 3D ieroča formā" into the "Īpašu formu šokolādes" category, remove its separate category and the duplicated preparation service, refresh the catalog directory and sitemap, and update the test; live category page checked.

## Verification limits
- Live site changes require publishing and a new Ahrefs crawl; screenshot counts are historical, not a fresh verdict.
- Route canonical and Article/hreflang metadata are still client-rendered. Removed the misleading homepage canonical fallback on every route; fully route-specific initial HTML needs hosting prerendering or a separate approved SSR migration.
- GPTBot sample responses were 0.24–0.40 seconds today; the historical AI-crawler latency was not reproduced and hosting-side timing is not controlled by these edits.

## Truffle box Christmas background
- [x] Give the "Kaste ar trifelēm — koka kastē" product photos a festive Christmas background (evergreen, gold tones, fairy lights, candle glow) while keeping the wooden box, golden clasp, truffles and Red Dot logo on both lid sides unchanged; publish the three edited photos, make the open-box view primary, and keep the two plain-background logo views after them. Product page checked: five thumbnails in one even row, no build errors.

## Customer logo upload on invoice page
- [x] Add a per-item "Jūsu logo vizualizācijai" upload section on /rekins (lv/en/ru/et) that stores the logo on the cart item so it flows into the order and the visualization; verified end-to-end with a test order (logo visible on the visualization page).

## Power & Beauty Studio coffee chocolate
- [x] Copied the 7 g bagged coffee chocolate as a separate white-chocolate product with the supplied Power & Beauty Studio logo; retained EUR 2.42 source price/category, synchronized catalog links, passed the copy test and verified the real product heading, price and loaded 1536px photo.
