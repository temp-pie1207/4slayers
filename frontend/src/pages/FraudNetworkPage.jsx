import React, { useState, useEffect } from 'react';
import { Network, Search, Filter, ShieldAlert, Layers, ArrowUpRight, Eye, RefreshCw } from 'lucide-react';
import { api } from '../api';

export default function FraudNetworkPage() {
  const [clusters, setClusters] = useState([]);
  const [activeCluster, setActiveCluster] = useState('all');
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState('');
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
    n.label.toLowerCase().includes(search.toLowerCase()) ||
    n.details.toLowerCase().includes(search.toLowerCase()) ||
    n.type.toLowerCase().includes(search.toLowerCase())
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#906727] dark:text-[#EAD6A0] font-bold uppercase tracking-widest">
            <Network className="w-3.5 h-3.5 text-[#C69A42]" />
            <span>GLOBAL FRAUD TOPOLOGY // ARCHIVE</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
            Empirical Fraud Network
          </h1>
          <p className="text-xs sm:text-sm text-[#777064] dark:text-[#A8A095] mt-0.5">
            Cross-connected malicious infrastructure documented from live incident investigations.
          </p>
        </div>

        <button
          onClick={() => loadNetwork(activeCluster)}
          className="p-2 rounded-lg border border-[#E5DCCB] dark:border-[#2E2820] text-[#777064] hover:text-[#C69A42] transition self-start sm:self-auto"
          title="Refresh network data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Cluster Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {clusters.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCluster(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
                activeCluster === c.id
                  ? 'bg-[#242019] text-[#FBF8F0] dark:bg-[#FBF8F0] dark:text-[#242019] shadow-xs'
                  : 'bg-white dark:bg-[#16130F] border border-[#E5DCCB] dark:border-[#2E2820] text-[#777064] dark:text-[#A8A095] hover:border-[#C69A42]'
              }`}
            >
              {c.name.split(':')[0]}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777064]" />
          <input
            type="text"
            placeholder="Filter entities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] pl-8 pr-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Entities List / Matrix */}
        <div className="lg:col-span-2 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] p-6 shadow-sm flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#777064] pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820] mb-4">
              <span>ACTIVE CLUSTER ENTITIES ({filteredNodes.length})</span>
              <span>FORENSIC SIGNATURES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredNodes.map((entity) => {
                const isSelected = selectedEntity?.id === entity.id;

                return (
                  <div
                    key={entity.id}
                    onClick={() => setSelectedEntity(entity)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#C69A42] bg-[#FBF8F0] dark:bg-[#201C16] ring-2 ring-[#C69A42]/30 shadow-xs'
                        : 'border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 hover:border-[#C69A42]/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#906727] dark:text-[#EAD6A0]">
                          {entity.type}
                        </span>
                        <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-semibold border ${getStatusColor(entity.status)}`}>
                          {entity.status}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-xs text-[#242019] dark:text-[#FBF8F0] truncate">
                        {entity.label}
                      </h4>
                      <p className="text-[11px] text-[#777064] dark:text-[#A8A095] mt-1 line-clamp-2 leading-relaxed">
                        {entity.details}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E5DCCB] dark:border-[#2E2820] mt-4 flex items-center justify-between text-[11px] font-mono text-[#777064]">
            <span>Cross-Cluster Infrastructure Links: {edges.length} Edges</span>
            <span className="text-[#C69A42]">Click any entity to inspect connected links →</span>
          </div>
        </div>

        {/* Right Col: Entity Inspector */}
        <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] p-6 shadow-sm flex flex-col justify-between">
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
                  First Detected: {selectedEntity.first_seen}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-semibold text-[#777064] dark:text-[#9E9688] uppercase block mb-1">
                  Forensic Description:
                </span>
                <p className="p-3.5 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0] dark:bg-[#12100E] text-xs text-[#242019] dark:text-[#FBF8F0] leading-relaxed">
                  {selectedEntity.details}
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-[#777064] dark:text-[#A8A095]">
                <div className="flex items-center justify-between">
                  <span>Victims Documented:</span>
                  <span className="font-bold text-[#B42332]">{selectedEntity.incidents} Reports</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Risk Severity:</span>
                  <span className="font-bold text-[#906727] dark:text-[#EAD6A0]">{(selectedEntity.risk * 100).toFixed(0)}% Confidence</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cluster Tag:</span>
                  <span className="text-[#242019] dark:text-[#FBF8F0]">{selectedEntity.cluster}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5DCCB] dark:border-[#2E2820]">
                <span className="text-[11px] font-mono text-[#777064] uppercase block mb-1.5 font-semibold">
                  Direct Syndicate Links:
                </span>
                <div className="space-y-1 text-[11px] font-mono">
                  {edges
                    .filter((e) => e.source === selectedEntity.id || e.target === selectedEntity.id)
                    .slice(0, 4)
                    .map((e, idx) => (
                      <div key={idx} className="p-1.5 rounded bg-[#F2EADB]/60 dark:bg-[#1C1813] flex items-center justify-between text-[#242019] dark:text-[#FBF8F0]">
                        <span className="text-[#906727] dark:text-[#EAD6A0]">→ {e.relationship}</span>
                        <span className="text-[9px] opacity-75">weight: {e.weight}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#777064] text-xs font-mono">
              Select an entity to view relationships.
            </div>
          )}

          <div className="pt-4 border-t border-[#E5DCCB] dark:border-[#2E2820] mt-4">
            <a
              href="/app/scan"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl btn-gold-shimmer text-xs uppercase tracking-wider font-semibold border border-[#C69A42]"
            >
              <span>Scan Against This Network</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
