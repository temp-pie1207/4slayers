import React, { useState } from 'react';
import { Network } from 'lucide-react';

export default function ScamDNAGraph({ scamDna }) {
  const [selectedNode, setSelectedNode] = useState(null);

  if (!scamDna || !scamDna.nodes || scamDna.nodes.length === 0) {
    return (
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 text-center text-white/40">
        <Network className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-xs font-mono">No Scam DNA relationship signals mapped for this scan.</p>
      </div>
    );
  }

  const nodes = scamDna.nodes;
  const links = scamDna.links || [];

  const width = 640;
  const height = 340;
  const positions = {};

  nodes.forEach((n, idx) => {
    if (n.id === 'node_source' || idx === 0) {
      positions[n.id] = { x: 90, y: height / 2 };
    } else {
      const otherNodes = nodes.filter(x => x.id !== 'node_source' && x.id !== nodes[0].id);
      const otherIdx = otherNodes.findIndex(x => x.id === n.id);
      const totalOthers = Math.max(otherNodes.length, 1);
      
      const layer = (n.type === 'domain' || n.type === 'pattern') ? 2 : 1;
      const xPos = layer === 1 ? 310 : 510;
      
      const step = height / (totalOthers + 1);
      const yPos = step * (otherIdx + 1);
      positions[n.id] = { x: xPos, y: yPos };
    }
  });

  return (
    <div className="bg-white/[0.02] border border-white/[0.1] rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400">
              GRAPH TOPOLOGY
            </span>
          </div>
          <h3 className="text-base font-medium text-white tracking-tight mt-0.5">
            SCAM DNA — Fraud Correlation Graph
          </h3>
          <p className="text-xs text-white/40 font-light mt-0.5">
            Connects signals across messages, phones, URLs, domains, and payment channels into a unified attack topology.
          </p>
        </div>

        <div className="text-[11px] font-mono text-white/50 px-2.5 py-1 rounded border border-white/10 bg-black">
          Nodes: {nodes.length} // Links: {links.length}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[16/9] bg-black rounded-xl border border-white/[0.06] overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full select-none">
          {/* Subtle grid pattern */}
          <defs>
            <pattern id="dna-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#dna-grid)" />

          {/* Links */}
          {links.map((link, idx) => {
            const src = positions[link.source];
            const dst = positions[link.target];
            if (!src || !dst) return null;

            const isSelectedLink = selectedNode && (selectedNode.id === link.source || selectedNode.id === link.target);

            return (
              <g key={idx}>
                <line
                  x1={src.x}
                  y1={src.y}
                  x2={dst.x}
                  y2={dst.y}
                  stroke={isSelectedLink ? '#06b6d4' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth={isSelectedLink ? 1.8 : 1}
                  strokeDasharray={isSelectedLink ? 'none' : '3 3'}
                  className="transition-colors duration-200"
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const pos = positions[node.id] || { x: width / 2, y: height / 2 };
            const isSelected = selectedNode?.id === node.id;
            const isCritical = (node.risk || 0) >= 0.7;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer group"
              >
                {/* Glow ring on selection */}
                {isSelected && (
                  <circle
                    r={22}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                    className="animate-spin"
                    style={{ animationDuration: '8s' }}
                  />
                )}

                <circle
                  r={15}
                  fill={isSelected ? '#0e2430' : '#080808'}
                  stroke={isSelected ? '#22d3ee' : isCritical ? 'rgba(244, 63, 94, 0.6)' : 'rgba(255, 255, 255, 0.4)'}
                  strokeWidth={isSelected ? 1.6 : 1.0}
                  className="transition-colors duration-200"
                />

                <circle
                  r={3}
                  fill={isSelected ? '#22d3ee' : isCritical ? '#f43f5e' : '#ffffff'}
                />

                {/* Node Label Below */}
                <text
                  y={25}
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.65)'}
                  fontSize="9px"
                  fontFamily="ui-monospace, monospace"
                  fontWeight={isSelected ? '600' : '400'}
                >
                  {node.label || node.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="mt-4 p-4 rounded-xl bg-black border border-white/[0.1] text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-white">
            <span className="font-semibold text-cyan-300">{selectedNode.label || selectedNode.id}</span>
            <span className="text-[10px] text-white/40 uppercase">Type: {selectedNode.type}</span>
          </div>
          <p className="text-white/60 font-sans text-xs">
            {selectedNode.details || 'Correlated entity identified during multi-channel feature synthesis.'}
          </p>
        </div>
      )}
    </div>
  );
}
