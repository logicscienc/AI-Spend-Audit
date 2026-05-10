import React, { useState, useEffect } from "react";
import { auditEngine } from "../../utils/auditEngine";
import {useNavigate} from "react-router-dom";

import {
  ChevronDown,
  ArrowRight,
  Lock,
  MousePointer2,
  Plus,
  Trash2,
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
    plans: [
      "Free",
      "Pro",
      "Max",
    ],
  },

  {
    name: "Copilot",
    icon: SiGithubcopilot,
    plans: [
      "Free",
      "Pro",
      "ProPlus",
    ],
  },

  {
    name: "Cursor",
    icon: MousePointer2,
    plans: [
      "Hobby",
      "Pro",
      "ProPlus",
      "Ultra",
      "Teams",
      "Enterprise",
    ],
  },

  {
    name: "Gemini",
    icon: SiGooglegemini,
    plans: [
      "Free",
      "AIPlus",
      "AIPro",
      "AIUltra",
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


  const navigate = useNavigate();

  // -------------------------
  // TOOL ENTRIES
  // -------------------------

  const [toolEntries, setToolEntries] =
    useState([
      {
        id: Date.now(),

        tool: "ChatGPT",

        plan: "Free",

        useCase: "coding",

        teamSize: "",

        seats: "",

        monthlySpend: "",

        errors: {},

        dropdownOpen: false,
      },
    ]);

  // -------------------------
  // ADD TOOL
  // -------------------------

  const addToolEntry = () => {

    setToolEntries((prev) => [
      ...prev,

      {
        id: Date.now(),

        tool: "ChatGPT",

        plan: "Free",

        useCase: "coding",

        teamSize: "",

        seats: "",

        monthlySpend: "",

        errors: {},

        dropdownOpen: false,
      },
    ]);
  };

  // -------------------------
  // REMOVE TOOL
  // -------------------------

  const removeToolEntry = (id) => {

    if (toolEntries.length === 1) return;

    setToolEntries(
      toolEntries.filter(
        (entry) => entry.id !== id
      )
    );
  };

  // -------------------------
  // UPDATE FIELD
  // -------------------------

  const updateToolEntry = (
    id,
    field,
    value
  ) => {

    setToolEntries((prev) =>
      prev.map((entry) => {

        if (entry.id !== id)
          return entry;

        return {
          ...entry,

          [field]: value,

          errors: {
            ...entry.errors,

            [field]: "",
          },
        };
      })
    );
  };

  // -------------------------
  // TOOL CHANGE
  // -------------------------

  const handleToolChange = (
    id,
    toolName
  ) => {

    const selectedTool =
      toolsData.find(
        (tool) =>
          tool.name === toolName
      );

    setToolEntries((prev) =>
      prev.map((entry) => {

        if (entry.id !== id)
          return entry;

        return {
          ...entry,

          tool: selectedTool.name,

          plan:
            selectedTool.plans[0],

          dropdownOpen: false,
        };
      })
    );
  };

  // -------------------------
  // DROPDOWN TOGGLE
  // -------------------------

  const toggleDropdown = (id) => {

    setToolEntries((prev) =>
      prev.map((entry) => {

        if (entry.id !== id)
          return entry;

        return {
          ...entry,

          dropdownOpen:
            !entry.dropdownOpen,
        };
      })
    );
  };

  // -------------------------
  // VALIDATION
  // -------------------------

  const validateEntries = () => {

    let isValid = true;

    const updatedEntries =
      toolEntries.map((entry) => {

        const errors = {};

        if (!entry.tool) {
          errors.tool =
            "Tool is required";
        }

        if (!entry.plan) {
          errors.plan =
            "Plan is required";
        }

        if (!entry.useCase) {
          errors.useCase =
            "Use case is required";
        }

        if (
          !entry.teamSize ||
          Number(entry.teamSize) <= 0
        ) {
          errors.teamSize =
            "Valid team size required";
        }

       const isApiTool =
  entry.tool === "OpenAI API" ||
  entry.tool === "Anthropic API";

if (
  !isApiTool &&
  (
    !entry.seats ||
    Number(entry.seats) <= 0
  )
) {
  errors.seats =
    "Valid seats required";
}

        if (
          !entry.monthlySpend ||
          Number(
            entry.monthlySpend
          ) <= 0
        ) {
          errors.monthlySpend =
            "Valid monthly spend required";
        }

        if (
          Object.keys(errors).length >
          0
        ) {
          isValid = false;
        }

        return {
          ...entry,
          errors,
        };
      });

    setToolEntries(updatedEntries);

    return isValid;
  };

  // -------------------------
  // LOCAL STORAGE
  // -------------------------

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "aiSpendEntries"
      );

    if (saved) {
      setToolEntries(
        JSON.parse(saved)
      );
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "aiSpendEntries",

      JSON.stringify(toolEntries)
    );

  }, [toolEntries]);

  function normalizeTool(tool) {

  const map = {
    "ChatGPT": "chatgpt",
    "Claude": "claude",
    "Copilot": "copilot",
    "Cursor": "cursor",
    "Gemini": "gemini",
    "OpenAI API": "openai",
    "Anthropic API": "anthropicapi",
    "Windsurf": "windsurf",
  };

  return map[tool] || tool.toLowerCase();
}

function normalizePlan(plan) {

  return plan
    .toLowerCase()
    .replace(/\s+/g, "");
}

  // -------------------------
  // SUBMIT
  // -------------------------

 const handleSubmit = (e) => {

  e.preventDefault();

  const startTime = performance.now();

  const isValid = validateEntries();

  if (!isValid) return;

  const formattedData =
    toolEntries.map((entry) => ({

     tool: normalizeTool(entry.tool),

      plan: normalizePlan(entry.plan),

      seats: Number(entry.seats),

      teamSize: Number(entry.teamSize),

      monthlySpend: Number(entry.monthlySpend),

      useCase: entry.useCase,
    }));

  const results = auditEngine(formattedData);

    console.log("AUDIT RESULTS", results);

    const endTime = performance.now();

const completedIn =
  ((endTime - startTime) / 1000).toFixed(1);

  // DYNAMIC AUDIT ID
  const auditId =
    `AUD-${crypto.randomUUID()
      .slice(0, 8)
      .toUpperCase()}`;

  // NAVIGATE TO RESULTS PAGE
  navigate("/results", {
    state: {
      auditId,
      results,
      rawEntries: toolEntries,
        completedIn: `${completedIn}s`,
    auditDate: new Date().toISOString(),
    },
  });
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
        className="space-y-8"
      >

        {/* TOOL ENTRIES */}
       {toolEntries.map((entry) => {

  const selectedTool =
    toolsData.find(
      (tool) =>
        tool.name ===
        entry.tool
    );

  const isApiTool =
    entry.tool === "OpenAI API" ||
    entry.tool === "Anthropic API";

  

 


          return (
            <div
              key={entry.id}
              className="
                rounded-3xl
                border border-white/10
                bg-[#0f172a]/70
                p-6
                space-y-6
              "
            >

              {/* CARD HEADER */}
              <div className="flex items-center justify-between">

                <h3 className="text-xl font-semibold">
                  Tool Entry
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    removeToolEntry(
                      entry.id
                    )
                  }
                  className="
                    flex items-center gap-2
                    text-red-400
                    hover:text-red-300
                    transition-all
                  "
                >

                  <Trash2 className="w-4 h-4" />

                  Remove
                </button>
              </div>

              {/* TOOL */}
              <div>

                <label className="block text-sm text-gray-300 mb-3">

                  Tool Selection
                </label>

                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      toggleDropdown(
                        entry.id
                      )
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
                        {
                          selectedTool.name
                        }
                      </span>
                    </div>

                    <ChevronDown className="text-gray-400" />
                  </button>

                  {/* DROPDOWN */}
                  {entry.dropdownOpen && (

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
                        overflow-hidden
                        z-50
                      "
                    >

                      {toolsData.map(
                        (tool) => (
                          <button
                            key={tool.name}
                            type="button"
                            onClick={() =>
                              handleToolChange(
                                entry.id,
                                tool.name
                              )
                            }
                            className="
                              w-full
                              flex items-center gap-3
                              px-5 py-4
                              hover:bg-white/5
                              transition-all
                            "
                          >

                            <tool.icon className="text-2xl" />

                            <span>
                              {tool.name}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {entry.errors.tool && (
                  <p className="text-red-400 text-sm mt-2">
                    {
                      entry.errors.tool
                    }
                  </p>
                )}
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
                      value={entry.plan}
                      onChange={(e) =>
                        updateToolEntry(
                          entry.id,
                          "plan",
                          e.target.value
                        )
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
                      "
                    >

                      {selectedTool.plans.map(
                        (plan) => (
                          <option
                            key={plan}
                            value={plan}
                            className="bg-[#111827]"
                          >
                            {plan}
                          </option>
                        )
                      )}
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
                    value={entry.useCase}
                    onChange={(e) =>
                      updateToolEntry(
                        entry.id,
                        "useCase",
                        e.target.value
                      )
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

              {/* TEAM + SEATS */}
              <div className="grid md:grid-cols-2 gap-5">

                {/* TEAM SIZE */}
                <div>

                  <label className="block text-sm text-gray-300 mb-3">
                    Team Size
                  </label>

                  <input
                    type="number"
                    value={entry.teamSize}
                    onChange={(e) =>
                      updateToolEntry(
                        entry.id,
                        "teamSize",
                        e.target.value
                      )
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
                    "
                  />

                  {entry.errors
                    .teamSize && (
                    <p className="text-red-400 text-sm mt-2">
                      {
                        entry.errors
                          .teamSize
                      }
                    </p>
                  )}
                </div>

                {/* SEATS */}
                {/* SEATS */}
{!isApiTool && (
  <div>

    <label className="block text-sm text-gray-300 mb-3">
      Seats Using This Tool
    </label>

    <input
      type="number"
      value={entry.seats}
      onChange={(e) =>
        updateToolEntry(
          entry.id,
          "seats",
          e.target.value
        )
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
      "
    />

    {entry.errors.seats && (
      <p className="text-red-400 text-sm mt-2">
        {entry.errors.seats}
      </p>
    )}
  </div>
)}
              </div>

              {/* MONTHLY SPEND */}
              <div>

                <label className="block text-sm text-gray-300 mb-3">
                  Current Monthly Spend
                  (USD)
                </label>

                <input
                  type="number"
                  value={
                    entry.monthlySpend
                  }
                  onChange={(e) =>
                    updateToolEntry(
                      entry.id,
                      "monthlySpend",
                      e.target.value
                    )
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
                  "
                />

                {entry.errors
                  .monthlySpend && (
                  <p className="text-red-400 text-sm mt-2">
                    {
                      entry.errors
                        .monthlySpend
                    }
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* ADD BUTTON */}
        <button
          type="button"
          onClick={addToolEntry}
          className="
            w-full
            flex items-center justify-center gap-3
            rounded-2xl
            border border-dashed border-blue-500/40
            bg-blue-500/5
            py-5
            text-blue-400
            hover:bg-blue-500/10
            transition-all
          "
        >

          <Plus className="w-5 h-5" />

          Add Another Tool
        </button>

        {/* SUBMIT */}
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
