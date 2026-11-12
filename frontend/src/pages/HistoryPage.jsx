import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Trash2, ArrowUpRight, ShieldAlert, Calendar, RefreshCw, AlertTriangle } from 'lucide-react';
import { api } from '../api';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScans();
  }, []);

  const loadScans = async () => {
    try {
      setLoading(true);
      const data = await api.getScans();
      setScans(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you wish to permanently delete this scan incident dossier?')) return;
    try {
      await api.deleteScan(id);
      setScans(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const getRiskBadge = (level) => {
    switch (level) {
      case 'Critical Risk':
        return 'bg-[#B42332]/10 text-[#B42332] border-[#B42332]/30';
      case 'High Risk':
        return 'bg-[#A86C13]/10 text-[#A86C13] border-[#A86C13]/30';
      case 'Medium Risk':
        return 'bg-[#C69A42]/15 text-[#906727] dark:text-[#EAD6A0] border-[#C69A42]/30';
      default:
        return 'bg-[#277653]/10 text-[#277653] border-[#277653]/30';
    }
  };

  let filtered = scans.filter((s) => {
    const matchesSearch = s.input_summary?.toLowerCase().includes(search.toLowerCase()) ||
                          s.id?.toLowerCase().includes(search.toLowerCase()) ||
                          s.type?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || s.type === filterType;
    const matchesRisk = filterRisk === 'all' || s.risk_level?.toLowerCase().includes(filterRisk.toLowerCase());
    return matchesSearch && matchesType && matchesRisk;
  });

  if (sortBy === 'newest') {
    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (sortBy === 'oldest') {
    filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  } else if (sortBy === 'highest_risk') {
    filtered.sort((a, b) => (b.risk_score || 0) - (a.risk_score || 0));
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div>
          <span className="font-mono text-[10px] uppercase font-bold text-[#906727] dark:text-[#EAD6A0] tracking-widest block mb-1">
            FORENSIC LOGS // ARCHIVED INCIDENTS
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
            Scan Dossier History
          </h1>
        </div>

        <button
          onClick={loadScans}
          className="p-2 rounded-lg border border-[#E5DCCB] dark:border-[#2E2820] text-[#777064] hover:text-[#C69A42] transition self-start sm:self-auto"
          title="Refresh dossier list"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777064]" />
          <input
            type="text"
            placeholder="Search keywords, IDs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] pl-9 pr-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
          />
        </div>

        {/* Filter by Type */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] px-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
        >
          <option value="all">All Threat Vectors</option>
          <option value="multimodal">Multimodal (Combined)</option>
          <option value="message">SMS / Chat</option>
          <option value="url">URL / Domain</option>
          <option value="phone">Phone / Caller</option>
          <option value="qr">QR Code</option>
          <option value="transaction">Payment Transfer</option>
        </select>

        {/* Filter by Risk */}
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          className="rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] px-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
        >
          <option value="all">All Risk Levels</option>
          <option value="critical">Critical Risk</option>
          <option value="high">High Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="low">Low / Safe</option>
        </select>

        {/* Sorting */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] px-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
        >
          <option value="newest">Sort: Newest First</option>
          <option value="oldest">Sort: Oldest First</option>
          <option value="highest_risk">Sort: Highest Risk Score</option>
        </select>
      </div>

      {/* Scans List Table */}
      <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#777064]">
            Loading archived scan dossiers...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#777064]">
            No scan incidents matched your active filters.
          </div>
        ) : (
          <div className="divide-y divide-[#E5DCCB] dark:divide-[#2E2820]">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/app/scans/${item.id}`)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FBF8F0] dark:hover:bg-[#1C1813] transition cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-white dark:bg-[#1C1813] border border-[#C69A42] flex flex-col items-center justify-center font-display font-bold text-xs text-[#242019] dark:text-[#FBF8F0] shrink-0 shadow-2xs">
                    <span>{item.risk_score}</span>
                    <span className="font-mono text-[8px] text-[#777064]">SCORE</span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${getRiskBadge(item.risk_level)}`}>
                        {item.risk_level}
                      </span>
                      <span className="text-[10px] font-mono text-[#777064] uppercase font-semibold">
                        [{item.type}]
                      </span>
                      <span className="text-[10px] font-mono text-[#777064] hidden sm:inline">
                        ID: {item.id.slice(0, 8)}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-[#242019] dark:text-[#FBF8F0] truncate">
                      {item.input_summary}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-mono text-[#777064] hidden md:inline">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>

                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="p-1.5 rounded-lg text-[#777064] hover:text-[#B42332] hover:bg-[#B42332]/10 transition"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-mono text-[#C69A42] flex items-center gap-1 font-semibold">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
