import React, { useState }  from 'react'
import AuditRow from "./AuditRow";

const PerToolAuditSection = ({
     toolResults = [],
}) => {

     const [showAnnual, setShowAnnual] =
    useState(false);

  return (
    <section
      className="
        mt-10
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        p-6
      "
    >

      {/* TOP */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-semibold">
            Per Tool Audit Results
          </h2>

          <p className="text-gray-400 mt-1">
            Recommendations based on
            your current AI stack
          </p>

        </div>

        {/* TOGGLE */}
        <button
          onClick={() =>
            setShowAnnual(!showAnnual)
          }
          className="
            rounded-xl
            border border-white/10
            bg-white/5
            px-4 py-2
            text-sm
            text-gray-300
            transition-all
            hover:bg-white/10
          "
        >
          Show
          {" "}
          {showAnnual
            ? "Monthly"
            : "Annual"}
          {" "}
          Savings
        </button>

      </div>

      {/* TABLE HEADERS */}
      <div
        className="
          grid
          grid-cols-12
          gap-4
          px-5
          pb-3
          text-sm
          text-gray-400
        "
      >

        <div className="col-span-4">
          Tool
        </div>

        <div className="col-span-2">
          Current Spend
        </div>

        <div className="col-span-2">
          Recommended
        </div>

        <div className="col-span-2">
          Potential Savings
        </div>

        <div className="col-span-2">
          Reason
        </div>

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

    </section>
  )
}

export default PerToolAuditSection
