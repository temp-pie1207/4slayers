import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, ThumbsUp, ShieldCheck, AlertTriangle, ArrowUpRight, MessageSquare, Globe, Phone, CreditCard, X } from 'lucide-react';
import { api } from '../api';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Banking / KYC');
  const [newDesc, setNewDesc] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [newLoss, setNewLoss] = useState('');

  useEffect(() => {
    loadReports();
  }, [search, filterType]);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await api.getReports(search, filterType);
      setReports(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (id) => {
    try {
      await api.upvoteReport(id);
      setReports(prev => prev.map(r => r.id === id ? { ...r, upvotes: (r.upvotes || 0) + 1 } : r));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.createReport({
        title: newTitle,
        scam_type: newType,
        description: newDesc,
        phone: newPhone || null,
        url: newUrl || null,
        recipient: newRecipient || null,
        loss_amount: newLoss ? parseFloat(newLoss) : 0
      });
      setReports(prev => [res, ...prev]);
      setIsModalOpen(false);
      // Reset form
      setNewTitle('');
      setNewDesc('');
      setNewPhone('');
      setNewUrl('');
      setNewRecipient('');
      setNewLoss('');
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const scamTypes = ['All', 'Banking / KYC', 'UPI / Quishing', 'Digital Arrest', 'Job & Task Scam', 'Investment / Crypto', 'Delivery / Customs'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#906727] dark:text-[#EAD6A0] font-bold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-[#C69A42]" />
            <span>COMMUNITY INTEL // DECENTRALIZED VIGILANCE</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
            Community Threat Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#777064] dark:text-[#A8A095] mt-0.5">
            Verified incident alerts submitted by analysts and everyday citizens to protect the collective.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold-shimmer text-xs uppercase font-bold tracking-wider border border-[#C69A42] shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Report Threat</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Scam Type Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {scamTypes.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
                filterType === t
                  ? 'bg-[#242019] text-[#FBF8F0] dark:bg-[#FBF8F0] dark:text-[#242019] shadow-xs'
                  : 'bg-white dark:bg-[#16130F] border border-[#E5DCCB] dark:border-[#2E2820] text-[#777064] dark:text-[#A8A095] hover:border-[#C69A42]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777064]" />
          <input
            type="text"
            placeholder="Search reports by keyword, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] pl-8 pr-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center font-mono text-xs text-[#777064]">
            Loading community alerts...
          </div>
        ) : reports.length === 0 ? (
          <div className="col-span-full py-16 text-center font-mono text-xs text-[#777064]">
            No community reports matching active filters.
          </div>
        ) : (
          reports.map((rep) => (
            <div
              key={rep.id}
              className="p-6 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm flex flex-col justify-between hover:border-[#C69A42] transition duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.2 rounded bg-[#EAD6A0]/20 dark:bg-[#C69A42]/10 text-[#906727] dark:text-[#EAD6A0] border border-[#C69A42]/30">
                    {rep.scam_type}
                  </span>
                  {rep.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-[#277653] font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0] mb-2">
                  {rep.title}
                </h3>
                <p className="text-xs text-[#777064] dark:text-[#A8A095] leading-relaxed mb-4 line-clamp-3">
                  {rep.description}
                </p>

                {/* Indicators Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {rep.indicators?.map((ind, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FBF8F0] dark:bg-[#12100E] border border-[#E5DCCB] dark:border-[#2E2820] text-[#777064] dark:text-[#9E9688]"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Upvote & Date */}
              <div className="pt-3 border-t border-[#E5DCCB]/60 dark:border-[#2E2820] flex items-center justify-between text-xs font-mono">
                <span className="text-[#777064] text-[11px]">
                  {new Date(rep.created_at).toLocaleDateString()}
                </span>

                <button
                  onClick={() => handleUpvote(rep.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0] dark:bg-[#12100E] hover:border-[#C69A42] text-[#242019] dark:text-[#FBF8F0] font-semibold transition cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-[#C69A42]" />
                  <span>{rep.upvotes || 1}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Report Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#16130F] p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820]">
              <h2 className="font-display font-bold text-lg text-[#242019] dark:text-[#FBF8F0]">
                Submit Threat Report
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#777064] hover:text-[#242019]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] mb-1">
                  Incident Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fake Bank KYC SMS with .xyz domain"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E] px-3.5 py-2 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] mb-1">
                    Scam Category
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E] px-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0]"
                  >
                    <option value="Banking / KYC">Banking / KYC</option>
                    <option value="UPI / Quishing">UPI / Quishing</option>
                    <option value="Digital Arrest">Digital Arrest</option>
                    <option value="Job & Task Scam">Job & Task Scam</option>
                    <option value="Investment / Crypto">Investment / Crypto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] mb-1">
                    Estimated Loss ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newLoss}
                    onChange={(e) => setNewLoss(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E] px-3.5 py-2 text-xs text-[#242019] dark:text-[#FBF8F0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] mb-1">
                  Incident Description & Modus Operandi
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain how the scam occurred, what the attacker demanded, and what links/numbers were used..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E] p-3 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] mb-1">
                    Phone / Sender CLI
                  </label>
                  <input
                    type="text"
                    placeholder="+91-98..."
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E] px-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] mb-1">
                    Malicious URL
                  </label>
                  <input
                    type="text"
                    placeholder="http://..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E] px-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5DCCB] dark:border-[#2E2820] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E5DCCB] dark:border-[#332B20] text-xs font-medium text-[#777064]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl btn-gold-shimmer text-xs uppercase font-bold tracking-wider border border-[#C69A42]"
                >
                  {submitting ? 'Submitting...' : 'Broadcast to Community'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
