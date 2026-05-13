import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AuditHistory = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // -----------------------------
  // FETCH AUDITS FROM BACKEND
  // -----------------------------

  const fetchAudits = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/audit/audits");
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
    <div className="min-h-screen bg-[#030712] text-white px-6 py-10">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Audit History</h1>
        <p className="text-gray-400 mt-1">
          Track your AI spend optimization over time
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-gray-400">Loading audits...</p>
        ) : audits.length === 0 ? (
          <p className="text-gray-500">No audits found.</p>
        ) : (
          <div className="grid gap-4">
            {audits.map((audit) => (
              <div
                key={audit.id}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition cursor-pointer"
              >
                {/* TOP ROW */}
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">
                    Audit #{audit.id.slice(0, 8)}
                  </h2>

                  <span className="text-sm text-gray-400">
                    {new Date(audit.created_at).toLocaleString()}
                  </span>
                </div>

                {/* SUMMARY */}
                <p className="text-gray-300 mt-3 text-sm line-clamp-2">
                  {audit.summary}
                </p>

                {/* SAVINGS */}
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-green-400 font-semibold">
                    ${audit.total_monthly_savings}/month saved
                  </p>

                  <button
                    onClick={() => navigate(`/audit/${audit.id}`)}
                    className="text-sm px-3 py-1 rounded-md bg-white/10 hover:bg-white/20"
                  >
                    View
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
