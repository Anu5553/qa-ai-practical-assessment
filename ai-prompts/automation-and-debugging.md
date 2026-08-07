# AI Prompts – Automation and Debugging

(Prompts used for automation structure, assertions, and analyzing failures/logs.)

---

## Entry 1

- **Prompt:** Scaffold PrismStructure for Toolshop only: package.json, playwright.config.js, UI pageobjects with POManager, API pageobjects/helpers, tests/UI Test and tests/API Test skeletons with @Smoke/@Regression IDs, execution-reports folder. Follow existing Prism patterns. No full test logic yet — use test.skip placeholders.
- **AI Response Summary:** Created PrismStructure with UI pages (login, register, home, product, cart, checkout, account), POManager, API auth/cart/products/invoice stubs, apiHelper, dynamic user helper, smoke/regression spec skeletons, env example, smoke/regression npm scripts.
- **Debugging Outcome:** Structure-only pass. Locators are provisional (`data-test` first) and refined in later steps against the live UI. Invoice double-confirm helper stubbed on checkoutPage for AC2.

---

## Entry 2

- **Prompt:** Implement UI Smoke TC-UI-01..05 only. Use live `data-test` selectors. Register → login → browse in-stock product → add to cart + qty → COD checkout with confirm twice → My Invoices. Keep serial mode.
- **AI Response Summary:** Implemented page objects and `01_smokeUITest.spec.js` with serial shared user; unique email factory; wait for `/carts` response + toast on add-to-cart.
- **Debugging Outcome:** First fail — cart empty because add-to-cart raced before API finished; fixed with response+toast wait. Second fail — billing `proceed-3` disabled (house number empty / Albania lookup); switched to Netherlands `1111AA` + house `1`. Third fail — invoice missing after one confirm path; confirmed assignment rule: first Confirm → “Payment was successful”, second Confirm → invoice + “Thanks for your order”. All 5 UI Smoke tests passed.

---

## Entry 3

- **Prompt:** Implement UI Regression TC-UI-06..08 only: invalid login error, empty cart cannot checkout, profile matches registered user. Use existing page objects.
- **AI Response Summary:** Added `loginExpectingError`, empty-checkout helpers, profile field waits; implemented `02_regressionUITest.spec.js`.
- **Debugging Outcome:** TC-UI-06/08 passed first run. TC-UI-07 empty-message text was flaky on blank cart step; asserted no cart badge, hidden proceed/finish, and no payment success instead. All 3 Regression UI tests passed.

---

## Entry 4

- **Prompt:** Implement API Smoke TC-API-01..06: register, login token, create cart, products+add, verify cart, COD invoice. Use assignment invoice fields; keep serial shared state.
- **AI Response Summary:** Updated dynamic user/invoice helpers and API pageobjects; implemented serial `01_smokeAPITest.spec.js` with bearer auth chaining.
- **Debugging Outcome:** Flat US billing failed country validation; NL address matching register (`Verhoevenstraat` / `1111AA`) plus `/payment/check` before `/invoices` succeeded. All 6 API Smoke tests passed.

---

## Entry 5

- **Prompt:** _To be added when implementing API Regression (Step 9)._
- **AI Response Summary:** _To be added._
- **Debugging Outcome:** _To be added._
