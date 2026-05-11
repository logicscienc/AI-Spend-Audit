import React from 'react'





const tabs = [
  {
    id: "audit-results",
    label: "Audit Results",
  },
  {
    id: "savings-breakdown",
    label: "Savings Breakdown",
  },
  {
    id: "recommendations",
    label: "Recommendations",
  },
  {
    id: "your-inputs",
    label: "Your Inputs",
  },
];

const ResultsTabs = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div
      className="
        mt-10
        flex
        flex-wrap
        gap-3
        border-b
        border-white/10
        pb-4
      "
    >
      {tabs.map((tab) => {

        const isActive =
          activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className={`
              rounded-xl
              px-5
              py-2.5
              text-sm
              font-medium
              transition-all
              duration-200

              ${
                isActive
                  ? `
                    bg-blue-500
                    text-white
                    shadow-[0_0_20px_rgba(59,130,246,0.35)]
                  `
                  : `
                    bg-white/5
                    text-gray-400
                    hover:bg-white/10
                    hover:text-white
                  `
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default ResultsTabs;
