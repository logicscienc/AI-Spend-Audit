import React, {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  useLocation,
  useParams,
} from "react-router-dom";

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
import LeadCaptureCard from "../components/Results/audit/LeadCaptureCard";
import {API} from "../config/api";

const Results = () => {

  const location = useLocation();

  const { id } = useParams();

  const [summary, setSummary] =
    useState("");

  const [loadingSummary, setLoadingSummary] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("audit-results");

  const [showAnnual, setShowAnnual] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [notFound, setNotFound] =
    useState(false);

  const [toolResults, setToolResults] =
    useState([]);

  const [rawEntries, setRawEntries] =
    useState([]);

  const [
    totalMonthlySavings,
    setTotalMonthlySavings,
  ] = useState(0);

  const [
    yearlySavings,
    setYearlySavings,
  ] = useState(0);

  const [auditDate, setAuditDate] =
    useState("");

  // =========================================
  // SUBMIT FLOW
  // =========================================

useEffect(() => {
  if (!id && location.state) {

    console.log("LOCATION STATE:", location.state);

    const {
      results,
      rawEntries = [],
      totalMonthlySavings,
      yearlySavings,
      summary,
      auditDate,
    } = location.state;

    setToolResults(results?.results || []);

    setRawEntries(rawEntries || []);

    setTotalMonthlySavings(
      Number(totalMonthlySavings) || 0
    );

    setYearlySavings(
      Number(yearlySavings) || 0
    );

    setSummary(summary || "");

    setAuditDate(auditDate || "");
  }
}, [id, location.state]);

  // =========================================
  // HISTORY FLOW
  // =========================================

  useEffect(() => {

    if (!id) return;

    const fetchAudit = async () => {

      try {

        setLoading(true);

        setNotFound(false);

        // -----------------------
        // CACHE
        // -----------------------

        const cachedAudit =
          sessionStorage.getItem(
            `audit-${id}`
          );

        if (cachedAudit) {

          const audit =
            JSON.parse(cachedAudit);

          setToolResults(
            Array.isArray(audit.results)
              ? audit.results
              : []
          );

          setRawEntries(
            audit.raw_entries || []
          );

          setSummary(
            audit.summary || ""
          );

          setTotalMonthlySavings(
            audit.total_monthly_savings || 0
          );

          setYearlySavings(
            audit.yearly_savings || 0
          );

          setAuditDate(
            audit.created_at || ""
          );

          setLoading(false);

          return;
        }

        // -----------------------
        // FETCH BACKEND
        // -----------------------

        const res = await fetch(
          API.AUDIT_BY_ID(id)
        );

        const data = await res.json();

        if (
          !data.success ||
          !data.audit
        ) {
          setNotFound(true);
          return;
        }

        const audit = data.audit;

        // -----------------------
        // SAVE CACHE
        // -----------------------

        sessionStorage.setItem(
          `audit-${id}`,
          JSON.stringify(audit)
        );

        // -----------------------
        // SET STATE
        // -----------------------

        setToolResults(
          Array.isArray(audit.results)
            ? audit.results
            : []
        );

        setRawEntries(
          audit.raw_entries || []
        );

        setSummary(
          audit.summary || ""
        );

        setTotalMonthlySavings(
          audit.total_monthly_savings || 0
        );

        setYearlySavings(
          audit.yearly_savings || 0
        );

        setAuditDate(
          audit.created_at || ""
        );

      } catch (err) {

        console.log(err);

        setNotFound(true);

      } finally {

        setLoading(false);
      }
    };

    fetchAudit();

  }, [id]);

  // =========================================
  // GENERATE SUMMARY
  // =========================================

  const generateSummary =
    useCallback(async () => {

      if (!toolResults.length)
        return;

      setLoadingSummary(true);

      try {

        const response =
          await fetch(
            API.GENERATE_SUMMARY,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                results: toolResults,
                rawEntries,
                totalMonthlySavings,
                yearlySavings,
              }),
            }
          );

        const data =
          await response.json();

        setSummary(
          data.summary || ""
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoadingSummary(false);
      }

    }, [
      toolResults,
      rawEntries,
      totalMonthlySavings,
      yearlySavings,
    ]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#030712] text-white p-6">

        <div className="max-w-7xl mx-auto">

          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="h-48 rounded-2xl bg-white/5" />

            <div className="h-48 rounded-2xl bg-white/5" />

            <div className="h-64 rounded-2xl bg-white/5 lg:col-span-2" />

          </div>

        </div>

      </div>
    );
  }

  // =========================================
  // NOT FOUND
  // =========================================

  if (notFound) {

    return (
      <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">

        Audit Not Found

      </div>
    );
  }

  // =========================================
  // MAIN UI
  // =========================================

  return (
    <div className="min-h-screen bg-[#030712] text-white">

      {/* <Navbar /> */}

      <Topbar auditId={id} />

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <AuditHeroCard
            totalTools={rawEntries.length}
            auditDate={auditDate}
          />

          <SavingsCard
            results={toolResults}
            rawEntries={rawEntries}
          />

          <AISummaryCard
            summary={summary}
            loading={loadingSummary}
            onRegenerate={generateSummary}
          />

          <CredexCard
            totalMonthlySavings={
              totalMonthlySavings
            }
          />

        </div>

        <div className="mt-10">

          <ResultsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

        </div>

        <div className="mt-8">

          {activeTab ===
            "audit-results" && (
            <PerToolAuditSection
              toolResults={toolResults}
            />
          )}

          {activeTab ===
            "your-inputs" && (
            <UserInputsSection
              rawEntries={rawEntries}
            />
          )}

          {activeTab ===
            "recommendations" && (
            <RecommendationsSection
              toolResults={toolResults}
              showAnnual={showAnnual}
              setShowAnnual={
                setShowAnnual
              }
            />
          )}

          {activeTab ===
            "savings-breakdown" && (
            <SavingsBreakdownSection
              toolResults={toolResults}
              totalMonthlySavings={
                totalMonthlySavings
              }
              yearlySavings={
                yearlySavings
              }
              showAnnual={showAnnual}
              setShowAnnual={
                setShowAnnual
              }
            />
          )}

        </div>

        <div className="mt-12">

          <LeadCaptureCard
            totalMonthlySavings={
              totalMonthlySavings
            }
          />

        </div>

      </div>

    </div>
  );
};

export default Results;