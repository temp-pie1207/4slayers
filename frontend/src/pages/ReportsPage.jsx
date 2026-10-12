import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, Search, ThumbsUp, ShieldAlert, 
  CheckCircle2, Globe, Phone, CreditCard, Filter, AlertCircle 
} from 'lucide-react';
import { api } from '../api';
import SubmitReportModal from '../components/SubmitReportModal';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    'All',
    'Banking Scams',
    'UPI Payment Scam',
    'Delivery Scams',
    'Fake Customer Support',
    'Job Scams',
    'Government Impersonation'
  ];

  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await api.getReports(search, selectedType);
      setReports(data || []);
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [selectedType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchReports();
  };

  const handleUpvote = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await api.upvoteReport(id);
      setReports(prev => prev.map(r => r.id === id ? { ...r, upvotes: res.upvotes } : r));
    } catch (err) {
      console.error('Failed to upvote:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Community Threat Registry
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/60">
                CROWD TELEMETRY
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 font-light">
              Incident reports submitted by operators and cross-verified by 4SLAYERS AI.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit Threat Report</span>
          </button>
        </div>

        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by phone, URL, or actor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/[0.1] rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white/40 placeholder:text-white/30 font-mono"
            />
          </form>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 md:pb-0 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition cursor-pointer text-xs ${
                  selectedType === cat
                    ? 'bg-white text-black font-semibold'
                    : 'bg-black text-white/50 hover:text-white border border-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border border-white/20 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-white/40 font-mono text-xs">Syncing community threat telemetry...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/[0.01] border border-white/[0.08]">
            <FileText className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-white mb-1">No community reports found</h3>
            <p className="text-xs text-white/40 font-mono">Try searching with different terms or select 'All'.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white/[0.02] border border-white/[0.08] hover:border-white/25 rounded-2xl p-5 flex flex-col justify-between transition group backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded border border-white/10 bg-black text-white/60 uppercase">
                      {report.scam_type}
                    </span>
                    <span className="text-white/30">
                      {new Date(report.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-sm font-medium text-white mb-2 leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-xs text-white/50 font-light leading-relaxed mb-4 line-clamp-3">
                    {report.description}
                  </p>

                  <div className="space-y-1.5 text-xs font-mono text-white/70 bg-black p-3 rounded-xl border border-white/[0.06] mb-4">
                    {report.phone && (
                      <div className="flex items-center gap-2 truncate">
                        <Phone className="w-3 h-3 text-white/40 shrink-0" />
                        <span className="text-white/90 truncate">{report.phone}</span>
                      </div>
                    )}
                    {report.url && (
                      <div className="flex items-center gap-2 truncate">
                        <Globe className="w-3 h-3 text-white/40 shrink-0" />
                        <span className="text-white/90 truncate">{report.url}</span>
                      </div>
                    )}
                    {report.loss_amount > 0 && (
                      <div className="flex items-center gap-2 text-rose-400">
                        <CreditCard className="w-3 h-3 shrink-0" />
                        <span>Loss: ${report.loss_amount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={(e) => handleUpvote(report.id, e)}
                    className="flex items-center gap-1.5 text-white/50 hover:text-white transition cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{report.upvotes || 0} confirmations</span>
                  </button>

                  <span className="text-[10px] text-cyan-400 uppercase">
                    Verified Pattern
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <SubmitReportModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmitted={fetchReports}
        />
      </div>
    </div>
  );
}
