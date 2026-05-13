# 📐 ARCHITECTURE.md

## 🧠 System Overview

This project is an **AI Spend Audit Engine** that analyzes a user’s SaaS subscriptions (ChatGPT, Claude, Copilot, Cursor, Gemini, APIs) and recommends cost optimizations based on real pricing + usage patterns.

Instead of being just a UI app, it behaves like a **rule-based financial decision system**.

---

## 🔄 High-Level Data Flow

The entire system follows a simple but strict pipeline:

> **User Input → auditEngine → evaluateTool → buildAuditResult → UI Rendering**

---

### Breakdown:

#### User Input
- Tool name (ChatGPT, Claude, etc.)
- Plan type (Plus, Pro, Free, etc.)
- Seats / team size
- Use case (coding / writing / mixed)
- Optional monthly spend

↓

#### auditEngine
- Accepts multiple tools
- Runs `evaluateTool()` for each tool
- Aggregates total savings

↓

#### evaluateTool
- Applies rule-based logic per tool
- Calculates:
  - current cost
  - optimized cost
  - savings
- Decides recommendation

↓

#### buildAuditResult
- Normalizes every result into a consistent structure
- Adds:
  - status
  - computed fields
  - pricing trace (source metadata)

↓

#### UI Layer (React)
- Displays:
  - savings cards
  - recommendations
  - charts
  - audit summary dashboard

---

## 🧩 Core Design Philosophy

### 1. Separation of Concerns (VERY IMPORTANT)

Each layer has a strict responsibility:

- `auditEngine` → orchestration layer (handles multiple tools)
- `evaluateTool` → decision engine (business logic)
- `buildAuditResult` → normalization layer (ensures consistency)
- `pricingData` → raw pricing source
- `pricingTrace` → explainability / transparency layer

👉 This prevents UI breakage and keeps logic scalable.

---

### 2. Why `buildAuditResult` exists

Without it, every rule would return different object shapes.

So instead:

✔ We centralize formatting  
✔ Ensure consistent API response  
✔ Add computed fields like status & pricing source  
✔ Keep UI completely dumb (only renders data)

👉 This is what makes the system **production-grade**.

---

### 3. Why rule-based system is used

Instead of ML or complex inference:

- Rules are transparent
- Easy to debug
- Easy to extend
- Finance-friendly (auditable logic)

👉 This is important because the system is meant for **cost decisions, not guesses**.

---

### 4. Why pricing is split into 2 layers

#### pricingData.js
- Actual numbers (plans, costs)

#### pricingTrace.js
- Explanation of pricing source

👉 This gives:

- transparency  
- trust  
- auditability  

---

## 🧠 Architecture Diagram

```mermaid
graph TD

A[User Input Form] --> B[auditEngine]

B --> C[evaluateTool - Rule Engine]

C --> D[pricingData.js]
C --> E[pricingTrace.js]

C --> F[buildAuditResult]

F --> G[Normalized Result Object]

G --> H[Results.jsx]
G --> I[Savings Dashboard]
G --> J[Recommendation Cards]
G --> K[Charts - Recharts]

%% Styling
classDef input fill:#E3F2FD,stroke:#1E88E5,color:#000;
classDef engine fill:#FFF3E0,stroke:#FB8C00,color:#000;
classDef data fill:#E8F5E9,stroke:#43A047,color:#000;
classDef ui fill:#F3E5F5,stroke:#8E24AA,color:#000;

class A input;
class B,C engine;
class D,E data;
class F,G engine;
class H,I,J,K ui;
