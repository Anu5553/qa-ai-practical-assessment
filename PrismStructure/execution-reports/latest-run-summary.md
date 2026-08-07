# Execution Evidence

**Suite:** Smoke + Regression (UI + API)  
**Command:** `npx playwright test --grep "@Smoke|@Regression" --workers=1`  
**Date:** 2026-08-07  
**Result:** **16 passed** (1.5m)

## Coverage

| Layer | Cases | Tags | Status |
|-------|-------|------|--------|
| UI Smoke | TC-UI-01..05 | @Smoke | Passed |
| UI Regression | TC-UI-06..08 | @Regression | Passed |
| API Smoke | TC-API-01..06 | @Smoke | Passed |
| API Regression | TC-API-07..08 | @Regression | Passed |

## Report location

After a local run, open:

```bash
npm run report
```

HTML output path: `execution-reports/html-report/index.html` (generated locally; ignored from git).
