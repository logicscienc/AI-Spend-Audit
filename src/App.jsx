import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import AuditHistory from "./pages/AuditHistory";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>

          {/* HOME PAGE */}
          <Route path="/" element={<Home />} />

          {/* RESULTS PAGE */}
          <Route path="/results" element={<Results />} />
           {/* HISTORY FLOW (IMPORTANT) */}
  <Route path="/audit/:id" element={<Results />} />

          {/* AUDIT HISTORY PAGE */}
          <Route path="/audit-history" element={<AuditHistory />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
