import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Link as LinkIcon, Truck, CheckCircle2, CreditCard, ArrowUpRight } from 'lucide-react';

export default function DemoPresetsBar({ onSelectDemo }) {
  const navigate = useNavigate();

  const presets = [
    {
      id: 'demo1',
      title: 'Fake Bank SMS',
      risk: '94 / 100',
      riskLabel: 'Critical',
      badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-950/20',
      icon: ShieldAlert,
      badge: 'KYC Phishing'
    },
    {
      id: 'demo2',
      title: 'Shortened Link',
      risk: '82 / 100',
      riskLabel: 'High',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
      icon: LinkIcon,
      badge: 'Masked Host'
    },
    {
      id: 'demo3',
      title: 'Courier SMS',
      risk: '86 / 100',
      riskLabel: 'High',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
      icon: Truck,
      badge: 'Parcel Extortion'
    },
    {
      id: 'demo4',
      title: 'Legitimate Promo',
      risk: '14 / 100',
      riskLabel: 'Low',
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
      icon: CheckCircle2,
      badge: 'Verified Clean'
    },
    {
      id: 'demo5',
      title: 'Mule Payment',
      risk: '96 / 100',
      riskLabel: 'Critical',
      badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-950/20',
      icon: CreditCard,
      badge: 'Mule Endpoint'
    }
  ];

  const handleSelect = (demoId) => {
    if (onSelectDemo) {
      onSelectDemo(demoId);
    } else {
      navigate(`/scan/analysis/${demoId}`);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
      {presets.map((p) => {
        const Icon = p.icon;
        return (
          <button
            key={p.id}
            onClick={() => handleSelect(p.id)}
            className="group flex flex-col p-3 rounded-xl bg-black border border-white/[0.08] hover:border-white/40 text-left transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition" />
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${p.badgeColor}`}>
                {p.risk}
              </span>
            </div>
            <span className="text-xs font-medium text-white group-hover:text-white truncate">
              {p.title}
            </span>
            <span className="text-[10px] font-mono text-white/40 mt-0.5">
              {p.badge}
            </span>
          </button>
        );
      })}
    </div>
  );
}
