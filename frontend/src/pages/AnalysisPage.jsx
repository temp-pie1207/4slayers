import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  AlertTriangle, ArrowLeft, Copy, Check, Clock, 
  ShieldAlert, Eye, Cpu, Flag, Download, Share2, ThumbsUp, ThumbsDown,
  Sparkles, CheckCircle2, ChevronRight, MessageSquare, Globe, Phone, CreditCard,
  QrCode, Network, RefreshCw, Star
} from 'lucide-react';
import { api } from '../api';
import { motion, AnimatePresence } from 'motion/react';

export default function AnalysisPage() {
  const { scanId, id } = useParams();
  const currentId = scanId || id;
  const location = useLocation();
  const navigate = useNavigate();

  const [scan, setScan] = useState(location.state?.scanData || null);
  const [loading, setLoading] = useState(!scan);
  const [activeTab, setActiveTab] = useState('simple'); // 'simple' or 'technical'
  const [copied, setCopied] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackVerdict, setFeedbackVerdict] = useState('confirmed_threat');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    async function fetchScan() {
      if (!scan && currentId) {
        try {
          const res = await api.getScanById(currentId);
          setScan(res);
        } catch (err) {
          console.error('Scan fetch error:', err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchScan();
  }, [currentId, scan]);

  const handleCopyReport = () => {
    if (!scan) return;
    const summary = `[4SLAYERS Threat Intelligence Dossier]
Scan ID: ${scan.id}
Risk Score: ${scan.risk_score}/100 (${scan.risk_level})
Vector: ${scan.type}
Verdict: ${scan.explanations?.verdict_summary || 'Analyzed by 4Slayers Sentinel'}
Generated: ${scan.created_at}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJSON = () => {
    if (!scan) return;
    const blob = new Blob([JSON.stringify(scan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `4slayers-dossier-${scan.id.slice(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!scan) return;
    setSubmittingFeedback(true);
    try {
      await api.submitFeedback(scan.id, {
        is_helpful: true,
        rating: feedbackRating,
        user_verdict: feedbackVerdict,
        notes: feedbackNotes || null
      });
      setFeedbackSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Critical Risk':
        return { text: 'text-[#B42332]', bg: 'bg-[#B42332]/10', border: 'border-[#B42332]/30', bar: 'bg-[#B42332]' };
      case 'High Risk':
        return { text: 'text-[#A86C13]', bg: 'bg-[#A86C13]/10', border: 'border-[#A86C13]/30', bar: 'bg-[#A86C13]' };
      case 'Medium Risk':
        return { text: 'text-[#C69A42]', bg: 'bg-[#C69A42]/15', border: 'border-[#C69A42]/30', bar: 'bg-[#C69A42]' };
      default:
        return { text: 'text-[#277653]', bg: 'bg-[#277653]/10', border: 'border-[#277653]/30', bar: 'bg-[#277653]' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-10 h-10 border-2 border-[#C69A42] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
          Compiling Forensic Threat Dossier...
        </p>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
        <AlertTriangle className="w-12 h-12 text-[#A86C13] mb-3" />
        <h2 className="font-display font-bold text-lg text-[#242019] dark:text-[#FBF8F0] mb-2">
          Threat Record Not Located
        </h2>
        <p className="text-xs text-[#777064] dark:text-[#A8A095] mb-6 font-mono">
          The requested scan incident ID was not found or has been purged.
        </p>
        <Link
          to="/app/scan"
          className="px-5 py-2.5 rounded-xl btn-gold-shimmer text-xs uppercase font-bold tracking-wider"
        >
          Return to Scanner
        </Link>
      </div>
    );
  }

  const riskTheme = getRiskColor(scan.risk_level);
  const breakdown = scan.breakdown || {
    message_analysis: 75,
    url_analysis: 85,
    behavior_analysis: 70,
    known_patterns: 80,
    network_signals: 65
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Top Navigation Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <button
          onClick={() => navigate('/app/scans')}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#777064] hover:text-[#242019] dark:hover:text-[#FBF8F0] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scan History</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] text-xs font-mono text-[#777064] hover:text-[#242019] transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#277653]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share Summary'}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] text-xs font-mono text-[#777064] hover:text-[#242019] transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#C69A42]" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Hero Dossier Card */}
      <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#16130F] shadow-lg overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="p-6 sm:p-8 border-b border-[#E5DCCB] dark:border-[#2E2820] bg-gradient-to-r from-[#FBF8F0] via-white to-[#F2EADB] dark:from-[#181511] dark:via-[#16130F] dark:to-[#12100E] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Score Ring */}
            <div className="relative w-20 h-20 rounded-2xl flex flex-col items-center justify-center bg-white dark:bg-[#1C1813] border-2 border-[#C69A42] shadow-sm shrink-0">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
                {scan.risk_score}
              </span>
              <span className="font-mono text-[9px] text-[#777064] uppercase font-bold tracking-wider">
                SCORE / 100
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider border ${riskTheme.bg} ${riskTheme.text} ${riskTheme.border}`}>
                  {scan.risk_level}
                </span>
                <span className="text-xs font-mono text-[#777064] dark:text-[#9E9688]">
                  ID: {scan.id}
                </span>
                <span className="text-xs font-mono text-[#777064] dark:text-[#9E9688]">
                  • {scan.type.toUpperCase()} VECTOR
                </span>
              </div>
              <h1 className="font-display font-bold text-xl sm:text-2xl text-[#242019] dark:text-[#FBF8F0] leading-snug">
                {scan.explanations?.verdict_summary || 'Incident Analysis Complete'}
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end text-xs font-mono text-[#777064] dark:text-[#9E9688] shrink-0">
            <span>TIMESTAMP: {new Date(scan.created_at).toLocaleString()}</span>
            <span>MODEL: HEURISTICS v2.4 + SCAM DNA</span>
          </div>
        </div>

        {/* Input Details Strip */}
        <div className="p-4 sm:p-6 bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 border-b border-[#E5DCCB] dark:border-[#2E2820]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#777064] block mb-1">
            Raw Input Telemetry Evaluated:
          </span>
          <p className="text-xs sm:text-sm font-mono text-[#242019] dark:text-[#FBF8F0] break-words">
            {scan.input_summary}
          </p>
        </div>

        {/* 5-Channel Risk Breakdown Meters */}
        <div className="p-6 sm:p-8 border-b border-[#E5DCCB] dark:border-[#2E2820]">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0] mb-4">
            Multimodal Vector Risk Decomposition:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Message Analysis', val: breakdown.message_analysis },
              { label: 'URL / Domain', val: breakdown.url_analysis },
              { label: 'Behavior Urgency', val: breakdown.behavior_analysis },
              { label: 'Known Patterns', val: breakdown.known_patterns },
              { label: 'Network Signals', val: breakdown.network_signals },
            ].map((metric) => (
              <div key={metric.label} className="p-3.5 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/50 dark:bg-[#14110D]">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#777064] mb-1.5">
                  <span className="truncate">{metric.label}</span>
                  <span className="font-bold text-[#242019] dark:text-[#FBF8F0]">{Math.round(metric.val)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E5DCCB] dark:bg-[#2E2820] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C69A42] to-[#B42332] rounded-full"
                    style={{ width: `${Math.min(100, metric.val)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forensic Signals Timeline */}
        <div className="p-6 sm:p-8 border-b border-[#E5DCCB] dark:border-[#2E2820] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
              Forensic Signals Triggered ({scan.signals?.length || 0}):
            </h3>
            <span className="text-[10px] font-mono text-[#777064]">RANKED BY SEVERITY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scan.signals?.map((sig, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] flex items-start gap-3 shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-[#B42332]/10 text-[#B42332] flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] font-bold uppercase text-[#C69A42]">
                      {sig.category}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#B42332]/10 text-[#B42332]">
                      Level: {sig.level}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs text-[#242019] dark:text-[#FBF8F0]">
                    {sig.reason}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scam DNA Graph Preview */}
        {scan.scam_dna?.nodes && (
          <div className="p-6 sm:p-8 border-b border-[#E5DCCB] dark:border-[#2E2820] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-[#C69A42]" />
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
                  Scam DNA Topology Nodes ({scan.scam_dna.nodes.length}):
                </h3>
              </div>
              <Link to="/app/scam-dna" className="text-xs font-mono text-[#C69A42] hover:underline flex items-center gap-1">
                <span>Open in 3D Explorer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {scan.scam_dna.nodes.map((node) => (
                <div
                  key={node.id}
                  className="px-3 py-2 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/60 dark:bg-[#12100E] flex items-center gap-2 text-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[#C69A42]" />
                  <span className="font-mono font-bold text-[#906727] dark:text-[#EAD6A0] uppercase text-[10px]">
                    {node.type}:
                  </span>
                  <span className="font-sans text-[#242019] dark:text-[#FBF8F0] font-medium">
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dual Explanation Section */}
        <div className="p-6 sm:p-8 border-b border-[#E5DCCB] dark:border-[#2E2820] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
              Explainable AI Deductions:
            </h3>

            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#F2EADB] dark:bg-[#201C16] border border-[#E5DCCB] dark:border-[#332B20] text-xs font-mono">
              <button
                onClick={() => setActiveTab('simple')}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  activeTab === 'simple'
                    ? 'bg-white dark:bg-[#29241D] text-[#242019] dark:text-[#FBF8F0] shadow-xs'
                    : 'text-[#777064] dark:text-[#A8A095]'
                }`}
              >
                Plain Language
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  activeTab === 'technical'
                    ? 'bg-white dark:bg-[#29241D] text-[#242019] dark:text-[#FBF8F0] shadow-xs'
                    : 'text-[#777064] dark:text-[#A8A095]'
                }`}
              >
                Forensic Details
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {(activeTab === 'simple' ? scan.explanations?.simple : scan.explanations?.technical)?.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/40 dark:bg-[#12100E] flex items-start gap-3 text-xs leading-relaxed text-[#242019] dark:text-[#FBF8F0]"
              >
                <span className="text-[#C69A42] font-bold shrink-0 mt-0.5">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attacker's Next Moves Prediction */}
        {scan.next_moves?.length > 0 && (
          <div className="p-6 sm:p-8 border-b border-[#E5DCCB] dark:border-[#2E2820] space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#B42332]">
              Predicted Attacker Playbook (Next Tactical Moves):
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scan.next_moves.map((move, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#B42332]/25 bg-[#B42332]/5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#B42332] mb-1 font-semibold">
                      <span>PHASE {idx + 1} // {move.timeline}</span>
                      <span>{move.confidence}% Probability</span>
                    </div>
                    <h4 className="font-bold text-xs text-[#242019] dark:text-[#FBF8F0] mb-1">
                      {move.action}
                    </h4>
                    <p className="text-[11px] text-[#777064] dark:text-[#A8A095] leading-relaxed">
                      {move.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Action Steps */}
        {scan.recommended_actions?.length > 0 && (
          <div className="p-6 sm:p-8 border-b border-[#E5DCCB] dark:border-[#2E2820] space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#277653]">
              Neutralization Steps (Actionable Safety):
            </h3>

            <div className="space-y-3">
              {scan.recommended_actions.map((act) => (
                <div
                  key={act.step}
                  className="p-4 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#277653]/10 text-[#277653] font-mono font-bold flex items-center justify-center shrink-0">
                    0{act.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0]">
                        {act.title}
                      </h4>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#F2EADB] dark:bg-[#201C16] text-[#777064]">
                        {act.priority}
                      </span>
                    </div>
                    <p className="text-xs text-[#777064] dark:text-[#A8A095] mt-1 leading-relaxed">
                      {act.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Forensic Feedback Section */}
        <div className="p-6 sm:p-8 bg-[#FBF8F0]/30 dark:bg-[#14110D]">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0] mb-2">
            Analyst Verification & Feedback:
          </h3>
          <p className="text-xs text-[#777064] dark:text-[#9E9688] mb-4">
            Help train our collective defense heuristics by confirming or reporting false positives on this incident.
          </p>

          {feedbackSubmitted ? (
            <div className="p-4 rounded-xl border border-[#277653]/30 bg-[#277653]/10 text-[#277653] text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Feedback successfully submitted. Thank you for securing the ecosystem!</span>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4 max-w-xl">
              <div className="flex items-center gap-4 text-xs font-mono">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="verdict"
                    value="confirmed_threat"
                    checked={feedbackVerdict === 'confirmed_threat'}
                    onChange={(e) => setFeedbackVerdict(e.target.value)}
                  />
                  <span>Confirmed Threat</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="verdict"
                    value="false_positive"
                    checked={feedbackVerdict === 'false_positive'}
                    onChange={(e) => setFeedbackVerdict(e.target.value)}
                  />
                  <span>False Positive</span>
                </label>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Optional analyst forensic notes..."
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  className="w-full rounded-lg border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#16130F] px-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>

              <button
                type="submit"
                disabled={submittingFeedback}
                className="px-4 py-2 rounded-lg btn-gold-shimmer text-xs uppercase tracking-wider font-semibold border border-[#C69A42] cursor-pointer"
              >
                {submittingFeedback ? 'Submitting...' : 'Submit Forensic Verification'}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
