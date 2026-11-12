import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Globe, Phone, QrCode, ArrowUpRight, CheckCircle2, AlertTriangle, ShieldAlert, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { api } from '../api';
import { motion, AnimatePresence } from 'motion/react';

const SAMPLE_PRESETS = [
  {
    type: 'message',
    title: 'Bank KYC Threat',
    text: 'Dear Customer, your NetBanking access is suspended due to pending KYC verification. Click http://hdfc-bank-verify-kyc.xyz/login to prevent block immediately.',
    sender: '+91-98210-99412'
  },
  {
    type: 'url',
    title: 'Phishing Gateway',
    text: 'http://secure-paypal-login-verify.top/account-protection',
    context: 'Account locked notification'
  },
  {
    type: 'phone',
    title: 'Digital Arrest Call',
    text: '+91-11-2309-8800',
    caller: 'Cyber Crime Investigation Cell'
  },
  {
    type: 'qr',
    title: 'Reverse UPI Quishing',
    text: 'upi://pay?pa=escrow_marketplace_refund@okhdfcbank&pn=RefundVerification&am=12500',
    context: 'Marketplace seller advance payment'
  }
];

export default function ScannerPreviewSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('message');
  const [inputContent, setInputContent] = useState(SAMPLE_PRESETS[0].text);
  const [secondaryInput, setSecondaryInput] = useState(SAMPLE_PRESETS[0].sender);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStage, setScanStage] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectPreset = (preset) => {
    setActiveTab(preset.type);
    setInputContent(preset.text);
    setSecondaryInput(preset.sender || preset.caller || preset.context || '');
    setResult(null);
    setError(null);
  };

  const handleRunScan = async (e) => {
    e?.preventDefault();
    if (!inputContent.trim()) return;

    setIsScanning(true);
    setResult(null);
    setError(null);

    // Realistic sequential processing stages
    setScanStage('EXTRACTING SIGNALS');
    await new Promise((r) => setTimeout(r, 400));
    setScanStage('MATCHING RULES');
    await new Promise((r) => setTimeout(r, 450));
    setScanStage('CONNECTING EVIDENCE');
    await new Promise((r) => setTimeout(r, 400));
    setScanStage('GENERATING REPORT');

    try {
      let scanRes;
      if (activeTab === 'message') {
        scanRes = await api.scanMessage(inputContent, secondaryInput);
      } else if (activeTab === 'url') {
        scanRes = await api.scanURL(inputContent, secondaryInput);
      } else if (activeTab === 'phone') {
        scanRes = await api.scanPhone(inputContent, secondaryInput);
      } else {
        scanRes = await api.scanQR(inputContent);
      }
      setResult(scanRes);
    } catch (err) {
      console.error(err);
      setError('Analysis failed to communicate with backend. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const getRiskBadgeColor = (level) => {
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

  return (
    <section id="scanner-preview" className="relative py-24 sm:py-32 bg-[#F2EADB] dark:bg-[#12100E] border-y border-[#E5DCCB] dark:border-[#2E2820]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]">
              SECTION // 04
            </span>
            <span className="text-[#E5DCCB] dark:text-[#3D3528]">|</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
              LIVE BACKEND ENGINE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242019] dark:text-[#FBF8F0] mb-4">
            ANALYZE A THREAT IN SECONDS.
          </h2>
          <p className="text-sm sm:text-base text-[#777064] dark:text-[#A8A095] leading-relaxed">
            Run an actual multi-channel scan right here. Test with one of our recorded real-world fraud presets or paste your own suspicious text, link, phone number, or payment handle.
          </p>
        </div>

        {/* Preset Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono text-[#777064] dark:text-[#9E9688] uppercase tracking-wider mr-1">
            Real-World Presets:
          </span>
          {SAMPLE_PRESETS.map((p) => (
            <button
              key={p.title}
              onClick={() => handleSelectPreset(p)}
              className="px-3 py-1.5 rounded-lg border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#1C1813] hover:border-[#C69A42] text-xs font-medium text-[#242019] dark:text-[#FBF8F0] transition duration-200 cursor-pointer shadow-2xs hover:shadow-sm"
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Interactive Scanner Box */}
        <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#181511] shadow-xl overflow-hidden">
          {/* Tab Selector Bar */}
          <div className="flex items-center border-b border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0] dark:bg-[#14110D] px-4 overflow-x-auto">
            {[
              { id: 'message', label: 'SMS & Chat', icon: MessageSquare },
              { id: 'url', label: 'URL / Link', icon: Globe },
              { id: 'phone', label: 'Phone / Caller', icon: Phone },
              { id: 'qr', label: 'QR Payload', icon: QrCode },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setResult(null);
                  }}
                  className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider transition border-b-2 cursor-pointer ${
                    isSelected
                      ? 'border-[#C69A42] text-[#906727] dark:text-[#EAD6A0] bg-white dark:bg-[#181511]'
                      : 'border-transparent text-[#777064] dark:text-[#9E9688] hover:text-[#242019] dark:hover:text-[#FBF8F0]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <form onSubmit={handleRunScan} className="p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-xs font-mono font-medium uppercase tracking-wider text-[#777064] dark:text-[#9E9688] mb-2">
                {activeTab === 'message' && 'Suspicious Message Text or Chat Transcript'}
                {activeTab === 'url' && 'Suspicious URL Endpoint or Domain'}
                {activeTab === 'phone' && 'Incoming Caller Phone Number'}
                {activeTab === 'qr' && 'QR Destination Payload or Raw URI'}
              </label>
              {activeTab === 'message' ? (
                <textarea
                  rows={3}
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  placeholder="Paste message contents here..."
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/50 dark:bg-[#12100E]/50 p-3.5 text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42] transition font-sans"
                />
              ) : (
                <input
                  type="text"
                  value={inputContent}
                  onChange={(e) => setInputContent(e.target.value)}
                  placeholder="Enter endpoint, phone or URI..."
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/50 dark:bg-[#12100E]/50 p-3.5 text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42] transition font-sans"
                />
              )}
            </div>

            {/* Secondary Context Input */}
            <div>
              <label className="block text-xs font-mono font-medium uppercase tracking-wider text-[#777064] dark:text-[#9E9688] mb-1.5">
                {activeTab === 'message' && 'Sender ID or Number (Optional)'}
                {activeTab === 'url' && 'Context or Delivering Channel (Optional)'}
                {activeTab === 'phone' && 'Caller Name or Stated Organization (Optional)'}
                {activeTab === 'qr' && 'Delivery Context (Optional)'}
              </label>
              <input
                type="text"
                value={secondaryInput}
                onChange={(e) => setSecondaryInput(e.target.value)}
                placeholder="e.g. +91-98210-99412 or 'Claiming to be bank officer'"
                className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/50 dark:bg-[#12100E]/50 px-3.5 py-2.5 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42] transition"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#E5DCCB]/60 dark:border-[#332B20]/60">
              <div className="flex items-center gap-2 text-xs font-mono text-[#777064] dark:text-[#9E9688]">
                <Sparkles className="w-3.5 h-3.5 text-[#C69A42]" />
                <span>Zero telemetry retained during public preview scan</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setInputContent('');
                    setSecondaryInput('');
                    setResult(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-[#E5DCCB] dark:border-[#332B20] text-xs font-medium text-[#777064] dark:text-[#A8A095] hover:text-[#242019] transition"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isScanning || !inputContent.trim()}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg btn-gold-shimmer text-xs uppercase tracking-wider font-semibold border border-[#C69A42] disabled:opacity-50 transition cursor-pointer shadow-sm hover:shadow-md"
                >
                  {isScanning ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{scanStage}...</span>
                    </>
                  ) : (
                    <>
                      <span>Run AI Analysis</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Results Reveal Area */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/70 dark:bg-[#12100E]/70 p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Score Ring */}
                    <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-white dark:bg-[#1C1813] border-2 border-[#C69A42] shadow-sm">
                      <span className="font-display font-bold text-xl text-[#242019] dark:text-[#FBF8F0]">
                        {result.risk_score}
                      </span>
                      <span className="absolute bottom-1 font-mono text-[8px] text-[#777064]">/100</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider border ${getRiskBadgeColor(result.risk_level)}`}>
                          {result.risk_level}
                        </span>
                        <span className="text-xs font-mono text-[#777064] dark:text-[#9E9688]">
                          ID: {result.id.slice(0, 8)}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-base sm:text-lg text-[#242019] dark:text-[#FBF8F0] mt-1">
                        {result.explanations?.verdict_summary || 'Multi-Vector Fraud Threat Flagged'}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/app/scans/${result.id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#242019] text-[#FBF8F0] dark:bg-[#FBF8F0] dark:text-[#242019] hover:bg-[#C69A42] dark:hover:bg-[#C69A42] hover:text-white transition text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    <span>View Complete Deep Report</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Signals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {result.signals?.slice(0, 4).map((sig, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#181511] flex items-start gap-3"
                    >
                      <div className="p-1 rounded bg-[#B42332]/10 text-[#B42332] shrink-0 mt-0.5">
                        <ShieldAlert className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-semibold uppercase text-[#242019] dark:text-[#FBF8F0]">
                          {sig.category}
                        </div>
                        <p className="text-xs text-[#777064] dark:text-[#A8A095] mt-0.5 leading-relaxed">
                          {sig.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Recommended Action Preview */}
                {result.recommended_actions?.length > 0 && (
                  <div className="p-4 rounded-xl border border-[#C69A42]/30 bg-[#EAD6A0]/10 dark:bg-[#C69A42]/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#277653] shrink-0" />
                      <span className="text-xs font-medium text-[#242019] dark:text-[#FBF8F0]">
                        <strong className="text-[#906727] dark:text-[#EAD6A0]">Next Step:</strong> {result.recommended_actions[0].instruction}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white dark:bg-[#1C1813] border border-[#E5DCCB] dark:border-[#332B20] text-[#777064] dark:text-[#9E9688]">
                      Priority 1
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="p-4 border-t border-[#B42332]/30 bg-[#B42332]/10 text-[#B42332] text-xs font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
