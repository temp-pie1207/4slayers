import React, { useState, useEffect } from 'react';
import { Network, Search, Filter, ShieldAlert, ArrowUpRight, ShieldCheck, Eye, Layers } from 'lucide-react';
import { api } from '../api';
import { motion, AnimatePresence } from 'motion/react';

export default function FraudNetworkSection() {
  const [clusters, setClusters] = useState([]);
  const [activeCluster, setActiveCluster] = useState('all');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNetwork(activeCluster);
  }, [activeCluster]);

  const loadNetwork = async (cluster) => {
    try {
      setLoading(true);
      const data = await api.getFraudNetwork(cluster);
      setClusters(data.clusters || []);
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
      setStats(data.stats || {});
      if (data.nodes && data.nodes.length > 0) {
        setSelectedEntity(data.nodes[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredNodes = nodes.filter((n) =>
    n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    if (status.includes('Critical') || status.includes('Active Threat')) {
      return 'bg-[#B42332]/10 text-[#B42332] border-[#B42332]/30';
    }
    if (status.includes('Flagged') || status.includes('Takedown')) {
      return 'bg-[#A86C13]/10 text-[#A86C13] border-[#A86C13]/30';
    }
    if (status.includes('Frozen')) {
      return 'bg-[#277653]/10 text-[#277653] border-[#277653]/30';
    }
    return 'bg-[#C69A42]/15 text-[#906727] dark:text-[#EAD6A0] border-[#C69A42]/30';
  };

  return (
    <section id="fraud-network-section" className="relative py-24 sm:py-32 bg-[#F2EADB] dark:bg-[#12100E] border-b border-[#E5DCCB] dark:border-[#2E2820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]">
                SECTION // 08
              </span>
              <span className="text-[#E5DCCB] dark:text-[#3D3528]">|</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
                EMPIRICAL FRAUD NETWORK
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242019] dark:text-[#FBF8F0] mb-3">
              CORRELATED FRAUD SYNDICATES.
            </h2>
            <p className="text-sm sm:text-base text-[#777064] dark:text-[#A8A095] leading-relaxed">
              Based on recorded forensic evidence, not imagined relationships. See how malicious SMS gateways, typosquatted hosting providers, mule VPAs, and Telegram bots share infrastructure.
            </p>
          </div>

          <a
            href="/app/network"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg btn-gold-shimmer text-xs uppercase tracking-wider font-semibold border border-[#C69A42] shrink-0 self-start lg:self-auto shadow-xs"
          >
            <span>Console Network Graph</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Cluster Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {clusters.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCluster(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium tracking-wider uppercase transition cursor-pointer ${
                  activeCluster === c.id
                    ? 'bg-[#242019] text-[#FBF8F0] dark:bg-[#FBF8F0] dark:text-[#242019] shadow-xs'
                    : 'bg-white dark:bg-[#1C1813] border border-[#E5DCCB] dark:border-[#332B20] text-[#777064] dark:text-[#A8A095] hover:border-[#C69A42]'
                }`}
              >
                {c.name.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777064]" />
            <input
              type="text"
              placeholder="Search entity, domain, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#181511] pl-8 pr-3 py-1.5 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
            />
          </div>
        </div>

        {/* Network Diagram + Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Interactive Graph Grid */}
          <div className="lg:col-span-2 rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#181511] p-6 shadow-xl min-h-[440px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820] mb-4 text-xs font-mono text-[#777064] dark:text-[#9E9688]">
                <span>CORRELATED ENTITIES ({filteredNodes.length})</span>
                <span>STATUS // CROSS-CHANNEL RECORDED</span>
              </div>

              {/* Entity Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {filteredNodes.map((entity) => {
                  const isSelected = selectedEntity?.id === entity.id;

                  return (
                    <div
                      key={entity.id}
                      onClick={() => setSelectedEntity(entity)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer ${
                        isSelected
                          ? 'border-[#C69A42] bg-[#FBF8F0] dark:bg-[#201C16] ring-2 ring-[#C69A42]/30 shadow-xs'
                          : 'border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/40 dark:bg-[#14110D]/40 hover:border-[#C69A42]/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#906727] dark:text-[#EAD6A0]">
                          {entity.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold border ${getStatusColor(entity.status)}`}>
                          {entity.status}
                        </span>
                      </div>
                      <h4 className="font-sans font-semibold text-xs text-[#242019] dark:text-[#FBF8F0] truncate">
                        {entity.label}
                      </h4>
                      <p className="text-[11px] text-[#777064] dark:text-[#A8A095] mt-1 line-clamp-2 leading-relaxed">
                        {entity.details}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom summary bar */}
            <div className="pt-3 border-t border-[#E5DCCB] dark:border-[#2E2820] mt-4 flex items-center justify-between text-[11px] font-mono text-[#777064] dark:text-[#9E9688]">
              <span>Active Syndicates: 4 Coordinated Cells</span>
              <span className="text-[#906727] dark:text-[#EAD6A0]">Click any entity to view forensic relationship breakdown →</span>
            </div>
          </div>

          {/* Right Col: Selected Entity Inspector */}
          <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#181511] p-6 shadow-xl flex flex-col justify-between">
            {selectedEntity ? (
              <div className="space-y-4">
                <div className="pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820]">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase mb-2 border ${getStatusColor(selectedEntity.status)}`}>
                    {selectedEntity.status}
                  </span>
                  <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0] break-words">
                    {selectedEntity.label}
                  </h3>
                  <span className="font-mono text-[11px] text-[#777064] dark:text-[#9E9688]">
                    First Documented: {selectedEntity.first_seen}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono font-semibold text-[#777064] dark:text-[#9E9688] uppercase block mb-1">
                    Forensic Intelligence:
                  </span>
                  <p className="p-3 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0] dark:bg-[#12100E] text-xs text-[#242019] dark:text-[#FBF8F0] leading-relaxed">
                    {selectedEntity.details}
                  </p>
                </div>

                <div className="space-y-2 text-xs font-mono text-[#777064] dark:text-[#A8A095]">
                  <div className="flex items-center justify-between">
                    <span>Incidents Linked:</span>
                    <span className="font-bold text-[#B42332]">{selectedEntity.incidents} Victims</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Threat Severity:</span>
                    <span className="font-bold text-[#906727] dark:text-[#EAD6A0]">{(selectedEntity.risk * 100).toFixed(0)}% Confidence</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cluster Attribution:</span>
                    <span className="text-[#242019] dark:text-[#FBF8F0]">{selectedEntity.cluster}</span>
                  </div>
                </div>

                {/* Connected Edges List */}
                <div className="pt-2 border-t border-[#E5DCCB] dark:border-[#2E2820]">
                  <span className="text-[11px] font-mono text-[#777064] uppercase block mb-1.5">
                    Direct Network Links:
                  </span>
                  <div className="space-y-1 text-[11px] font-mono">
                    {edges
                      .filter((e) => e.source === selectedEntity.id || e.target === selectedEntity.id)
                      .slice(0, 3)
                      .map((e, idx) => (
                        <div key={idx} className="p-1.5 rounded bg-[#F2EADB]/60 dark:bg-[#201C16] flex items-center justify-between text-[#242019] dark:text-[#FBF8F0]">
                          <span className="text-[#906727] dark:text-[#EAD6A0]">→ {e.relationship}</span>
                          <span className="text-[9px] opacity-75">weight: {e.weight}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 text-[#777064]">
                <Network className="w-8 h-8 text-[#C69A42] mb-2 animate-pulse" />
                <p className="text-xs font-mono">Select any node on the left to inspect its threat graph.</p>
              </div>
            )}

            <div className="pt-4 border-t border-[#E5DCCB] dark:border-[#2E2820] mt-4">
              <a
                href="/app/network"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#242019] text-[#FBF8F0] dark:bg-[#FBF8F0] dark:text-[#242019] hover:bg-[#C69A42] hover:text-white transition text-xs font-semibold uppercase tracking-wider"
              >
                <span>Launch Full Graph Workspace</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
