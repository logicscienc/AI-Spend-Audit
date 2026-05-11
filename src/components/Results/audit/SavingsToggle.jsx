import React from 'react'

const SavingsToggle = ({
  showAnnual,
  setShowAnnual,
}) => {
  return (
    <div
      className="
        inline-flex
        items-center
        rounded-2xl
        border border-white/10
        bg-white/5
        p-1
      "
    >

      {/* MONTHLY */}
      <button
        onClick={() =>
          setShowAnnual(false)
        }
        className={`
          rounded-xl
          px-4 py-2
          text-sm font-medium
          transition-all duration-200

          ${
            !showAnnual
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
          }
        `}
      >
        Monthly
      </button>

      {/* ANNUAL */}
      <button
        onClick={() =>
          setShowAnnual(true)
        }
        className={`
          rounded-xl
          px-4 py-2
          text-sm font-medium
          transition-all duration-200

          ${
            showAnnual
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white"
          }
        `}
      >
        Annual
      </button>
    </div>
  );
};

export default SavingsToggle;
