# TESTS.md

## Overview

This file documents the automated tests written for the AI Spend Audit Engine.  
These tests validate the core recommendation logic of the audit system, ensuring correct downgrade/upgrade suggestions based on tool, plan, seats, and usage context.

---

## Test Runner

All tests are written using Jest.

Run tests using:

```bash
npm test
```

---

## Test Coverage

### 1. ChatGPT Plus → Go Downgrade

- **File:** `src/tests/auditEngine.test.js`
- **What it tests:**  
  Ensures that solo users on ChatGPT Plus are recommended to downgrade to ChatGPT Go when applicable.
- **Expected behavior:**  
  `"Downgrade to ChatGPT Go"`

---

### 2. Copilot ProPlus → Pro Downgrade

- **File:** `src/tests/auditEngine.test.js`
- **What it tests:**  
  Validates that Copilot ProPlus for a single user is downgraded to Pro.
- **Expected behavior:**  
  `"Downgrade to Copilot Pro"`

---

### 3. Claude Free Team Upgrade

- **File:** `src/tests/auditEngine.test.js`
- **What it tests:**  
  Ensures teams using Claude Free with 3+ seats are recommended to upgrade.
- **Expected behavior:**  
  `"Upgrade to Claude Pro"`

---

### 4. Cursor Pro → Hobby Downgrade

- **File:** `src/tests/auditEngine.test.js`
- **What it tests:**  
  Checks that solo Cursor Pro users are recommended to downgrade to Hobby.
- **Expected behavior:**  
  `"Downgrade to Cursor Hobby"`

---

### 5. No Optimization Case

- **File:** `src/tests/auditEngine.test.js`
- **What it tests:**  
  Ensures that optimized configurations return no savings opportunity.
- **Expected behavior:**  
  `"Current plan looks efficient"`

---

## Notes

- Tests validate business logic only, not UI.
- All pricing and optimization logic is deterministic (no AI dependency).
- Tests are designed to ensure regression safety for the audit engine.
```

---

# 👍 Done

Now your project has:
- clean working tests
- proper documentation (TESTS.md)
- assignment compliance for testing section

---

When you're ready, say:

👉 **"next CI"**

and I’ll set up your GitHub Actions workflow in a way that will **not break Vite + Jest + ESM again**.