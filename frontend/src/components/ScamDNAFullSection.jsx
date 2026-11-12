import React, { useState } from 'react';
import { Dna, ShieldAlert, Globe, Phone, MessageSquare, CreditCard, QrCode, ArrowRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SCENARIOS = [
  {
    id: 'banking',
    title: 'Bank KYC Phishing Convergence',
    description: 'An attacker uses an SMS gateway to distribute a typosquatted domain, harvesting OTPs and siphoning funds into an organized mule account.',
    nodes: [
      { id: 'n1', type: 'message', label: 'SMS Urgency Vector', icon: MessageSquare, x: 15, y: 35, risk: 92, evidence: 'Panic phrasing: "suspended today" & "prevent block immediately"' },
      { id: 'n2', type: 'phone', label: 'Spoofed Caller Header', icon: Phone, x: 38, y: 15, risk: 88, evidence: 'Unauthorized SMS gateway CLI (+91-98210-99412)' },
      { id: 'n3', type: 'domain', label: 'Typosquat Domain', icon: Globe, x: 50, y: 55, risk: 96, evidence: 'hdfc-bank-verify-kyc.xyz hosted on disposable bulletproof registrar' },
      { id: 'n4', type: 'qr', label: 'Authentication Intercept', icon: QrCode, x: 72, y: 25, risk: 90, evidence: 'Real-time proxy socket forwarding session tokens to syndicate' },
      { id: 'n5', type: 'payment', label: 'Mule Siphon Account', icon: CreditCard, x: 85, y: 65, risk: 94, evidence: 'mule_recovery@okhdfcbank flagged in 38 prior community reports' },
    ],
    edges: [
      { from: 'n1', to: 'n2', label: 'dispatched_via' },
      { from: 'n1', to: 'n3', label: 'contains_link' },
      { from: 'n3', to: 'n4', label: 'prompts_qr_sync' },
      { from: 'n4', to: 'n5', label: 'redirects_funds_to' },
    ]
  },
  {
    id: 'digital_arrest',
    title: 'Digital Arrest Telecom Extortion',
    description: 'Criminals initiate a VoIP spoofed police helpline call, send a fake CBI warrant link, and demand an escrow deposit into a crypto address.',
    nodes: [
      { id: 'n1', type: 'phone', label: 'Spoofed Police CLI', icon: Phone, x: 15, y: 30, risk: 95, evidence: '+91-11-2309-8800 mimicking central law enforcement exchange' },
      { id: 'n2', type: 'message', label: 'Fake Legal Summons', icon: MessageSquare, x: 38, y: 60, risk: 89, evidence: 'High-pressure arrest warrant document with forged departmental seal' },
      { id: 'n3', type: 'domain', label: 'Clone Portal', icon: Globe, x: 60, y: 25, risk: 94, evidence: 'cbi-case-status-investigation.online (Registered 3 days ago)' },
      { id: 'n4', type: 'payment', label: 'Cold Storage Escrow', icon: CreditCard, x: 85, y: 50, risk: 98, evidence: 'USDT TRC20 wallet address: 0x71c...48fa (Laundering node)' },
    ],
    edges: [
      { from: 'n1', to: 'n2', label: 'coerces_with' },
      { from: 'n2', to: 'n3', label: 'verifies_on' },
      { from: 'n3', to: 'n4', label: 'demands_bail_remittance' },
    ]
  }
];

export default function ScamDNAFullSection() {
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);
  const [selectedNode, setSelectedNode] = useState(SCENARIOS[0].nodes[2]); // default to domain node

  const handleSelectScenario = (sc) => {
    setActiveScenario(sc);
    setSelectedNode(sc.nodes[0]);
  };

  return (
    <section id="scam-dna-section" className="relative py-24 sm:py-32 bg-[#FBF8F0] dark:bg-[#0F0D0A] overflow-hidden border-b border-[#E5DCCB] dark:border-[#2E2820]">
      {/* Subtle golden ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#C69A42]/10 via-[#EAD6A0]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]">
                SECTION // 05
              </span>
              <span className="text-[#E5DCCB] dark:text-[#3D3528]">|</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
                SCAM DNA ARCHITECTURE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242019] dark:text-[#FBF8F0] mb-3">
              CONNECTING DISCONNECTED SIGNALS.
            </h2>
            <p className="text-sm sm:text-base text-[#777064] dark:text-[#A8A095] leading-relaxed">
              In isolation, each signal looks ambiguous. Together, they reveal a unified attack infrastructure. Click any node below to inspect forensic indicators.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="flex items-center gap-2 bg-[#F2EADB] dark:bg-[#1C1813] p-1.5 rounded-xl border border-[#E5DCCB] dark:border-[#332B20]">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
                  activeScenario.id === sc.id
                    ? 'bg-white dark:bg-[#29241D] text-[#906727] dark:text-[#EAD6A0] shadow-xs'
                    : 'text-[#777064] dark:text-[#9E9688] hover:text-[#242019]'
                }`}
              >
                {sc.id === 'banking' ? 'KYC Phishing Pattern' : 'Digital Arrest Coercion'}
              </button>
            ))}
          </div>
        </div>

        {/* Synthetic Data Notice Banner */}
        <div className="mb-6 px-4 py-2 rounded-lg border border-[#C69A42]/30 bg-[#EAD6A0]/15 dark:bg-[#C69A42]/10 flex items-center justify-between text-xs font-mono text-[#906727] dark:text-[#EAD6A0]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C69A42] animate-ping" />
            <span>[ SYNTHETIC FORENSIC TOPOLOGY // CORRELATED INCIDENT CLUSTER ]</span>
          </div>
          <span className="hidden sm:inline opacity-75">Click nodes to inspect evidence breakdown</span>
        </div>

        {/* Visual Graph Canvas Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Interactive Topological Diagram */}
          <div className="lg:col-span-2 relative h-[380px] sm:h-[460px] rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#16130F] shadow-lg p-4 overflow-hidden select-none">
            
            {/* SVG Connecting Edges with pulsing dashes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="goldEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C69A42" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#EAD6A0" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {activeScenario.edges.map((edge, idx) => {
                const sourceNode = activeScenario.nodes.find((n) => n.id === edge.from);
                const targetNode = activeScenario.nodes.find((n) => n.id === edge.to);
                if (!sourceNode || !targetNode) return null;

                return (
                  <g key={idx}>
                    <line
                      x1={`${sourceNode.x}%`}
                      y1={`${sourceNode.y}%`}
                      x2={`${targetNode.x}%`}
                      y2={`${targetNode.y}%`}
                      stroke="url(#goldEdgeGrad)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Nodes */}
            {activeScenario.nodes.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedNode?.id === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none transition-transform duration-200 ${
                    isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                  }`}
                >
                  {/* Node Circle */}
                  <div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition shadow-md ${
                      isSelected
                        ? 'border-[#C69A42] bg-[#FBF8F0] dark:bg-[#201C16] ring-4 ring-[#C69A42]/20'
                        : 'border-[#E5DCCB] dark:border-[#3D3528] bg-white dark:bg-[#1C1813] hover:border-[#C69A42]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C69A42]' : 'text-[#777064] dark:text-[#A8A095]'}`} />
                    <span className="absolute -top-1 -right-1 font-mono text-[9px] font-bold px-1 rounded-full bg-[#B42332] text-white">
                      {node.risk}
                    </span>
                  </div>

                  {/* Label */}
                  <span className={`text-[10px] sm:text-xs font-mono font-semibold tracking-wider whitespace-nowrap px-2 py-0.5 rounded shadow-xs ${
                    isSelected
                      ? 'bg-[#242019] text-white dark:bg-white dark:text-[#242019]'
                      : 'bg-[#F2EADB] dark:bg-[#201C16] text-[#777064] dark:text-[#B3AAA0]'
                  }`}>
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Col: Forensic Evidence Inspector Card */}
          <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#16130F] p-6 shadow-lg flex flex-col justify-between">
            {selectedNode ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#C69A42]/15 text-[#C69A42] flex items-center justify-center">
                      <Dna className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[#777064] dark:text-[#9E9688]">
                        NODE TYPE // {selectedNode.type.toUpperCase()}
                      </span>
                      <h4 className="font-display font-bold text-sm text-[#242019] dark:text-[#FBF8F0]">
                        {selectedNode.label}
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-[#B42332]">
                      {selectedNode.risk}%
                    </span>
                    <span className="block font-mono text-[9px] text-[#777064]">RISK WEIGHT</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-[#777064] dark:text-[#9E9688] uppercase tracking-wider block mb-1">
                    Forensic Evidence:
                  </span>
                  <div className="p-3 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0] dark:bg-[#12100E] text-xs font-mono text-[#242019] dark:text-[#FBF8F0] leading-relaxed">
                    {selectedNode.evidence}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#777064] dark:text-[#A8A095]">
                  <div className="flex items-center justify-between">
                    <span>Correlation Multiplier:</span>
                    <span className="font-mono font-semibold text-[#906727] dark:text-[#EAD6A0]">1.28x Active Synergy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Network Confidence:</span>
                    <span className="font-mono font-semibold text-[#277653]">High (Recorded Signature)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Community Reports:</span>
                    <span className="font-mono font-semibold text-[#242019] dark:text-[#FBF8F0]">38 Flagged Cases</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 text-[#777064]">
                <Dna className="w-8 h-8 text-[#C69A42] mb-2 animate-pulse" />
                <p className="text-xs font-mono">Select any node on the graph to inspect forensic signals.</p>
              </div>
            )}

            <div className="pt-4 border-t border-[#E5DCCB] dark:border-[#2E2820] mt-4">
              <a
                href="/app/scam-dna"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg btn-gold-shimmer text-xs uppercase tracking-wider font-semibold border border-[#C69A42] shadow-xs hover:shadow-md transition"
              >
                <span>Open Full Scam DNA Explorer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
