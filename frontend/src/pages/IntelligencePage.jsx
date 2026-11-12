import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, BookOpen, ChevronRight, ArrowUpRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import { api } from '../api';

export default function IntelligencePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadIntel() {
      try {
        const data = await api.getIntelligence();
        setCategories(data || []);
        if (data && data.length > 0) {
          setSelectedCat(data[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadIntel();
  }, []);

  const filtered = categories.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.description?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#906727] dark:text-[#EAD6A0] font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-[#C69A42]" />
            <span>THREAT INTELLIGENCE COMPENDIUM // 10 ACTIVE DOMAINS</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
            Global Fraud Playbooks & Taxonomy
          </h1>
          <p className="text-xs sm:text-sm text-[#777064] dark:text-[#A8A095] mt-0.5">
            Documented methodologies, psychological leverage triggers, and forensic indicators across all major cyber fraud vectors.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777064]" />
          <input
            type="text"
            placeholder="Search taxonomy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] pl-8 pr-3 py-2 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
          />
        </div>
      </div>

      {/* Main Grid: Left List + Right Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Categories List */}
        <div className="lg:col-span-5 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] p-4 shadow-sm space-y-2 max-h-[700px] overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-[#777064]">Loading taxonomy...</div>
          ) : (
            filtered.map((cat) => {
              const isSelected = selectedCat?.id === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCat(cat)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C69A42] bg-[#FBF8F0] dark:bg-[#201C16] shadow-xs'
                      : 'border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/30 dark:bg-[#12100E]/30 hover:border-[#C69A42]/60'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] uppercase font-bold text-[#906727] dark:text-[#EAD6A0]">
                        CAT // {cat.category.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xs sm:text-sm text-[#242019] dark:text-[#FBF8F0] truncate">
                      {cat.title}
                    </h3>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#C69A42]' : 'text-[#777064]'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Right 7 Cols: Detailed Taxonomy Dossier */}
        <div className="lg:col-span-7 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] p-6 sm:p-8 shadow-sm space-y-6">
          {selectedCat ? (
            <div className="space-y-6">
              
              <div className="pb-4 border-b border-[#E5DCCB] dark:border-[#2E2820]">
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-[#906727] dark:text-[#EAD6A0] font-bold uppercase">
                  <span>VECTOR CLASSIFICATION: {selectedCat.category.toUpperCase()}</span>
                </div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#242019] dark:text-[#FBF8F0]">
                  {selectedCat.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#777064] dark:text-[#A8A095] mt-2 leading-relaxed">
                  {selectedCat.description}
                </p>
              </div>

              {/* Modus Operandi & Psychological Levers */}
              {selectedCat.tactics && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
                    Tactical Execution & Social Engineering Levers:
                  </h4>
                  <div className="space-y-2">
                    {selectedCat.tactics.map((tactic, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/50 dark:bg-[#12100E] text-xs text-[#242019] dark:text-[#FBF8F0] leading-relaxed">
                        <strong className="text-[#906727] dark:text-[#EAD6A0]">Phase {idx + 1}: </strong>
                        {tactic}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Forensic Indicators to Watch */}
              {selectedCat.indicators && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#B42332]">
                    High-Probability Forensic Signatures:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedCat.indicators.map((ind, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-[#B42332]/25 bg-[#B42332]/5 text-xs text-[#242019] dark:text-[#FBF8F0]">
                        <span className="text-[#B42332] font-mono mr-1.5">•</span>
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prevention Rules */}
              {selectedCat.prevention && (
                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#277653]">
                    Actionable Defense Playbook:
                  </h4>
                  <div className="space-y-2">
                    {selectedCat.prevention.map((prev, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-[#277653]/30 bg-[#277653]/5 flex items-start gap-2.5 text-xs text-[#242019] dark:text-[#FBF8F0]">
                        <ShieldCheck className="w-4 h-4 text-[#277653] shrink-0 mt-0.5" />
                        <span>{prev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="py-20 text-center text-xs font-mono text-[#777064]">
              Select a category on the left to inspect intelligence taxonomy.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
