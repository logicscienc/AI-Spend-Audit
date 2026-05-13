import React from "react";
import { HiHome } from "react-icons/hi2";
import { FiCode } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
   const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10  backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-24 flex items-center justify-between">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          
          {/* LOGO BOX */}
          <div
            className="
              w-16 h-16
              rounded-2xl
              border border-white/10
              bg-white/5 backdrop-blur-md
              flex items-center justify-center
              shadow-[0_0_25px_rgba(59,130,246,0.12)]
            "
          >
           <div className="flex items-center text-blue-500 font-bold">
  <span className="text-4xl">{`<`}</span>
  <span className="text-4xl">{`>`}</span>
</div>
          </div>

          {/* TEXT */}
          <div className="leading-tight">
            <h1 className="text-2xl font-semibold tracking-tight">
              AI Spend Audit
            </h1>

            <p className="text-green-500 text-sm font-medium">
              optimize.ai/budget
            </p>
          </div>
        </div>


<div className="flex items-center gap-3">

  {/* HISTORY BUTTON */}
  <button
    onClick={() => navigate("/audit-history")}
    className="
      flex items-center gap-2
      px-5 py-3
      rounded-xl
      border border-white/10
      bg-white/5 backdrop-blur-md
      hover:bg-white/10
      transition-all duration-300
    "
  >
    <FiCode className="text-lg" />
    <span className="font-medium">History</span>
  </button>

  {/* START AUDIT BUTTON */}
  <button
    onClick={() => navigate("/")}
    className="
      flex items-center gap-2
      px-5 py-3
      rounded-xl
      border border-white/10
      bg-white/5 backdrop-blur-md
      hover:bg-white/10
      transition-all duration-300
    "
  >
    <HiHome className="text-lg" />
    <span className="font-medium">Start Free Audit</span>
  </button>

</div>
      </div>
    </nav>
  );
}