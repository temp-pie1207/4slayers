import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, Eye, Code2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExplainableAISection() {
  const [activeTab, setActiveTab] = useState('simple');

  return (
    <section id="explainable-ai-section" className="relative py-24 sm:py-32 bg-[#FBF8F0] dark:bg-[#0F0D0A] border-b border-[#E5DCCB] dark:border-[#2E2820]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]">
              SECTION // 07
            </span>
            <span className="text-[#E5DCCB] dark:text-[#3D3528]">|</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
              EXPLAINABLE INTELLIGENCE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242019] dark:text-[#FBF8F0] mb-4">
            NOT JUST A SCORE. THE REASON BEHIND IT.
          </h2>
          <p className="text-sm sm:text-base text-[#777064] dark:text-[#A8A095] leading-relaxed">
            Black-box scores create confusion and false confidence. 4Slayers deconstructs every risk calculation into transparent evidence, matched heuristic rules, known attacker playbook moves, and what remains unknown.
          </p>
        </div>

        {/* Explainability Sample Report Card */}
        <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#181511] shadow-xl overflow-hidden">
          
          {/* Card Top Strip */}
          <div className="p-6 border-b border-[#E5DCCB] dark:border-[#2E2820] bg-[#F2EADB]/60 dark:bg-[#14110D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#B42332]/10 border border-[#B42332]/30 flex items-center justify-center text-[#B42332] font-display font-bold text-lg">
                94
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#B42332]/10 text-[#B42332] border border-[#B42332]/30">
                    CRITICAL RISK
                  </span>
                  <span className="text-[10px] font-mono text-[#777064] dark:text-[#9E9688]">
                    [ SYNTHETIC CASE: DEMO-KYC-01 ]
                  </span>
                </div>
                <h3 className="font-display font-semibold text-base text-[#242019] dark:text-[#FBF8F0] mt-0.5">
                  HDFC Bank Impersonation & NetBanking Hijack
                </h3>
              </div>
            </div>

            {/* Toggle Plain English vs Technical Decomposition */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#E5DCCB]/60 dark:bg-[#201C16] border border-[#E5DCCB] dark:border-[#332B20] text-xs font-mono">
              <button
                onClick={() => setActiveTab('simple')}
                className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                  activeTab === 'simple'
                    ? 'bg-white dark:bg-[#2E2820] text-[#242019] dark:text-[#FBF8F0] shadow-xs'
                    : 'text-[#777064] dark:text-[#A8A095]'
                }`}
              >
                Plain English
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                  activeTab === 'technical'
                    ? 'bg-white dark:bg-[#2E2820] text-[#242019] dark:text-[#FBF8F0] shadow-xs'
                    : 'text-[#777064] dark:text-[#A8A095]'
                }`}
              >
                Forensic Analysis
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Tab 1: Plain English or Tab 2: Technical with Smooth Transition */}
            <AnimatePresence mode="wait">
              {activeTab === 'simple' ? (
                <motion.div
                  key="simple"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
                    Why this was flagged in plain terms:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Fake Bank Identity', text: 'This message pretends to be from HDFC Bank to manipulate your trust and create false credibility.' },
                      { title: 'Artificial Panic Trap', text: 'It claims your account will be suspended today to panic you into acting without verifying through official channels.' },
                      { title: 'Spoofed Phishing Link', text: 'The website link "hdfc-bank-verify-kyc.xyz" is not registered by HDFC Bank; it is a copycat website built to steal netbanking passwords.' },
                      { title: 'Banking Golden Rule', text: 'Real authorized banks will NEVER demand that you update your KYC by clicking an unsolicited link sent via SMS.' }
                    ].map((item, idx) => (
                      <div key={idx} className="card-hover-lift p-4 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/60 dark:bg-[#14110D]/60 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#B42332]/10 text-[#B42332] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                          {idx + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-xs text-[#242019] dark:text-[#FBF8F0]">{item.title}</h5>
                          <p className="text-xs text-[#777064] dark:text-[#A8A095] mt-1 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="technical"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
                    Matched Heuristic Rules & Telemetry Signatures:
                  </h4>
                  <div className="space-y-2.5 font-mono text-xs">
                    {[
                      { rule: 'RULE_SPF_DKIM_DIVERGENCE', weight: '+35 pts', reason: 'SMS origin header failed verified DLT banking registration matrix.' },
                      { rule: 'RULE_TYPOSQUAT_HIGH_ENTROPY', weight: '+30 pts', reason: 'Domain entropy score 4.21 with synthetic keywords ("verify-kyc") on disposable .xyz TLD.' },
                      { rule: 'RULE_CREDENTIAL_SOLICITATION', weight: '+25 pts', reason: 'Login intent and OTP harvest signature detected on destination payload.' },
                      { rule: 'RULE_SYNDICATE_42_CORRELATION', weight: '+15 pts', reason: 'Mule account routing matches 38 active community incident reports.' }
                    ].map((r, idx) => (
                      <div key={idx} className="card-hover-lift p-3 rounded-lg border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/60 dark:bg-[#12100E] flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 text-[#C69A42]" />
                          <span className="font-bold text-[#242019] dark:text-[#FBF8F0]">{r.rule}</span>
                          <span className="text-[#777064] dark:text-[#9E9688] hidden sm:inline">— {r.reason}</span>
                        </div>
                        <span className="text-[#B42332] font-bold shrink-0">{r.weight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unknown / Unavailable Information Notice (Ethical AI) */}
            <div className="p-4 rounded-xl border border-[#A86C13]/30 bg-[#A86C13]/10 flex items-start gap-3 text-xs">
              <HelpCircle className="w-4 h-4 text-[#A86C13] shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold uppercase text-[#A86C13] block mb-0.5">
                  Transparent Limitations & Unknown Telemetry:
                </span>
                <p className="text-[#777064] dark:text-[#B3AAA0] leading-relaxed">
                  The physical telecom device identity of the sender cannot be verified without carrier law enforcement subpoena. While destination host is confirmed phishing, dynamic fast-flux DNS may redirect users on cellular connections.
                </p>
              </div>
            </div>

            {/* Immediate Action Recommendations */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#242019] dark:text-[#FBF8F0] mb-3">
                Action Playbook Recommended Steps:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { step: '01', title: 'Do Not Click Link', desc: 'Do not tap the URL or reply with personal details.' },
                  { step: '02', title: 'Report to Bank', desc: 'Forward SMS to official banking cyber cell (7726 / 1930).' },
                  { step: '03', title: 'Verify Independently', desc: 'Log into official mobile banking app directly from official store.' }
                ].map((act) => (
                  <div key={act.step} className="p-3.5 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F]">
                    <div className="font-mono text-[10px] font-bold text-[#C69A42] mb-1">STEP {act.step}</div>
                    <div className="text-xs font-semibold text-[#242019] dark:text-[#FBF8F0]">{act.title}</div>
                    <div className="text-[11px] text-[#777064] dark:text-[#9E9688] mt-1">{act.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
