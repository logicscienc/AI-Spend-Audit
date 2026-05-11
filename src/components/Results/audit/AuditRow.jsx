import React from 'react'
import RecommendationBadge from "./RecommendationBadge";
import ToolIcon from "./ToolIcon";

const AuditRow = ({ item, showAnnual }) => {
  return (
     <div
      className="
         grid
      grid-cols-12
      items-start
      gap-6
      rounded-2xl
      border border-white/10
      bg-[#0B1120]
      px-6
      py-5
      transition-all
      hover:border-blue-500/20
      hover:bg-[#101827]
      "
    >

      {/* TOOL COLUMN */}
      <div className="col-span-4 flex items-center gap-4">

        <ToolIcon tool={item.tool} />

        <div>

          <div className="flex items-center gap-2 flex-wrap">

            <h3 className="font-semibold capitalize text-white text-lg">
              {item.tool}
            </h3>

            <RecommendationBadge
              label={item.status.label}
              color={item.status.color}
            />

          </div>

          <p className="text-sm text-gray-400 mt-2 capitalize">
            {item.currentPlan}
          </p>

        </div>
      </div>

      {/* CURRENT SPEND */}
      <div className="col-span-2">

        <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Current Spend
      </p>

        <p className="text-lg font-semibold text-white">
  ${Number(item.currentMonthlySpend).toFixed(2)}
</p>
      </div>

      {/* RECOMMENDED */}
      <div className="col-span-2">

         <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Recommended
      </p>

        <p className="text-white font-medium leading-relaxed">
          {item.recommendedPlan}
        </p>
      </div>

      {/* SAVINGS */}
      <div className="col-span-2">

       <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Potential Savings
      </p>

       <p className="text-2xl font-bold text-green-400">
  $
  {showAnnual
    ? Number(item.annualSavings).toFixed(2)
    : Number(item.monthlySavings).toFixed(2)}
</p>
      </div>

       {/* REASON */}
    <div className="col-span-2">

      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        Reason
      </p>

      <p className="text-sm leading-6 text-gray-300">
        {item.reason}
      </p>

    </div>

    </div>
  )
}

export default AuditRow
