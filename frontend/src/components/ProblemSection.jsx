import React from 'react';
import { EyeOff, Shuffle, Clock, GitMerge, ArrowRight, ShieldX, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProblemSection() {
  const problems = [
    {
      number: '01',
      title: 'Harmless in Isolation',
      icon: EyeOff,
      headline: 'A generic SMS or familiar-looking short link rarely triggers suspicion.',
      body: 'Standard anti-phishing tools evaluate elements independently. An SMS containing "Please verify your account" appears benign until combined with an unauthorized telecom header and a typosquatted registrar.',
      visualTag: 'Vector: Single-Channel SMS',
      highlightBadge: 'Individual Heuristics Fail'
    },
    {
      number: '02',
      title: 'Vector Convergence',
      icon: Shuffle,
      headline: 'Attackers deliberately hop across multiple channels to confuse detection.',
      body: 'Modern campaigns initiate on SMS, redirect victims to WhatsApp for rapport, shift to Telegram for task assignments, and finalize extortion via UPI or crypto. Single-channel scanners miss the broader sequence.',
      visualTag: 'Sequence: SMS → WhatsApp → Telegram → UPI',
      highlightBadge: 'Multi-Hop Pivot Trap'
    },
    {
      number: '03',
      title: 'Post-Loss Realization',
      icon: Clock,
      headline: 'Detection currently happens hours after money or credentials leave the account.',
      body: 'Victims only realize fraud when banking notifications alert them to emptied savings. Traditional reporting is purely post-mortem forensics rather than preventative pre-execution interception.',
      visualTag: 'Latency Gap: 4-12 Hours Average',
      highlightBadge: 'Pre-Execution Blind Spot'
    },
    {
      number: '04',
      title: 'Fragmented Defenses',
      icon: GitMerge,
      headline: 'Bank filters do not talk to telecom gateways or marketplace escrows.',
      body: 'Telecom carriers block text spam, banks flag strange wire transfers, and browsers check URLs. None of these systems connect the dots into an explainable Scam DNA relationship graph.',
      visualTag: 'Data Silos: Bank ≠ Carrier ≠ Browser',
      highlightBadge: 'Disconnected Intelligence'
    }
  ];

  return (
    <section id="problem-section" className="relative py-24 sm:py-32 bg-[#FBF8F0] dark:bg-[#0F0D0A] border-b border-[#E5DCCB] dark:border-[#2E2820] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start max-w-3xl mb-16"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-[#906727] dark:text-[#EAD6A0]">
              SECTION // 03
            </span>
            <span className="text-[#E5DCCB] dark:text-[#3D3528]">|</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#777064] dark:text-[#9E9688]">
              THE FRAGMENTATION CRISIS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#242019] dark:text-[#FBF8F0] mb-4">
            A SCAM IS NEVER JUST ONE SIGNAL.
          </h2>
          <p className="text-sm sm:text-base text-[#777064] dark:text-[#A8A095] leading-relaxed">
            The fundamental flaw of digital fraud protection is channel fragmentation. Attackers exploit the blind spots between isolated defenses, hopping between mediums before legacy scanners even alert.
          </p>
        </motion.div>

        {/* 4 Large Editorial Cards with Micro-Visuals & Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card-hover-lift p-8 sm:p-10 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm flex flex-col justify-between group hover:border-[#C69A42]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-bold text-2xl sm:text-3xl text-[#E5DCCB] dark:text-[#332B20] group-hover:text-[#C69A42] transition-colors duration-300">
                      {p.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#FBF8F0] dark:bg-[#201C16] text-[#C69A42] group-hover:scale-110 group-hover:bg-[#C69A42]/10 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#906727] dark:text-[#EAD6A0]">
                      {p.title}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#B42332]/10 text-[#B42332] border border-[#B42332]/20">
                      {p.highlightBadge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#242019] dark:text-[#FBF8F0] mb-3 leading-snug group-hover:text-[#C69A42] transition-colors">
                    {p.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#777064] dark:text-[#A8A095] leading-relaxed mb-6">
                    {p.body}
                  </p>

                  {/* Micro Visual Telemetry Box */}
                  <div className="p-3 rounded-xl bg-[#FBF8F0]/80 dark:bg-[#12100E] border border-[#E5DCCB] dark:border-[#2E2820] font-mono text-[11px] flex items-center justify-between text-[#777064] dark:text-[#A8A095]">
                    <span className="text-[#906727] dark:text-[#EAD6A0] font-semibold">{p.visualTag}</span>
                    <span className="text-[#B42332] font-semibold">Vulnerable</span>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E5DCCB]/60 dark:border-[#2E2820] flex items-center justify-between text-[11px] font-mono text-[#777064]">
                  <span>Vulnerability Vector: Uncorrelated Medium</span>
                  <a href="/app/scan" className="text-[#C69A42] hover:underline flex items-center gap-1 font-semibold group/link">
                    <span>4Slayers Solves This</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}