import React from 'react';
import { ShieldCheck, EyeOff, Trash2, AlertCircle, FileCheck, Lock } from 'lucide-react';

export default function PrivacyTrustSection() {
  const policies = [
    {
      title: 'What Data Is Processed',
      icon: EyeOff,
      desc: 'When you submit a message, link, or phone number, our pipeline parses grammatical patterns, domain WHOIS records, telephone routing formats, and financial identifiers. Raw personal identifying details are sanitized.'
    },
    {
      title: 'What Information Is Retained',
      icon: Lock,
      desc: 'Only anonymous threat signatures (e.g. malicious URLs, known mule VPAs, and typosquatted domains) are indexed to update our global collective intelligence network. Your personal identity is never coupled with scanned payloads.'
    },
    {
      title: 'How Uploaded Files Are Handled',
      icon: FileCheck,
      desc: 'QR code images and screenshot attachments are parsed entirely in ephemeral volatile memory to extract text and barcodes. The raw image binary is never saved or used for AI model retraining.'
    },
    {
      title: 'Full User Control & Data Deletion',
      icon: Trash2,
      desc: 'Under our strict compliance architecture, you maintain the permanent right to export your scan history as structured JSON or execute a single-click immediate purge of all account records via your Settings page.'
    },
    {
      title: 'No Guarantees & Honest Limitations',
      icon: AlertCircle,
      desc: 'Cybercriminals continuously engineer novel obfuscation tactics. No detection system can guarantee 100% prevention of every zero-day threat. 4Slayers provides an explainable evidence baseline to empower human discernment.'
    }
  ];

  return (
    <section id="privacy-section" className="relative py-24 sm:py-32 bg-[#F2EADB] dark:bg-[#12100E] border-b border-[#E5DCCB] dark:border-[#2E2820]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]">
              SECTION // 11
            </span>
            <span className="text-[#E5DCCB] dark:text-[#3D3528]">|</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
              TRANSPARENCY & DATA SOVEREIGNTY
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242019] dark:text-[#FBF8F0] mb-4">
            PRIVACY BUILT INTO THE ARCHITECTURE.
          </h2>
          <p className="text-sm sm:text-base text-[#777064] dark:text-[#A8A095] leading-relaxed">
            We reject the surveillance business model. We protect people by analyzing attack signals, not harvesting user lives.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((p, idx) => {
            const Icon = p.icon;
            const isFullSpan = idx === 4;

            return (
              <div
                key={p.title}
                className={`p-6 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#181511] shadow-sm flex flex-col justify-between ${
                  isFullSpan ? 'md:col-span-2 lg:col-span-2 border-[#C69A42]/40 bg-[#EAD6A0]/10 dark:bg-[#C69A42]/5' : ''
                }`}
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#FBF8F0] dark:bg-[#201C16] border border-[#E5DCCB] dark:border-[#332B20] flex items-center justify-center text-[#C69A42] mb-4">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#242019] dark:text-[#FBF8F0] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#777064] dark:text-[#A8A095] leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5DCCB]/60 dark:border-[#2E2820] flex items-center gap-1.5 text-[10px] font-mono text-[#906727] dark:text-[#EAD6A0]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Architectural Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
