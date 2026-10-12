import React, { useState } from 'react';
import { MessageSquare, Phone, Globe, QrCode, CreditCard, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Section A — The hidden connections
 * Headline: A scam is rarely just one signal.
 * Particle field breaks into separate entities: message, phone, URL, QR, payment.
 * Delicate lines connecting entities into a coherent network.
 */
export default function HiddenConnectionsSection() {
  const [activeSignal, setActiveSignal] = useState(0);

  const signals = [
    {
      id: 'msg',
      type: 'Suspicious Message',
      value: '"IMMEDIATE NOTICE: KYC expired. Account frozen in 2 hours."',
      meta: 'Urgency coercion & fake institutional authority',
      icon: MessageSquare,
      risk: 'High Linguistic Pressure',
      connectsTo: ['phone', 'url'],
      detail: 'The message creates an artificial deadline to force irrational compliance before the target can independently verify.'
    },
    {
      id: 'phone',
      type: 'Spoofed Caller / SMS',
      value: '+1 (800) 555-0199 [Virtual VoIP Gateway]',
      meta: 'Carrier mismatch & high outbound rotation',
      icon: Phone,
      risk: 'Unregistered Virtual Trunk',
      connectsTo: ['msg', 'payment'],
      detail: 'Originates from a short-lived VoIP block with no verifiable enterprise SLA, cycled across 400 outgoing automated SMS blasts.'
    },
    {
      id: 'url',
      type: 'Phishing Infrastructure',
      value: 'https://kyc-verif-secure-portal92.net',
      meta: 'Domain age: 48 hours | Bulletproof host ASN 49281',
      icon: Globe,
      risk: 'Newly Minted Lookalike Host',
      connectsTo: ['msg', 'qr'],
      detail: 'Clones genuine banking TLS certificates but resolves to an offshore bulletproof server configured for credential harvesting.'
    },
    {
      id: 'qr',
      type: 'Disguised QR Vector',
      value: 'upi://pay?pa=collection_dept99@okaxis&am=1250',
      meta: 'Reverse-charge UPI intent masquerading as refund',
      icon: QrCode,
      risk: 'Debit Extortion Payload',
      connectsTo: ['url', 'payment'],
      detail: 'Lured as an incoming reimbursement or verification scan, the QR actually transmits an immediate automated debit authorization.'
    },
    {
      id: 'payment',
      type: 'Payment Request',
      value: '$1,250.00 to instant mule escrow wallet',
      meta: 'Immediate non-reversible settlement',
      icon: CreditCard,
      risk: 'Money Mule Network Endpoint',
      connectsTo: ['phone', 'qr'],
      detail: 'Directs funds through disposable intermediary accounts designed to cash out within minutes through decentralized rails.'
    }
  ];

  const current = signals[activeSignal];

  return (
    <section id="platform" className="relative py-28 sm:py-36 bg-black text-white border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient subtle depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
            <span>Section 01 // Multi-Signal Correlation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.12]">
            A scam is rarely <br />
            <span className="text-white/50">just one signal.</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-2xl">
            Attackers deliberately fracture their fraud footprint across messages, spoofed calls, disguised links, QR vectors, and payment rails. 
            Isolated checks fail because each signal looks plausibly benign on its own. 4SLAYERS correlates the full network pattern.
          </p>
        </div>

        {/* Interactive Correlation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Signal Selection Cards */}
          <div className="lg:col-span-7 space-y-3">
            {signals.map((sig, idx) => {
              const Icon = sig.icon;
              const isSelected = activeSignal === idx;
              const isConnected = signals[activeSignal].connectsTo.includes(sig.id);

              return (
                <div
                  key={sig.id}
                  onClick={() => setActiveSignal(idx)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.06] border-white/50 shadow-[0_0_25px_rgba(255,255,255,0.05)]'
                      : isConnected
                      ? 'bg-white/[0.02] border-white/20 hover:border-white/30'
                      : 'bg-black border-white/[0.08] hover:border-white/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2 rounded-lg border mt-0.5 transition-colors ${
                        isSelected 
                          ? 'border-white/40 bg-white/10 text-white' 
                          : isConnected
                          ? 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300'
                          : 'border-white/10 bg-white/[0.02] text-white/50'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs uppercase tracking-wider text-white/50 font-mono">
                            Signal 0{idx + 1}
                          </span>
                          <span className="text-xs font-medium text-white">
                            {sig.type}
                          </span>
                          {isConnected && !isSelected && (
                            <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-mono px-1.5 py-0.2 rounded border border-cyan-500/30 bg-cyan-950/40">
                              Correlated Link
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm font-mono text-white/90 break-all">
                          {sig.value}
                        </p>
                        <p className="mt-1 text-xs text-white/45 font-light">
                          {sig.meta}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-white/70">
                        {sig.risk}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connected Network Inspector Panel */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/[0.12] rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative sticky top-24">
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40 block">
                  Connected Intelligence Synthesis
                </span>
                <h3 className="text-base font-medium text-white mt-1">
                  Correlation View: {current.type}
                </h3>
              </div>
              <div className="px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 font-mono text-[11px]">
                Active Focus
              </div>
            </div>

            <div className="py-6 space-y-5">
              <div>
                <span className="text-xs text-white/40 font-mono uppercase tracking-wider block mb-1">
                  Threat Vector Mechanics
                </span>
                <p className="text-sm text-white/80 font-light leading-relaxed">
                  {current.detail}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-3">
                <span className="text-xs text-white/40 font-mono uppercase tracking-wider block">
                  Cross-Channel Fusion Impact
                </span>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  When evaluated in isolation, this element yields only ambiguous suspicion. 
                  When correlated with the <span className="text-white font-medium">{current.connectsTo.join(' and ')}</span> telemetry, 
                  the fused risk confidence jumps to <strong className="text-white font-semibold font-mono">96.4%</strong>.
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/[0.06]">
                  <span>Cluster Match: #CL-8921</span>
                  <span className="text-cyan-400">Syndicate Known</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                to="/scan"
                className="text-xs uppercase tracking-wider font-mono text-white/80 hover:text-white flex items-center gap-1.5 transition"
              >
                <span>Run full multi-channel scan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[10px] text-white/35 font-mono">5 of 5 Vectors Linked</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
