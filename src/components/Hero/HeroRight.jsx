import React, { useState } from "react";
import { auditEngine } from "../../utils/auditEngine";
import {
  ChevronDown,
  ArrowRight,
  Lock,
  MousePointer2,
} from "lucide-react";

import {
  SiOpenai,
  SiClaude,
  SiGithubcopilot,
  SiGooglegemini,
} from "react-icons/si";

const toolsData = [
  {
    name: "ChatGPT",
    icon: SiOpenai,
    plans: [
      "Free",
      "Go",
      "Plus",
      "Pro",
      "Business",
      "Enterprise",
    ],
  },

  {
    name: "Claude",
    icon: SiClaude,
    plans: ["Free", "Pro", "Max"],
  },

  {
    name: "Copilot",
    icon: SiGithubcopilot,
    plans: ["Free", "Pro", "Pro+"],
  },

  {
    name: "Cursor",
    icon: MousePointer2,
    plans: [
      "Hobby",
      "Pro",
      "Pro+",
      "Ultra",
      "Teams",
      "Enterprise",
    ],
  },

  {
    name: "Gemini",
    icon: SiGooglegemini,
    plans: ["Free", "AI Plus", "Pro", "Ultra"],
  },

  {
    name: "OpenAI API",
    icon: SiOpenai,
    plans: ["GPT Models"],
  },

  {
    name: "Anthropic API",
    icon: SiClaude,
    plans: ["Claude Models"],
  },
];

export default function HeroRight() {
  
  const [selectedTool, setSelectedTool] =
    useState(toolsData[0]);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [selectedPlan, setSelectedPlan] =
    useState(toolsData[0].plans[0]);

  const [teamSize, setTeamSize] = useState(25);

  const [monthlySpend, setMonthlySpend] =
    useState(2400);

    // result states
    const [auditResult, setAuditResult] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
    tool: selectedTool.name.toLowerCase(),
    plan: selectedPlan.toLowerCase(),
    teamSize: Number(teamSize),
    monthlySpend: Number(monthlySpend),
  };

  const result = auditEngine(userData);

  setAuditResult(result);

  console.log(result); 
    }

  return (
    <div
      className="
        relative
        w-full
        max-w-xl
        mx-auto
        rounded-[28px]
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
        shadow-[0_0_60px_rgba(59,130,246,0.08)]
      "
    >
      {/* TOP */}
      <div className="flex items-start justify-between mb-8">
        
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            AI Spend Analyzer
          </h2>

          <p className="text-gray-400 text-lg mt-1">
            est. savings engine v2.1
          </p>
        </div>

        {/* LIVE */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" />

          <span className="text-green-400 font-medium">
            Live
          </span>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* TOOL SELECTION */}
        <div>
          <label className="block text-sm text-gray-300 mb-3">
            Tool Selection
          </label>

          <div className="relative">
            
            {/* SELECTED */}
            <button
              type="button"
              onClick={() =>
                setDropdownOpen(!dropdownOpen)
              }
              className="
                w-full
                flex items-center justify-between
                rounded-2xl
                border border-white/10
                bg-[#111827]/70
                px-5 py-4
                text-white
              "
            >
              <div className="flex items-center gap-3">
                <selectedTool.icon className="text-2xl" />

                <span className="text-lg">
                  {selectedTool.name}
                </span>
              </div>

              <ChevronDown className="text-gray-400" />
            </button>

            {/* DROPDOWN */}
            {dropdownOpen && (
              <div
                className="
                  absolute
                  top-full
                  left-0
                  mt-3
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-[#0f172a]
                  backdrop-blur-xl
                  overflow-hidden
                  z-50
                "
              >
                {toolsData.map((tool) => (
                  <button
                    key={tool.name}
                    type="button"
                    onClick={() => {
                      setSelectedTool(tool);
                      setSelectedPlan(
                        tool.plans[0]
                      );
                      setDropdownOpen(false);
                    }}
                    className="
                      w-full
                      flex items-center gap-3
                      px-5 py-4
                      hover:bg-white/5
                      transition-all
                    "
                  >
                    <tool.icon className="text-2xl" />

                    <span>{tool.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PLAN + TEAM SIZE */}
        <div className="grid md:grid-cols-2 gap-5">
          
          {/* PLAN */}
          <div>
            <label className="block text-sm text-gray-300 mb-3">
              Current Plan
            </label>

            <div className="relative">
              <select
                value={selectedPlan}
                onChange={(e) =>
                  setSelectedPlan(e.target.value)
                }
                className="
                  w-full
                  appearance-none
                  rounded-2xl
                  border border-white/10
                  bg-[#111827]/70
                  px-5 py-4
                  text-lg
                  text-white
                  outline-none
                  focus:border-blue-500
                  transition-all
                "
              >
                {selectedTool.plans.map((plan) => (
                  <option
                    key={plan}
                    value={plan}
                    className="bg-[#111827]"
                  >
                    {plan}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  pointer-events-none
                "
              />
            </div>
          </div>

          {/* TEAM SIZE */}
          <div>
            <label className="block text-sm text-gray-300 mb-3">
              Team Size
            </label>

            <input
              type="number"
              value={teamSize}
              onChange={(e) =>
                setTeamSize(e.target.value)
              }
              placeholder="25"
              className="
                w-full
                rounded-2xl
                border border-white/10
                bg-[#111827]/70
                px-5 py-4
                text-lg
                text-white
                outline-none
                focus:border-blue-500
                transition-all
              "
            />
          </div>
        </div>

        {/* MONTHLY SPEND */}
        <div>
          <label className="block text-sm text-gray-300 mb-3">
            Monthly Spend (USD)
          </label>

          <input
            type="number"
            value={monthlySpend}
            onChange={(e) =>
              setMonthlySpend(e.target.value)
            }
            placeholder="2400"
            className="
              w-full
              rounded-2xl
              border border-white/10
              bg-[#111827]/70
              px-5 py-4
              text-lg
              text-white
              outline-none
              focus:border-blue-500
              transition-all
            "
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="
            w-full
            flex items-center justify-center gap-3
            rounded-2xl
            py-5
            text-xl
            font-semibold
            bg-gradient-to-r
            from-blue-600
            via-blue-500
            to-purple-600
            hover:scale-[1.01]
            transition-all duration-300
            shadow-[0_0_35px_rgba(59,130,246,0.35)]
          "
        >
          Get My AI Spend Audit

          <ArrowRight className="w-6 h-6" />
        </button>

        {/* FOOTER */}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <Lock className="w-4 h-4" />

          <span>
            Your data is secure and never shared
          </span>
        </div>
      </form>


      {auditResult && (
  <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
    
    <h3 className="text-2xl font-semibold mb-4">
      Audit Result
    </h3>

    <p>
      Recommendation: {auditResult.recommendation}
    </p>

    <p>
      Savings: ${auditResult.savings}
    </p>

    <p>
      Reason: {auditResult.reason}
    </p>
  </div>
)}
    </div>
  );
}
