import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Landmark, CreditCard, Headphones, Briefcase, 
  TrendingUp, ShieldAlert, Truck, Scale, Share2, QrCode, 
  ChevronRight, ArrowRight, ShieldCheck, AlertCircle, X, Search 
} from 'lucide-react';
import { api } from '../api';

export default function IntelligencePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');

  const iconMap = {
    landmark: Landmark,
    'credit-card': CreditCard,
    headphones: Headphones,
    briefcase: Briefcase,
    'trending-up': TrendingUp,
    'shield-alert': ShieldAlert,
    truck: Truck,
    scale: Scale,
    'share-2': Share2,
    'qr-code': QrCode,
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getIntelligence();
        setCategories(data || []);
      } catch (err) {
        console.error('Failed to load intelligence:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Threat Intelligence Hub
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/60">
                SCAM TAXONOMY
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/50 font-light">
              Structured taxonomy of active attack vectors, psychological coercion scripts, and countermeasures.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter threat categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/[0.1] rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white/40 placeholder:text-white/30 font-mono"
            />
          </div>
        </div>

        {/* Grid of Categories */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border border-white/20 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-white/40 font-mono text-xs">Loading threat taxonomy...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((cat) => {
              const Icon = iconMap[cat.icon] || ShieldAlert;
              const isCritical = cat.risk_level === 'Critical';

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/30 rounded-2xl p-6 transition duration-200 cursor-pointer group flex flex-col justify-between backdrop-blur-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-black border border-white/10 text-white/70 group-hover:text-white transition">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isCritical ? 'border-rose-500/30 text-rose-400 bg-rose-950/20' : 'border-amber-500/30 text-amber-300 bg-amber-950/20'
                      }`}>
                        {cat.risk_level}
                      </span>
                    </div>

                    <h3 className="text-sm font-medium text-white mb-2 group-hover:text-white transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/50 font-light leading-relaxed mb-4 line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white transition">
                    <span>Inspect Attack Playbook</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Category Deep Dive */}
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#080808] border border-white/[0.15] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 text-white/60">
                      THREAT DOSSIER
                    </span>
                    <span className="text-[10px] font-mono text-rose-400">
                      {selectedCategory.risk_level}
                    </span>
                  </div>
                  <h3 className="text-xl font-light text-white">
                    {selectedCategory.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-light text-white/70 leading-relaxed">
                <p className="text-sm text-white/90">
                  {selectedCategory.description}
                </p>

                {selectedCategory.common_tactics && (
                  <div className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">
                      Common Deception Mechanics:
                    </span>
                    <ul className="space-y-1.5 font-mono text-xs text-white/80 list-disc list-inside">
                      {selectedCategory.common_tactics.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedCategory.defensive_steps && (
                  <div className="p-4 rounded-xl bg-black border border-white/[0.08] space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 block">
                      Verified Protective Protocol:
                    </span>
                    <ul className="space-y-1.5 font-mono text-xs text-white/80 list-disc list-inside">
                      {selectedCategory.defensive_steps.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium transition cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
