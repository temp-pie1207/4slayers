import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, Check, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Section D — Explainable detection
 * Headline: Not just a score. The reasons behind it.
 * Authentic example of a suspicious message alongside a risk score and evidence-based explanations.
 * Elegant typography, minimal interface framing, warnings in muted amber/coral only where meaningful.
 */
export default function ExplainableDetectionSection() {
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState(0);

  const evidencePoints = [
    {
      title: 'Artificial Urgency & Coercive Deadline',
      tag: 'Psychological Manipulation',
      weight: '96% confidence',
      severity: 'coral',
      highlightedText: 'IMMEDIATE ACTION REQUIRED: Your account access expires in 120 minutes',
      explanation: 'Authentic financial institutions never impose arbitrary 2-hour countdown deadlines via automated SMS. This creates panic to bypass rational cognitive checks.'
    },
    {
      title: 'Obfuscated Lookalike Domain (Typosquatting)',
      tag: 'Infrastructure Risk',
      weight: '98% confidence',
      severity: 'coral',
      highlightedText: 'https://auth-sbi-portal.top/kyc-update',
      explanation: 'The domain was registered 72 hours ago under a privacy guard in a high-risk offshore TLD (.top) hosted on an ASN known for credential harvesting.'
    },
    {
      title: 'VoIP Caller Gateway Mismatch',
      tag: 'Origin Telemetry',
      weight: '89% confidence',
      severity: 'amber',
      highlightedText: '+1 (844) 920-0412',
      explanation: 'Originating telephone carrier resolves to a disposable cloud VoIP provider rather than an authorized telecom alphanumeric enterprise shortcode.'
    },
    {
      title: 'Unauthorized Credential Harvest Form',
      tag: 'Payload Signature',
      weight: '94% confidence',
      severity: 'coral',
      highlightedText: 'submit your ATM PIN and Aadhaar/SSN for biometric re-validation',
      explanation: 'Forms requesting raw ATM PINs or biometric secrets on unauthenticated websites violate regulatory standards and signal active theft.'
    }
  ];

  const current = evidencePoints[activeEvidenceIndex];

  return (
    <section id="security" className="relative py-28 sm:py-36 bg-black text-white border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
            <span>Section 04 // Explainable Threat AI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.12]">
            Not just a score. <br />
            <span className="text-white/50">The reasons behind it.</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-2xl">
            A single risk number leaves you second-guessing. 4SLAYERS dissects the specific psychological tricks, 
            infrastructure age anomalies, and disguised payloads behind the threat.
          </p>
        </div>

        {/* Threat Case Dossier Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Authentic Suspicious Message Anatomy */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/[0.12] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                <span className="text-xs uppercase font-mono tracking-wider text-white/40">
                  Suspicious Message Sample
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-rose-500/30 text-rose-400 bg-rose-950/20">
                  Critical Risk
                </span>
              </div>

              {/* Message Box with Interactive Spans */}
              <div className="p-5 rounded-xl bg-black border border-white/[0.08] font-mono text-xs sm:text-sm leading-relaxed text-white/80 space-y-3">
                <p>
                  <span className="text-white/40 text-[10px] block mb-1 font-sans uppercase tracking-wider">SMS Payload // Recipient: User</span>
                  <span className="text-rose-300 bg-rose-950/30 px-1 py-0.5 rounded border border-rose-500/20">
                    [IMMEDIATE ACTION REQUIRED]
                  </span>{' '}
                  Your primary account access will be terminated within{' '}
                  <span className="text-amber-300 bg-amber-950/30 px-1 py-0.5 rounded border border-amber-500/20">
                    120 minutes
                  </span>{' '}
                  due to missing KYC verification.
                </p>

                <p>
                  Avoid disruption and re-validate your biometric PIN immediately via our secure gateway:{' '}
                  <span className="text-rose-300 underline decoration-rose-500/50 break-all">
                    https://auth-sbi-portal.top/kyc-update
                  </span>
                </p>

                <p className="text-[11px] text-white/40 pt-2 border-t border-white/[0.06]">
                  Sender ID:{' '}
                  <span className="text-amber-300 font-mono">+1 (844) 920-0412</span>
                </p>
              </div>

              {/* Minimalist Risk Gauge */}
              <div className="mt-6 p-4 rounded-xl border border-white/[0.08] bg-black/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">
                    Composite Risk Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-light font-mono text-white">94</span>
                    <span className="text-xs text-white/40 font-mono">/ 100</span>
                    <span className="text-xs font-mono text-rose-400 ml-2">HIGH RISK</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-rose-500/40 flex items-center justify-center text-rose-400 font-mono text-xs bg-rose-950/20">
                  94%
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between text-xs font-mono text-white/40">
              <span>Classifier: Multi-Layer Neural</span>
              <span>Certainty: 98.2%</span>
            </div>
          </div>

          {/* Right: Evidence-Based Explanations */}
          <div className="lg:col-span-7 bg-[#040404] border border-white/[0.12] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <span className="text-xs uppercase font-mono tracking-wider text-white/40">
                  Evidence Decomposition
                </span>
                <span className="text-xs font-mono text-white/60">
                  4 Detected Fraud Signatures
                </span>
              </div>

              <div className="space-y-3">
                {evidencePoints.map((pt, idx) => {
                  const isSelected = activeEvidenceIndex === idx;
                  const isCoral = pt.severity === 'coral';

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveEvidenceIndex(idx)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white/[0.06] border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.04)]'
                          : 'bg-black border-white/[0.08] hover:border-white/20 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isCoral ? 'bg-rose-400' : 'bg-amber-400'}`} />
                          <h4 className="text-sm font-medium text-white">
                            {pt.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 shrink-0">
                          {pt.weight}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-white/[0.08] space-y-2 animate-in fade-in duration-200">
                          <p className="text-xs text-white/70 font-light leading-relaxed">
                            {pt.explanation}
                          </p>
                          <div className="p-2 rounded bg-black/80 border border-white/[0.06] text-[11px] font-mono text-white/50">
                            Triggered on: <span className="text-white/80">"{pt.highlightedText}"</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between">
              <span className="text-xs text-white/40 font-mono">
                Explainability Level: Fully Auditable
              </span>
              <Link
                to="/scan"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white hover:text-white/80 transition"
              >
                <span>Test this scan live</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
