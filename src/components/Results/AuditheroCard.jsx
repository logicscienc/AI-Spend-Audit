import React from "react";
import {
  CheckCircle2,
  Clock3,
  CalendarDays,
} from "lucide-react";

export default function AuditHeroCard({
  totalTools = 5,
  completedIn,
  auditDate,
}) {

 const formattedDate = auditDate
  ? new Date(auditDate).toLocaleString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    )
  : "Just now";

  return (
    <div className="relative overflow-hidden py-4">

      {/* STATUS */}
      <div className="flex items-center gap-2 mb-6">

        <CheckCircle2
          className="text-green-400"
          size={18}
        />

        <span
          className="
            text-sm
            font-semibold
            tracking-[0.18em]
            uppercase
            text-green-400
          "
        >
          Audit Complete
        </span>
      </div>

      {/* HEADING */}
      <h1
        className="
          text-5xl
          md:text-6xl
          leading-[1.05]
          font-semibold
          tracking-tight
          max-w-3xl
        "
      >
        Your{" "}

        <span
          className="
            bg-gradient-to-r
            from-blue-400
            via-cyan-300
            to-purple-400
            bg-clip-text
            text-transparent
          "
        >
          AI Spend Audit
        </span>

        {" "}is Ready!
      </h1>

      {/* DESCRIPTION */}
      <p
        className="
          mt-6
          max-w-2xl
          text-lg
          leading-relaxed
          text-white/65
        "
      >
        We analyzed{" "}

        <span className="text-white font-medium">
          {totalTools} tools
        </span>

        {" "}across your team and found
        significant optimization opportunities.
      </p>

      {/* META */}
      <div className="flex flex-wrap gap-3 mt-8">

        {/* TIME */}
        <div
          className="
            flex items-center gap-2
            rounded-xl
            border border-white/10
            bg-white/[0.03]
            px-4 py-3
            backdrop-blur-md
          "
        >

          <Clock3
            size={16}
            className="text-white/50"
          />

          <span className="text-sm text-white/70">
            Completed in {completedIn}
          </span>
        </div>

        {/* DATE */}
        <div
          className="
            flex items-center gap-2
            rounded-xl
            border border-white/10
            bg-white/[0.03]
            px-4 py-3
            backdrop-blur-md
          "
        >

          <CalendarDays
            size={16}
            className="text-white/50"
          />

          <span className="text-sm text-white/70">
            {formattedDate}
          </span>
        </div>
      </div>

      {/* GLOW */}
      <div
        className="
          absolute
          -top-24
          right-10
          w-72
          h-72
          rounded-full
          bg-blue-500/10
          blur-3xl
          pointer-events-none
        "
      />
    </div>
  );
}