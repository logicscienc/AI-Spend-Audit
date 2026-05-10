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
