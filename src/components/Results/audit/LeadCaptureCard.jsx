import React, { useState } from "react";

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

      await fetch("http://localhost:5000/api/audit/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          company,
          role,
          teamSize,
          website,
          totalMonthlySavings,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">
        <h2 className="text-2xl font-semibold mb-2">
          Audit Saved Successfully
        </h2>

        <p className="text-gray-300">
          We'll notify you when new optimization opportunities are available.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <h2 className="text-2xl font-semibold mb-2">
        {isHighSavings
          ? "Unlock More Savings With Credex"
          : "Stay Updated On New Savings"}
      </h2>

      <p className="text-gray-400 mb-6">
        {isHighSavings
          ? "Your audit shows significant savings potential. Credex can help reduce your AI infrastructure costs even further."
          : "You're already spending efficiently. We'll notify you if better optimization opportunities appear."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          required
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
        />

        <input
          type="text"
          placeholder="Company (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
        />

        <input
          type="text"
          placeholder="Role (optional)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
        />

        <input
          type="number"
          placeholder="Team size (optional)"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none"
        />

        <input
  type="text"
  value={website}
  onChange={(e) => setWebsite(e.target.value)}
  className="hidden"
  tabIndex="-1"
  autoComplete="off"
/>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-xl
            bg-blue-600
            hover:bg-blue-500
            transition
            py-3
            font-medium
          "
        >
          {loading
            ? "Saving..."
            : isHighSavings
            ? "Book Credex Consultation"
            : "Notify Me"}
        </button>

      </form>
    </div>
  );
};

export default LeadCaptureCard;