import { getAuditStatus } from "./getAuditStatus";

export function buildAuditResult({
  tool,
  plan,
  currentCost,
  optimizedCost,
  monthlySavings,
  annualSavings,
  recommendation,
  reason,
  seats,
  useCase,
}) {
  return {
    tool,

    currentPlan: plan,
    recommendedPlan: recommendation,

    status: getAuditStatus({
      monthlySavings,
      recommendation,
    }),

    currentMonthlySpend: currentCost,
    optimizedMonthlySpend: optimizedCost,

    monthlySavings,
    annualSavings,

    recommendation,
    reason,

    seats,
    useCase,
  };
}