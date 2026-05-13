# METRICS.md

## Overview

This document defines success metrics for the AI Spend Audit product.

---

## North Star Metric

**Total validated monthly savings identified per user**

Reason:
This directly reflects product value. The more accurate the savings, the more likely users trust and convert.

---

## Input Metrics

1. Audit completion rate  
   - % of users who finish input form and view results

2. Savings detection rate  
   - % of audits showing >$0 optimization opportunity

3. Lead capture conversion  
   - % of users submitting email after viewing results

---

## Instrumentation Plan

- Track form completion events
- Track audit result generation events
- Track “email capture” conversion

---

## Pivot Trigger

If:
- <20% users see meaningful savings OR
- <5% email conversion rate

Then:
- Revisit pricing logic or UX clarity

---

## Notes

This is a lead-gen product, not a daily-use SaaS.
Metrics reflect “high intent + low frequency usage.”
