import React, { useState } from 'react';
import { MessageSquare, Globe, CreditCard, UserX, CheckCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

const RECOMMENDATIONS = [
  {
    id: 'messages',
    title: 'Suspicious Messages & Chat Demands',
    icon: MessageSquare,
    badge: 'COMMUNICATION DEFENSE',
    rule: 'Never click urgency links sent through SMS, WhatsApp, or Telegram.',
    rationale: 'Attackers manufacture artificial deadlines ("account suspended within 2 hours") to trigger biological stress reflexes that bypass rational verification.',
    actions: [
      'Do not tap hyperlinks or download unverified attachments.',
      'Check the alphanumeric sender header against official carrier whitelists.',
      'Open the official provider app or website independently to check your real account status.',
      'Forward the message to the national cyber fraud helpline (1930 / 7726).'
    ]
  },
  {
    id: 'urls',
    title: 'Suspicious URLs & Typosquatted Domains',
    icon: Globe,
    badge: 'ENDPOINT SANITATION',
    rule: 'Inspect the root domain rather than the subdomain or path.',
    rationale: 'Scammers embed trusted company names as subdomains (e.g. hdfc.bank-update-portal.xyz) while the actual domain is "bank-update-portal.xyz".',
    actions: [
      'Look at the characters immediately preceding the top-level domain (.com, .org, .xyz).',
      'Never input one-time passwords (OTPs) or PINs into any page reached via SMS or email.',
      'Be wary of newly registered domains with high entropy or unusual extensions.',
      'Use multi-factor authentication methods based on hardware security keys or authenticator apps.'
    ]
  },
  {
    id: 'payments',
    title: 'Unusual Payment Requests & QR Codes',
    icon: CreditCard,
    badge: 'TRANSACTION INTEGRITY',
    rule: 'Remember: You NEVER enter your UPI PIN to receive money.',
    rationale: 'A widespread scheme involves sellers on marketplaces being sent a QR code or payment request disguised as an "advance payment deposit" which is actually a debit collect request.',
    actions: [
      'Entering your UPI PIN or banking password always authorizes an outgoing transfer.',
      'Examine the payee virtual address (VPA) before approving any payment.',
      'Reject escrow requests from unverified third-party intermediaries.',
      'If scammed, contact your bank within 24 hours to initiate a golden-hour transaction freeze.'
    ]
  },
  {
    id: 'impersonation',
    title: 'Official Impersonation & Digital Arrests',
    icon: UserX,
    badge: 'LEGAL COERCION SHIELD',
    rule: 'Law enforcement and tax agencies never conduct trials or bail transfers via video call.',
    rationale: 'Syndicates pose as customs officers, CBI personnel, or telecommunications authorities claiming illegal narcotics were found in a package under your name, coercing wire transfers.',
    actions: [
      'There is no lawful procedure recognized as "Digital Arrest" conducted over Skype or WhatsApp.',
      'Disconnect immediately. Official agencies send physical legal summonses.',
      'Verify the claim by visiting your nearest physical police station in person.',
      'Do not disclose Aadhaar numbers, PAN cards, or asset details under panic pressure.'
    ]
  }
];

export default function SafetyRecommendationsSection() {
  const [expandedId, setExpandedId] = useState('messages');

  return (
    <section id="safety-recommendations" className="relative py-24 sm:py-32 bg-[#FBF8F0] dark:bg-[#0F0D0A] border-b border-[#E5DCCB] dark:border-[#2E2820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]">
              SECTION // 10
            </span>
            <span className="text-[#E5DCCB] dark:text-[#3D3528]">|</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
              SAFETY PLAYBOOK
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242019] dark:text-[#FBF8F0] mb-4">
            HOW TO RESPOND UNDER PRESSURE.
          </h2>
          <p className="text-sm sm:text-base text-[#777064] dark:text-[#A8A095] leading-relaxed">
            Practical, field-tested guidance explaining exactly what to do and why it works when encountering suspicious communications.
          </p>
        </div>

        {/* 4 Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RECOMMENDATIONS.map((rec) => {
            const Icon = rec.icon;
            const isExpanded = expandedId === rec.id;

            return (
              <div
                key={rec.id}
                className={`p-6 sm:p-7 rounded-2xl border transition duration-300 bg-white dark:bg-[#16130F] shadow-sm flex flex-col justify-between ${
                  isExpanded ? 'border-[#C69A42] ring-1 ring-[#C69A42]/30' : 'border-[#E5DCCB] dark:border-[#2E2820] hover:border-[#C69A42]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-[#EAD6A0]/20 dark:bg-[#C69A42]/10 text-[#906727] dark:text-[#EAD6A0] border border-[#C69A42]/30">
                      {rec.badge}
                    </span>
                    <div className="p-2 rounded-xl bg-[#FBF8F0] dark:bg-[#201C16] text-[#C69A42]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#242019] dark:text-[#FBF8F0] mb-2">
                    {rec.title}
                  </h3>

                  <div className="p-3 rounded-xl border border-[#C69A42]/30 bg-[#FBF8F0] dark:bg-[#12100E] mb-4">
                    <div className="text-[10px] font-mono uppercase text-[#906727] dark:text-[#EAD6A0] font-semibold mb-0.5">
                      Core Principle:
                    </div>
                    <div className="text-xs font-semibold text-[#242019] dark:text-[#FBF8F0]">
                      {rec.rule}
                    </div>
                  </div>

                  <p className="text-xs text-[#777064] dark:text-[#A8A095] leading-relaxed mb-4">
                    <strong className="text-[#242019] dark:text-[#FBF8F0]">The Rationale: </strong>
                    {rec.rationale}
                  </p>

                  {/* Actions Checklist */}
                  <div className="space-y-2 pt-2 border-t border-[#E5DCCB] dark:border-[#2E2820]">
                    <div className="text-[10px] font-mono uppercase text-[#777064] tracking-wider font-semibold">
                      Action Checklist:
                    </div>
                    {rec.actions.map((act, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#242019] dark:text-[#FBF8F0]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#277653] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
