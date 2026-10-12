import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import ParticleVortex3D from '../components/ParticleVortex3D';
import TechStackStrip from '../components/TechStackStrip';
import HiddenConnectionsSection from '../components/HiddenConnectionsSection';
import PipelineMotionSection from '../components/PipelineMotionSection';
import ScamDNAInteractiveSection from '../components/ScamDNAInteractiveSection';
import ExplainableDetectionSection from '../components/ExplainableDetectionSection';
import ActionPlaybookSection from '../components/ActionPlaybookSection';
import DemoPresetsBar from '../components/DemoPresetsBar';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { demoLogin } = useAuth();

  const scrollToOverview = () => {
    const elem = document.getElementById('platform');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-white selection:text-black">
      
      {/* =========================================================================
          HERO SECTION — 100svh Immersive Monochromatic Generative Particle Vortex
          ========================================================================= */}
      <section className="relative w-full h-[100svh] min-h-[680px] flex flex-col justify-between items-center overflow-hidden bg-black pt-20 pb-6 sm:pb-8">
        
        {/* Generative 3D Hourglass Particle Field Sculpture Background */}
        <ParticleVortex3D />

        {/* Ambient atmospheric depth gradient - pure black vignettes */}
        <div 
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.7)_85%,rgba(0,0,0,1)_100%)]" 
          aria-hidden="true" 
        />

        {/* Top spacer to balance visual vertical center */}
        <div className="w-full h-8 sm:h-12 pointer-events-none" />

        {/* Hero Center Content — Centered horizontally & near visual center */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center select-none flex flex-col items-center my-auto">
          {/* Subtle radial text feathering to guarantee crystalline typography over particles */}
          <div className="absolute inset-0 -m-8 sm:-m-16 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_70%)] pointer-events-none -z-10" aria-hidden="true" />
          
          {/* Main Headline with exact copy and elegant lightweight typography */}
          <h1 className="tracking-tight text-white font-light text-4xl sm:text-6xl md:text-7xl lg:text-[5.1rem] leading-[1.08] max-w-4xl mx-auto mb-6 sm:mb-8 font-sans">
            <span className="block text-white font-light">
              The intelligence to see
            </span>
            <span className="block text-white/50 font-light mt-1 sm:mt-2">
              the scam before it unfolds.
            </span>
          </h1>

          {/* Supporting Copy */}
          <div className="max-w-2xl mx-auto space-y-1.5 sm:space-y-2 mb-8 sm:mb-10 text-white/60 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            <p>Messages. Calls. Links. Payments. One connected view of suspicious activity.</p>
            <p className="text-white/45 text-xs sm:text-sm md:text-base">
              Understand the risk. Discover the connections. Know what to do next.
            </p>
          </div>

          {/* Hero Actions: Primary & Secondary Buttons */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
            {/* Primary Action */}
            <Link
              to="/scan"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-black hover:bg-white/90 text-xs sm:text-[13px] tracking-wider uppercase font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm focus:outline-none"
            >
              <span>OPEN SCANNER</span>
              <span className="text-xs">↗</span>
            </Link>

            {/* Secondary Action */}
            <button
              onClick={scrollToOverview}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-transparent border border-white/25 hover:border-white/70 text-white hover:bg-white/[0.04] text-xs sm:text-[13px] tracking-wider uppercase font-medium transition-all duration-200 focus:outline-none cursor-pointer"
            >
              <span>EXPLORE THE PLATFORM</span>
            </button>
          </div>
        </div>

        {/* Partner and Technology Strip — Restrained horizontal strip above bottom edge */}
        <div className="relative z-10 w-full mt-auto">
          <TechStackStrip />
          
          {/* Subtle scroll cue pointing to next section */}
          <div className="flex justify-center mt-3 text-white/25 text-[10px] uppercase font-mono tracking-widest pointer-events-none">
            <span className="animate-pulse">Scroll to explore</span>
          </div>
        </div>

      </section>

      {/* =========================================================================
          INTERACTIVE 1-CLICK DEMO THREAT PRESETS STRIP
          ========================================================================= */}
      <section className="relative z-20 py-8 bg-[#030303] border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
              QUICK TEST SUITE // 1-CLICK VERIFICATION EXAMPLES
            </span>
            <span className="hidden sm:inline text-white/30">Select any scenario to pre-populate scanner</span>
          </div>
          <DemoPresetsBar />
        </div>
      </section>

      {/* =========================================================================
          SECTION A — The Hidden Connections
          ========================================================================= */}
      <HiddenConnectionsSection />

      {/* =========================================================================
          SECTION B — Intelligence in Motion
          ========================================================================= */}
      <PipelineMotionSection />

      {/* =========================================================================
          SECTION C — Scam DNA
          ========================================================================= */}
      <ScamDNAInteractiveSection />

      {/* =========================================================================
          SECTION D — Explainable Detection
          ========================================================================= */}
      <ExplainableDetectionSection />

      {/* =========================================================================
          SECTION E — Take Action with Confidence
          ========================================================================= */}
      <ActionPlaybookSection />

      {/* =========================================================================
          SECTION F — Final Call to Action
          ========================================================================= */}
      <section className="relative py-32 sm:py-44 bg-black text-white border-t border-white/[0.08] overflow-hidden text-center">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
            <span>Section 06 // Proactive Defense</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08] max-w-3xl mb-6">
            Trust your instincts. <br />
            <span className="text-white/50">Verify the evidence.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/60 font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Investigate suspicious activity with clearer signals, connected evidence, and practical guidance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/scan"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black hover:bg-white/90 text-xs sm:text-sm tracking-wider uppercase font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm focus:outline-none"
            >
              <span>ANALYZE A THREAT</span>
              <span className="text-sm">↗</span>
            </Link>

            <button
              onClick={async () => {
                await demoLogin();
                window.location.href = '/dashboard';
              }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent border border-white/20 hover:border-white/50 text-white/80 hover:text-white text-xs sm:text-sm tracking-wider uppercase font-medium transition-all duration-200 hover:bg-white/[0.04]"
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>LAUNCH DEMO ANALYST</span>
            </button>
          </div>

          <div className="mt-14 flex items-center justify-center gap-8 text-[11px] font-mono text-white/35">
            <span>Multimodal Ingestion</span>
            <span>•</span>
            <span>Zero-Retention Scanning</span>
            <span>•</span>
            <span>Open Verification</span>
          </div>
        </div>
      </section>

    </div>
  );
}
