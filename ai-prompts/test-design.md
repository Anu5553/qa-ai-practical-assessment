# AI Prompts – Test Design

(Prompts used to generate or refine test scenarios and test cases for UI + API.)

---

## Entry 1

- **Prompt:** Write 4 Smoke manual test cases for Toolshop AC1 (register/login) and AC2 (browse cart COD invoice with double confirm). Output CSV columns: Test Case ID, Title, Preconditions, Test Steps, Expected Result, Test Type, Priority, Tag. Use IDs TC-M-01 to TC-M-04 and Tag @Smoke only.
- **AI Response Summary:** Produced TC-M-01 register valid, TC-M-02 login, TC-M-03 browse/product detail, TC-M-04 multi-item cart + qty update + COD + double confirm + My Invoices.
- **Validation Notes:** Kept all four as happy-path Smoke. Verified TC-M-04 includes second confirm per assignment. Removed any payment methods other than COD.

---

## Entry 2

- **Prompt:** Add exactly 4 Regression manual cases (TC-M-05 to TC-M-08) for negatives and edge only: invalid/missing email register, wrong password login, empty cart checkout blocked, profile matches registration. No new features. Tag @Regression.
- **AI Response Summary:** Added TC-M-05 to TC-M-08 covering invalid registration email, failed login, empty-cart checkout block, and profile consistency check.
- **Validation Notes:** Confirmed total manual suite is 8 (within 5–8 limit). No duplicate Smoke coverage. Profile case maps to AC1 “verify profile information.”

---

## Entry 3

- **Prompt:** Map each manual case TC-M-01..08 to a future UI automation ID (TC-UI-xx) and say Smoke or Regression. Do not write Playwright code yet.
- **AI Response Summary:** TC-M-01→TC-UI-01 Smoke; TC-M-02→TC-UI-02 Smoke; TC-M-03→TC-UI-03 Smoke; TC-M-04→TC-UI-05 Smoke/E2E; TC-M-06→TC-UI-06 Regression; TC-M-07→TC-UI-07 Regression; TC-M-08→TC-UI-08 Regression; cart qty portion of TC-M-04 also aligns with TC-UI-04 Smoke.
- **Validation Notes:** Accepted mapping for later automation. UI will stay at 7–8 specs. Manual remains source of truth in `FunctionalTestCase.csv`.

---

## Entry 4

- **Prompt:** Map API AC1/AC2 to 8 API test case IDs (TC-API-01..08). Mark each @Smoke or @Regression. Include invalid login and invoice without token or invalid cart as Regression.
- **AI Response Summary:** Smoke: register, login token, create cart, get products + add to cart, verify cart, generate COD invoice. Regression: invalid login 4xx; invoice without token / invalid cart error.
- **Validation Notes:** Matches assignment API flow and keeps count at 8. Will be detailed in automation phase; recorded here for traceability from requirements → manual → UI/API IDs.
