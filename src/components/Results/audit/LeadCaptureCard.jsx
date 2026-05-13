import React, { useState } from "react";
import toast from "react-hot-toast";
import {API} from "../../../config/api";
const LeadCaptureCard = ({ totalMonthlySavings }) => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isHighSavings = totalMonthlySavings >= 500;

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

   await fetch(API.AUDIT_LEAD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        company,
        role,
        teamSize,
        website,
        totalMonthlySavings,
      }),
    });

    toast.success("Lead submitted successfully 🎉");

    setSubmitted(true);
  } catch (err) {
    toast.error("Something went wrong!");
    console.log(err);
  } finally {
    setLoading(false);
  }
};

if (submitted) {
  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">

      {/* CHECK ICON ANIMATION */}
      <div className="flex justify-center mb-4">
        <div className="h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
          <svg
            className="w-7 h-7 text-emerald-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-white mb-2">
        Audit Saved Successfully
      </h2>

      <p className="text-gray-300 text-sm">
        We'll notify you when new optimization opportunities are available.
      </p>
    </div>
  );
}

  return (
   <div className="mx-auto w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      {/* HEADER */}
      <h2 className="text-xl font-semibold text-white mb-2">
        {isHighSavings
          ? "Unlock More Savings With Credex"
          : "Stay Updated On New Savings"}
      </h2>

      <p className="text-sm text-gray-400 mb-6">
        {isHighSavings
          ? "Your audit shows significant savings potential. Credex can help reduce your AI costs further."
          : "We'll notify you if better optimization opportunities appear."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* INPUTS */}
        {[
          {
            type: "email",
            placeholder: "Work email",
            value: email,
            set: setEmail,
            required: true,
          },
          {
            type: "text",
            placeholder: "Company (optional)",
            value: company,
            set: setCompany,
          },
          {
            type: "text",
            placeholder: "Role (optional)",
            value: role,
            set: setRole,
          },
          {
            type: "number",
            placeholder: "Team size (optional)",
            value: teamSize,
            set: setTeamSize,
          },
        ].map((field, i) => (
          <input
            key={i}
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.set(e.target.value)}
            className="
              w-full
              rounded-xl
              bg-white/5
              border border-white/10
              px-4 py-3
              text-sm text-white
              placeholder-gray-500
              outline-none
              focus:border-cyan-300/40
              focus:ring-2 focus:ring-cyan-300/10
              transition
            "
          />
        ))}

        {/* HIDDEN FIELD */}
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          tabIndex="-1"
          autoComplete="off"
        />

        {/* BUTTON (UPDATED STYLE) */}
       <button
  type="submit"
  disabled={loading}
  className={`
    w-full
    rounded-xl
    py-3
    font-medium
    transition-all duration-300
    flex items-center justify-center gap-2

    ${
      loading
        ? "bg-white/10 text-gray-400 cursor-not-allowed"
        : "bg-transparent text-cyan-300 hover:text-white"
    }

    border-b-2 border-cyan-300
    hover:border-cyan-200
    shadow-[0_0_12px_rgba(34,211,238,0.15)]
  `}
>
  {loading && (
    <div className="h-4 w-4 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
  )}

  {loading
    ? "Processing..."
    : isHighSavings
    ? "Book Credex Consultation"
    : "Notify Me"}
</button>

      </form>
    </div>
  );
};

export default LeadCaptureCard;