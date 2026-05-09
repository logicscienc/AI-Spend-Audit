import React from 'react'
import { pricingData } from '../data/pricingData'



export function auditEngine(userData)
{
//       userData = {
//    tool: "chatgpt",
//      plan: "plus",
//      seats: 1,
//      teamSize: 1,
//      useCase: "coding"
//    }

     const results = []

  
    const toolResult = evaluateTool(userData)
  

  results.push(toolResult)

  const totalMonthlySavings = results.reduce(
    (sum, item) => sum + (item.monthlySavings || 0),
    0
  )

  return {
    tools: results,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12
  }
}

function getPrice(tool, plan) 
{
    return pricingData?.[tool]?.plans?.[plan] ?? null
}


function evaluateTool(userData) {
  const { tool, plan, seats = 1, useCase } = userData
  const currentPrice = getPrice(tool, plan)

  if (!currentPrice) {
    return {
      tool,
      recommendation: "Manual review needed",
      monthlySavings: 0,
      reason: "Pricing unavailable"
    }
  }

  const currentCost = currentPrice * seats

  // BUSINESS RULES

  // Rule 1 → Solo ChatGPT Plus user
  if (tool === "chatgpt" && plan === "plus" && seats === 1) {

    const optimizedCost = getPrice("chatgpt", "go")

    const savings = currentPrice - optimizedCost

    return {
      tool,
      currentCost,
      optimizedCost,
      monthlySavings: savings,
      annualSavings: savings * 12,

      recommendation: "Downgrade to ChatGPT Go",

      reason:
        "Solo users with standard usage often do not fully utilize Plus limits."
    }
  }

//  Rule 2 -> Teams on free plans with 3 or more seats
  if(tool === "chatgpt" && plan === "free" && seats >= 3)
  {
     const upgradedPlanPrice = getPrice("chatgpt", "business") * seats

     
     return {
      tool,
        currentCost: 0,

    optimizedCost: upgradedPlanPrice,

    monthlySavings: 0,

    annualSavings: 0,

    recommendation: "Upgrade to ChatGPT Business",

       reason:
       "Teams collaborating on free plans often face message limits and workflow inefficiencies."
     }
  }

  // Rule 3 -> chatgpt pro overkill for solo users
  if(tool === "chatgpt" && plan === "pro" && seats === 1)
  {
        const optimizedCost = getPrice("chatgpt", "plus")

         const savings = currentPrice - optimizedCost   

        return {
    tool,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Downgrade to ChatGPT Plus",

    reason:
      "ChatGPT Pro is typically optimized for heavy daily power users. Most solo users can achieve similar productivity with Plus."
  } 
  }

  // Rule 4 -> Business plan unnecessary for tiny team
  if (tool === "chatgpt" && plan === "business" && seats <= 2) {
     const optimizedCost =
    getPrice("chatgpt", "plus") * seats

  const savings = currentCost - optimizedCost

   return {
     tool,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,
    recommendation: "Switch to ChatGPT Plus",

    reason: "Business plan features may be underutilized by very small teams, leading to unnecessary costs."
   }
  }

  // Rule 5 -> Multiple Plus accounts should consolidate

  if (tool === "chatgpt" && plan === "plus" && seats >= 5) {

  return {
    tool,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,


     recommendation: "Evaluate ChatGPT Business",


     reason: "Multiple Plus accounts can lead to fragmented billing and management. Consolidating under a Business plan may offer better cost efficiency and team collabloration features."


  }
}

// Rule 6-> ChatGPT for coding team may overlap with Cursor/Copilot

if (
  tool === "chatgpt" &&
  plan === "plus" &&
  useCase === "coding" &&
  seats >= 3
) {

  return {
    tool,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Review overlap with coding assistants",

    reason:
      "Teams already paying for Cursor or GitHub Copilot may be duplicating coding-assistant spend with ChatGPT subscriptions."
  }
}

// Rule 7 — Free plan inefficient for research-heavy teams
if (
  tool === "chatgpt" &&
  plan === "free" &&
  seats >= 4
) {

  return {
    tool,

    currentCost: 0,

    optimizedCost:
      getPrice("chatgpt", "business") * seats,

    monthlySavings: 0,

    annualSavings: 0,

    recommendation: "Upgrade to ChatGPT Business",

    reason:
      "Teams relying heavily on AI research workflows may face productivity bottlenecks on free-tier usage limits."
  }
}


// Claude rules
// Rule 1 -> solo user on claude using pro for casual use may be overpaying
if(tool === "claude" && plan === "pro" && seats === 1)
{
    const optimizedCost = getPrice("claude", "free")

    const savings = currentPrice - optimizedCost

    return {
      tool,
      currentCost,
      optimizedCost,
      monthlySavings: savings,
      annualSavings: savings * 12,

      recommendation: "Downgrade to Claude Free",
      reason: "Solo users with casual usage may not need the advanced features of the Pro plan, making the Free plan a more cost effective choice."
    }
}

// Rule 2-> Teams on free plans with 3 or more seats may benefit from upgrading to Pro for better collaboration features and higher limits
if(tool === "claude" && plan === "free" && seats >= 3)
{
   const optimizedCost = getPrice("claude", "pro")* seats

   return {
     tool,
      currentCost,
      optimizedCost,
       monthlySavings: 0,

    annualSavings: 0,

      recommendation: "Upgrade to Claude Pro",

      reason: "Teams collaborating on free plans often face message limits and workflow inefficiencies. Upgrading to pro can provide enhanced collabpration features and higher usage limits, imporving team productivity and cost efficiency."
   }
}

// Rule 3 -> Max plan may be overkill for solo users
if(tool === "claude" && plan === "max" && seats === 1)
{
    const optimizedCost = getPrice("claude", "pro")

    const savings = currentPrice - optimizedCost

    return {
      tool,
      currentCost,
      optimizedCost,
      monthlySavings: savings,
      annualSavings: savings * 12,

      recommendation: "Downgrade to Claude Pro",
      reason: "Solo users with casual usage may not need the advanced features of the Max plan, making the Pro plan a more cost effective choice."
    }
}

// Rule 4 -> 
  // fallback
  return {
    tool,
    currentCost,
    optimizedCost: currentCost,
    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Current plan looks efficient",

    reason: "No strong optimization opportunity detected."
  }
}
