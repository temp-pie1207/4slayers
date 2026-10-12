import React from 'react';
import { PhoneCall, Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.08] text-white/50 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-6 h-6 flex items-center justify-center text-white">
                <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 stroke-current">
                  <ellipse cx="16" cy="16" rx="13.5" ry="5.2" transform="rotate(-28 16 16)" strokeWidth="1.1" strokeOpacity="0.75" />
                  <path d="M16 4.5L24 8V16C24 21.2 16 26.5 16 26.5C16 26.5 8 21.2 8 16V8L16 4.5Z" strokeWidth="1.25" />
                  <circle cx="16" cy="16" r="1.5" fill="white" />
                </svg>
              </div>
              <span className="text-white font-medium text-sm tracking-[0.24em] uppercase font-sans">
                4SLAYERS
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
                SENTINEL AI
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/50 max-w-md font-light leading-relaxed mb-6">
              A cinematic AI cybersecurity platform engineered to detect multi-channel deception before compromise occurs. 
              Fusing text, VoIP telephony, phishing hosts, QR traps, and transaction endpoints into explainable intelligence.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-white/50 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span>SCAN → ANALYZE → CONNECT → EXPLAIN → ACT</span>
            </div>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60 mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50 font-light">
              <li>
                <Link to="/scan" className="hover:text-white transition flex items-center gap-1">
                  <span>Universal Threat Scanner</span>
                  <span className="text-[10px]">↗</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Threat Operations Console
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white transition">
                  Forensic Scan History
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-white transition">
                  Community Scam Registry
                </Link>
              </li>
              <li>
                <Link to="/intelligence" className="hover:text-white transition">
                  Scam DNA Intelligence Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Cyber Helplines */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/60 mb-4">
              Emergency Hotlines
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center gap-1.5 font-medium text-white mb-1">
                  <PhoneCall className="w-3.5 h-3.5 text-white/70" />
                  National Cyber Crime (India)
                </div>
                <div className="text-base font-light font-mono text-white">1930</div>
                <p className="text-[10px] text-white/40 mt-0.5">Report within 2-hour Golden Hour window</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center gap-1.5 font-medium text-white mb-1">
                  <Globe className="w-3.5 h-3.5 text-white/70" />
                  Global Reporting
                </div>
                <p className="text-[11px] text-white/60 font-mono">USA: ic3.gov | UK: actionfraud.police.uk</p>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
          <p>© {new Date().getFullYear()} 4SLAYERS SENTINEL AI. Engineered for proactive security.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Engines Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
