# Project Info

**Primary AI Tool(s) Used:** Cursor AI

**Application Under Test:** PracticeSoftwareTesting Toolshop – Checkout & Application Flow

**Assessment Start Date:** 2026-08-07

**Submission Date:** _TBD_

---

## Project Summary

This assessment covers Practice Software Testing Toolshop (v5.0) for a new-user path: registration/login, browse and cart, cash-on-delivery checkout, and invoice verification (UI confirm pressed twice). Coverage is balanced across manual, UI automation, and API automation with a small Smoke set plus focused Regression negatives.

---

## Requirement and Risk Analysis

### System Under Test

| Item | Detail |
|------|--------|
| UI | https://practicesoftwaretesting.com/ |
| API | https://api.practicesoftwaretesting.com/ (see `/api/documentation`) |
| Domain | Ecommerce Toolshop – products, account, cart, checkout, invoices |

### UI Acceptance Criteria

**AC1 – User Registration & Login**  
The user should be able to register with valid details, log in using the registered credentials, and verify their profile information successfully.

**AC2 – End-to-End Purchase Flow**  
The user should be able to browse products, add multiple items to the cart (including updating quantity), complete checkout using Cash on Delivery, press confirm twice to generate the invoice, and successfully view the generated invoice under My Invoices.

### API Acceptance Criteria

**API AC1 – User Authentication & Cart Creation**  
A new user should be able to register via API, log in with the registered credentials, obtain a valid bearer token, and create a new cart successfully.

**API AC2 – Product Selection & Invoice Generation**  
Using the bearer token, the user should be able to retrieve products, add selected products to the cart, verify the cart contents, and successfully generate an invoice with the required customer and order details (`payment_method: cash-on-delivery`, dynamic `cart_id`, billing fields as per assignment example).

### Scope

| In scope (Core) | Out of scope for Core |
|-----------------|------------------------|
| Register / Login / Profile | Admin / back-office |
| Browse / product detail / cart qty | Full payment-gateway matrix beyond COD |
| COD checkout + invoice (double confirm) | Performance / load testing |
| API auth → cart → products → invoice | Visual / accessibility deep audits |
| Smoke + selected negative Regression (max 8 cases per type) | Large data-driven matrices |

### Risks

| Risk | Area | Impact | Mitigation in test design |
|------|------|--------|---------------------------|
| Invoice missing if confirm clicked only once | UI checkout | False fail / missed defect | Dedicated Smoke E2E with explicit double confirm |
| Email/user not unique across runs | Registration | Flaky create-user | Unique email per run in test data strategy |
| Missing/invalid bearer token | API | Unauthorized failures | API Smoke creates token; Regression covers invalid/missing token |
| Empty cart checkout | Cart/Checkout | Invalid order | Regression case blocks checkout / invoice |
| Stale `cart_id` in invoice payload | API invoice | 4xx / wrong order | Chain cart_id from create-cart response |
| Quantity / stock mismatch | Cart | Incorrect totals | Smoke updates quantity and verifies cart before checkout |

### Test Strategy Snapshot (Smoke vs Regression)

| Type | Smoke focus | Regression focus |
|------|-------------|------------------|
| Manual | Register, login, browse, COD+invoice E2E | Invalid register/login, empty cart, profile match |
| UI | Same happy paths automated in Playwright | Invalid login, empty cart, profile check |
| API | Register → token → cart → products → invoice | Invalid login, unauthorized/invalid invoice |

---

## Tools Used

- AI: Cursor AI (iterative prompting; Auto for planning docs, stronger model planned for automation coding)
- UI automation: Playwright (Prism Framework) — to be implemented under `PrismStructure/`
- API automation: Playwright request layer (same PrismStructure)
- Manual: `FunctionalTestCase.csv`
- Browser: Chromium (primary for automation)
- Reporting: Playwright HTML / execution reports under PrismStructure (to be added after runs)

---

## Setup Summary

### 1. How you provide project and system-under-test context to the tool

Share SUT URLs (UI + API docs), assignment ACs, invoice double-confirm rule, COD invoice payload example, max 5–8 cases per type, Smoke/Regression tags, and the required repository structure. Keep secrets out of prompts. Use short, single-purpose prompts (one concern per chat).

### 2. How you use AI for requirement analysis

Start with journey discovery, then narrow to AC1/AC2 (UI) and API AC1/AC2, then ask for risks and Smoke/Regression split. Validate every AI list against the live app/API and the assignment document before locking scope. Full prompt trail is in `ai-prompts/requirements-and-planning.md`.

### 3. How you use AI for test planning and strategy (UI vs API, smoke vs regression, etc.)

Use AI to propose a small Core matrix (Manual / UI / API × Smoke / Regression), then trim to 7–8 cases per type. Smoke owns the business-critical happy path (auth + cart + COD invoice). Regression owns negatives and edge checks that protect auth and checkout integrity.

### 4. How you use AI for manual test case design (functional, edge, negative, non-functional)

Prompt iteratively: first Smoke happy-path cases for AC1/AC2, then Regression negatives/edge only, then ID mapping to UI/API automation. Review each batch against scope (max 8), double-confirm invoice rule, and COD-only checkout. Final manual suite lives in `FunctionalTestCase.csv` (TC-M-01..08: 4 @Smoke, 4 @Regression — positive, negative, edge). Prompt history: `ai-prompts/test-design.md`.

### 5. How you use AI for automation design (framework choice, structure, data, reusable utilities)

_To be completed in automation phase._

### 6. How you validate and refine AI-generated test cases and scripts

_To be completed as cases and scripts are produced._

### 7. How you use AI for test data generation, environment assumptions, and API payloads

_To be completed in Step 4._

### 8. How you use AI for debugging failing tests and interpreting logs

_To be completed during automation execution._

### 9. What information you avoid sharing unnecessarily with AI tools

Do not share passwords, tokens, private keys, or personal production data. Use disposable test users only. Do not paste full `.env` secrets into prompts.

### 10. How you would reuse this QA workflow in a real project

_To be completed in documentation phase._
