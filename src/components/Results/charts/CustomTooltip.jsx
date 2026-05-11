import React from 'react'

const CustomTooltip = ({
  active,
  payload,
  label,
  showAnnual,
}) => {

  if (
    !active ||
    !payload ||
    !payload.length
  ) {
    return null;
  }

  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-[#0f172a]
        px-4 py-3
        shadow-2xl
        backdrop-blur-xl
      "
    >

      <p className="text-sm text-gray-400 capitalize">
        {label}
      </p>

      <h4 className="mt-1 text-lg font-semibold text-white">
        $
        {Number(
          payload[0].value
        ).toFixed(2)}
      </h4>

      <p className="mt-1 text-xs text-gray-500">
        {showAnnual
          ? "Annual Savings"
          : "Monthly Savings"}
      </p>

    </div>
  );
};

export default CustomTooltip;
