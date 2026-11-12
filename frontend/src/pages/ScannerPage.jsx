import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  MessageSquare, Globe, Phone, QrCode, FileSearch, CreditCard, 
  ArrowUpRight, Upload, Sparkles, AlertCircle, Loader2, Layers,
  RefreshCw, CheckCircle2, ShieldAlert, X
} from 'lucide-react';
import { api } from '../api';
import { motion, AnimatePresence } from 'motion/react';

const PRESETS = [
  {
    type: 'message',
    name: 'Bank KYC Threat',
    text: 'Dear HDFC Customer, your NetBanking access is suspended today due to pending KYC. Click http://hdfc-bank-verify-kyc.xyz/update to prevent block immediately.',
    secondary: '+91-98210-99412'
  },
  {
    type: 'url',
    name: 'PayPal Phishing',
    text: 'http://secure-paypal-login-verify.top/account-protection',
    secondary: 'Suspicious email link'
  },
  {
    type: 'phone',
    name: 'Police Digital Arrest',
    text: '+91-11-2309-8800',
    secondary: 'CBI Cyber Crime Cell'
  },
  {
    type: 'qr',
    name: 'Reverse UPI Quishing',
    text: 'upi://pay?pa=mule.recovery@okhdfcbank&pn=RefundVerification&am=14500',
    secondary: 'Marketplace advance deposit'
  },
  {
    type: 'transaction',
    name: 'Extortion Demand',
    text: '950.00',
    secondary: 'crypto_escrow_bc1qxy9',
    method: 'Cryptocurrency / Wire',
    desc: 'Emergency bail settlement payment requested on video call'
  },
  {
    type: 'multimodal',
    name: 'Multi-Vector Syndicate',
    text: 'URGENT: Legal notice issued against your mobile number +91-98765-43210. Visit http://cbi-investigation-case.online and transfer bail security of $1,200 to clearance_officer@axis to avoid immediate arrest.',
    url: 'http://cbi-investigation-case.online',
    phone: '+91-11-2309-8800',
    recipient: 'clearance_officer@axis',
    amount: '1200'
  }
];

export default function ScannerPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'multimodal';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [scanStage, setScanStage] = useState('');
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
  const [qrPreview, setQrPreview] = useState(null);

  const [txAmount, setTxAmount] = useState('');
  const [txRecipient, setTxRecipient] = useState('');
  const [txMethod, setTxMethod] = useState('UPI');
  const [txDesc, setTxDesc] = useState('');

  // Multimodal unified states
  const [multiMessage, setMultiMessage] = useState(PRESETS[5].text);
  const [multiUrl, setMultiUrl] = useState(PRESETS[5].url);
  const [multiPhone, setMultiPhone] = useState(PRESETS[5].phone);
  const [multiRecipient, setMultiRecipient] = useState(PRESETS[5].recipient);
  const [multiAmount, setMultiAmount] = useState(PRESETS[5].amount);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['multimodal', 'message', 'url', 'phone', 'qr', 'transaction'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
    setError('');
  };

  const handleApplyPreset = (preset) => {
    setActiveTab(preset.type);
    setSearchParams({ tab: preset.type });
    setError('');

    if (preset.type === 'message') {
      setMessageText(preset.text);
      setSenderInfo(preset.secondary);
    } else if (preset.type === 'url') {
      setUrlInput(preset.text);
      setUrlContext(preset.secondary);
    } else if (preset.type === 'phone') {
      setPhoneNumber(preset.text);
      setCallerName(preset.secondary);
    } else if (preset.type === 'qr') {
      setQrText(preset.text);
    } else if (preset.type === 'transaction') {
      setTxAmount(preset.text);
      setTxRecipient(preset.secondary);
      setTxMethod(preset.method || 'UPI');
      setTxDesc(preset.desc || '');
    } else if (preset.type === 'multimodal') {
      setMultiMessage(preset.text);
      setMultiUrl(preset.url || '');
      setMultiPhone(preset.phone || '');
      setMultiRecipient(preset.recipient || '');
      setMultiAmount(preset.amount || '');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setQrFile(file);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setQrPreview(uploadEvent.target?.result);
      if (!qrText) {
        setQrText('upi://pay?pa=merchant_refund_escrow@ybl&pn=ScannedQR_Payload&am=4999');
      }
    };
    reader.readAsDataURL(file);
  };

  const executeStages = async () => {
    setLoading(true);
    setScanStage('EXTRACTING SIGNALS');
    await new Promise((r) => setTimeout(r, 380));
    setScanStage('MATCHING RULES');
    await new Promise((r) => setTimeout(r, 420));
    setScanStage('CONNECTING EVIDENCE');
    await new Promise((r) => setTimeout(r, 380));
    setScanStage('GENERATING REPORT');
    await new Promise((r) => setTimeout(r, 300));
  };

  const handleScan = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let res;
      if (activeTab === 'multimodal') {
        if (!multiMessage && !multiUrl && !multiPhone && !multiRecipient) {
          setError('Please provide at least one threat vector to analyze.');
          return;
        }
        await executeStages();
        res = await api.scanMultimodal({
          message: multiMessage || null,
          url: multiUrl || null,
          phone: multiPhone || null,
          payment_recipient: multiRecipient || null,
          amount: multiAmount ? parseFloat(multiAmount) : null
        });
      } else if (activeTab === 'message') {
        if (!messageText.trim()) {
          setError('Please enter a message to scan.');
          return;
        }
        await executeStages();
        res = await api.scanMessage(messageText, senderInfo || null);
      } else if (activeTab === 'url') {
        if (!urlInput.trim()) {
          setError('Please enter a URL or website address.');
          return;
        }
        await executeStages();
        res = await api.scanURL(urlInput, urlContext || null);
      } else if (activeTab === 'phone') {
        if (!phoneNumber.trim()) {
          setError('Please enter a phone number.');
          return;
        }
        await executeStages();
        res = await api.scanPhone(phoneNumber, callerName || null);
      } else if (activeTab === 'qr') {
        if (!qrText.trim() && !qrPreview) {
          setError('Please provide a QR barcode image or decoded payload.');
          return;
        }
        await executeStages();
        res = await api.scanQR(qrText || null, qrPreview || null);
      } else if (activeTab === 'transaction') {
        if (!txAmount || !txRecipient) {
          setError('Please provide amount and recipient identifier.');
          return;
        }
        await executeStages();
        res = await api.scanTransaction(txAmount, txRecipient, txMethod, txDesc || null);
      }

      if (res && res.id) {
        navigate(`/app/scans/${res.id}`, { state: { scanData: res } });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Scan analysis failed. Please verify inputs.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'multimodal', label: 'Multimodal (Combined)', icon: Layers, badge: 'RECOMMENDED' },
    { id: 'message', label: 'SMS & Chat', icon: MessageSquare },
    { id: 'url', label: 'URL / Domain', icon: Globe },
    { id: 'phone', label: 'Phone / Caller', icon: Phone },
    { id: 'qr', label: 'QR & Quishing', icon: QrCode },
    { id: 'transaction', label: 'Payment & Mules', icon: CreditCard },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#906727] dark:text-[#EAD6A0]">
              SENTINEL SCANNER ENGINE // V2.4
            </span>
            <span className="px-2 py-0.2 rounded-full font-mono text-[9px] bg-[#277653]/10 text-[#277653] font-semibold border border-[#277653]/30">
              READY
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
            Multi-Signal Threat Investigation
          </h1>
          <p className="text-xs sm:text-sm text-[#777064] dark:text-[#A8A095] mt-1">
            Submit isolated indicators or combine multiple channels for cross-vector correlation.
          </p>
        </div>

        {/* Real Presets Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] uppercase text-[#777064] dark:text-[#9E9688]">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="px-2.5 py-1 rounded text-xs font-mono font-medium border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#1C1813] text-[#242019] dark:text-[#FBF8F0] hover:border-[#C69A42] transition cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scanner Container */}
      <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#16130F] shadow-lg overflow-hidden">
        
        {/* Vector Mode Tabs */}
        <div className="flex items-center border-b border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0] dark:bg-[#12100E] px-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 py-3.5 px-4 text-xs font-semibold uppercase tracking-wider transition border-b-2 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'border-[#C69A42] text-[#906727] dark:text-[#EAD6A0] bg-white dark:bg-[#16130F]'
                    : 'border-transparent text-[#777064] dark:text-[#9E9688] hover:text-[#242019] dark:hover:text-[#FBF8F0]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#C69A42]/15 text-[#906727] dark:text-[#EAD6A0]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Input Form Body */}
        <form onSubmit={handleScan} className="p-6 sm:p-8 space-y-6">
          
          {/* TAB: MULTIMODAL COMBINED */}
          {activeTab === 'multimodal' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-[#C69A42]/30 bg-[#EAD6A0]/10 dark:bg-[#C69A42]/5 text-xs text-[#906727] dark:text-[#EAD6A0]">
                <strong>Cross-Vector Synergy Active:</strong> Entering multiple signals allows 4Slayers to detect correlated syndicates spanning communication, endpoint hosting, and cash siphoning.
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                  1. Message Content or Transcript
                </label>
                <textarea
                  rows={3}
                  value={multiMessage}
                  onChange={(e) => setMultiMessage(e.target.value)}
                  placeholder="Paste SMS, WhatsApp, or email content..."
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 p-3 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                    2. Embedded Link or URL
                  </label>
                  <input
                    type="text"
                    value={multiUrl}
                    onChange={(e) => setMultiUrl(e.target.value)}
                    placeholder="e.g. http://cbi-investigation-case.online"
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                    3. Caller ID or Sender Phone
                  </label>
                  <input
                    type="text"
                    value={multiPhone}
                    onChange={(e) => setMultiPhone(e.target.value)}
                    placeholder="e.g. +91-11-2309-8800"
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                    4. Payment Recipient / VPA / Wallet
                  </label>
                  <input
                    type="text"
                    value={multiRecipient}
                    onChange={(e) => setMultiRecipient(e.target.value)}
                    placeholder="e.g. clearance_officer@axis or TRC20 address"
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                    5. Demanded Amount ($)
                  </label>
                  <input
                    type="number"
                    value={multiAmount}
                    onChange={(e) => setMultiAmount(e.target.value)}
                    placeholder="e.g. 1200"
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: MESSAGE ONLY */}
          {activeTab === 'message' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                  Message Content or Chat Transcript
                </label>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Paste message contents..."
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 p-3 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                  Sender Header or Phone Number (Optional)
                </label>
                <input
                  type="text"
                  value={senderInfo}
                  onChange={(e) => setSenderInfo(e.target.value)}
                  placeholder="e.g. +91-98210-99412 or AD-HDFCBK"
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
            </div>
          )}

          {/* TAB: URL ONLY */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                  Target URL or Domain
                </label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="e.g. http://hdfc-bank-verify-kyc.xyz/login"
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                  Context / How did you receive it? (Optional)
                </label>
                <input
                  type="text"
                  value={urlContext}
                  onChange={(e) => setUrlContext(e.target.value)}
                  placeholder="e.g. Arrived via urgent SMS claiming KYC failure"
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
            </div>
          )}

          {/* TAB: PHONE ONLY */}
          {activeTab === 'phone' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                  Incoming Caller Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="e.g. +91-11-2309-8800 or +1-800-FAKE-FEDEX"
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                  Stated Caller Identity / Department (Optional)
                </label>
                <input
                  type="text"
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  placeholder="e.g. Claimed to be Customs / Police Officer"
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
            </div>
          )}

          {/* TAB: QR ONLY */}
          {activeTab === 'qr' && (
            <div className="space-y-4">
              {/* Drag and Drop Box */}
              <div className="border-2 border-dashed border-[#E5DCCB] dark:border-[#332B20] rounded-xl p-6 text-center hover:border-[#C69A42] transition">
                <input
                  type="file"
                  id="qr-file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="qr-file" className="cursor-pointer flex flex-col items-center">
                  {qrPreview ? (
                    <div className="relative mb-2">
                      <img src={qrPreview} alt="QR Preview" className="w-24 h-24 object-contain rounded-lg border border-[#C69A42]" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setQrPreview(null);
                          setQrFile(null);
                        }}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-[#B42332] text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#C69A42]/10 text-[#C69A42] flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                  )}
                  <span className="text-xs font-medium text-[#242019] dark:text-[#FBF8F0]">
                    {qrFile ? qrFile.name : 'Click to select or drag and drop QR barcode image'}
                  </span>
                  <span className="text-[10px] text-[#777064] dark:text-[#9E9688] mt-1">
                    PNG, JPG, WEBP up to 5MB (Parsed in ephemeral memory)
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                  Or Paste Raw Decoded QR String / URI
                </label>
                <input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  placeholder="e.g. upi://pay?pa=mule.recovery@okhdfcbank&am=14500"
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
            </div>
          )}

          {/* TAB: TRANSACTION ONLY */}
          {activeTab === 'transaction' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                    Amount Demanded ($)
                  </label>
                  <input
                    type="number"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    placeholder="e.g. 500.00"
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                    Payment Method
                  </label>
                  <select
                    value={txMethod}
                    onChange={(e) => setTxMethod(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                  >
                    <option value="UPI">UPI / Real-Time Bank Transfer</option>
                    <option value="Wire">International Wire / SWIFT</option>
                    <option value="Crypto">Cryptocurrency (USDT/BTC/ETH)</option>
                    <option value="GiftCard">Gift Card / Voucher Code</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] dark:text-[#9E9688] mb-1.5">
                  Recipient VPA / Account Identifier / Crypto Address
                </label>
                <input
                  type="text"
                  value={txRecipient}
                  onChange={(e) => setTxRecipient(e.target.value)}
                  placeholder="e.g. escrow_clearance@okhdfcbank or 0x71c...48fa"
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-xl border border-[#B42332]/30 bg-[#B42332]/10 text-[#B42332] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-4 border-t border-[#E5DCCB] dark:border-[#2E2820] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-mono text-[#777064] dark:text-[#9E9688]">
              Heuristics: Urgency, Typosquatting, Mule Verification, Known Syndicates
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setMessageText('');
                  setUrlInput('');
                  setPhoneNumber('');
                  setQrText('');
                  setQrPreview(null);
                  setTxAmount('');
                  setTxRecipient('');
                  setMultiMessage('');
                  setMultiUrl('');
                  setMultiPhone('');
                  setMultiRecipient('');
                  setMultiAmount('');
                }}
                className="px-4 py-2.5 rounded-xl border border-[#E5DCCB] dark:border-[#332B20] text-xs font-medium text-[#777064] dark:text-[#A8A095] hover:text-[#242019] transition"
              >
                Clear Inputs
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-xl btn-gold-shimmer text-xs uppercase tracking-wider font-bold border border-[#C69A42] disabled:opacity-50 transition shadow-md hover:shadow-xl cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{scanStage}...</span>
                  </>
                ) : (
                  <>
                    <span>Execute Threat Scan</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>

    </div>
  );
}
