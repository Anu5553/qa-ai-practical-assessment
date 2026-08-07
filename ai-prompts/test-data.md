# AI Prompts – Test Data

(Prompts used to generate test data for UI + API.)

---

## Entry 1

- **Prompt:** Suggest registration test data for Toolshop UI/API. Need unique email each run, valid password pattern, and first/last name. Do not invent production PII. Give one positive set and one invalid-email set for TC-M-05.
- **AI Response Summary:** Positive: first/last name sample values; email pattern like `qa.toolshop.<timestamp>@example.com`; password meeting typical length rules. Invalid: blank email and `invalid-email` (no @) for negative register.
- **Validation Notes:** Accepted timestamp/unique email approach to avoid collision on shared demo app. Will generate email at runtime in automation; manual CSV uses placeholder instruction “unique email.” No real personal emails.

---

## Entry 2

- **Prompt:** Using the assignment invoice POST body, list which fields stay fixed for COD Smoke and which must be dynamic. Body fields: billing_street, billing_city, billing_state, billing_country, billing_postal_code, payment_method, cart_id, payment_details.
- **AI Response Summary:** Fixed for Smoke: billing address sample values, `payment_method: cash-on-delivery`, `payment_details: {}`. Dynamic: `cart_id` from create-cart response. Auth header bearer token from login is required and must not be hardcoded in repo.
- **Validation Notes:** Matched assignment example field names exactly. Confirmed COD only for Core. Token and cart_id treated as runtime secrets/session data — not committed as real tokens.

---

## Entry 3

- **Prompt:** List environment assumptions for Toolshop manual + Playwright UI + API tests. Include base URLs only. Call out what not to store in git.
- **AI Response Summary:** UI base `https://practicesoftwaretesting.com/`; API base `https://api.practicesoftwaretesting.com/`. Public demo — no private staging credentials required. Do not commit bearer tokens, passwords of reused accounts, or `.env` secrets. Prefer ephemeral users per run.
- **Validation Notes:** Aligned with assignment SUT URLs. Documented in project-info for README reuse in later step.

---

## Entry 4

- **Prompt:** Propose minimal shared test-data notes for cart Smoke: at least one in-stock product from catalog, quantity update value (e.g. 2), and empty-cart precondition for TC-M-07 / API negative invoice.
- **AI Response Summary:** Use any in-stock product from `GET /products` (e.g. first `in_stock: true`). Quantity update to 2 for multi-qty check. Empty cart = new cart with no products or cleared cart before checkout/invoice negative.
- **Validation Notes:** Avoid hardcoding a single product ID that may rotate; automation should resolve product id from API/UI at runtime. Manual testers pick any in-stock catalog item.
