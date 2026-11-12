import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shield, Zap, Sparkles } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="relative py-28 sm:py-36 bg-burgundy-cinematic overflow-hidden text-[#FBF8F0]">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-[#C69A42]/20 via-[#4A151A]/40 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EAD6A0]/30 bg-white/5 backdrop-blur-sm mb-6 text-xs font-mono tracking-widest text-[#EAD6A0] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C69A42]" />
          <span>CYBER FRAUD DEFENSE IN REAL TIME</span>
        </div>

        {/* Main Headline */}
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
          THE NEXT SCAM SHOULDN'T CATCH YOU OFF GUARD.
        </h2>

        {/* Supporting Copy */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/75 leading-relaxed mb-10">
          Connect your messages, URLs, phone numbers, and payment requests to unmask the hidden pattern before sharing passwords or authorizing transfers.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/app/scan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl btn-gold-shimmer text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#C69A42] shadow-xl hover:shadow-2xl transition focus:outline-none"
          >
            <span>Open 4Slayers</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            to="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/25 hover:border-white/60 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition focus:outline-none"
          >
            <span>Explore Workspace</span>
          </Link>
        </div>

        {/* Trust Notice */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-white/50">
          <span>✓ Zero Third-Party Telemetry</span>
          <span>✓ Explainable Baseline Rules</span>
          <span>✓ Single-Click Data Purge</span>
        </div>

      </div>
    </section>
  );
}
