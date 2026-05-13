import React, { useState } from "react";
import AuditRow from "./AuditRow";

const PerToolAuditSection = ({ toolResults = [] }) => {
  const [showAnnual, setShowAnnual] = useState(false);

  return (
    <section
      className="
        mt-10
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        p-4 sm:p-6
        overflow-x-auto
      "
    >
      {/* TOP */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">
            Per Tool Audit Results
          </h2>

          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Recommendations based on your current AI stack
          </p>
        </div>

        {/* TOGGLE */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
  
  <span className="text-xs sm:text-sm text-gray-300">
    Monthly
  </span>

  {/* TOGGLE */}
  <button
    onClick={() => setShowAnnual(!showAnnual)}
    className={`
      relative
      w-14 h-7
      rounded-full
      transition-all duration-300
      ${showAnnual
        ? "bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400"
        : "bg-white/10"
      }
    `}
  >
    {/* Knob */}
    <span
      className={`
        absolute top-1 left-1
        h-5 w-5
        rounded-full
        bg-white
        shadow-md
        transition-all duration-300
        ${showAnnual ? "translate-x-7" : "translate-x-0"}
      `}
    />
  </button>

  <span className="text-xs sm:text-sm text-gray-300">
    Annual
  </span>

</div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="min-w-[700px]">
        {/* TABLE HEADERS */}
        <div
          className="
            grid
            grid-cols-6 sm:grid-cols-12
            gap-3 sm:gap-4
            px-2 sm:px-5
            pb-3
            text-xs sm:text-sm
            text-gray-400
          "
        >
          <div className="col-span-2 sm:col-span-4">Tool</div>
          <div className="col-span-1 sm:col-span-2">Current Spend</div>
          <div className="col-span-1 sm:col-span-2">Recommended</div>
          <div className="col-span-1 sm:col-span-2">Savings</div>
          <div className="col-span-1 sm:col-span-2">Reason</div>
        </div>

        {/* ROWS */}
        <div className="space-y-3">
          {toolResults.map((item, index) => (
            <AuditRow
              key={index}
              item={item}
              showAnnual={showAnnual}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerToolAuditSection;
