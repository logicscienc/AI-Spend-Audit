import React, {useEffect, useState, useCallback} from "react";
import { useLocation } from "react-router-dom";
import SavingsCard from "../components/Results/SavingsCard";
import Navbar from "../components/Home/Navbar";
import Topbar from "../components/Results/Topbar";
import AuditHeroCard from "../components/Results/AuditheroCard";
import AISummaryCard from "../components/Results/AISummaryCard";
import CredexCard from "../components/Results/CredexCard";

const Results = () => {

  const location = useLocation();
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);
  const {
    auditId,
    results = [],
    rawEntries = [],
    completedIn,
  auditDate,
  } = location.state || {};

  console.log(auditId);
  console.log(results);
  console.log(rawEntries);

  const flattenedResults =
  results.flatMap((item) => item.tools);

console.log(flattenedResults);

  const totalMonthlySavings =
  results?.reduce(
    (acc, item) =>
      acc +
      Number(item?.totalMonthlySavings || 0),
    0
  ) || 0;

const yearlySavings =
  results?.reduce(
    (acc, item) =>
      acc +
      Number(item?.totalAnnualSavings || 0),
    0
  ) || 0;

const generateSummary = useCallback(async () => {
  setLoadingSummary(true);

  try {
    const response = await fetch("http://localhost:5000/generate-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        results,
        rawEntries,
        totalMonthlySavings,
        yearlySavings,
      }),
    });

    const data = await response.json();
    setSummary(data.summary);

  } catch (error) {
    console.log(error);
    setSummary("Unable to generate AI summary right now.");
  } finally {
    setLoadingSummary(false);
  }
}, [results, rawEntries, totalMonthlySavings, yearlySavings]);

useEffect(() => {
  generateSummary();
}, [generateSummary]);

  return (
    <div className="min-h-screen bg-[#030712] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* TOPBAR */}
      <Topbar auditId={auditId} />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* TOP LEFT HERO CARD */}
          <AuditHeroCard
            totalTools={rawEntries?.length || 0}
             completedIn={completedIn}
             auditDate={auditDate}
          />

          {/* TEMP RIGHT CARD */}
          <SavingsCard
           results={results}
          rawEntries={rawEntries}
          />

          {/* Bottom left summary card */}
          <AISummaryCard
             summary={summary}
            loading={loadingSummary}
              onRegenerate={generateSummary}
          />

          {/* Bottom right Credex card */}
          <CredexCard totalMonthlySavings={totalMonthlySavings} />

        </div>
      </div>
    </div>
  );
};

export default Results;
