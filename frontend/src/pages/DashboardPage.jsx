import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ScanLine, ShieldAlert, Activity, Users, ArrowUpRight, 
  Clock, AlertTriangle, CheckCircle2, TrendingUp, Zap, Sparkles, Network
} from 'lucide-react';
import { api } from '../api';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [quickInput, setQuickInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [scansData, analyticsData] = await Promise.all([
          api.getScans(),
          api.getAnalytics()
        ]);
        setScans(scansData || []);
        setAnalytics(analyticsData || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleQuickScan = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    navigate(`/app/scan?tab=message`);
  };

  const getRiskBadge = (level) => {
    switch (level) {
      case 'Critical Risk':
        return 'bg-[#B42332]/10 text-[#B42332] border-[#B42332]/30';
      case 'High Risk':
        return 'bg-[#A86C13]/10 text-[#A86C13] border-[#A86C13]/30';
      case 'Medium Risk':
        return 'bg-[#C69A42]/15 text-[#906727] dark:text-[#EAD6A0] border-[#C69A42]/30';
      default:
        return 'bg-[#277653]/10 text-[#277653] border-[#277653]/30';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#906727] dark:text-[#EAD6A0] font-bold uppercase tracking-widest">
            <span>DEFENSE CONSOLE // MULTIMODAL SENTINEL</span>
            <span>•</span>
            <span className="text-[#277653]">LIVE SYNAPSE CLUSTER</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
            Intelligence Workspace Overview
          </h1>
        </div>

        <Link
          to="/app/scan"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-gold-shimmer text-xs uppercase font-bold tracking-wider border border-[#C69A42] shadow-sm self-start sm:self-auto"
        >
          <ScanLine className="w-4 h-4" />
          <span>Launch New Scan</span>
        </Link>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Threats Blocked', value: analytics?.overview?.threats_blocked?.toLocaleString() || '9,410', sub: '+12% this month', icon: ShieldAlert, color: 'text-[#B42332]' },
          { label: 'Scam DNA Syndicates', value: '4 Active Cells', sub: 'Cross-channel correlated', icon: Network, color: 'text-[#C69A42]' },
          { label: 'Average Risk Score', value: `${analytics?.overview?.average_risk_score || '78.4'}/100`, sub: 'Heuristic baseline', icon: TrendingUp, color: 'text-[#906727] dark:text-[#EAD6A0]' },
          { label: 'Detection Accuracy', value: `${analytics?.overview?.detection_accuracy || '98.7'}%`, sub: 'Zero-ad ethical AI', icon: CheckCircle2, color: 'text-[#277653]' },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="p-5 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase text-[#777064] dark:text-[#9E9688] tracking-wider font-semibold">
                    {stat.label}
                  </span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="font-display font-bold text-2xl text-[#242019] dark:text-[#FBF8F0]">
                  {stat.value}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-[#E5DCCB]/60 dark:border-[#2E2820] text-[10px] font-mono text-[#777064] dark:text-[#9E9688]">
                {stat.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Threat Scanner Strip */}
      <div className="p-6 rounded-2xl border border-[#C69A42]/40 bg-gradient-to-r from-white via-[#FBF8F0] to-[#F2EADB] dark:from-[#181511] dark:via-[#16130F] dark:to-[#12100E] shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#906727] dark:text-[#EAD6A0] uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C69A42]" />
              <span>Instant Threat Dispatch</span>
            </div>
            <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
              Have a suspicious message or link right now?
            </h3>
          </div>

          <form onSubmit={handleQuickScan} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Paste suspicious text or URL..."
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              className="w-full md:w-80 rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#14110D] px-3.5 py-2.5 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl btn-gold-shimmer text-xs uppercase font-bold tracking-wider border border-[#C69A42] shrink-0"
            >
              Analyze
            </button>
          </form>
        </div>
      </div>

      {/* Recent Scans Table */}
      <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#E5DCCB] dark:border-[#2E2820] flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
              Recent Threat Dossiers
            </h3>
            <p className="text-xs text-[#777064] dark:text-[#9E9688] mt-0.5 font-mono">
              Empirical incident scans processed through the live heuristics pipeline.
            </p>
          </div>
          <Link
            to="/app/scans"
            className="text-xs font-mono text-[#C69A42] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Scans</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#E5DCCB] dark:divide-[#2E2820] overflow-x-auto">
          {scans.slice(0, 5).map((scan) => (
            <div
              key={scan.id}
              onClick={() => navigate(`/app/scans/${scan.id}`)}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FBF8F0] dark:hover:bg-[#1C1813] transition cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1C1813] border border-[#C69A42] flex items-center justify-center font-display font-bold text-xs text-[#242019] dark:text-[#FBF8F0] shrink-0 shadow-2xs">
                  {scan.risk_score}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${getRiskBadge(scan.risk_level)}`}>
                      {scan.risk_level}
                    </span>
                    <span className="text-[10px] font-mono text-[#777064] uppercase">
                      [{scan.type}]
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#242019] dark:text-[#FBF8F0] truncate">
                    {scan.input_summary}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-right">
                <span className="hidden sm:inline text-[11px] font-mono text-[#777064]">
                  {new Date(scan.created_at).toLocaleDateString()}
                </span>
                <span className="text-xs font-mono text-[#C69A42] flex items-center gap-1">
                  <span>Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
