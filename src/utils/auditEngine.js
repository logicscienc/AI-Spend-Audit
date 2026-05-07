import React from 'react'

export function auditEngine(userData) {

  if (
    userData.tool === "chatgpt" &&
    userData.plan === "plus" &&
    userData.teamSize === 1
  ) {
    return {
      recommendation: "Downgrade to Go",
      savings: 17,
      reason: "Plus plan is unnecessary for solo light usage"
    }
  }

  return {
    recommendation: "Current plan looks fine",
    savings: 0,
    reason: "No major optimization detected"
  }
}
