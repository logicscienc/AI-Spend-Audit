## Day 1 — 2026-05-08

**Hours worked:** 5

**What I did:**
- Read and understood the assignment requirements
- Researched AI tool pricing pages
- Created pricingData.js
- Designed initial homepage UI
- Built audit form with tool and plan selection
- Started auditEngine.js and connected it to frontend

**What I learned:**
- The assignment is more about product thinking and business logic than complex coding
- Audit recommendations need realistic financial reasoning

**Blockers / what I'm stuck on:**
- Still deciding how detailed the audit logic should be
- Need to design better optimization scoring logic

**Plan for tomorrow:**
- Add more audit rules
- Improve audit result UI
- Start supporting multiple tool audits


## Day 2 — 2026-05-09

**Hours worked:** 6

**What I did:**
- Expanded `auditEngine.js` with multiple business rules for ChatGPT and Claude
- Added realistic optimization recommendations, savings calculations, and reasoning
- Refactored audit engine structure to support cleaner rule evaluation
- Improved pricing data structure and added helper utilities
- Designed the structure and layout idea for the audit result page
- Planned dynamic multi-tool audit flow for final implementation
- Pushed progress to GitHub with meaningful commit history

**What I learned:**
- Building believable audit logic is more difficult than writing UI
- Recommendation quality depends heavily on reasoning clarity, not just calculations
- The assignment expects product-level thinking, especially around user trust and financial transparency

**Blockers / what I'm stuck on:**
- Still deciding the best UX for adding and managing multiple tools in one audit flow
- Need to improve consistency in pricing structures and naming conventions across tools

**Plan for tomorrow:**
- Add rules for Cursor, Copilot, and Gemini
- Start building dynamic audit result cards using real engine output
- Implement multi-tool state management
- Improve homepage polish and responsiveness



# Day 3 — 2026-05-10

Hours worked: 7

## What I did:

* Built the dynamic audit results page structure using React Router state
* Connected auditEngine output directly to the UI for real-time savings calculations
* Implemented dynamic audit metadata including:

  * audit ID
  * audit completion timing
  * generated timestamp
* Built reusable result page components:

  * Topbar
  * AuditHeroCard
  * SavingsCard
* Added copy-link and native share functionality for audit reports
* Implemented localStorage persistence for audit form entries
* Added aggregate savings calculations:

  * total monthly savings
  * yearly savings
  * spend optimization percentage
* Debugged major data consistency issues between:

  * pricingData
  * toolsData
  * auditEngine rules
* Refactored naming conventions to improve rule matching reliability
* Improved glassmorphism UI styling and responsive layout structure for result cards
* Continued expanding multi-tool audit architecture for scalable recommendation handling

## What I learned:

* Consistent naming conventions across data layers are critical for reliable business logic
* Building dynamic financial dashboards requires careful aggregation and normalization of data
* UI debugging often exposes deeper architecture issues rather than visual issues alone
* Product polish comes from connecting logic, state management, and UX cohesively

## Blockers / what I'm stuck on:

* Still refining how recommendation priority should work when multiple optimization rules match simultaneously
* Need to improve audit result visualization for better readability and user trust
* Considering the best way to represent savings trends and opportunity scoring visually

## Plan for tomorrow:

* Build recommendation cards using real audit engine output
* Add charts/visual indicators for spend optimization insights
* Improve audit summary generation with AI-style explanations
* Refine responsive layout and overall design polish
* Continue expanding audit rules for additional AI tools and edge cases



# Day 4 — 2026-05-11

## What I did today

Today I focused heavily on building and stabilizing the **Audit Engine logic** for my AI Spend Audit project.

I worked on expanding and refining the `auditEngine.jsx`, where I defined multiple **rule-based optimization conditions** for different AI tools like ChatGPT, Claude, GitHub Copilot, Cursor, Gemini, and API-based usage.

Key work completed:

- Built a rule-based decision engine to evaluate AI tool subscriptions
- Implemented cost calculation logic based on:
  - current plan price
  - number of seats
  - usage type (coding, writing, mixed, etc.)
- Added optimization rules such as:
  - Downgrading overkill plans (e.g., Pro → Plus / Free)
  - Detecting team inefficiencies (too many seats on free plans)
  - Suggesting better plans (Business / Team upgrades)
  - Identifying tool overlap (Copilot vs Cursor vs ChatGPT)
- Standardized most return outputs using `buildAuditResult()`
- Improved consistency in returned data structure for UI usage

I also started preparing the **frontend layer (Results page)** by understanding how the flattened data from `results.tools` will be used in UI components like tables, cards, and charts.

---

## What I learned

- How important **consistent data structures** are for frontend stability
- Why returning different object shapes from different conditions breaks UI logic
- How to design a **rule-based evaluation engine** (like a decision system)
- The value of separating:
  - raw evaluation logic (`evaluateTool`)
  - normalization layer (`buildAuditResult`)
  - aggregation layer (`auditEngine`)
- How frontend issues (like chart warnings) often come from **bad or inconsistent backend data**

Also learned a key architecture insight:

> UI should never care how logic is computed — only care about final normalized shape.

---

## Blockers / Issues I faced

- Initially had inconsistent return objects across rules
- Some rules were returning partial data (missing fields like `plan`, `currentCost`, etc.)
- Confusion about whether all rules need identical structure (they do)
- Recharts warning about invalid container width/height (`-1` issue)
- Slight uncertainty about whether audit engine is “complete enough” for UI

---

## How I resolved them

- Standardized return format using `buildAuditResult`
- Ensured all rules include:
  - tool, plan
  - currentCost, optimizedCost
  - monthlySavings, annualSavings
  - recommendation, reason
  - seats, useCase
- Understood that UI must rely on a **flattened structure** later (`results.flatMap(item => item.tools)`)

---

## Plan for tomorrow

- Flatten audit results properly in `Results.jsx`
- Build UI table/card view for tool recommendations
- Fix Recharts container sizing issue
- Start designing:
  - Savings visualization section
  - Summary insights section (AI-generated summary card improvements)
- Improve UX flow of audit results page (make it more readable and dashboard-like)

---

## Current status

Backend logic: ~80% stable  
Frontend integration: in progress  
UI design: starting phase  




# 📘 Day 5 - 2026-05-11

## What I did today
- Structured the Results dashboard into a clean modular architecture (layout, cards, charts, audit, shared)
- Built and integrated `SavingsBreakdownSection` with dynamic monthly/annual toggle
- Implemented `SavingsChart` using Recharts with responsive visualization
- Added custom tooltip (`CustomTooltip`) for better chart UX
- Completed recommendations section with dynamic savings + review logic
- Wired toggle state across multiple sections for consistent UI behavior
- Fixed data flow issues between backend response and frontend rendering
- Improved chart polish (axes, margins, bars, labels)

## What I learned
- How to structure large React dashboards using feature-based folder architecture
- Importance of separating:
  - business logic (utils like `getAuditStatus`)
  - UI components (dumb/presentational components)
- How Recharts works internally (Tooltip, BarChart, dataKey mapping issues)
- Why backend shape consistency is critical (avoiding `reduce is not a function` type errors)
- Better state design for global UI toggles (monthly/annual sync across components)

## Blockers / Issues I faced
- `results.flatMap is not a function` due to incorrect data structure from backend
- `reduce is not a function` caused by treating object as array
- Chart not rendering initially due to wrong `dataKey` mismatch (`name` vs `tool`)
- Tooltip not showing because default Recharts behavior wasn’t replaced correctly
- UI layout overlap issues (chart not visible / spacing issues in grid)

## How I resolved them
- Normalized backend response using `safeResults.results || []`
- Added defensive checks (`Array.isArray`) before transformations
- Fixed Recharts `dataKey` alignment with actual dataset structure
- Properly injected `CustomTooltip` using `Tooltip content={...}`
- Adjusted layout spacing using Tailwind (`h-[350px]`, `margin`, `grid gaps`)
- Debugged step-by-step using console logs at each transformation stage

## Plan for tomorrow
- Add animation polish to charts (smooth transitions, hover effects)
- Improve “Your Inputs” section UI (clean review-style layout)
- Add export feature (PDF / CSV report download)
- Enhance recommendation cards with severity-based grouping
- Start backend optimization for faster summary generation

## Current status
- Dashboard UI: ~85% complete
- Core data pipeline: stable
- Charts: working + polished basic version
- Recommendations system: functional
- Next focus: UX polish + export features + final UI refinement



# Day 6 — 2026-05-12

## What I Did Today

- Debugged the audit results flow between frontend and backend.
- Fixed the `handleSubmit` navigation state structure issue.
- Identified that `results` was being passed as a nested object instead of a direct array.

### Corrected the data flow from:

```js
results: data.results
```

### to:

```js
results: data.results.results
```

- Fixed UI rendering issues across:
  - Savings cards
  - Recommendations table
  - Charts
  - Per-tool audit results
  - Total savings calculations

- Added defensive fallbacks for:
  - `totalMonthlySavings`
  - `yearlySavings`
  - `rawEntries`
  - `toolResults`

- Debugged Recharts rendering warnings related to invalid chart dimensions.
- Verified audit data flow using:
  - `console.log`
  - React Router `location.state`
- Cleaned up results handling logic in `Results.jsx`.

---

## What I Learned

- Importance of maintaining a consistent API response shape between backend and frontend.
- How nested state structures can silently break React rendering.
- Better debugging practices using:
  - `console.log`
  - React Router `location.state`
  - component-level data validation
- Why array methods like `.reduce()` fail when objects are accidentally passed instead of arrays.
- How Recharts depends on valid parent container dimensions to render properly.

---

## Blockers / Issues I Faced

- Audit UI showed `$0/month` savings even though backend calculations were correct.
- Recommendations and charts rendered empty.

### Encountered:

```txt
results.reduce is not a function
```

### Recharts warning:

```txt
width(-1) and height(-1) should be greater than 0
```

### Confusion caused by nested response structure:

```js
{
  results: {
    results: [...]
  }
}
```

---

## How I Resolved Them

- Traced the issue through the entire submission flow:
  - `handleSubmit`
  - `navigate()`
  - `location.state`
  - `Results.jsx`

- Used console logging to inspect actual runtime data.
- Fixed the navigation payload structure.
- Ensured all result-based components receive a proper array.
- Added safe defaults and guards to prevent undefined state issues.
- Verified backend response and frontend rendering alignment.

---

## Plan for Tomorrow

- Improve audit result UI polish and responsiveness.
- Add loading states and animations for charts/cards.
- Implement better error handling for failed API requests.
- Start refining recommendation scoring logic.
- Prepare audit history persistence improvements.

---

## Current Status

- Audit engine working correctly.
- Backend summary generation functioning properly.
- Results page fully rendering real audit data again.
- Savings calculations and recommendations restored.
- Main frontend-backend integration bug resolved successfully.
