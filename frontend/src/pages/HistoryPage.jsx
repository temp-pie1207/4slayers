import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  History, Search, ShieldAlert, ShieldCheck, 
  Trash2, ChevronRight, Filter, AlertTriangle, ExternalLink 
} from 'lucide-react';
import { api } from '../api';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [filterRisk, setFilterRisk] = useState('All');
  const [search, setSearch] = useState('');

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await api.getScans();
      setScans(data || []);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this scan record?')) return;
    try {
      await api.deleteScan(id);
      setScans(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filtered = scans.filter(s => {
    const matchesType = filterType === 'All' || s.type?.toLowerCase() === filterType.toLowerCase();
    const score = s.risk_score || 0;
    let matchesRisk = true;
    if (filterRisk === 'Critical') matchesRisk = score >= 80;
    else if (filterRisk === 'High') matchesRisk = score >= 60 && score < 80;
    else if (filterRisk === 'Medium') matchesRisk = score >= 30 && score < 60;
    else if (filterRisk === 'Low') matchesRisk = score < 30;

    const matchesSearch = !search || 
      (s.input_summary || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.type || '').toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesRisk && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Scan Audit Log
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/60">
                IMMUTABLE TELEMETRY
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 font-light">
              Comprehensive chronological archive of analyzed messages, domains, callers, and transactions.
            </p>
          </div>

          <button
            onClick={() => navigate('/scan')}
            className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium transition cursor-pointer"
          >
            <span>Run New Scan ↗</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.02] border border-white/[0.08] p-4 rounded-2xl">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by keyword or payload..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/[0.1] rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white/40 placeholder:text-white/30 font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-mono text-xs">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-black border border-white/[0.1] text-white/80 rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value="All">All Channels</option>
              <option value="Message">Messages</option>
              <option value="URL">URLs</option>
              <option value="Phone">Phone Numbers</option>
              <option value="QR">QR Codes</option>
              <option value="Transaction">Transactions</option>
            </select>

            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="bg-black border border-white/[0.1] text-white/80 rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value="All">All Risk Levels</option>
              <option value="Critical">Critical Risk (80+)</option>
              <option value="High">High Risk (60–79)</option>
              <option value="Medium">Medium Risk (30–59)</option>
              <option value="Low">Low Risk (&lt;30)</option>
            </select>
          </div>
        </div>

        {/* Table / List */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border border-white/20 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-white/40 font-mono text-xs">Loading audit records...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/[0.01] border border-white/[0.08]">
            <History className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-white mb-1">No matching logs found</h3>
            <p className="text-xs text-white/40 font-mono">Try adjusting your channel or severity filter.</p>
          </div>
        ) : (
          <div className="bg-white/[0.02] border border-white/[0.1] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
            {filtered.map((item) => {
              const isHigh = (item.risk_score || 0) >= 60;
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/scan/analysis/${item.id}`, { state: { scanData: item } })}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`p-2 rounded-xl shrink-0 ${isHigh ? 'bg-rose-950/20 text-rose-400 border border-rose-500/20' : 'bg-emerald-950/20 text-emerald-400 border border-emerald-500/20'}`}>
                      {isHigh ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                          {item.type}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${isHigh ? 'border-rose-500/30 text-rose-400 bg-rose-950/20' : 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20'}`}>
                          {item.risk_level || (isHigh ? 'High Risk' : 'Low Risk')}
                        </span>
                        <span className="text-[10px] text-white/30 font-mono">
                          {new Date(item.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-white/80 max-w-2xl break-all">
                        {item.input_summary || item.title || 'Telemetry payload'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 text-xs font-mono">
                    <div className="text-right">
                      <span className="text-sm font-light text-white">{item.risk_score}</span>
                      <span className="text-white/40">/100</span>
                    </div>

                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      title="Purge record"
                      className="p-1.5 rounded-lg text-white/30 hover:text-rose-400 hover:bg-rose-950/20 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
