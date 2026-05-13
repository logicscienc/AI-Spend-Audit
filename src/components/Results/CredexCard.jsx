import React from "react";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import wallet from "../../assets/wallet.png";


export default function CredexCard({
    totalMonthlySavings = 0,
})
{
    // Low savings case

    if(totalMonthlySavings < 500 )
    {
         return (
      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          p-7
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              flex items-center justify-center
              w-11 h-11
              rounded-2xl
              bg-blue-500/10
              border border-blue-500/20
            "
          >
            <Sparkles
              size={20}
              className="text-blue-300"
            />
          </div>

          <div>

            <h3 className="text-xl font-semibold">
              Your AI spend looks healthy
            </h3>

            <p className="text-sm text-white/50 mt-1">
              We’ll notify you when new
              optimizations become available.
            </p>
          </div>
        </div>

   <div className="mt-7 flex items-end justify-between">

  {/* BUTTON */}
  <button
    className="
      rounded-2xl
      border border-white/10
      bg-white/[0.04]
      px-5 py-4
      text-white/80
      hover:bg-white/[0.06]
      transition-all
      w-fit
    "
  >
    Notify Me Later
  </button>

  {/* IMAGE */}
  <img
    src={wallet}
    alt="Wallet"
    className="
      w-40
      translate-y-2
      object-contain
      pointer-events-none
      select-none
      opacity-90
    "
  />
</div>

{/* GLOW */}
<div
  className="
    absolute
    -bottom-24
    -right-24
    w-72
    h-72
    rounded-full
    bg-blue-500/10
    blur-3xl
    pointer-events-none
  "
/>
      </div>
    );
  }

 
  // HIGH SAVINGS CASE


  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border border-white/10
        bg-[#071120]/70
        backdrop-blur-xl
        p-7
      "
    >

      {/* CONTENT */}
      <div className="max-w-[60%]">

        <p
          className="
            text-green-400
            font-semibold
            text-lg
          "
        >
          High savings opportunity detected!
        </p>

        <p
          className="
            mt-4
            text-white/70
            leading-7
          "
        >
          Credex can help your team access
          discounted AI infrastructure credits
          and reduce recurring software spend.
        </p>

        {/* CTA */}
        <button

        onClick={() => {
  document.getElementById("lead-capture")?.scrollIntoView({
    behavior: "smooth",
  });
}}
          className="
            mt-7
            flex items-center justify-center gap-2
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-purple-500
            px-6 py-4
            font-medium
            text-white
            transition-all
            hover:scale-[1.02]
          "
        >
          Talk to Credex

          <ArrowRight size={18} />
        </button>

        {/* FOOTER */}
        <div
          className="
            mt-5
            flex items-center gap-3
            text-sm text-white/40
          "
        >
          <span>Free consultation</span>

          <div className="w-1 h-1 rounded-full bg-white/20" />

          <span>No obligation</span>
        </div>
      </div>

      {/* IMAGE */}
      <img
        src={wallet}
        alt="Wallet"
        className="
  absolute
  bottom-4
  right-4
  w-44
  object-contain
  pointer-events-none
  select-none
"
      />

      {/* GLOW */}
      <div
        className="
          absolute
          -bottom-24
          -right-24
          w-72
          h-72
          rounded-full
          bg-purple-500/10
          blur-3xl
          pointer-events-none
        "
      />
      </div>
  );
}
