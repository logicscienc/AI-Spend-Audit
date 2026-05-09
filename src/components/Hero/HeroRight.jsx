import React, { useState, useEffect } from "react";
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
      "API Direct",
    ],
  },

  {
    name: "Claude",
    icon: SiClaude,
    plans: [
      "Free",
      "Pro",
      "Max",
      "Team",
      "Enterprise",
      "API Direct",
    ],
  },

  {
    name: "GitHub Copilot",
    icon: SiGithubcopilot,
    plans: [
      "Individual",
      "Business",
      "Enterprise",
    ],
  },

  {
    name: "Cursor",
    icon: MousePointer2,
    plans: [
      "Hobby",
      "Pro",
      "Business",
      "Enterprise",
    ],
  },

  {
    name: "Gemini",
    icon: SiGooglegemini,
    plans: [
      "Pro",
      "Ultra",
      "API",
    ],
  },

  {
    name: "OpenAI API",
    icon: SiOpenai,
    plans: ["API Direct"],
  },

  {
    name: "Anthropic API",
    icon: SiClaude,
    plans: ["API Direct"],
  },

  {
    name: "Windsurf",
    icon: MousePointer2,
    plans: [
      "Free",
      "Pro",
      "Teams",
    ],
  },
];

export default function HeroRight() {

  // -------------------------
  // FORM STATES
  // -------------------------

  const [selectedTool, setSelectedTool] =
    useState(toolsData[0]);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [selectedPlan, setSelectedPlan] =
    useState(toolsData[0].plans[0]);

  const [teamSize, setTeamSize] =
    useState(10);

  const [seats, setSeats] =
    useState(5);

  const [monthlySpend, setMonthlySpend] =
    useState(500);

  const [useCase, setUseCase] =
    useState("coding");

  // -------------------------
  // LOCAL STORAGE PERSISTENCE
  // -------------------------

  useEffect(() => {
    const savedData =
      localStorage.getItem("aiSpendForm");

    if (savedData) {
      const parsed = JSON.parse(savedData);

      const tool =
        toolsData.find(
          (t) => t.name === parsed.selectedTool
        ) || toolsData[0];

      setSelectedTool(tool);

      setSelectedPlan(
        parsed.selectedPlan || tool.plans[0]
      );

      setTeamSize(parsed.teamSize || 10);

      setSeats(parsed.seats || 5);

      setMonthlySpend(
        parsed.monthlySpend || 500
      );

      setUseCase(
        parsed.useCase || "coding"
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "aiSpendForm",
      JSON.stringify({
        selectedTool: selectedTool.name,
        selectedPlan,
        teamSize,
        seats,
        monthlySpend,
        useCase,
      })
    );
  }, [
    selectedTool,
    selectedPlan,
    teamSize,
    seats,
    monthlySpend,
    useCase,
  ]);

  // -------------------------
  // SUBMIT
  // -------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      tool: selectedTool.name.toLowerCase(),
      plan: selectedPlan.toLowerCase(),
      teamSize: Number(teamSize),
      seats: Number(seats),
      monthlySpend: Number(monthlySpend),
      useCase,
    };

    const result = auditEngine(userData);

    console.log(result);

    // later:
    // navigate("/results", { state: result })
  };

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
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* TOOL */}
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

        {/* PLAN + USE CASE */}
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

          {/* USE CASE */}
          <div>

            <label className="block text-sm text-gray-300 mb-3">
              Primary Use Case
            </label>

            <select
              value={useCase}
              onChange={(e) =>
                setUseCase(e.target.value)
              }
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
            >
              <option value="coding">
                Coding
              </option>

              <option value="writing">
                Writing
              </option>

              <option value="research">
                Research
              </option>

              <option value="data">
                Data
              </option>

              <option value="mixed">
                Mixed
              </option>
            </select>
          </div>
        </div>

        {/* TEAM SIZE + SEATS */}
        <div className="grid md:grid-cols-2 gap-5">

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

          {/* SEATS */}
          <div>

            <label className="block text-sm text-gray-300 mb-3">
              Seats Using This Tool
            </label>

            <input
              type="number"
              value={seats}
              onChange={(e) =>
                setSeats(e.target.value)
              }
              placeholder="5"
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
            Current Monthly Spend (USD)
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
    </div>
  );
}
