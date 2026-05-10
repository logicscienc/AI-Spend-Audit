import React from "react";
import {
  TrendingDown,
  BadgeDollarSign,
} from "lucide-react";

export default function SavingsCard({
  results = [],
  rawEntries = [],
}) {

  // -------------------------
  // TOTAL CURRENT SPEND
  // -------------------------

  const currentMonthlySpend =
    rawEntries.reduce(
      (acc, item) =>
        acc +
        Number(item.monthlySpend || 0),
      0
    );

  // -------------------------
  // TOTAL POTENTIAL SAVINGS
  // -------------------------

  const totalMonthlySavings =
  results.reduce(
    (acc, item) =>
      acc +
      Number(
        item?.totalMonthlySavings || 0
      ),
    0
  );

  // -------------------------
  // YEARLY SAVINGS
  // -------------------------

 const yearlySavings =
  results.reduce(
    (acc, item) =>
      acc +
      Number(
        item?.totalAnnualSavings || 0
      ),
    0
  );

  // -------------------------
  // SAVINGS PERCENTAGE
  // -------------------------

  const savingsPercentage =
    currentMonthlySpend > 0
      ? Math.round(
          (totalMonthlySavings /
            currentMonthlySpend) *
            100
        )
      : 0;

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border border-white/10
        bg-[#071120]/70
        backdrop-blur-xl
        p-8
      "
    >

      {/* TOP */}
      <div className="flex items-start justify-between">

        <div>

          <p className="text-white/60 text-sm mb-3">
            Total Potential Savings
          </p>

          {/* MONTH */}
          <h2 className="text-5xl font-semibold tracking-tight">

            ${totalMonthlySavings}

            <span className="text-xl text-white/50 ml-2">
              /month
            </span>
          </h2>

          {/* YEAR */}
          <p className="mt-4 text-lg text-green-400 font-medium">

            ${yearlySavings.toLocaleString()}

            <span className="text-white/50 font-normal">
              {" "}saved yearly
            </span>
          </p>
        </div>

        {/* ICON */}
        <div
          className="
            flex items-center justify-center
            w-14 h-14
            rounded-2xl
            bg-green-500/10
            border border-green-500/20
          "
        >

          <BadgeDollarSign
            className="text-green-400"
            size={26}
          />
        </div>
      </div>

      {/* PERCENTAGE */}
      <div
        className="
          mt-8
          rounded-2xl
          border border-white/10
          bg-white/[0.03]
          px-5 py-4
        "
      >

        <div className="flex items-center gap-3">

          <TrendingDown
            size={18}
            className="text-green-400"
          />

          <p className="text-white/80">

            <span className="text-green-400 font-semibold">
              {savingsPercentage}%
            </span>

            {" "}of your current AI spend
            can potentially be optimized
          </p>
        </div>
      </div>

      {/* OPPORTUNITY */}
      <div className="mt-6">

        <div
          className="
            inline-flex
            items-center gap-2
            rounded-full
            border border-green-500/20
            bg-green-500/10
            px-4 py-2
          "
        >

          <div className="w-2 h-2 rounded-full bg-green-400" />

          <span className="text-sm text-green-300 font-medium">
            Excellent Opportunity
          </span>
        </div>
      </div>

      {/* GLOW */}
      <div
        className="
          absolute
          -bottom-24
          -right-24
          w-72
          h-72
          rounded-full
          bg-green-500/10
          blur-3xl
          pointer-events-none
        "
      />
    </div>
  );
}