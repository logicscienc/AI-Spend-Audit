import React from 'react'
import SavingsToggle from './SavingsToggle';


const RecommendationsSection = ({
  toolResults,
  showAnnual,
  setShowAnnual,
}) => {

  const savingsTools =
    toolResults.filter(
      (tool) =>
        tool.monthlySavings > 0
    );

  const reviewTools =
    toolResults.filter(
      (tool) =>
        tool.monthlySavings === 0
    );

  return (
    <div className="space-y-6">

      {/* IMMEDIATE SAVINGS */}
      <div
        className="
          rounded-3xl
          border border-emerald-500/20
          bg-emerald-500/5
          p-8
        "
      >

      <div className="flex items-center justify-between">

  <h2 className="text-2xl font-semibold">
    Immediate Savings Opportunities
  </h2>

  <SavingsToggle
    showAnnual={showAnnual}
    setShowAnnual={setShowAnnual}
  />

</div>

        <div className="mt-6 space-y-4">

          {savingsTools.map((tool) => (

            <div
              key={tool.tool}
              className="
                rounded-2xl
                border border-white/10
                bg-black/20
                p-5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-medium capitalize">
                    {tool.tool}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {tool.recommendation}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-sm text-gray-400">
                    {showAnnual
  ? "Annual Savings"
  : "Monthly Savings"}
                  </p>

                  <h3 className="text-2xl font-semibold text-emerald-400">
                   $
{showAnnual
  ? Number(
      tool.annualSavings
    ).toFixed(2)
  : Number(
      tool.monthlySavings
    ).toFixed(2)}
                  </h3>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* REVIEW SECTION */}
      <div
        className="
          rounded-3xl
          border border-white/10
          bg-white/5
          p-8
        "
      >

        <h2 className="text-2xl font-semibold">
          Plans Requiring Review
        </h2>

        <div className="mt-6 space-y-4">

          {reviewTools.map((tool) => (

            <div
              key={tool.tool}
              className="
                rounded-2xl
                border border-white/10
                bg-black/20
                p-5
              "
            >

              <h3 className="text-lg font-medium capitalize">
                {tool.tool}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {tool.reason}
              </p>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default RecommendationsSection;
