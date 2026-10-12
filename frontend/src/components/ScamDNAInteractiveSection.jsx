import React, { useState } from 'react';
import { Network, Info, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Section C — Scam DNA
 * Headline: See how the pieces connect.
 * Dark expansive interactive relationship graph with elegant monochrome nodes,
 * fine curved edges, and a restrained cyan highlight for the selected relationship.
 * Synthetic demonstration case clearly labeled.
 */
export default function ScamDNAInteractiveSection() {
  const [selectedNodeId, setSelectedNodeId] = useState('hub');

  // Synthetic Demonstration Threat Graph
  const nodes = [
    {
      id: 'hub',
      x: 350,
      y: 220,
      label: 'Campaign #SYN-8492',
      type: 'Syndicate Core',
      role: 'Root Fraud Cluster',
      iocs: 'Multi-Victim Tax Extortion Ring',
      details: 'Coordinates simultaneous SMS push, malicious domains, and money mule rotations across 3 regions.'
    },
    {
      id: 'sms',
      x: 170,
      y: 110,
      label: '+1 (844) 920-0412',
      type: 'VoIP Originator',
      role: 'SMS Blast Gateway',
      iocs: 'Carrier: Virtual Cloud Trunk Ltd',
      details: 'Sent 1,420 automated messages within a 45-minute window before cycling SIM endpoints.'
    },
    {
      id: 'shortener',
      x: 530,
      y: 110,
      label: 'bit.ly/tax-gov-refund',
      type: 'Shortened Hop',
      role: 'Redirect Cloaking',
      iocs: 'Geo-Fenced Redirection Hop',
      details: 'Filters incoming traffic based on mobile user-agents, redirecting bots to Wikipedia and real users to the phishing host.'
    },
    {
      id: 'host',
      x: 610,
      y: 290,
      label: 'irs-verify-portal92.net',
      type: 'Phishing Domain',
      role: 'Credential Harvester',
      iocs: 'ASN 49281 (Bulletproof Host), IP 194.26.29.112',
      details: 'Harvests full banking credentials, SSN/PAN identifiers, and SMS one-time authorization tokens.'
    },
    {
      id: 'mule',
      x: 350,
      y: 380,
      label: 'mule_payee@okaxis',
      type: 'Payment Endpoint',
      role: 'Money Mule VPA',
      iocs: 'UPI Fast-Payment Rail Endpoint',
      details: 'Receives coerced settlement fees and immediately splits transfers into 12 crypto exchange accounts.'
    },
    {
      id: 'exfil',
      x: 130,
      y: 310,
      label: '@refund_telemetry_bot',
      type: 'Exfiltration Bot',
      role: 'C2 Command Channel',
      iocs: 'Encrypted Telegram Bot API Gateway',
      details: 'Receives submitted credentials in real-time to alert operators for instantaneous session takeover.'
    }
  ];

  const edges = [
    { from: 'sms', to: 'hub', label: 'Inbound Infiltration' },
    { from: 'hub', to: 'shortener', label: 'Payload Delivery' },
    { from: 'shortener', to: 'host', label: 'Cloaked Forwarding' },
    { from: 'host', to: 'exfil', label: 'C2 Data Exfiltration' },
    { from: 'host', to: 'mule', label: 'Extortion Redirection' },
    { from: 'hub', to: 'mule', label: 'Laundering Routing' },
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <section id="features" className="relative py-28 sm:py-36 bg-black text-white border-t border-white/[0.08] overflow-hidden">
      {/* Background subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>Section 03 // Scam DNA Graph</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.12]">
              See how the pieces <br />
              <span className="text-white/50">connect.</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-white/60 font-light leading-relaxed">
              Every attack leaves an infrastructure trail: shared IP subnets, reused VoIP gateways, registered bulletproof ASNs, and payment mules. 
              Scam DNA clusters disparate threats into identifiable syndicates.
            </p>
          </div>

          {/* Synthetic Case Badge */}
          <div className="shrink-0 p-3 rounded-xl border border-white/10 bg-white/[0.02] font-mono text-xs text-white/60">
            <div className="flex items-center gap-2 text-white font-medium mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>SYNTHETIC DEMONSTRATION CASE</span>
            </div>
            <div className="text-[11px] text-white/40">
              #SYN-8492 // Tax Extortion Syndicate
            </div>
          </div>
        </div>

        {/* Interactive Graph Canvas & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive SVG Relationship Graph */}
          <div className="lg:col-span-8 bg-[#040404] border border-white/[0.12] rounded-2xl p-4 sm:p-6 relative overflow-hidden">
            
            <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-3 px-2">
              <span>CANVAS: 2D INTERACTIVE TOPOLOGY</span>
              <span>CLICK ANY NODE TO INSPECT</span>
            </div>

            <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] overflow-hidden rounded-xl bg-black border border-white/[0.06]">
              <svg
                viewBox="0 0 740 480"
                className="w-full h-full select-none"
              >
                {/* Background grid */}
                <defs>
                  <pattern id="graph-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="740" height="480" fill="url(#graph-grid)" />

                {/* Curved Fine Edges */}
                {edges.map((edge, idx) => {
                  const src = nodes.find(n => n.id === edge.from);
                  const dst = nodes.find(n => n.id === edge.to);
                  if (!src || !dst) return null;

                  const isHighlighted = selectedNodeId === edge.from || selectedNodeId === edge.to;
                  // Compute smooth curved cubic bezier
                  const midX = (src.x + dst.x) / 2;
                  const midY = (src.y + dst.y) / 2 + (src.x > dst.x ? -20 : 20);

                  return (
                    <g key={idx}>
                      <path
                        d={`M ${src.x} ${src.y} Q ${midX} ${midY} ${dst.x} ${dst.y}`}
                        fill="none"
                        stroke={isHighlighted ? '#06b6d4' : 'rgba(255, 255, 255, 0.16)'}
                        strokeWidth={isHighlighted ? 1.8 : 0.9}
                        strokeDasharray={isHighlighted ? 'none' : '2, 3'}
                        className="transition-colors duration-300"
                      />
                      {/* Animated traveling signal pulse along highlighted edges */}
                      {isHighlighted && (
                        <circle r="2.5" fill="#22d3ee">
                          <animateMotion
                            path={`M ${src.x} ${src.y} Q ${midX} ${midY} ${dst.x} ${dst.y}`}
                            dur="2.5s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isSelected = selectedNodeId === node.id;
                  const isHub = node.id === 'hub';

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer group"
                      transform={`translate(${node.x}, ${node.y})`}
                    >
                      {/* Selection Ring */}
                      {isSelected && (
                        <circle
                          r={isHub ? 32 : 24}
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="1.2"
                          strokeOpacity="0.7"
                          strokeDasharray="3 3"
                          className="animate-spin"
                          style={{ animationDuration: '10s' }}
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={isHub ? 22 : 16}
                        fill={isSelected ? '#0e2430' : '#0a0a0a'}
                        stroke={isSelected ? '#22d3ee' : 'rgba(255, 255, 255, 0.4)'}
                        strokeWidth={isSelected ? 1.8 : 1.0}
                        className="transition-colors duration-200"
                      />

                      {/* Center Point */}
                      <circle
                        r={isHub ? 4 : 3}
                        fill={isSelected ? '#22d3ee' : '#ffffff'}
                      />

                      {/* Node Label Below */}
                      <text
                        y={isHub ? 34 : 28}
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'}
                        fontSize={isHub ? '11px' : '9.5px'}
                        fontFamily="ui-monospace, SFMono-Regular, monospace"
                        fontWeight={isSelected ? '600' : '400'}
                      >
                        {node.label}
                      </text>

                      {/* Secondary type badge */}
                      <text
                        y={isHub ? 46 : 38}
                        textAnchor="middle"
                        fill={isSelected ? '#06b6d4' : 'rgba(255, 255, 255, 0.35)'}
                        fontSize="8px"
                        fontFamily="ui-monospace, SFMono-Regular, monospace"
                      >
                        {node.type.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/40 px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Cyan highlight indicates active relationship
              </span>
              <span>Nodes: 6 // Edges: 6</span>
            </div>
          </div>

          {/* Node Inspector Drawer */}
          <div className="lg:col-span-4 bg-white/[0.02] border border-white/[0.12] rounded-2xl p-6 sm:p-7 backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block">
                  Node Telemetry Inspector
                </span>
                <h3 className="text-base font-medium text-white font-mono mt-1">
                  {selectedNode.label}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/60">
                {selectedNode.type}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                  Syndicate Tactical Role
                </span>
                <p className="text-sm text-white/90 font-medium">
                  {selectedNode.role}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                  Observed IOC Signature
                </span>
                <p className="text-xs font-mono text-cyan-300 p-2.5 rounded bg-black border border-white/[0.08] break-words">
                  {selectedNode.iocs}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                  Forensic Analysis
                </span>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {selectedNode.details}
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-white/[0.08] space-y-2.5">
              <Link
                to="/intelligence"
                className="w-full py-2.5 px-4 rounded-xl border border-white/20 hover:border-white/50 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition hover:bg-white/5"
              >
                <span>Explore Global Threat Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-[10px] text-center font-mono text-white/35">
                Connected to global scam intelligence database
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
