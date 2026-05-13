import React from "react";

const SavingsToggle = ({ showAnnual, setShowAnnual }) => {
  return (
    <div className="flex items-center gap-3 self-start sm:self-auto">

      {/* LABEL */}
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
        {/* KNOB */}
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

      {/* LABEL */}
      <span className="text-xs sm:text-sm text-gray-300">
        Annual
      </span>

    </div>
  );
};

export default SavingsToggle;
