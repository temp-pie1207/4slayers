import React, { useState } from 'react';
import { ArrowRight, Terminal, Cpu, Network, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Section B — Intelligence in motion
 * Headline: From scattered signals to a clearer picture.
 * Interactive pipeline: INPUT → ANALYZE → CONNECT → EXPLAIN → ACT
 * Animated fine lines, subtle node transitions, clickable stages.
 */
export default function PipelineMotionSection() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: 'input',
      step: '01',
      title: 'INPUT',
      subtitle: 'Multimodal Telemetry Ingestion',
      icon: Terminal,
      description: 'Ingests unverified text, sender metadata, obfuscated shortened links, raw telephone strings, QR payloads, and transaction amounts.',
      technical: 'Normalizes character encoding, unshortens nested redirects, resolves ASN registries, and parses syntactic pressure indicators.',
      feature: 'Universal Scanner',
      route: '/scan',
      preview: {
        raw: 'Raw input: "URGENT: Your KYC status expires today. Verify at bit.ly/bank-auth or call 800-555-0199"',
        processed: 'Extracted: [Domain: bit.ly -> 194.26.29.112], [CallerID: +1-800-555-0199], [Urgency: Critical]'
      }
    },
    {
      id: 'analyze',
      step: '02',
      title: 'ANALYZE',
      subtitle: 'Heuristic & NLP Threat Scoring',
      icon: Cpu,
      description: 'Specialized modular models evaluate domain entropy, typosquatting distance, linguistic coercion, and telecom carrier registrations.',
      technical: 'Calculates Levenshtein distance against banking whitelists, classifies urgency sentiment vectors, and queries carrier routing databases.',
      feature: 'Multi-Model Risk Engine',
      route: '/scan',
      preview: {
        raw: 'Heuristics: Domain age 48h (threshold < 14d) | Levenshtein to legitimate bank: 2 (Typosquatting alert)',
        processed: 'Subscores: Linguistic = 92/100, Infrastructure = 88/100, Caller Legitimacy = 85/100'
      }
    },
    {
      id: 'connect',
      step: '03',
      title: 'CONNECT',
      subtitle: 'Scam DNA Graph Fusion',
      icon: Network,
      description: 'Cross-references extracted entities against community incident clusters, known mule accounts, and active cybercrime infrastructure.',
      technical: 'Graph traversal identifies shared hosting ASNs, reusable VoIP caller pools, and linked UPI VPAs across historical incidents.',
      feature: 'Scam DNA Graph',
      route: '/intelligence',
      preview: {
        raw: 'Graph Traversal: Node [194.26.29.112] links to 14 previous phishing cases reported in past 7 days',
        processed: 'Syndicate: Linked to Campaign #SYN-8492 [Targeting State Bank customers]'
      }
    },
    {
      id: 'explain',
      step: '04',
      title: 'EXPLAIN',
      subtitle: 'Evidence-Based Human Reasoning',
      icon: ShieldCheck,
      description: 'Translates algorithmic weights into plain-language explanations with highlighted evidence citations rather than an opaque black-box number.',
      technical: 'Synthesizes key risk drivers, explains why the domain is untrusted, and highlights the specific psychological manipulation triggers.',
      feature: 'Explainable AI Engine',
      route: '/scan',
      preview: {
        raw: 'Explanation: "This message uses artificial time pressure (2 hours) and impersonates a state institution."',
        processed: 'Evidence: Verified that legitimate banks never mandate third-party biometric links via SMS.'
      }
    },
    {
      id: 'act',
      step: '05',
      title: 'ACT',
      subtitle: 'Actionable Defensive Playbook',
      icon: Zap,
      description: 'Generates prioritized steps: independent verification hotlines, zero-touch containment, banking freeze advice, and official agency reports.',
      technical: 'Outputs pre-formatted incident export logs ready for immediate submission to Cyber Helpline 1930 and national cybercrime registries.',
      feature: 'Protective Playbook',
      route: '/reports',
      preview: {
        raw: 'Containment: Do not click link | Block sender | Verify directly via official banking hotline on physical card',
        processed: 'Escalation: 1-click incident export generated for Cyber Helpline 1930 / IC3'
      }
    }
  ];

  const current = stages[activeStage];

  return (
    <section id="how-it-works" className="relative py-28 sm:py-36 bg-black text-white border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
            <span>Section 02 // Analysis Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.12]">
            From scattered signals <br />
            <span className="text-white/50">to a clearer picture.</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-2xl">
            A transparent 5-stage pipeline transforms raw incoming threat telemetry into connected evidence and clear, actionable steps.
          </p>
        </div>

        {/* Pipeline Navigation Strip */}
        <div className="mb-12 border-b border-white/[0.12] pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-2">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.08] border-white/60 text-white shadow-[0_0_20px_rgba(255,255,255,0.06)]'
                      : 'bg-black border-white/[0.08] text-white/50 hover:text-white/90 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider opacity-60">
                      Phase {stage.step}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-white/20'}`} />
                  </div>
                  <div className="font-mono text-sm tracking-widest uppercase font-medium">
                    {stage.title}
                  </div>
                  <div className="text-[11px] text-white/40 font-light truncate mt-0.5">
                    {stage.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Deep Dive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Stage Overview & Mechanics */}
          <div className="lg:col-span-6 bg-white/[0.02] border border-white/[0.12] rounded-2xl p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-mono text-white/40">[{current.step}]</span>
                <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                  {current.title} — {current.subtitle}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-2 mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">
                  Algorithmic Architecture
                </span>
                <p className="text-xs font-mono text-white/80 leading-relaxed">
                  {current.technical}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-white/40 font-mono">
                Component: {current.feature}
              </span>
              <Link
                to={current.route}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white hover:text-white/80 transition"
              >
                <span>Launch Stage Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Live Telemetry Transformation Terminal */}
          <div className="lg:col-span-6 bg-[#040404] border border-white/[0.12] rounded-2xl p-6 sm:p-8 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                  <span className="text-white/40 ml-2 tracking-wider text-[11px]">PIPELINE_TELEMETRY // {current.id.toUpperCase()}</span>
                </div>
                <span className="text-cyan-400 text-[10px] uppercase">STATUS: ACTIVE</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-white/40 block mb-1.5">// Stage Input Telemetry:</span>
                  <div className="p-3.5 rounded-lg bg-black border border-white/[0.06] text-white/80 leading-relaxed break-words">
                    {current.preview.raw}
                  </div>
                </div>

                <div>
                  <span className="text-white/40 block mb-1.5">// Transformed Output Vectors:</span>
                  <div className="p-3.5 rounded-lg bg-black border border-white/[0.06] text-cyan-300 leading-relaxed break-words">
                    {current.preview.processed}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between text-[11px] text-white/40">
              <span>Latency: &lt;140ms</span>
              <span>Model Fusion: Ensemble v2.8</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
