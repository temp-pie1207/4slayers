import React from 'react';
import { Layers, Search, Network, ShieldCheck } from 'lucide-react';

export default function ProductIntelligenceStrip() {
  const pillars = [
    {
      label: 'MULTIMODAL INPUT',
      code: 'SIG // 01',
      desc: 'Correlates raw SMS, URLs, VoIP callers, QR barcodes, and UPI handles simultaneously.',
      icon: Layers
    },
    {
      label: 'EXPLAINABLE ANALYSIS',
      code: 'ENG // 02',
      desc: 'Decomposes every risk score into transparent heuristic rules and evidence points.',
      icon: Search
    },
    {
      label: 'CONNECTED SIGNALS',
      code: 'DNA // 03',
      desc: 'Maps attacker infrastructure into cross-channel Scam DNA relationship clusters.',
      icon: Network
    },
    {
      label: 'ACTIONABLE PROTECTION',
      code: 'ACT // 04',
      desc: 'Delivers clear, prioritized intervention playbooks before credential compromise.',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="w-full border-y border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5DCCB] dark:divide-[#2E2820]">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.label} className="p-6 sm:p-7 flex flex-col justify-between group hover:bg-[#FBF8F0] dark:hover:bg-[#1C1813] transition">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] font-bold text-[#906727] dark:text-[#EAD6A0] tracking-widest">
                      {p.code}
                    </span>
                    <Icon className="w-4 h-4 text-[#C69A42]" />
                  </div>
                  <h3 className="font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-[#242019] dark:text-[#FBF8F0] mb-2">
                    {p.label}
                  </h3>
                  <p className="text-xs text-[#777064] dark:text-[#A8A095] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[9px] font-mono text-[#277653]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#277653]" />
                  <span>ONLINE // OPERATIONAL</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
