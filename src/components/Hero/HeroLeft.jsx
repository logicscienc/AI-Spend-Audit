import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function HeroLeft() {
  return (
    <div className="max-w-2xl">
      
      {/* TOP TAG */}
      <div
        className="
          inline-flex items-center gap-3
          px-5 py-2
          rounded-full
          border border-white/10
          bg-white/5
          backdrop-blur-md
          mb-8
        "
      >
        <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_12px_#4ade80]" />

        <span
          className="
            text-sm
            uppercase
            tracking-[0.25em]
            text-gray-300
            font-medium
          "
        >
          AI Cost Optimization Platform
        </span>
      </div>

      {/* HEADING */}
      <h1
        className="
          text-5xl
          md:text-7xl
          font-bold
          leading-[1.05]
          tracking-tight
          mb-8
        "
      >
        Stop Overpaying
        <br />
        for{" "}
        <span
          className="
            bg-gradient-to-r
            from-blue-400
            via-cyan-400
            to-purple-500
            bg-clip-text
            text-transparent
          "
        >
          AI Tools
        </span>
      </h1>

      {/* PARAGRAPH */}
      <p
        className="
          text-lg
          md:text-xl
          text-gray-400
          leading-relaxed
          max-w-xl
          mb-10
        "
      >
        Analyze your AI subscriptions, detect waste, and
        reduce SaaS costs across your entire team in minutes.
      </p>

      {/* FEATURES */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        
        {/* ITEM 1 */}
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-400 w-6 h-6" />

          <span className="text-gray-300 text-lg">
            No integrations required
          </span>
        </div>

        {/* ITEM 2 */}
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-green-400 w-6 h-6" />

          <span className="text-gray-300 text-lg">
            Instant recommendations
          </span>
        </div>
      </div>
    </div>
  );
}