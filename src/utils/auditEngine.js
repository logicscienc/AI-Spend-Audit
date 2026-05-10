import React from 'react'
import { pricingData } from '../data/pricingData'
import { buildAuditResult } from './buildAuditResult'



export function auditEngine(userData)
{
//       userData = {
//    tool: "chatgpt",
//      plan: "plus",
//      seats: 1,
//      teamSize: 1,
//      useCase: "coding"
//    }

    const results = userData.map((tool) =>
  evaluateTool(tool)
);

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
   const {
    tool,
    plan,
    seats = 1,
    useCase,
    monthlySpend = 0,
  } = userData;

  const currentPrice = getPrice(tool, plan);

  // IMPORTANT FIX
  if (currentPrice === null) {
    return {
      tool,
      recommendation: "Manual review needed",
      monthlySavings: 0,
      annualSavings: 0,
      reason: "Pricing unavailable",
    };
  }

  const currentCost =
    currentPrice === "usage-based"
      ? monthlySpend
      : currentPrice * seats;

  // BUSINESS RULES

  // Rule 1 → Solo ChatGPT Plus user
  if (tool === "chatgpt" && plan === "plus" && seats === 1) {

    const optimizedCost = getPrice("chatgpt", "go")

    const savings = currentPrice - optimizedCost

   return buildAuditResult({
  tool,
  plan,

  currentCost,

  optimizedCost,

  monthlySavings: savings,

  annualSavings: savings * 12,

  recommendation: "Downgrade to ChatGPT Go",

  reason:
    "Solo users with standard usage often do not fully utilize Plus limits.",

  seats,

  useCase,
});
  }

//  Rule 2 -> Teams on free plans with 3 or more seats
  if(tool === "chatgpt" && plan === "free" && seats >= 3)
  {
     const upgradedPlanPrice = getPrice("chatgpt", "business") * seats

     
     return buildAuditResult({
      tool,
      plan,
        currentCost: 0,

    optimizedCost: upgradedPlanPrice,

    monthlySavings: 0,

    annualSavings: 0,

    recommendation: "Upgrade to ChatGPT Business",

       reason:
       "Teams collaborating on free plans often face message limits and workflow inefficiencies.",

       seats,
       useCase,
     });
  }

  // Rule 3 -> chatgpt pro overkill for solo users
  if(tool === "chatgpt" && plan === "pro" && seats === 1)
  {
        const optimizedCost = getPrice("chatgpt", "plus")

         const savings = currentPrice - optimizedCost   

        return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Downgrade to ChatGPT Plus",

    reason:
      "ChatGPT Pro is typically optimized for heavy daily power users. Most solo users can achieve similar productivity with Plus.",
      seats,
      useCase,
  } );
  }

  // Rule 4 -> Business plan unnecessary for tiny team
  if (tool === "chatgpt" && plan === "business" && seats <= 2) {
     const optimizedCost =
    getPrice("chatgpt", "plus") * seats

  const savings = currentCost - optimizedCost

   return buildAuditResult({
     tool,
     plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,
    recommendation: "Switch to ChatGPT Plus",

    reason: "Business plan features may be underutilized by very small teams, leading to unnecessary costs.",
    seats,
    useCase,
   });
  }

  // Rule 5 -> Multiple Plus accounts should consolidate

  if (tool === "chatgpt" && plan === "plus" && seats >= 5) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,


     recommendation: "Evaluate ChatGPT Business",


     reason: "Multiple Plus accounts can lead to fragmented billing and management. Consolidating under a Business plan may offer better cost efficiency and team collabloration features.",
     seats,
     useCase,


  });
}

// Rule 6-> ChatGPT for coding team may overlap with Cursor/Copilot

if (
  tool === "chatgpt" &&
  plan === "plus" &&
  useCase === "coding" &&
  seats >= 3
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Review overlap with coding assistants",

    reason:
      "Teams already paying for Cursor or GitHub Copilot may be duplicating coding-assistant spend with ChatGPT subscriptions.",
      seats,
      useCase,
  });
}

// Rule 7 — Free plan inefficient for research-heavy teams
if (
  tool === "chatgpt" &&
  plan === "free" &&
  seats >= 4
) {

  return buildAuditResult({
    tool,
    plan,

    currentCost: 0,

    optimizedCost:
      getPrice("chatgpt", "business") * seats,

    monthlySavings: 0,

    annualSavings: 0,

    recommendation: "Upgrade to ChatGPT Business",

    reason:
      "Teams relying heavily on AI research workflows may face productivity bottlenecks on free-tier usage limits.",
      seats,
      useCase,
  });
}


// Claude rules
// Rule 1 -> solo user on claude using pro for casual use may be overpaying
if(tool === "claude" && plan === "pro" && seats === 1)
{
    const optimizedCost = getPrice("claude", "free")

    const savings = currentPrice - optimizedCost

    return buildAuditResult({
      tool,
      plan,
      currentCost,
      optimizedCost,
      monthlySavings: savings,
      annualSavings: savings * 12,

      recommendation: "Downgrade to Claude Free",
      reason: "Solo users with casual usage may not need the advanced features of the Pro plan, making the Free plan a more cost effective choice.",
      seats,
      useCase,
    });
}

// Rule 2-> Teams on free plans with 3 or more seats may benefit from upgrading to Pro for better collaboration features and higher limits
if(tool === "claude" && plan === "free" && seats >= 3)
{
   const optimizedCost = getPrice("claude", "pro")* seats

   return buildAuditResult({
     tool,
     plan,
      currentCost,
      optimizedCost,
       monthlySavings: 0,

    annualSavings: 0,

      recommendation: "Upgrade to Claude Pro",

      reason: "Teams collaborating on free plans often face message limits and workflow inefficiencies. Upgrading to pro can provide enhanced collabpration features and higher usage limits, imporving team productivity and cost efficiency.",
      seats,
      useCase,
   });
}

// Rule 3 -> Max plan may be overkill for solo users
if(tool === "claude" && plan === "max" && seats === 1)
{
    const optimizedCost = getPrice("claude", "pro")

    const savings = currentPrice - optimizedCost

    return buildAuditResult({
      tool,
      plan,
      currentCost,
      optimizedCost,
      monthlySavings: savings,
      annualSavings: savings * 12,

      recommendation: "Downgrade to Claude Pro",
      reason: "Solo users with casual usage may not need the advanced features of the Max plan, making the Pro plan a more cost effective choice.",
      seats,
      useCase,
    });
}

// Rule 4 -> Claude Max unnecessary for writing-only teams

if(tool === "claude" && plan === "max" &&  useCase === "writing" &&
  seats <= 2)
  {
      const optimizedCost =
    getPrice("claude", "pro") * seats

  const savings = currentCost - optimizedCost

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Downgrade to Claude Pro",

    reason:
      "Writing-focused teams often do not require the higher limits and premium capabilities included in Claude Max.",
      seats,
      useCase,
  });
  }

  // Rule 5 -> Multiple Claude Pro seats may justify Team plan
  if (
  tool === "claude" &&
  plan === "pro" &&
  seats >= 5
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Evaluate Claude Team plan",

    reason:
      "Larger teams using separate Pro subscriptions may benefit from centralized billing and collaboration features in Claude Team.",
      seats,
      useCase,
  });
}

// Rule 6-> Claude + ChatGPT overlap

if (
  tool === "claude" &&
  plan === "pro" &&
  useCase === "mixed" &&
  seats >= 3
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Review overlap with ChatGPT subscriptions",

    reason:
      "Teams using multiple general-purpose AI assistants may be duplicating spend across similar workflows.",
      seats,
      useCase,
  });
}

// GitHub Copilot rules
// Rule 1 -> Beginners or light users on Pro plan may be overpaying
if(tool === "copilot" && plan === "pro" && seats === 1)
{
    const optimizedCost = getPrice("copilot", "free")

    const savings = currentPrice - optimizedCost

    return buildAuditResult({
       tool,
       plan,
      currentCost,
      optimizedCost,
      monthlySavings: savings,
      annualSavings: savings * 12,

      recommendation: "Downgrade to Copilot Free",

      reason: "Beginners or light users may not need the advanced features of the Pro plan, making the Free plan a more cost effective choice.",
      seats,
      useCase,
    });
}

// Rule 2 -> Larger teams on Pro may benefit from Business for centralized management and security controls

if (
  tool === "copilot" &&
  plan === "pro" &&
  seats >= 10
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Evaluate Copilot Pro Plus",

    reason:
      "Larger engineering teams may benefit from centralized policy management, security controls, and billing provided by Copilot Pro Plus.",
      seats,
      useCase,
  });
}

// Rule 3-> pro plus may be overkill for most users

if(tool === "copilot" && plan === "proplus" && seats === 1)
{
  const optimizedCost = getPrice("copilot", "pro")

  const savings = currentCost - optimizedCost

  return buildAuditResult({
     tool,
      plan,
      currentCost,
      optimizedCost,
      monthlySavings: savings,
      annualSavings: savings * 12,

      recommendation: "Downgrade to Copilot Pro",

      reason: "Most users do not required the advanced features of Pro Plus, making the Pro plan a more cost effective choice for the majority of users.",
      seats,
      useCase,

  });
}

// Rule 4 -> Copilot overlap with Cursor
if (
  tool === "copilot" &&
  plan === "pro" &&
  useCase === "coding" &&
  seats >= 3
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Review overlap with Cursor subscriptions",

    reason:
      "Teams using both Copilot and Cursor may be duplicating spend across similar AI coding workflows.",
      seats,
      useCase,
  });
}

// Rule 5 -> Small teams on Pro plus may overpay
if (
  tool === "copilot" &&
  plan === "proplus" &&
  seats <= 2
) {

  const optimizedCost =
    getPrice("copilot", "pro") * seats

  const savings =
    currentCost - optimizedCost

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Switch to Copilot Pro",

    reason:
      "Business-tier management features may be unnecessary for very small engineering teams.",
      seats,
      useCase,
  });
}

// Rule 6 -> Pro Plus unnecessary for non-power users

if (
  tool === "copilot" &&
  plan === "proplus" &&
  useCase !== "coding"
) {

  const optimizedCost =
    getPrice("copilot", "pro") * seats

  const savings =
    currentCost - optimizedCost

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Downgrade to Copilot Pro",

    reason:
      "Advanced Copilot tiers are typically optimized for heavy coding workflows and may be unnecessary for non-engineering use cases.",
      seats,
      useCase,
  });
}


// Cursor rules
// Rule 1 -> Hobby plan may be sufficient for solo users if usage is light

if(tool === "cursor" && plan === "pro" && seats === 1)
{
   const optimizedCost = getPrice("cursor", "hobby")

   const savings = currentPrice - optimizedCost

   return buildAuditResult({
     tool,
     plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Downgrade to Cursor Hobby",

    reason: "Solo users with light usage may not need the advanced features of the Pro plan, making the Hobby plan a more cost effective choice.",
    seats,
    useCase,

   });
}
// Rule 2 -> Pro Plus may be excessive for solo users
if (
  tool === "cursor" &&
  plan === "proplus" &&
  seats === 1
) {

  const optimizedCost =
    getPrice("cursor", "pro")

  const savings =
    currentCost - optimizedCost

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Downgrade to Cursor Pro",

    reason:
      "Most solo developers can achieve similar productivity using Cursor Pro instead of Pro Plus.",
      seats,
      useCase,
  });
}

// Rule 3 -> Ultra unnecessary for small teams
if (
  tool === "cursor" &&
  plan === "ultra" &&
  seats <= 3
) {

  const optimizedCost =
    getPrice("cursor", "proplus") * seats

  const savings =
    currentCost - optimizedCost

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Switch to Cursor Pro Plus",

    reason:
      "Ultra-tier plans are generally optimized for high-scale engineering workflows and may be excessive for smaller teams.",
      seats,
      useCase,
  });
}

// Rule 4 -> Teams plan unnecessary for tiny teams
if (
  tool === "cursor" &&
  plan === "teams" &&
  seats <= 2
) {

  const optimizedCost =
    getPrice("cursor", "pro") * seats

  const savings =
    currentCost - optimizedCost

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Use individual Cursor Pro accounts",

    reason:
      "Team-management functionality may not provide enough value for very small teams.",
      seats,
      useCase,
  });
}


// Rule 5 -> Multiple Pro users may justify Teams plan
if (
  tool === "cursor" &&
  plan === "pro" &&
  seats >= 8
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Evaluate Cursor Teams",

    reason:
      "Larger engineering teams may benefit from centralized billing, collaboration, and management features.",
      seats,
      useCase,
  });
}

// Rule 6 -> Cursor overlap with GitHub Copilot
if (
  tool === "cursor" &&
  useCase === "coding" &&
  seats >= 3
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Review overlap with GitHub Copilot",

    reason:
      "Organizations using both Cursor and GitHub Copilot may be duplicating AI coding assistant spend.",
      seats,
      useCase,
  });
}

// Rule 7 -> Cursor plans may be inefficient for non-coding workflows
if (
  tool === "cursor" &&
  useCase !== "coding"
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Evaluate non-coding AI tools",

    reason:
      "Cursor is primarily optimized for software engineering workflows and may not be ideal for non-coding use cases.",
      seats,
      useCase,
  });
}

// Rule 8 -> Enterprise may be unnecessary for mid-size teams
if (
  tool === "cursor" &&
  plan === "enterprise" &&
  seats < 20
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Evaluate Cursor Teams instead",

    reason:
      "Enterprise-grade controls and compliance features may be unnecessary for smaller engineering organizations.",
      seats,
      useCase,
  });
}

// Google Gemini rules
// Rule 1 -> Solo users on AI Pro may only need AI Plus
if (
  tool === "gemini" &&
  plan === "aipro" &&
  seats === 1
) {

  const optimizedCost =
    getPrice("gemini", "aiplus")

  const savings =
    currentCost - optimizedCost

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Downgrade to Gemini AI Plus",

    reason:
      "Most solo users can handle everyday AI workflows without requiring the higher limits of Gemini AI Pro.",
      seats,
      useCase,
  });
}

// Rule 2 -> AI Ultra may be excessive for small teams
if (
  tool === "gemini" &&
  plan === "aiultra" &&
  seats <= 2
) {

  const optimizedCost =
    getPrice("gemini", "aipro") * seats

  const savings =
    currentCost - optimizedCost

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Switch to Gemini AI Pro",

    reason:
      "Gemini AI Ultra is optimized for advanced heavy-usage workflows and may be unnecessary for smaller teams.",
      seats,
      useCase,
  });
}

// Rule 3 -> Free plan may limit productivity for growing teams
if (
  tool === "gemini" &&
  plan === "free" &&
  seats >= 4
) {

  const optimizedCost =
    getPrice("gemini", "aiplus") * seats

  return buildAuditResult({
    tool,
    plan,
    currentCost: 0,
    optimizedCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Upgrade to Gemini AI Plus",

    reason:
      "Teams collaborating on free-tier plans may face usage limits and inconsistent workflow performance.",
      seats,
      useCase,
  });
}

// Rule 4 -> AI Pro unnecessary for writing-focused solo users
if (
  tool === "gemini" &&
  plan === "aipro" &&
  useCase === "writing" &&
  seats === 1
) {

  const optimizedCost =
    getPrice("gemini", "aiplus")

  const savings =
    currentCost - optimizedCost

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost,

    monthlySavings: savings,
    annualSavings: savings * 12,

    recommendation: "Downgrade to Gemini AI Plus",

    reason:
      "Writing-focused workflows often do not require the advanced limits and premium capabilities of Gemini AI Pro.",
      seats,
      useCase,
  });
}

// Rule 5 -> Multiple AI Plus subscriptions may justify AI Pro
if (
  tool === "gemini" &&
  plan === "aiplus" &&
  seats >= 6
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Evaluate Gemini AI Pro",

    reason:
      "Larger teams may benefit from higher limits and better workflow scalability available in Gemini AI Pro.",
      seats,
      useCase,
  });
}

// Rule 6 -> Gemini overlap with ChatGPT or Claude
if (
  tool === "gemini" &&
  useCase === "mixed" &&
  seats >= 3
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Review overlap with other AI assistants",

    reason:
      "Teams using Gemini alongside ChatGPT or Claude may be duplicating spend across similar general-purpose AI workflows.",
      seats,
      useCase,
  });
}

// OpenAI API rules
// Rule 1 -> Small teams may not need API + ChatGPT subscriptions

if (
  tool === "openai" &&
  seats <= 3 &&
  useCase === "mixed"
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Review overlap with ChatGPT subscriptions",

    reason:
      "Small teams may be duplicating spend across both OpenAI API usage and ChatGPT subscriptions.",
      seats,
      useCase,
  });
}


// Rule 2 -> GPT-4 level models may be excessive for lightweight workflows

if (
  tool === "openai" &&
  useCase === "writing"
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost * 0.8,

    monthlySavings: currentCost * 0.2,
    annualSavings: currentCost * 0.2 * 12,

    recommendation: "Evaluate lighter OpenAI models",

    reason:
      "Writing-focused workflows may not require premium reasoning models for every request.",
      seats,
      useCase,
  });
}

// Rule 3 -> Large API spend should consider credits or volume discounts

if (
  tool === "openai" &&
  currentCost >= 500
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost * 0.75,

    monthlySavings: currentCost * 0.25,
    annualSavings: currentCost * 0.25 * 12,

    recommendation: "Explore discounted infrastructure credits",

    reason:
      "Organizations with high API spend may reduce costs through committed usage discounts or infrastructure credits.",
      seats,
      useCase,
  });
}

// Anthropic API Rules

// Rule 1 -> Claude API + Claude Pro overlap

if (
  tool === "anthropicapi" &&
  seats <= 3
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost,

    monthlySavings: 0,
    annualSavings: 0,

    recommendation: "Review overlap with Claude subscriptions",

    reason:
      "Teams using both Claude subscriptions and Anthropic API access may be duplicating AI spend.",
      seats,
      useCase,
  });
}


// Rule 2 -> Premium Claude models may be unnecessary for simple tasks

if (
  tool === "anthropicapi" &&
  useCase === "writing"
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost * 0.8,

    monthlySavings: currentCost * 0.2,
    annualSavings: currentCost * 0.2 * 12,

    recommendation: "Evaluate lighter Claude models",

    reason:
      "Writing-focused workloads may not require premium reasoning models for every API request.",
      seats,
      useCase,
  });
}


// Rule 3 -> High Anthropic API spend may justify credits

if (
  tool === "anthropicapi" &&
  currentCost >= 500
) {

  return buildAuditResult({
    tool,
    plan,
    currentCost,
    optimizedCost: currentCost * 0.75,

    monthlySavings: currentCost * 0.25,
    annualSavings: currentCost * 0.25 * 12,

    recommendation: "Explore infrastructure credit programs",

    reason:
      "High-volume API users may significantly reduce costs through committed usage discounts and infrastructure credits.",
      seats,
      useCase,
  });
}





  // fallback
 return buildAuditResult({
  tool,
  plan,

  currentCost,

  optimizedCost: currentCost,

  monthlySavings: 0,

  annualSavings: 0,

  recommendation: "Current plan looks efficient",

  reason: "No strong optimization opportunity detected.",

  seats,

  useCase,
});
} 
