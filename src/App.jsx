import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

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

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
