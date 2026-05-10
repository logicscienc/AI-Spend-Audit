import React from "react";
import { Copy, Share2 } from "lucide-react";

export default function Topbar({ auditId }) {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = async () => {

    const shareData = {
      title: "AI Spend Audit",
      text: "Check out this AI spend audit report",
      url: window.location.href,
    };

    if (navigator.share) {

      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(err);
      }

    } else {

      handleCopy();
    }
  };

  return (
    <div className="w-full">

      <div className="mx-auto flex max-w-7xl items-center justify-end px-6 py-4">

        <div className="flex items-center gap-3">

          {/* AUDIT ID */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">

            <p className="text-xs uppercase tracking-wide text-white/40">
              Audit ID
            </p>

            <p className="text-sm font-medium text-white">
              {auditId}
            </p>

          </div>

          {/* COPY LINK */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >

            <Copy size={16} />

            Copy Link

          </button>

          {/* SHARE */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >

            <Share2 size={16} />

            Share

          </button>

        </div>
      </div>
    </div>
  );
}