import React, { useState } from 'react';
import { PhoneCall, ShieldCheck, Ban, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Section E — Take action with confidence
 * Headline: Know what to do before you act.
 * Practical recommendations: independent verification, avoiding suspicious links,
 * contacting financial institutions via official channels, helpline reporting.
 */
export default function ActionPlaybookSection() {
  const [activeTab, setActiveTab] = useState(0);

  const actions = [
    {
      id: 'verify',
      step: 'Step 01',
      title: 'Independent Verification Protocol',
      icon: PhoneCall,
      summary: 'Never use phone numbers or web addresses provided within the incoming message.',
      details: [
        'Turn your physical payment card over and dial the official customer support telephone number printed on the back.',
        'Navigate directly to the verified institution URL by typing it into your browser address bar manually.',
        'Request explicit verbal verification of any pending account freeze or KYC alert with the bank supervisor.'
      ],
      impact: 'Eliminates 99.4% of social engineering redirection exploits'
    },
    {
      id: 'isolate',
      step: 'Step 02',
      title: 'Zero-Touch Digital Containment',
      icon: Ban,
      summary: 'Prevent payload execution and preserve forensic integrity.',
      details: [
        'Do not click, tap, or preview embedded hyperlinks, APK attachments, or dynamic QR codes.',
        'Capture a timestamped screen capture showing sender caller ID and full message text.',
        'Block the originating telephone number or messaging profile immediately within your device OS.'
      ],
      impact: 'Guarantees zero malware execution and credential theft'
    },
    {
      id: 'golden-hour',
      step: 'Step 03',
      title: '2-Hour Golden Hour Banking Escalation',
      icon: ShieldCheck,
      summary: 'If a payment or authorization was initiated, time is critical.',
      details: [
        'Immediately invoke the 2-hour Golden Hour fraud protocol with your bank to freeze recipient settlement.',
        'Request immediate temporary locking of UPI handles, debit cards, and net banking credentials.',
        'Document the official bank complaint reference number and dispute ticket timestamp.'
      ],
      impact: 'Maximizes fund recall rate before mule accounts cash out'
    },
    {
      id: 'report',
      step: 'Step 04',
      title: 'Official Helpline & Registry Reporting',
      icon: FileText,
      summary: 'Transmit verified threat telemetry directly to national cyber authorities.',
      details: [
        'India: Dial National Cyber Crime Helpline 1930 immediately or log complaint at cybercrime.gov.in.',
        'USA / Global: Submit pre-formatted forensic incident dossier to IC3.gov or local police department.',
        'One-click export from 4SLAYERS formats the entire IP, domain, and phone payload for legal submission.'
      ],
      impact: 'Coordinates law enforcement takedowns and mule account freezes'
    }
  ];

  const current = actions[activeTab];

  return (
    <section className="relative py-28 sm:py-36 bg-black text-white border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
            <span>Section 05 // Actionable Playbook</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.12]">
            Know what to do <br />
            <span className="text-white/50">before you act.</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-2xl">
            In moments of suspected fraud, hesitation and panic lead to costly errors. 
            4SLAYERS delivers deterministic, priority-ordered guidance so you stay in total control.
          </p>
        </div>

        {/* Interactive Playbook Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Action Step Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {actions.map((act, idx) => {
              const Icon = act.icon;
              const isSelected = activeTab === idx;

              return (
                <div
                  key={act.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white/[0.07] border-white/60 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                      : 'bg-black border-white/[0.08] text-white/50 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2 rounded-lg border mt-0.5 transition-colors ${
                      isSelected ? 'border-white/40 bg-white/10 text-white' : 'border-white/10 bg-white/[0.02] text-white/40'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                          {act.step}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-white mt-0.5">
                        {act.title}
                      </h4>
                      <p className="text-xs text-white/50 font-light mt-1">
                        {act.summary}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Step Deep Dive Showcase */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.12] rounded-2xl p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">
                    Execution Protocol
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mt-1">
                    {current.title}
                  </h3>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/20 bg-white/[0.04] text-white">
                  {current.step}
                </span>
              </div>

              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6">
                {current.summary}
              </p>

              <div className="space-y-3.5 mb-8">
                {current.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-black border border-white/[0.06]">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-black/60 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40 uppercase tracking-wider">Defensive Value</span>
                <span className="text-cyan-300">{current.impact}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] mt-6 flex items-center justify-between">
              <span className="text-xs text-white/40 font-mono">
                Real-Time Playbook Guidance
              </span>
              <Link
                to="/reports"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white hover:text-white/80 transition"
              >
                <span>Browse Community Playbooks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
