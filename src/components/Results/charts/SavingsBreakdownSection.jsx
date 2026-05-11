import React from 'react'
import SavingsChart from './SavingsChart';
import SavingsToggle from '../audit/SavingsToggle';
const SavingsBreakdownSection = ({
  toolResults,
  totalMonthlySavings,
  yearlySavings,
   showAnnual,
  setShowAnnual,
}) => {
  return (
    <div className="space-y-6">

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
         <p className="text-sm text-gray-400">
  {showAnnual
    ? "Annual Savings"
    : "Monthly Savings"}
</p>

<h3 className="mt-3 text-3xl font-semibold">
  $
  {showAnnual
    ? Number(yearlySavings).toFixed(2)
    : Number(totalMonthlySavings).toFixed(2)}
</h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

  <p className="text-sm text-gray-400">
    Average Per Tool
  </p>

  <h3 className="mt-3 text-3xl font-semibold">
    $
    {(
      (showAnnual
        ? yearlySavings
        : totalMonthlySavings) /
      (toolResults.length || 1)
    ).toFixed(2)}
  </h3>

</div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-gray-400">
            Tools Optimized
          </p>

          <h3 className="mt-3 text-3xl font-semibold">
            {
              toolResults.filter(
                (tool) =>
                  tool.monthlySavings > 0
              ).length
            }
          </h3>
        </div>

      </div>

      {/* CHART PLACEHOLDER */}
     {/* CHART SECTION */}
<div
  className="
    rounded-3xl
    border border-white/10
    bg-white/5
    p-8
  "
>

  {/* TOP */}
  <div className="flex items-center justify-between">

    <div>
      <h2 className="text-xl font-semibold">
        {showAnnual
          ? "Annual Savings Visualization"
          : "Monthly Savings Visualization"}
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Compare savings across tools
      </p>
    </div>

    <SavingsToggle
      showAnnual={showAnnual}
      setShowAnnual={setShowAnnual}
    />

  </div>

  {/* CHART */}
  <div className="mt-8 h-[350px]">

    <SavingsChart
      toolResults={toolResults}
      showAnnual={showAnnual}
    />

  </div>

</div>
    </div>
  );
};

export default SavingsBreakdownSection;
