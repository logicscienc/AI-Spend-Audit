import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import AuditHistory from "./pages/AuditHistory";
import Navbar from "./components/Home/Navbar";
import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" />
     <Navbar />

      <div className="pt-24"></div>
      <div className="min-h-screen">
        <Routes>

          {/* HOME PAGE */}
          <Route path="/" element={<Home />} />

          {/* RESULTS PAGE */}
          <Route path="/results" element={<Results />} />
           
  <Route path="/audit/:id" element={<Results />} />

          {/* AUDIT HISTORY PAGE */}
          <Route path="/audit-history" element={<AuditHistory />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
