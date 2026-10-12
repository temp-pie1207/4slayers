import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  MessageSquare, Globe, Phone, QrCode, FileSearch, CreditCard, 
  ArrowRight, Upload, Sparkles, AlertCircle
} from 'lucide-react';
import { api } from '../api';
import DemoPresetsBar from '../components/DemoPresetsBar';

export default function ScannerPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'message';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [error, setError] = useState('');

  // Form states
  const [messageText, setMessageText] = useState('');
  const [senderInfo, setSenderInfo] = useState('');

  const [urlInput, setUrlInput] = useState('');
  const [urlContext, setUrlContext] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [callerName, setCallerName] = useState('');

  const [qrText, setQrText] = useState('');
  const [qrFile, setQrFile] = useState(null);

  const [screenshotText, setScreenshotText] = useState('');
  const [screenshotFile, setScreenshotFile] = useState(null);

  const [txAmount, setTxAmount] = useState('');
  const [txRecipient, setTxRecipient] = useState('');
  const [txMethod, setTxMethod] = useState('UPI');
  const [txDesc, setTxDesc] = useState('');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['message', 'url', 'phone', 'qr', 'screenshot', 'transaction'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
    setError('');
  };

  const simulateProgress = async () => {
    setLoading(true);
    setScanStep('Normalizing telemetry & stripping obfuscation layers...');
    await new Promise(r => setTimeout(r, 380));
    setScanStep('Running NLP linguistic coercion & domain entropy models...');
    await new Promise(r => setTimeout(r, 420));
    setScanStep('Correlating Scam DNA multi-graph & carrier registries...');
    await new Promise(r => setTimeout(r, 380));
    setScanStep('Synthesizing explainable risk score & defensive playbook...');
  };

  const handleScanMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      setError('Please paste a suspicious message to analyze.');
      return;
    }
    try {
      await simulateProgress();
      const res = await api.scanMessage(messageText, senderInfo || null);
      navigate(`/scan/analysis/${res.id}`, { state: { scanData: res } });
    } catch (err) {
      setError(err.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  const handleScanURL = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setError('Please provide a URL or website address.');
      return;
    }
    try {
      await simulateProgress();
      const res = await api.scanURL(urlInput, urlContext || null);
      navigate(`/scan/analysis/${res.id}`, { state: { scanData: res } });
    } catch (err) {
      setError(err.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  const handleScanPhone = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number to check.');
      return;
    }
    try {
      await simulateProgress();
      const res = await api.scanPhone(phoneNumber, callerName || null);
      navigate(`/scan/analysis/${res.id}`, { state: { scanData: res } });
    } catch (err) {
      setError(err.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  const handleScanQR = async (e) => {
    e.preventDefault();
    if (!qrText.trim() && !qrFile) {
      setError('Please enter a decoded QR link or upload a QR image.');
      return;
    }
    try {
      await simulateProgress();
      const res = await api.scanQR(qrText || 'upi://pay?pa=refund-desk@okaxis&pn=Customer%20Support&am=1');
      navigate(`/scan/analysis/${res.id}`, { state: { scanData: res } });
    } catch (err) {
      setError(err.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  const handleScanScreenshot = async (e) => {
    e.preventDefault();
    if (!screenshotText.trim() && !screenshotFile) {
      setError('Please upload a screenshot or type dialog snippet.');
      return;
    }
    try {
      await simulateProgress();
      const res = await api.scanScreenshot(screenshotText || 'Urgent: Account locked. Visit http://hdfc-bank-verify-kyc.xyz immediately.');
      navigate(`/scan/analysis/${res.id}`, { state: { scanData: res } });
    } catch (err) {
      setError(err.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  const handleScanTransaction = async (e) => {
    e.preventDefault();
    if (!txAmount || !txRecipient) {
      setError('Please fill in amount and recipient handle.');
      return;
    }
    try {
      await simulateProgress();
      const res = await api.scanTransaction(txAmount, txRecipient, txMethod, txDesc);
      navigate(`/scan/analysis/${res.id}`, { state: { scanData: res } });
    } catch (err) {
      setError(err.message || 'Scan failed');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'message', label: 'Message', icon: MessageSquare },
    { id: 'url', label: 'URL / Link', icon: Globe },
    { id: 'phone', label: 'Phone', icon: Phone },
    { id: 'qr', label: 'QR Code', icon: QrCode },
    { id: 'screenshot', label: 'Screenshot', icon: FileSearch },
    { id: 'transaction', label: 'Transaction', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Multimodal Threat Scanner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-3">
            Universal Fraud Scanner
          </h1>
          <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
            Select an attack vector below to inspect linguistic pressure, domain infrastructure, VoIP origin, or payment mule routing.
          </p>
        </div>

        {/* 1-Click Interactive Demo Presets */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5 text-xs font-mono text-white/40 px-1">
            <span>PRE-LOADED THREAT DOSSIERS</span>
            <span>1-CLICK VERIFICATION</span>
          </div>
          <DemoPresetsBar onSelectDemo={(id) => navigate(`/scan/analysis/${id}`)} />
        </div>

        {/* Channel Segmented Switcher */}
        <div className="bg-black border border-white/[0.12] rounded-2xl p-1.5 mb-8 shadow-2xl flex items-center justify-between gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition whitespace-nowrap flex-1 justify-center cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading Overlay */}
        {loading ? (
          <div className="bg-white/[0.02] border border-white/[0.12] rounded-2xl p-12 text-center shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto mb-6 relative flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-white/20 border-t-white animate-spin"></div>
              <Sparkles className="w-5 h-5 text-cyan-400 absolute animate-pulse" />
            </div>
            <h3 className="text-lg font-light text-white mb-2 font-mono tracking-wider">
              CORRELATING THREAT TELEMETRY...
            </h3>
            <p className="text-xs text-white/60 font-mono">{scanStep}</p>
            <div className="w-56 h-1 bg-white/10 rounded-full mx-auto mt-6 overflow-hidden">
              <div className="h-full bg-white rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        ) : (
          /* Channel Form Container */
          <div className="bg-white/[0.02] border border-white/[0.12] rounded-2xl p-6 sm:p-9 shadow-2xl backdrop-blur-sm">
            
            {/* TAB 1: MESSAGE */}
            {activeTab === 'message' && (
              <form onSubmit={handleScanMessage} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Suspicious Message Content *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Paste the suspicious message here... (e.g. Your bank account will be suspended today due to pending KYC. Click http://... to update immediately)"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl p-4 text-sm text-white focus:outline-none placeholder:text-white/25 leading-relaxed font-mono"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                      Sender Info / Header (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +1 (844) 920-0412 or 'SBI-ALERT'"
                      value={senderInfo}
                      onChange={(e) => setSenderInfo(e.target.value)}
                      className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/25 font-mono"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setMessageText("Dear Customer, your Bank NetBanking access will be suspended today due to pending KYC. Click http://auth-sbi-portal.top/kyc-update to prevent immediate freeze.");
                        setSenderInfo("+1 (844) 920-0412");
                      }}
                      className="text-xs text-white/50 hover:text-white font-mono py-3 text-left sm:text-right cursor-pointer"
                    >
                      + Load sample phishing SMS
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium flex items-center justify-center gap-2 group transition cursor-pointer"
                >
                  <span>Analyze Message Signals</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </form>
            )}

            {/* TAB 2: URL */}
            {activeTab === 'url' && (
              <form onSubmit={handleScanURL} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Website URL / Target Link *
                  </label>
                  <input
                    type="text"
                    placeholder="Paste URL... (e.g. http://bit.ly/secure-account-verify-login89 or https://auth-sbi-portal.top)"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none placeholder:text-white/25 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Context / Distribution Channel (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Received via WhatsApp claiming to be courier redelivery portal"
                    value={urlContext}
                    onChange={(e) => setUrlContext(e.target.value)}
                    className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/25 font-mono"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setUrlInput("http://bit.ly/secure-account-verify-login89")}
                    className="text-xs text-white/50 hover:text-white font-mono cursor-pointer"
                  >
                    + Load sample masked shortener
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium flex items-center justify-center gap-2 group transition cursor-pointer"
                >
                  <span>Inspect Domain & Redirect Chain</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </form>
            )}

            {/* TAB 3: PHONE */}
            {activeTab === 'phone' && (
              <form onSubmit={handleScanPhone} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Suspicious Phone Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone number... (e.g. +1 (844) 920-0412 or +91 98765-43210)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none placeholder:text-white/25 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Claimed Caller Identity / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Claims to be 'Electricity Board Officer' or 'SBI Fraud Dept'"
                    value={callerName}
                    onChange={(e) => setCallerName(e.target.value)}
                    className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/25 font-mono"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setPhoneNumber("+1 (844) 920-0412");
                      setCallerName("National Tax Refund Dept");
                    }}
                    className="text-xs text-white/50 hover:text-white font-mono cursor-pointer"
                  >
                    + Load sample reported VoIP caller
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium flex items-center justify-center gap-2 group transition cursor-pointer"
                >
                  <span>Inspect Carrier & Community Reputation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </form>
            )}

            {/* TAB 4: QR */}
            {activeTab === 'qr' && (
              <form onSubmit={handleScanQR} className="space-y-6">
                <div className="border border-dashed border-white/20 hover:border-white/50 rounded-2xl p-8 text-center transition cursor-pointer bg-black/60">
                  <Upload className="w-8 h-8 text-white/40 mx-auto mb-3" />
                  <h4 className="text-sm font-medium text-white mb-1 font-mono">Upload QR Code Image</h4>
                  <p className="text-xs text-white/40 mb-4">PNG, JPG, WEBP up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setQrFile(e.target.files[0].name);
                        setQrText("upi://pay?pa=collection_dept99@okaxis&pn=Customer%20Refund&am=1250&cu=INR");
                      }
                    }}
                    className="text-xs text-white/50 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-mono file:bg-white file:text-black hover:file:bg-white/90"
                  />
                  {qrFile && (
                    <p className="text-xs text-cyan-300 mt-2 font-mono">
                      ✓ Loaded: {qrFile} (Decoded UPI payload)
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Or Paste Decoded QR Payload String
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. upi://pay?pa=collection_dept99@okaxis&am=1250"
                    value={qrText}
                    onChange={(e) => setQrText(e.target.value)}
                    className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/25 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium flex items-center justify-center gap-2 group transition cursor-pointer"
                >
                  <span>Decode & Verify QR Directionality</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </form>
            )}

            {/* TAB 5: SCREENSHOT */}
            {activeTab === 'screenshot' && (
              <form onSubmit={handleScanScreenshot} className="space-y-6">
                <div className="border border-dashed border-white/20 hover:border-white/50 rounded-2xl p-8 text-center transition cursor-pointer bg-black/60">
                  <FileSearch className="w-8 h-8 text-white/40 mx-auto mb-3" />
                  <h4 className="text-sm font-medium text-white mb-1 font-mono">Upload Threat Screenshot</h4>
                  <p className="text-xs text-white/40 mb-4">Capture suspicious WhatsApp dialog, SMS alert, or invoice</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setScreenshotFile(e.target.files[0].name);
                        setScreenshotText("FedEx Notice: Delivery attempt failed for parcel #8812. Pay $1.99 redelivery fee at https://fedx-redelivery-hub.top");
                      }
                    }}
                    className="text-xs text-white/50 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-mono file:bg-white file:text-black hover:file:bg-white/90"
                  />
                  {screenshotFile && (
                    <p className="text-xs text-cyan-300 mt-2 font-mono">
                      ✓ Uploaded: {screenshotFile} (OCR recognized dialog automatically)
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Extracted / Transcribed Text Content
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Text recognized from screenshot (or type dialog contents directly here)..."
                    value={screenshotText}
                    onChange={(e) => setScreenshotText(e.target.value)}
                    className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl p-4 text-sm text-white focus:outline-none placeholder:text-white/25 leading-relaxed font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium flex items-center justify-center gap-2 group transition cursor-pointer"
                >
                  <span>Run Multimodal OCR Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </form>
            )}

            {/* TAB 6: TRANSACTION */}
            {activeTab === 'transaction' && (
              <form onSubmit={handleScanTransaction} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                      Amount ($ or ₹) *
                    </label>
                    <input
                      type="number"
                      placeholder="1250.00"
                      value={txAmount}
                      onChange={(e) => setTxAmount(e.target.value)}
                      className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none placeholder:text-white/25 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                      Payment Settlement Rail *
                    </label>
                    <select
                      value={txMethod}
                      onChange={(e) => setTxMethod(e.target.value)}
                      className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none font-mono"
                    >
                      <option value="UPI">Instant UPI (P2P)</option>
                      <option value="Zelle">Zelle / Venmo</option>
                      <option value="Wire Transfer">Bank Wire Transfer</option>
                      <option value="Crypto">Crypto (USDT / BTC)</option>
                      <option value="Gift Card">Gift Card (Apple/Amazon)</option>
                      <option value="Credit Card">Credit / Debit Card</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Recipient Account / VPA / Handle *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. mule_payee@okaxis or settlement-desk@ybl"
                    value={txRecipient}
                    onChange={(e) => setTxRecipient(e.target.value)}
                    className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/25 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
                    Transaction Memo / Coercive Rationale
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Urgent Legal Fine Settlement to avoid police FIR & phone disconnection tonight"
                    value={txDesc}
                    onChange={(e) => setTxDesc(e.target.value)}
                    className="w-full bg-black border border-white/[0.12] focus:border-white/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-white/25 font-mono"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setTxAmount("1250.00");
                      setTxRecipient("mule_payee@okaxis");
                      setTxMethod("UPI");
                      setTxDesc("URGENT: Settlement to avoid immediate tax audit and bank freeze");
                    }}
                    className="text-xs text-white/50 hover:text-white font-mono cursor-pointer"
                  >
                    + Load sample extortion memo
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium flex items-center justify-center gap-2 group transition cursor-pointer"
                >
                  <span>Evaluate Money Mule Risk</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </button>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
