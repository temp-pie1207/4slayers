import React, { useState } from 'react';
import { Database, Cpu, Search, Network, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const STAGES = [
  {
    step: '01',
    name: 'COLLECT',
    title: 'Multimodal Ingestion',
    icon: Database,
    desc: 'Accepts raw SMS, chat logs, suspicious links, spoofed phone numbers, QR codes, or payment handles without friction.'
  },
  {
    step: '02',
    name: 'EXTRACT',
    title: 'Forensic Parsing',
    icon: Cpu,
    desc: 'Extracts URIs, domain WHOIS entropy, sender CLI routing, UPI handles, psychological urgency markers, and crypto addresses.'
  },
  {
    step: '03',
    name: 'ANALYZE',
    title: 'Rule & Heuristic Engine',
    icon: Search,
    desc: 'Executes transparent explainable baseline checks for credential solicitation, brand typosquatting, and OTP harvesting traps.'
  },
  {
    step: '04',
    name: 'CONNECT',
    title: 'Scam DNA Graph',
    icon: Network,
    desc: 'Correlates the isolated inputs against known global fraud syndicates, mule account networks, and historical incident patterns.'
  },
  {
    step: '05',
    name: 'PROTECT',
    title: 'Actionable Safety Playbook',
    icon: ShieldCheck,
    desc: 'Delivers clear, jargon-free verdicts with exact prioritized next moves to neutralize the attacker before financial loss occurs.'
  }
];

export default function ProcessDiagramSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-[#F2EADB] dark:bg-[#12100E] border-b border-[#E5DCCB] dark:border-[#2E2820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]">
              SECTION // 09
            </span>
            <span className="text-[#E5DCCB] dark:text-[#3D3528]">|</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
              PIPELINE ARCHITECTURE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242019] dark:text-[#FBF8F0] mb-4">
            HOW 4SLAYERS STOPS THREATS.
          </h2>
          <p className="text-sm sm:text-base text-[#777064] dark:text-[#A8A095] leading-relaxed">
            From raw inbound alert to neutralizing action in milliseconds. A transparent five-stage pipeline designed for digital trust.
          </p>
        </div>

        {/* 5-Stage Stepper Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STAGES.map((st, idx) => {
            const Icon = st.icon;
            const isSelected = activeStage === idx;

            return (
              <div
                key={st.step}
                onClick={() => setActiveStage(idx)}
                className={`relative p-5 rounded-2xl border transition duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#C69A42] bg-white dark:bg-[#1C1813] shadow-lg ring-2 ring-[#C69A42]/20'
                    : 'border-[#E5DCCB] dark:border-[#2E2820] bg-white/60 dark:bg-[#16130F]/60 hover:border-[#C69A42]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#C69A42]">
                      {st.step}
                    </span>
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#C69A42]/15 text-[#906727] dark:text-[#EAD6A0]' : 'bg-[#F2EADB] dark:bg-[#201C16] text-[#777064]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#906727] dark:text-[#EAD6A0] font-semibold block mb-1">
                    {st.name}
                  </span>
                  <h3 className="font-display font-bold text-sm text-[#242019] dark:text-[#FBF8F0] mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#777064] dark:text-[#A8A095] leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5DCCB]/60 dark:border-[#2E2820] flex items-center justify-between text-[10px] font-mono text-[#777064]">
                  <span>Stage {idx + 1} of 5</span>
                  {idx < 4 && <span className="text-[#C69A42]">→</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Forensic Detail Box */}
        <div className="mt-8 p-6 rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#181511] shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#906727] to-[#C69A42] flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="font-display font-bold text-base">{STAGES[activeStage].step}</span>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase text-[#906727] dark:text-[#EAD6A0]">
                ACTIVE PIPELINE INSPECTION // {STAGES[activeStage].name}
              </div>
              <h4 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
                {STAGES[activeStage].title}
              </h4>
            </div>
          </div>

          <div className="text-xs font-mono text-[#777064] dark:text-[#A8A095] max-w-xl">
            {STAGES[activeStage].desc}
          </div>
        </div>

      </div>
    </section>
  );
}
