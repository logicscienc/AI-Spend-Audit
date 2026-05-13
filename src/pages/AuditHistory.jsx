import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
const AuditHistory = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAudits = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(
        API.AUDITS
      );
      const data = await response.json();

      setAudits(data.audits || []);
    } catch (error) {
      console.log("Failed to fetch audits:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAudits();
  }, [fetchAudits]);

  return (
    <div className="min-h-screen bg-[#030712] text-white px-6 py-12">
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Audit History
        </h1>

        <p className="text-gray-400 mt-2">
          Track your AI spend optimization over time
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto">

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-gray-400 mt-4 text-sm">
              Loading your audit history...
            </p>
          </div>

        ) : audits.length === 0 ? (
          
          /* EMPTY STATE */
          <div className="text-center py-32">
            <div className="text-gray-500 text-lg">
              No audits found yet
            </div>

            <p className="text-gray-600 mt-2 text-sm">
              Run your first AI spend audit to see insights here
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
            >
              Start Audit
            </button>
          </div>

        ) : (

          /* AUDIT LIST */
          <div className="grid gap-5">
            {audits.map((audit) => (
              <div
                key={audit.id}
                onClick={() =>
                  navigate(`/audit/${audit.id}`)
                }
                className="
                  group
                  cursor-pointer
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  p-6
                  backdrop-blur-md
                  transition-all duration-300
                  hover:bg-white/10
                  hover:scale-[1.01]
                  hover:border-white/20
                "
              >

                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold group-hover:text-blue-400 transition">
                    Audit #{audit.id.slice(0, 8)}
                  </h2>

                  <span className="text-xs text-gray-400">
                    {new Date(audit.created_at).toLocaleString()}
                  </span>
                </div>

                {/* SUMMARY */}
                <p className="text-gray-400 mt-4 text-sm line-clamp-2 leading-relaxed">
                  {audit.summary}
                </p>

                {/* FOOTER */}
                <div className="mt-6 flex justify-between items-center">

                  <div className="text-green-400 font-semibold">
                    ${audit.total_monthly_savings}
                    <span className="text-gray-400 font-normal text-sm">
                      {" "} / month saved
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/audit/${audit.id}`)
                    }
                    className="
                      px-4 py-2
                      rounded-xl
                      bg-white/10
                      hover:bg-white/20
                      text-sm
                      transition
                    "
                  >
                    View Details
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditHistory;
