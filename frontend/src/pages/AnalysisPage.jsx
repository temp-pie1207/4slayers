import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  AlertTriangle, ArrowLeft, 
  Copy, Check, Clock, 
  ShieldAlert, Eye, Cpu, Flag
} from 'lucide-react';
import { api } from '../api';
import RiskMeter from '../components/RiskMeter';
import ScamDNAGraph from '../components/ScamDNAGraph';
import SubmitReportModal from '../components/SubmitReportModal';

export default function AnalysisPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [scan, setScan] = useState(location.state?.scanData || null);
  const [loading, setLoading] = useState(!scan);
  const [explanationMode, setExplanationMode] = useState('simple'); // 'simple' or 'technical'
  const [copied, setCopied] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    async function fetchScan() {
      if (!scan && id) {
        try {
          const res = await api.getScanById(id);
          setScan(res);
        } catch (err) {
          console.error('Scan fetch error:', err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchScan();
  }, [id, scan]);

  const handleCopyReport = () => {
    if (!scan) return;
    const summary = `[4SLAYERS Threat Intelligence Dossier]
Threat Level: ${scan.risk_level} (${scan.risk_score}/100)
Vector: ${scan.type}
Target: ${scan.input_summary}
Verdict: ${scan.explanations?.verdict_summary || 'Analyzed by 4SLAYERS Sentinel Engine'}
Generated: ${new Date(scan.created_at).toLocaleString()}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center px-4">
        <div>
          <div className="w-10 h-10 border border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/50 font-mono text-xs uppercase tracking-wider">Loading Threat Dossier...</p>
        </div>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center px-4">
        <div className="max-w-md">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h3 className="text-lg font-light text-white mb-2">Threat Record Not Found</h3>
          <p className="text-xs text-white/50 mb-6 font-mono">The specified incident identifier could not be retrieved.</p>
          <Link to="/scan" className="px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider">
            Return to Scanner
          </Link>
        </div>
      </div>
    );
  }

  const breakdown = scan.breakdown || {
    message_analysis: 82,
    url_analysis: 91,
    behavior_analysis: 76,
    known_patterns: 88,
    network_signals: 71
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Bar Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Scanner</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-black hover:bg-white/[0.04] text-white/70 hover:text-white border border-white/20 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Dossier'}</span>
            </button>

            <button
              onClick={() => setReportModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-rose-950/30 hover:bg-rose-950/50 text-rose-300 border border-rose-500/30 transition cursor-pointer"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Report to Community</span>
            </button>
          </div>
        </div>

        {/* Input Summary Pill */}
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 truncate">
            <span className="font-mono uppercase text-[10px] text-white/50 bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
              {scan.type} VECTOR
            </span>
            <span className="text-white/80 truncate max-w-xl font-mono">
              {scan.input_summary}
            </span>
          </div>
          <div className="text-white/40 text-right shrink-0 font-mono text-[11px]">
            Logged: {new Date(scan.created_at).toLocaleString()}
          </div>
        </div>

        {/* Risk Meter & Score Gauge */}
        <RiskMeter score={scan.risk_score} level={scan.risk_level} />

        {/* Multi-Signal Risk Breakdown */}
        <div className="bg-white/[0.02] border border-white/[0.1] rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b border-white/[0.08]">
            <div>
              <h3 className="text-sm font-medium text-white">Multi-Signal Weighted Decomposition</h3>
              <p className="text-xs text-white/40 font-mono">
                Composite risk derived from independent vector models.
              </p>
            </div>
            <span className="text-xs text-cyan-400 font-mono">
              Adaptive Fusion v2.4
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            {[
              { label: 'Message Analysis', value: breakdown.message_analysis, weight: '25%' },
              { label: 'URL Analysis', value: breakdown.url_analysis, weight: '25%' },
              { label: 'Behavior Analysis', value: breakdown.behavior_analysis, weight: '20%' },
              { label: 'Known Patterns', value: breakdown.known_patterns, weight: '15%' },
              { label: 'Network Signals', value: breakdown.network_signals, weight: '15%' },
            ].map((item, i) => (
              <div key={i} className="bg-black p-3.5 rounded-xl border border-white/[0.08]">
                <span className="text-[10px] text-white/40 block mb-1 font-mono truncate">{item.label}</span>
                <div className="flex items-baseline justify-between mb-2 font-mono">
                  <span className={`text-xl font-light ${item.value >= 70 ? 'text-rose-400' : item.value >= 40 ? 'text-amber-300' : 'text-emerald-400'}`}>
                    {Math.round(item.value)}%
                  </span>
                  <span className="text-[10px] text-white/30">{item.weight}</span>
                </div>
                <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.value >= 70 ? 'bg-rose-500' : item.value >= 40 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explainable AI with Simple vs Technical Mode */}
        <div className="bg-white/[0.02] border border-white/[0.1] rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium text-white">Why is this flagged?</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-white/60 bg-white/[0.02]">
                  EXPLAINABLE REASONING
                </span>
              </div>
              <p className="text-xs text-white/40 font-mono mt-0.5">
                Causal reasoning breakdown behind the threat classification.
              </p>
            </div>

            {/* Toggle Switcher */}
            <div className="bg-black p-1 rounded-full border border-white/[0.1] flex items-center gap-1 shrink-0">
              <button
                onClick={() => setExplanationMode('simple')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
                  explanationMode === 'simple'
                    ? 'bg-white text-black font-semibold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Plain English</span>
              </button>
              <button
                onClick={() => setExplanationMode('technical')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition cursor-pointer ${
                  explanationMode === 'technical'
                    ? 'bg-white text-black font-semibold'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <Cpu className="w-3 h-3" />
                <span>Technical Telemetry</span>
              </button>
            </div>
          </div>

          {/* Explanations List */}
          {explanationMode === 'simple' ? (
            <div className="space-y-3">
              {(scan.explanations?.simple || [
                "This input uses urgent pressure or unverified links designed to prompt quick action.",
                "Legitimate institutions will not demand immediate verification through unofficial messages."
              ]).map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-black p-4 rounded-xl border border-white/[0.06]"
                >
                  <div className="p-1 rounded-full bg-rose-950/40 text-rose-400 border border-rose-500/30 shrink-0 mt-0.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">{point}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {(scan.explanations?.technical || [
                "NLP lexical entropy score exceeded safety boundary (0.75+).",
                "Domain reputation check flagged unverified autonomous system routing."
              ]).map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-black p-3.5 rounded-xl border border-white/[0.06] font-mono text-xs text-white/80"
                >
                  <span className="text-cyan-400 shrink-0">[{idx + 1}]</span>
                  <p className="leading-relaxed">{point}</p>
                </div>
              ))}

              {/* Structured Signals Table */}
              {scan.signals && scan.signals.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block mb-3">
                    Extracted Signal Matrix:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {scan.signals.map((sig, sIdx) => (
                      <div key={sIdx} className="bg-black p-3 rounded-xl border border-white/[0.08] text-xs">
                        <div className="flex items-center justify-between mb-1 font-mono">
                          <span className="text-white/90">{sig.signal}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded uppercase border ${sig.level === 'high' ? 'border-rose-500/30 text-rose-400 bg-rose-950/20' : 'border-amber-500/30 text-amber-400 bg-amber-950/20'}`}>
                            {sig.level}
                          </span>
                        </div>
                        <p className="text-white/40 text-[11px]">{sig.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SCAM DNA Network Graph */}
        <ScamDNAGraph scamDna={scan.scam_dna} />

        {/* Next Move Prediction */}
        <div className="bg-white/[0.02] border border-white/[0.1] rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-base font-medium text-white">What might happen next?</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-white/60 bg-white/[0.02]">
              PREDICTIVE PLAYBOOK
            </span>
          </div>
          <p className="text-xs text-white/40 font-mono mb-6">
            Forecasted attacker tactics based on observed campaign behavior across historical clusters.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(scan.next_moves || []).map((move, mIdx) => (
              <div
                key={mIdx}
                className="bg-black border border-white/[0.08] rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-cyan-400">
                      Phase 0{mIdx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-white/70 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/10">
                      {move.confidence}% confidence
                    </span>
                  </div>
                  <h4 className="text-xs font-medium text-white mb-1.5 leading-snug">{move.action}</h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light">{move.detail}</p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 mt-4 pt-3 border-t border-white/[0.06]">
                  <Clock className="w-3 h-3 text-white/40" />
                  <span>Timeline: {move.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="bg-white/[0.02] border border-white/[0.1] rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-base font-medium text-white">Recommended Defensive Actions</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-white/60 bg-white/[0.02]">
              DETERMINISTIC PLAYBOOK
            </span>
          </div>
          <p className="text-xs text-white/40 font-mono mb-6">
            Step-by-step protective instructions tailored to this incident's severity.
          </p>

          <div className="space-y-3">
            {(scan.recommended_actions || []).map((act) => (
              <div
                key={act.step}
                className={`p-4 rounded-xl border flex items-start gap-4 ${
                  act.priority === 'critical'
                    ? 'bg-rose-950/20 border-rose-500/30'
                    : 'bg-black border-white/[0.08]'
                }`}
              >
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono shrink-0 bg-white/[0.06] text-white">
                  {act.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-medium text-white">{act.title}</h4>
                    <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded border ${
                      act.priority === 'critical' ? 'text-rose-400 border-rose-500/30 bg-rose-950/30' : 'text-white/40 border-white/10'
                    }`}>
                      {act.priority}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{act.instruction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rescan / Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
          <Link
            to="/scan"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 text-center transition font-medium"
          >
            Scan Another Threat ↗
          </Link>
          <Link
            to="/intelligence"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider bg-black hover:bg-white/[0.04] text-white/70 hover:text-white text-center transition border border-white/20"
          >
            Explore Intelligence Taxonomy
          </Link>
        </div>

        {/* Submit Report Modal */}
        <SubmitReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          onSubmitted={() => navigate('/reports')}
        />
      </div>
    </div>
  );
}
