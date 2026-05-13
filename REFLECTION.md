# 🧠 REFLECTION.md

## 🧭 What I built

I built an **AI Spend Audit Engine** that analyzes SaaS subscriptions and suggests cost optimizations using rule-based reasoning.

It simulates how a financial analyst would review AI tool usage inside a company.

---

## 🧠 What I learned

### 1. Product thinking > coding

The hardest part was not UI or logic.

It was deciding:

> “What actually counts as an optimization?”

---

### 2. Rule-based systems are powerful

Instead of ML or complex inference, I used:

- deterministic rules
- explicit conditions
- explainable outputs

This made the system:

- easier to debug
- easier to extend
- more trustworthy

---

### 3. Data consistency is everything

I learned that:

> If backend shape is inconsistent, frontend breaks silently.

That’s why I introduced:

- `buildAuditResult`
- strict return structure
- normalized output layer

---

### 4. Separation of concerns matters more than features

I structured the system into:

- evaluation layer (logic)
- normalization layer (formatting)
- data layer (pricing)
- UI layer (presentation)

This made scaling possible.

---

## 🧱 Biggest challenges

### 1. Inconsistent data flow
Initially, different rules returned different shapes → broke UI.

### 2. Chart rendering issues
Recharts failed due to invalid container sizing.

### 3. Nested state bugs
API response shape mismatch caused silent frontend failures.

---

## 🛠️ How I solved them

- standardized all outputs using `buildAuditResult`
- added defensive checks in UI (`Array.isArray`)
- debugged full data flow step-by-step
- normalized backend → frontend contract

---

## 🧠 Key insight

> UI should never care how logic is computed — only what the final structured output is.

This single principle fixed most architectural issues.

---

## 🚀 What I would improve next

- Add scoring system for “savings priority”
- Add AI-generated explanations (LLM layer)
- Build exportable PDF reports
- Add historical audit tracking
- Convert into SaaS with authentication

---

## 🧭 Final thought

This project taught me how real-world systems are not about writing code —

they are about:

- structure
- clarity
- predictability
- and decision design
