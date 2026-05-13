import React from "react";
import {
  FaClipboardCheck,
  FaPiggyBank,
  FaLightbulb,
  FaUserEdit,
} from "react-icons/fa";

const tabs = [
  {
    id: "audit-results",
    label: "Audit Results",
    icon: FaClipboardCheck,
  },
  {
    id: "savings-breakdown",
    label: "Savings Breakdown",
    icon: FaPiggyBank,
  },
  {
    id: "recommendations",
    label: "Recommendations",
    icon: FaLightbulb,
  },
  {
    id: "your-inputs",
    label: "Your Inputs",
    icon: FaUserEdit,
  },
];

const ResultsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div
      className="
        mt-10
        flex
        flex-wrap
        gap-6
        border-b border-white/10
        pb-2
      "
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative
              flex items-center gap-2
              px-2 py-2
              text-sm font-medium
              transition-all duration-200

              ${
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            <Icon className="text-base" />

            {tab.label}

            {/* ACTIVE UNDERLINE */}
            {isActive && (
              <span
                className="
                  absolute left-0 -bottom-[9px]
                  h-[2px] w-full
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_10px_rgba(34,211,238,0.4)]
                "
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ResultsTabs;
