import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, ShieldX } from 'lucide-react';

export default function RiskMeter({ score = 0, level = "Low Risk" }) {
  const normalized = Math.min(Math.max(score, 0), 100);

  let config = {
    color: 'text-emerald-400',
    strokeColor: '#10b981',
    badge: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20',
    icon: ShieldCheck,
    title: 'Low Risk',
    description: 'No active threat indicators detected. Proceed normally with standard safety hygiene.'
  };

  if (normalized >= 80) {
    config = {
      color: 'text-rose-400',
      strokeColor: '#f43f5e',
      badge: 'border-rose-500/30 text-rose-400 bg-rose-950/20',
      icon: ShieldX,
      title: 'Critical Risk',
      description: 'Severe scam threat detected. Highly coordinated credential theft or payment extortion scheme.'
    };
  } else if (normalized >= 60) {
    config = {
      color: 'text-rose-300',
      strokeColor: '#fb7185',
      badge: 'border-rose-500/20 text-rose-300 bg-rose-950/15',
      icon: ShieldAlert,
      title: 'High Risk',
      description: 'Dangerous indicators present. Significant likelihood of phishing, deception, or financial fraud.'
    };
  } else if (normalized >= 30) {
    config = {
      color: 'text-amber-300',
      strokeColor: '#f59e0b',
      badge: 'border-amber-500/30 text-amber-300 bg-amber-950/20',
      icon: AlertTriangle,
      title: 'Medium Risk',
      description: 'Unusual patterns identified. Requires caution and independent verification before proceeding.'
    };
  }

  const Icon = config.icon;
  const radius = 70;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (normalized / 100) * circumference;

  return (
    <div className="bg-white/[0.02] border border-white/[0.1] rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Visual Gauge */}
        <div className="relative flex flex-col items-center">
          <svg className="w-48 h-28 overflow-visible" viewBox="0 0 160 90">
            {/* Background Track */}
            <path
              d="M 10 80 A 70 70 0 0 1 150 80"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Filled Progress Arc */}
            <path
              d="M 10 80 A 70 70 0 0 1 150 80"
              fill="none"
              stroke={config.strokeColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
            />
          </svg>

          {/* Centered Score */}
          <div className="absolute bottom-1 text-center">
            <div className="flex items-baseline justify-center gap-1 font-mono">
              <span className="text-4xl font-light text-white tracking-tight">
                {normalized}
              </span>
              <span className="text-white/40 text-xs">/ 100</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono mt-0.5">
              Composite Risk
            </div>
          </div>
        </div>

        {/* Status Details */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider border ${config.badge}`}>
              <Icon className="w-3 h-3" />
              {level || config.title}
            </span>
            <span className="text-xs text-white/40 font-mono">
              Confidence Engine: Active
            </span>
          </div>

          <h3 className="text-lg font-medium text-white mb-1 tracking-tight">
            {normalized >= 80 ? 'CRITICAL THREAT SIGNATURE' : normalized >= 60 ? 'HIGH PROBABILITY DECEPTION' : normalized >= 30 ? 'ELEVATED SUSPICION DETECTED' : 'BENIGN / VERIFIED SAFE'}
          </h3>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-xl">
            {config.description}
          </p>

          {/* Scale Legend */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-white/[0.06] text-[10px] font-mono">
            <div>
              <span className="block text-emerald-400">0–29</span>
              <span className="text-white/40">Low Risk</span>
            </div>
            <div>
              <span className="block text-amber-300">30–59</span>
              <span className="text-white/40">Medium</span>
            </div>
            <div>
              <span className="block text-rose-300">60–79</span>
              <span className="text-white/40">High</span>
            </div>
            <div>
              <span className="block text-rose-400">80–100</span>
              <span className="text-white/40">Critical</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
