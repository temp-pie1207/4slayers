import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowUpRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#0D0B09] text-[#242019] dark:text-[#FBF8F0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E5DCCB] dark:border-[#2E2820]">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#906727] to-[#C69A42] flex items-center justify-center text-white shadow-sm">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base tracking-[0.18em] uppercase text-[#242019] dark:text-[#FBF8F0]">
                4SLAYERS
              </span>
            </Link>
            <p className="text-xs text-[#777064] dark:text-[#9E9688] leading-relaxed max-w-sm">
              Multimodal AI fraud & scam detection platform. Correlating messages, URLs, phone numbers, QR codes, and payment signals into an explainable Scam DNA relationship graph.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#277653]">
              <span className="w-2 h-2 rounded-full bg-[#277653]" />
              <span>ALL DETECTION HEURISTICS OPERATIONAL</span>
            </div>
          </div>

          {/* Links Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#777064] dark:text-[#A8A095]">
              <li><Link to="/app/scan" className="hover:text-[#C69A42] transition">Threat Scanner</Link></li>
              <li><Link to="/app/scam-dna" className="hover:text-[#C69A42] transition">Scam DNA Explorer</Link></li>
              <li><Link to="/app/network" className="hover:text-[#C69A42] transition">Fraud Network</Link></li>
              <li><Link to="/app/intelligence" className="hover:text-[#C69A42] transition">Threat Intelligence</Link></li>
              <li><Link to="/app/reports" className="hover:text-[#C69A42] transition">Community Reports</Link></li>
            </ul>
          </div>

          {/* Links Col 2: Workspace */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
              Workspace
            </h4>
            <ul className="space-y-2 text-xs text-[#777064] dark:text-[#A8A095]">
              <li><Link to="/app" className="hover:text-[#C69A42] transition">Console Overview</Link></li>
              <li><Link to="/app/scans" className="hover:text-[#C69A42] transition">Scan History</Link></li>
              <li><Link to="/app/analytics" className="hover:text-[#C69A42] transition">Analytics & Trends</Link></li>
              <li><Link to="/app/notifications" className="hover:text-[#C69A42] transition">Threat Alerts</Link></li>
              <li><Link to="/app/settings" className="hover:text-[#C69A42] transition">User Settings</Link></li>
            </ul>
          </div>

          {/* Links Col 3: Trust & Governance */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
              Governance
            </h4>
            <ul className="space-y-2 text-xs text-[#777064] dark:text-[#A8A095]">
              <li><a href="#privacy-section" className="hover:text-[#C69A42] transition">Privacy & Data Rights</a></li>
              <li><a href="#explainable-ai-section" className="hover:text-[#C69A42] transition">Explainable AI Policy</a></li>
              <li><a href="#safety-recommendations" className="hover:text-[#C69A42] transition">Safety Playbook</a></li>
              <li><Link to="/app/settings" className="hover:text-[#C69A42] transition">GDPR JSON Export</Link></li>
              <li><Link to="/app/settings" className="hover:text-[#C69A42] transition">Right-to-be-Forgotten</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777064] dark:text-[#9E9688]">
          <div>
            © {new Date().getFullYear()} 4SLAYERS // Golden Intelligence Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built for Digital Trust</span>
            <span>•</span>
            <span>Open Cyber Defense</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
