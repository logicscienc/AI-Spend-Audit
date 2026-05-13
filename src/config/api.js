const API_BASE_URL =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const API = {
  BASE_URL: API_BASE_URL,

  AUDIT_LEAD: `${API_BASE_URL}/audit/lead`,

  AUDIT_BY_ID: (id) =>
    `${API_BASE_URL}/audit/audit/${id}`,

  GENERATE_SUMMARY:
    `${API_BASE_URL}/audit/generate-summary`,

  AUDITS: `${API_BASE_URL}/audit/audits`,
};