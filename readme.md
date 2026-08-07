# QA AI Practical Assessment

**Application Under Test:** [Practice Software Testing Toolshop](https://practicesoftwaretesting.com/)  
**API Documentation:** [API Docs](https://api.practicesoftwaretesting.com/api/documentation)  
**Repository:** https://github.com/Anu5553/qa-ai-practical-assessment

---

## Project Information

| Item | Detail |
|------|--------|
| Framework | Playwright (Prism-style structure) |
| Location | `PrismStructure/` |
| Manual cases | `FunctionalTestCase.csv` (TC-M-01..08) |
| UI automation | `PrismStructure/tests/UI Test/` (TC-UI-01..08) |
| API automation | `PrismStructure/tests/API Test/` (TC-API-01..08) |
| Test data | `PrismStructure/UI/utilities/testDataFactory.js`, `PrismStructure/API/utilities/createDynamicData.js`, `PrismStructure/UI/resources/data/testData.json` |
| Env sample | `PrismStructure/.env.example` (public base URLs only) |

### Prerequisites

1. Node.js 18+ recommended  
2. From `PrismStructure/`:

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

---

## Test Execution

Run all commands from `PrismStructure/`.

### Smoke Tests

```bash
npm run test:smoke
# or
npx playwright test --grep @Smoke --workers=1
```

UI Smoke only:

```bash
npm run test:ui:smoke
```

API Smoke only:

```bash
npm run test:api:smoke
```

### Regression Tests

```bash
npm run test:regression
# or
npx playwright test --grep @Regression --workers=1
```

UI / API Regression:

```bash
npm run test:ui:regression
npm run test:api:regression
```

### Full Smoke + Regression

```bash
npx playwright test --grep "@Smoke|@Regression" --workers=1
```

---

## Reports

| Artifact | Path |
|----------|------|
| HTML report (generated) | `PrismStructure/execution-reports/html-report/index.html` |
| Latest run summary (committed) | `PrismStructure/execution-reports/latest-run-summary.md` |
| Traces / screenshots on failure | `PrismStructure/execution-reports/test-output/` |

Open HTML report:

```bash
npm run report
```

**Latest recorded result:** 16 passed (UI 8 + API 8), Smoke + Regression.

---

## Manual Testing

Open `FunctionalTestCase.csv` and execute TC-M-01..08 against https://practicesoftwaretesting.com/.  
Note: invoice generation requires pressing **Confirm twice**.

---

## AI Prompts Folder and History Expectations

All AI prompt history is under `ai-prompts/`:

- `requirements-and-planning.md`
- `test-design.md`
- `test-data.md`
- `automation-and-debugging.md`
- `documentation-and-summary.md`

Each entry records Prompt → AI Response Summary → Validation / Debugging / Edits.

---

## Repository Structure

```text
qa-ai-practical-assessment/
├── FunctionalTestCase.csv
├── PrismStructure/
├── project-info.md
├── readme.md
├── ai-prompts/
└── .Cursor/
```
