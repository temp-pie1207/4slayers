import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Shield, Sparkles, Dna, Activity, Lock, Layers } from 'lucide-react';
import HeroGoldenAtmosphere from '../components/HeroGoldenAtmosphere';
import ScamDNAHero3D from '../components/ScamDNAHero3D';
import ProductIntelligenceStrip from '../components/ProductIntelligenceStrip';
import ProblemSection from '../components/ProblemSection';
import ScannerPreviewSection from '../components/ScannerPreviewSection';
import ScamDNAFullSection from '../components/ScamDNAFullSection';
import MultimodalSection from '../components/MultimodalSection';
import ExplainableAISection from '../components/ExplainableAISection';
import FraudNetworkSection from '../components/FraudNetworkSection';
import ProcessDiagramSection from '../components/ProcessDiagramSection';
import SafetyRecommendationsSection from '../components/SafetyRecommendationsSection';
import PrivacyTrustSection from '../components/PrivacyTrustSection';
import FinalCTASection from '../components/FinalCTASection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'motion/react';

export default function LandingPage() {
  const scrollToExplore = () => {
    const elem = document.getElementById('product-strip');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF8F0] dark:bg-[#0F0D0A] text-[#242019] dark:text-[#FBF8F0] overflow-x-hidden">
      <Navbar />

      {/* =========================================================================
          SECTION 01 — HERO (CINEMATIC OPENING & EDITORIAL ARCHITECTURAL GRID)
          ========================================================================= */}
      <section className="relative w-full min-h-[92svh] pt-28 pb-12 flex flex-col justify-between overflow-hidden border-b border-[#E5DCCB] dark:border-[#2E2820]">
        {/* Golden Intelligence Canvas Atmosphere */}
        <HeroGoldenAtmosphere />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
          {/* Editorial Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left 7 Columns: Editorial Headline, Eyebrow & Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Technical Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#E5DCCB] dark:border-[#3D3528] bg-white/70 dark:bg-[#1C1813]/70 backdrop-blur-sm text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C69A42] animate-pulse" />
                <span>MULTIMODAL FRAUD INTELLIGENCE · BUILT FOR DIGITAL TRUST</span>
              </motion.div>

              {/* Master Headline: SEE THE PATTERN. STOP THE SCAM. */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#242019] dark:text-[#FBF8F0] leading-[1.02]"
              >
                <span className="block">SEE THE PATTERN.</span>
                <span className="block text-[#C69A42] mt-1">STOP THE SCAM.</span>
              </motion.h1>

              {/* Supporting Copy */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-[#777064] dark:text-[#A8A095] max-w-xl font-sans leading-relaxed"
              >
                Scams rarely happen in isolation. 4Slayers connects messages, links, calls, QR codes, and payment signals to uncover the patterns others miss.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
              >
                {/* Primary Button */}
                <Link
                  to="/app/scan"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl btn-gold-shimmer text-xs sm:text-sm uppercase tracking-wider font-bold border border-[#C69A42] shadow-md hover:shadow-xl transition focus:outline-none"
                >
                  <span>Scan a Threat</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {/* Secondary Button */}
                <button
                  onClick={scrollToExplore}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#E5DCCB] dark:border-[#3D3528] bg-white/70 dark:bg-[#16130F]/70 hover:border-[#C69A42] text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#242019] dark:text-[#FBF8F0] transition focus:outline-none cursor-pointer"
                >
                  <span>Explore the Intelligence</span>
                  <ArrowDown className="w-4 h-4 text-[#C69A42]" />
                </button>
              </motion.div>

              {/* Live Technical Diagnostic Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-4 flex flex-wrap items-center gap-4 text-[11px] font-mono text-[#777064] dark:text-[#9E9688]"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#277653]" />
                  <span>Heuristics Engine v2.4 Active</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#C69A42]" />
                  <span>Multi-Channel Correlation Enabled</span>
                </div>
              </motion.div>

            </div>

            {/* Right 5 Columns: Interactive 3D Scam DNA Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl border border-[#E5DCCB] dark:border-[#332B20] bg-white/40 dark:bg-[#16130F]/40 backdrop-blur-md p-2 shadow-2xl">
                <ScamDNAHero3D />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Technical Information Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 pt-6 border-t border-[#E5DCCB]/70 dark:border-[#2E2820]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777064] dark:text-[#9E9688]">
          <div className="flex items-center gap-3">
            <span className="text-[#906727] dark:text-[#EAD6A0] font-bold">4SLAYERS // ARCHITECTURE</span>
            <span>REST API + FASTAPI + PYMONGO + DOCUMENT VECTOR ENGINE</span>
          </div>
          <div className="flex items-center gap-4">
            <span>ZERO AD TRACKERS</span>
            <span>GDPR RIGHT-TO-ERASE</span>
            <span className="text-[#277653] font-bold">100% OPERATIONAL</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02 — PRODUCT INTELLIGENCE STRIP
          ========================================================================= */}
      <div id="product-strip">
        <ProductIntelligenceStrip />
      </div>

      {/* =========================================================================
          SECTION 03 — THE PROBLEM ("A SCAM IS NEVER JUST ONE SIGNAL")
          ========================================================================= */}
      <ProblemSection />

      {/* =========================================================================
          SECTION 04 — THE SCANNER (INTERACTIVE REAL BACKEND PREVIEW)
          ========================================================================= */}
      <ScannerPreviewSection />

      {/* =========================================================================
          SECTION 05 — SCAM DNA (FULL-WIDTH INTERACTIVE TOPOLOGY)
          ========================================================================= */}
      <ScamDNAFullSection />

      {/* =========================================================================
          SECTION 06 — MULTIMODAL INTELLIGENCE (7 VECTORS)
          ========================================================================= */}
      <MultimodalSection />

      {/* =========================================================================
          SECTION 07 — EXPLAINABLE AI ("NOT JUST A SCORE")
          ========================================================================= */}
      <ExplainableAISection />

      {/* =========================================================================
          SECTION 08 — FRAUD NETWORK (INTERACTIVE SYNDICATE GRAPH)
          ========================================================================= */}
      <FraudNetworkSection />

      {/* =========================================================================
          SECTION 09 — HOW IT WORKS (5-STAGE SCROLL-LINKED PIPELINE)
          ========================================================================= */}
      <ProcessDiagramSection />

      {/* =========================================================================
          SECTION 10 — SAFETY RECOMMENDATIONS
          ========================================================================= */}
      <SafetyRecommendationsSection />

      {/* =========================================================================
          SECTION 11 — PRIVACY & TRUST
          ========================================================================= */}
      <PrivacyTrustSection />

      {/* =========================================================================
          SECTION 12 — FINAL CTA (GOLDEN-TO-BURGUNDY TRANSITION)
          ========================================================================= */}
      <FinalCTASection />

      {/* =========================================================================
          SECTION 13 — FOOTER
          ========================================================================= */}
      <Footer />
    </div>
  );
}
