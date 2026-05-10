import React from "react";
import { useLocation } from "react-router-dom";
import SavingsCard from "../components/Results/SavingsCard";
import Navbar from "../components/Home/Navbar";
import Topbar from "../components/Results/Topbar";
import AuditHeroCard from "../components/Results/AuditheroCard";

const Results = () => {

  const location = useLocation();

  const {
    auditId,
    results,
    rawEntries,
    completedIn,
  auditDate,
  } = location.state || {};

  console.log(auditId);
  console.log(results);
  console.log(rawEntries);

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

        </div>
      </div>
    </div>
  );
};

export default Results;
