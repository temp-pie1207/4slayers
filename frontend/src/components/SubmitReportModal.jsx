import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../api';

export default function SubmitReportModal({ isOpen, onClose, onSubmitted }) {
  const [formData, setFormData] = useState({
    title: '',
    scam_type: 'Banking Scams',
    description: '',
    phone: '',
    url: '',
    recipient: '',
    loss_amount: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError('Please provide a title and incident description.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await api.createReport({
        ...formData,
        loss_amount: formData.loss_amount ? parseFloat(formData.loss_amount) : 0.0
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onSubmitted) onSubmitted();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to submit report');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#080808] border border-white/[0.15] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.08] bg-black">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-white/80">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Report Threat Telemetry</h3>
              <p className="text-[11px] text-white/40 font-mono">Contribute to the global Scam DNA graph</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h4 className="text-base font-light text-white mb-1">Dossier Registered</h4>
            <p className="text-xs text-white/50 font-mono">
              Your report has been anonymized and added to the community threat intelligence database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-300 text-xs font-mono">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1.5">
                Threat Title / Campaign Summary *
              </label>
              <input
                type="text"
                placeholder="e.g. Fake Bank Account KYC SMS Extortion"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 font-mono"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.scam_type}
                  onChange={(e) => setFormData({ ...formData, scam_type: e.target.value })}
                  className="w-full bg-black border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                >
                  <option value="Banking Scams">Banking Scams</option>
                  <option value="UPI Payment Scam">UPI Payment Scam</option>
                  <option value="Delivery Scams">Delivery Scams</option>
                  <option value="Fake Customer Support">Fake Customer Support</option>
                  <option value="Job Scams">Job Scams</option>
                  <option value="Government Impersonation">Government Impersonation</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1.5">
                  Financial Loss (Optional)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.loss_amount}
                  onChange={(e) => setFormData({ ...formData, loss_amount: e.target.value })}
                  className="w-full bg-black border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1.5">
                Full Description & Observed Coercion *
              </label>
              <textarea
                rows={3}
                placeholder="Explain the incident, what they promised or threatened, and what steps occurred..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-black border border-white/[0.1] rounded-xl p-3 text-xs text-white focus:outline-none font-mono"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1.5">
                  Phone / Caller ID
                </label>
                <input
                  type="text"
                  placeholder="+1 (844) 920-0412"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1.5">
                  Suspicious URL
                </label>
                <input
                  type="text"
                  placeholder="hxxps://bit.ly/..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full bg-black border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium transition cursor-pointer"
              >
                {submitting ? 'Submitting...' : 'Transmit Report ↗'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
