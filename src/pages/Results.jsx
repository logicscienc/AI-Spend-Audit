import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import PerToolAuditSection from "../components/Results/audit/PerToolAuditSection";
import SavingsCard from "../components/Results/SavingsCard";
import Navbar from "../components/Home/Navbar";
import Topbar from "../components/Results/Topbar";
import AuditHeroCard from "../components/Results/AuditheroCard";
import AISummaryCard from "../components/Results/AISummaryCard";
import CredexCard from "../components/Results/CredexCard";
import ResultsTabs from "../components/Results/layout/ResultsTabs";
import UserInputsSection from "../components/Results/audit/UserInputsSection";
import SavingsBreakdownSection from "../components/Results/charts/SavingsBreakdownSection";
import RecommendationsSection from "../components/Results/audit/RecommendationsSection";
const Results = () => {
  const location = useLocation();

  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [activeTab, setActiveTab] = useState("audit-results");
  const [showAnnual, setShowAnnual] = useState(false);

  const {
    auditId,
    results,
    rawEntries = [],
    completedIn,
    auditDate,
  } = location.state || {};

  // -------------------------
  // SAFE DATA NORMALIZATION
  // -------------------------
  const safeResults = results || {};
  const toolResults = safeResults.results || [];

  console.log("auditId:", auditId);
  console.log("results:", results);
  console.log("rawEntries:", rawEntries);
  console.log("toolResults:", toolResults);

  // -------------------------
  // MEMOIZED CALCULATIONS (IMPORTANT)
  // -------------------------
  const totalMonthlySavings = useMemo(() => {
    return safeResults.totalMonthlySavings || 0;
  }, [safeResults]);

  const yearlySavings = useMemo(() => {
    return safeResults.totalAnnualSavings || 0;
  }, [safeResults]);

  // -------------------------
  // AI SUMMARY CALL (NO LOOP)
  // -------------------------
  const generateSummary = useCallback(async () => {
    if (!toolResults.length) return;

    setLoadingSummary(true);

    try {
      const response = await fetch("http://localhost:5000/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          results: toolResults,
          rawEntries,
          totalMonthlySavings,
          yearlySavings,
        }),
      });

      const data = await response.json();
      setSummary(data.summary || "");

    } catch (error) {
      console.log(error);
      setSummary("Unable to generate AI summary right now.");
    } finally {
      setLoadingSummary(false);
    }
  }, [toolResults, rawEntries, totalMonthlySavings, yearlySavings]);

  // RUN ONCE ONLY
  useEffect(() => {
    generateSummary();
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white">

      <Navbar />

      <Topbar auditId={auditId} />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* HERO */}
          <AuditHeroCard
            totalTools={rawEntries?.length || 0}
            completedIn={completedIn}
            auditDate={auditDate}
          />

          {/* SAVINGS */}
          <SavingsCard
            results={toolResults}
            rawEntries={rawEntries}
          />

          {/* SUMMARY */}
          <AISummaryCard
            summary={summary}
            loading={loadingSummary}
            onRegenerate={generateSummary}
          />

          {/* TOTAL SAVINGS */}
          <CredexCard totalMonthlySavings={totalMonthlySavings} />

        </div>

        {/* TABS */}
<div className="mt-10">
  <ResultsTabs 
    activeTab={activeTab}
    setActiveTab={setActiveTab}
  />
</div>

         {/* ADD THIS HERE */}
  {/* TAB CONTENT */}
<div className="mt-8">

  {activeTab === "audit-results" && (
    <PerToolAuditSection
      toolResults={toolResults}
    />
  )}

   {activeTab === "your-inputs" && (
    <UserInputsSection
      rawEntries={rawEntries}
    />
  )}

    {activeTab === "recommendations" && (
    <RecommendationsSection
      toolResults={toolResults}
        showAnnual={showAnnual}
        setShowAnnual={setShowAnnual}
    />
  )}

   {activeTab === "savings-breakdown" && (
    <SavingsBreakdownSection
      toolResults={toolResults}
      totalMonthlySavings={totalMonthlySavings}
      yearlySavings={yearlySavings}
        showAnnual={showAnnual}
  setShowAnnual={setShowAnnual}
    />
  )}

</div>
      </div>
    </div>
  );
};

export default Results;