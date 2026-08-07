# AI Prompts – Requirements and Planning

(Record prompts and responses used for understanding the Toolshop flow, identifying risks, and drafting the test plan.)

---

## Entry 1

- **Prompt:** List the main user journeys on https://practicesoftwaretesting.com/ (Toolshop) that matter for ecommerce QA. Keep the list short. Focus on shop, account, cart, and checkout only.
- **AI Response (short summary):** Journeys identified: browse/search products, open product detail, register, login, manage profile, add to cart / update quantity, checkout (payment methods including cash-on-delivery), view My Invoices.
- **Validation Notes:** Cross-checked against live Toolshop v5.0 UI title and public product API (`/products` returns catalog items with stock/price). Kept scope to account + purchase + invoice only for this assessment. Dropped unrelated journeys (rentals, admin) from Core scope.

---

## Entry 2

- **Prompt:** From the journey list, draft only AC1 Registration & Login and AC2 Purchase + Invoice for UI. Use Given/When/Then style acceptance criteria. Mention that invoice confirm must be pressed twice.
- **AI Response (short summary):**
  - **AC1:** User registers with valid details, logs in with those credentials, and can view matching profile information.
  - **AC2:** User browses products, adds multiple items (updates quantity), completes COD checkout, confirms invoice generation twice, and sees the invoice under My Invoices.
- **Validation Notes:** Aligned wording with the assignment high-level flow examples. Explicitly retained the double-confirm invoice rule from the assignment document. Did not expand ACs beyond Core.

---

## Entry 3

- **Prompt:** For the same Toolshop flow, list API acceptance criteria matching register → login (bearer token) → create cart → products → add to cart → verify cart → generate invoice with cash-on-delivery payload fields from the assignment.
- **AI Response (short summary):**
  - **API AC1:** Register → login → obtain bearer token → create cart successfully.
  - **API AC2:** Retrieve products → add products to cart → verify cart → POST invoice with billing fields, `payment_method: cash-on-delivery`, `cart_id`, and `payment_details: {}`.
- **Validation Notes:** Confirmed invoice body field names against the assignment example (`billing_street`, `billing_city`, `billing_state`, `billing_country`, `billing_postal_code`, `payment_method`, `cart_id`, `payment_details`). Marked `cart_id` as dynamic (must come from create-cart response).

---

## Entry 4

- **Prompt:** Identify test risks for auth, cart, checkout, and invoice double-confirm. Then propose a Smoke vs Regression split for Manual, UI, and API with a maximum of 8 cases per type.
- **AI Response (short summary):** Risks: duplicate/invalid registration, auth token expiry/missing header, empty cart checkout, stock/quantity edge cases, flaky invoice if confirm clicked once, COD payload validation, data uniqueness (email). Smoke = happy-path register/login/cart/checkout/invoice; Regression = negatives and edge (invalid login, empty cart, unauthorized invoice).
- **Validation Notes:** Accepted Smoke/Regression split for Core. Limited to 7–8 cases per type as required. Deferred deep non-functional (performance/security scan) beyond light negative API auth checks to stay within 5–10 hour Core effort.
