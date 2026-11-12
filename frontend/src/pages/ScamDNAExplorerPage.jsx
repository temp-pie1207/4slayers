import React, { useState } from 'react';
import { Dna, Network, ShieldAlert, Sparkles, ArrowRight, MessageSquare, Globe, Phone, CreditCard, QrCode, Layers, Info } from 'lucide-react';

const PATTERNS = [
  {
    id: 'kyc_hijack',
    name: 'Syndicate-42: Bank KYC Phishing Mesh',
    riskScore: 94,
    description: 'Coordinated attack combining mass spoofed SMS gateways, typosquatted banking domains, and active mule VPAs.',
    nodes: [
      { id: 'n_sms', label: 'Inbound SMS Vector', type: 'message', risk: 92, evidence: 'Phishing urgency: "Account suspended today, verify KYC"', details: 'Mass GSM gateway distribution' },
      { id: 'n_cli', label: 'Spoofed Caller ID', type: 'phone', risk: 88, evidence: '+91-98210-99412 originating via unauthorized SMS aggregator', details: 'DLT header mismatch' },
      { id: 'n_url', label: 'hdfc-bank-verify-kyc.xyz', type: 'domain', risk: 96, evidence: 'High entropy keyword stuffing registered on disposable .xyz registrar', details: 'Fast-flux bulletproof hosting' },
      { id: 'n_ip', label: '185.220.101.5 Host', type: 'ip', risk: 89, evidence: 'Hosting 14 distinct banking clone login pages', details: 'Autonomous System ASN-4102' },
      { id: 'n_pay', label: 'mule.recovery@okhdfcbank', type: 'payment', risk: 94, evidence: 'Designated first-hop UPI beneficiary account for stolen funds', details: 'Flagged in 38 prior reports' },
    ],
    edges: [
      { from: 'n_sms', to: 'n_cli', rel: 'routes_through' },
      { from: 'n_sms', to: 'n_url', rel: 'contains_link' },
      { from: 'n_url', to: 'n_ip', rel: 'resolves_to' },
      { from: 'n_url', to: 'n_pay', rel: 'siphons_credentials_to' },
    ]
  },
  {
    id: 'quishing_ring',
    name: 'Reverse-Charge Quishing Ring',
    riskScore: 91,
    description: 'Trojan QR code embedded in marketplace chat redirecting victim into authorizing an outgoing debit intent.',
    nodes: [
      { id: 'n_chat', label: 'Marketplace Chat Inbound', type: 'message', risk: 84, evidence: 'Attacker requests seller scan QR to "receive advance deposit"', details: 'Social engineering pretext' },
      { id: 'n_qr', label: 'Trojan QR Payload', type: 'qr', risk: 95, evidence: 'Decoded URI: upi://pay?pa=merchant_refund_escrow@ybl&am=9999', details: 'Hidden debit intent URI' },
      { id: 'n_vpa', label: 'merchant_refund_escrow@ybl', type: 'payment', risk: 92, evidence: 'Fabricated merchant identity routing to unverified digital wallet', details: 'Mule pool layer-1' },
      { id: 'n_rep', label: 'Correlated Reports #1188', type: 'report', risk: 88, evidence: '14 victims recorded identical reverse-collect QR sticker pattern', details: 'Community verified' }
    ],
    edges: [
      { from: 'n_chat', to: 'n_qr', rel: 'delivers_payload' },
      { from: 'n_qr', to: 'n_vpa', rel: 'initiates_debit_to' },
      { from: 'n_vpa', to: 'n_rep', rel: 'documented_in' }
    ]
  },
  {
    id: 'digital_arrest',
    name: 'Digital Arrest Telecom Extortion Cell',
    riskScore: 98,
    description: 'VoIP spoofed police exchange threatening immediate arrest, issuing forged warrants and demanding escrow wire.',
    nodes: [
      { id: 'n_phone', label: '+91-11-2309-8800 Spoof', type: 'phone', risk: 96, evidence: 'SIP trunk spoofing central law enforcement exchange line', details: 'VoIP international relay' },
      { id: 'n_notice', label: 'Forged Legal Summons', type: 'message', risk: 90, evidence: 'Narcotics & customs arrest warrant PDF with counterfeit seals', details: 'High-pressure coercion' },
      { id: 'n_portal', label: 'cbi-case-status.online', type: 'domain', risk: 95, evidence: 'Fake status portal registered 48 hours prior to attack', details: 'Victim tracking gateway' },
      { id: 'n_crypto', label: 'USDT Escrow 0x71c...48fa', type: 'payment', risk: 99, evidence: 'Laundering depository converting victim funds to tether', details: 'Cold storage cluster' }
    ],
    edges: [
      { from: 'n_phone', to: 'n_notice', rel: 'delivers_warrant' },
      { from: 'n_notice', to: 'n_portal', rel: 'instructs_verification_on' },
      { from: 'n_portal', to: 'n_crypto', rel: 'demands_bail_to' }
    ]
  }
];

export default function ScamDNAExplorerPage() {
  const [activePattern, setActivePattern] = useState(PATTERNS[0]);
  const [selectedNode, setSelectedNode] = useState(PATTERNS[0].nodes[0]);

  const handleSelectPattern = (pat) => {
    setActivePattern(pat);
    setSelectedNode(pat.nodes[0]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#906727] dark:text-[#EAD6A0] font-bold uppercase tracking-widest">
            <Dna className="w-3.5 h-3.5 text-[#C69A42]" />
            <span>TOPOLOGICAL SCAM DNA ENGINE // V2.4</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
            Scam DNA Forensic Explorer
          </h1>
          <p className="text-xs sm:text-sm text-[#777064] dark:text-[#A8A095] mt-0.5">
            Visualize how isolated malicious indicators interconnect to form cross-channel fraud infrastructure.
          </p>
        </div>

        {/* Pattern Switcher */}
        <div className="flex items-center gap-2 bg-[#F2EADB] dark:bg-[#1C1813] p-1.5 rounded-xl border border-[#E5DCCB] dark:border-[#332B20] overflow-x-auto">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPattern(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer whitespace-nowrap ${
                activePattern.id === p.id
                  ? 'bg-white dark:bg-[#29241D] text-[#906727] dark:text-[#EAD6A0] shadow-xs'
                  : 'text-[#777064] dark:text-[#9E9688] hover:text-[#242019]'
              }`}
            >
              {p.id === 'kyc_hijack' ? 'Bank KYC Phishing' : p.id === 'quishing_ring' ? 'UPI Quishing Ring' : 'Digital Arrest'}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Summary Card */}
      <div className="p-5 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.2 rounded bg-[#B42332]/10 text-[#B42332]">
              Risk Score: {activePattern.riskScore}/100 (Critical)
            </span>
            <span className="text-xs font-mono text-[#777064]">
              {activePattern.nodes.length} Connected Topological Nodes
            </span>
          </div>
          <h2 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
            {activePattern.name}
          </h2>
          <p className="text-xs text-[#777064] dark:text-[#A8A095] mt-1">
            {activePattern.description}
          </p>
        </div>

        <div className="px-3 py-2 rounded-xl bg-[#FBF8F0] dark:bg-[#12100E] border border-[#E5DCCB] dark:border-[#2E2820] text-xs font-mono text-[#906727] dark:text-[#EAD6A0] shrink-0">
          <span>Synergy Confidence: 1.34x</span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Nodes & Connections Visualizer */}
        <div className="lg:col-span-2 rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#16130F] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#777064] pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820]">
            <span>TOPOLOGY MATRIX</span>
            <span>CLICK TO INSPECT FORENSIC EVIDENCE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activePattern.nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#C69A42] bg-[#FBF8F0] dark:bg-[#201C16] ring-2 ring-[#C69A42]/30 shadow-xs'
                      : 'border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 hover:border-[#C69A42]/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#906727] dark:text-[#EAD6A0]">
                        {node.type}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#B42332]">
                        {node.risk}%
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-sm text-[#242019] dark:text-[#FBF8F0] mb-1">
                      {node.label}
                    </h3>
                    <p className="text-xs text-[#777064] dark:text-[#A8A095] line-clamp-2">
                      {node.evidence}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E5DCCB]/60 dark:border-[#2E2820] text-[10px] font-mono text-[#777064]">
                    {node.details}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Relationship Edges Breakdown */}
          <div className="pt-4 border-t border-[#E5DCCB] dark:border-[#2E2820]">
            <span className="text-xs font-mono uppercase text-[#777064] block mb-2 font-semibold">
              Correlated Relationship Edges:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {activePattern.edges.map((e, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-[#F2EADB]/60 dark:bg-[#1C1813] flex items-center justify-between text-[#242019] dark:text-[#FBF8F0]">
                  <span className="text-[#906727] dark:text-[#EAD6A0]">{e.from} → {e.to}</span>
                  <span className="text-[10px] text-[#777064]">[{e.rel}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Evidence Inspector */}
        <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#16130F] p-6 shadow-sm flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-5">
              <div className="pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820]">
                <span className="font-mono text-[10px] uppercase font-bold text-[#906727] dark:text-[#EAD6A0] block mb-1">
                  NODE INSPECTION // {selectedNode.type.toUpperCase()}
                </span>
                <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
                  {selectedNode.label}
                </h3>
              </div>

              <div>
                <span className="text-xs font-mono font-semibold text-[#777064] dark:text-[#9E9688] uppercase block mb-1.5">
                  Extracted Evidence:
                </span>
                <div className="p-3.5 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0] dark:bg-[#12100E] text-xs font-mono text-[#242019] dark:text-[#FBF8F0] leading-relaxed">
                  {selectedNode.evidence}
                </div>
              </div>

              <div className="space-y-2.5 text-xs font-mono text-[#777064] dark:text-[#A8A095]">
                <div className="flex items-center justify-between">
                  <span>Risk Contribution:</span>
                  <span className="font-bold text-[#B42332]">{selectedNode.risk}% Critical</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Routing Layer:</span>
                  <span className="text-[#242019] dark:text-[#FBF8F0]">{selectedNode.details}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Synergy Status:</span>
                  <span className="text-[#277653] font-semibold">Active Attacker Vector</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#777064] text-xs font-mono">
              Select a node on the left to inspect forensic details.
            </div>
          )}

          <div className="pt-4 border-t border-[#E5DCCB] dark:border-[#2E2820] mt-4">
            <a
              href="/app/scan"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl btn-gold-shimmer text-xs uppercase font-bold tracking-wider border border-[#C69A42]"
            >
              <span>Scan Your Own Target</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
