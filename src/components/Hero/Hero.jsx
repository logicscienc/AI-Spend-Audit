import React from 'react'
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function Hero() {
  return (
    <section className="w-full px-6 md:px-10 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT */}
        <HeroLeft />

        {/* RIGHT */}
        <HeroRight />
      </div>
    </section>
  );
}
