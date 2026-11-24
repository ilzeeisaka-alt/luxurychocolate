# Buyer-choice flow check

Rule: The buyer's selected agency discount, event name/date and delivery address belong to that buyer's current purchase and must survive cart, invoice, payment and saved-order handoffs. Settled records are not rewritten.

| Place | Code-read outcome |
| --- | --- |
| Cart `/grozs`, including direct card checkout | Fixed auth hydration/account-switch restoration before draft writes. Signed-in reload and direct card request verified in browser. |
| Invoice `/rekins`, print/PDF, 50% modes | Fixed discount restoration after auth loads. All document modes use the same totals/event/address state. Signed-in reload and invoice-to-card request verified. |
| Invoice order confirmation | Existing event/address persistence follows rule; added agency-discount notes and notification fields for new orders only. |
| Card `/kase`, shared draft reader | Previous fix uses only authenticated account-scoped drafts; both entry paths verified with conflicting legacy values. |
| `create-shop-checkout` | Reads supplied fields, saves events in notes/address on pending order, computes agency discount and sends a one-off Stripe coupon; follows rule. |
| `payments-webhook` shop payment | Fixed pre-coupon subtotal/shipping overwrite and billing-address substitution. Shared payment helper tests cover discounted amounts, explicit shipping, billing fallback and settled-status guards. Only pending orders may update. |
| Alternate `create-cake-checkout` and cake payment handler | No frontend caller or cart agency/event form. Uses its own supplied metadata and Stripe address, not buyer draft; no old draft read exists. No change. |
| Administrator orders `/admin` | Reads saved order totals/address/notes; status and admin-note edits do not replace buyer fields. Follows rule. |
| Administrator/customer invoices and delivery documents | Customer route reuses `AdminInvoice`, which reads saved totals, delivery address and event notes; half-payment/PDF/print use that same order. Follows rule; no historical recalculation. |
| Order Sheet | Uses saved order address and event props from invoice loader; no draft lookup. Follows rule. |
| Customer account/profile/order history/reorder | Profile editing separate; history uses saved totals/address; reorder copies purchased items/logos, not past order event notes. Follows rule. |
| Checkout return/thank-you | Reads saved order totals and provides saved-document links; does not rebuild buyer fields from legacy drafts. Follows rule. |
| Tracking page/live updates | Displays saved order delivery address and retains the order snapshot. Follows rule. |
| `notify-admin` order confirmation | Fixed omitted event/delivery/discount fields in new confirmation emails. |
| Paid-shop confirmation email | Added saved notes containing event/agency-discount details; already reads saved address and charged total. |
| Order-document email/function/template | Reads saved total and links to protected saved invoice/Order Sheet, not drafts. Follows rule. |
| Order-status email | Only reads saved order/contact/status; does not alter purchase fields. Follows rule. |
| Abandoned-cart reminder job | Product-price reminder, not a final checkout total; no browser draft access and no order-field mutation. No change. |
| Database order/order-item triggers | Live trigger query returned only order `update_updated_at_column`, which updates the timestamp, not buyer fields. No function transforms agency/event/delivery values. |

## Verification limits
- Browser checks stop at the card-checkout request; no card charge or signed Stripe payment event was sent.
- Payment helper is regression-tested and payment/notification functions deployed, but a real charged order/email after payment remains unverified.
- Frontend changes need publishing. Existing paid/sent/refunded/closed orders, permissions and settings were not changed.