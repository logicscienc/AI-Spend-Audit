import { pricingData } from "../data/pricingData"

export function getPlanPrice(tool, plan) {
  const toolData = pricingData?.[tool]
  if (!toolData) return null

  const price = toolData?.plans?.[plan]

  if (price === undefined) return null

  return price
}