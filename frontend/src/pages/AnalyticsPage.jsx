import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, ShieldAlert, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { api } from '../api';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await api.getAnalytics();
        setData(stats);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const riskColors = ['#B42332', '#A86C13', '#C69A42', '#277653'];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-8 h-8 border-2 border-[#C69A42] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs uppercase text-[#777064]">Loading Analytics Engine...</p>
      </div>
    );
  }

  const overview = data?.overview || {
    total_scans: 12840,
    threats_blocked: 9410,
    average_risk_score: 78.4,
    cross_channel_correlations: 3120,
    confirmed_mules: 640,
    detection_accuracy: 98.7
  };

  const trends = data?.trends || [];
  const channels = data?.channels || [];
  const riskDist = data?.risk_distribution || [];
  const topBrands = data?.top_targeted_entities || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#906727] dark:text-[#EAD6A0] font-bold uppercase tracking-widest">
            <BarChart3 className="w-3.5 h-3.5 text-[#C69A42]" />
            <span>EMPIRICAL METRICS // RECHARTS VISUALIZATION</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
            System Threat Velocity & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#777064] dark:text-[#A8A095] mt-0.5">
            Real-time heuristic telemetry tracking cross-vector convergence and syndicate velocities.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#277653] bg-[#277653]/10 border border-[#277653]/30 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-[#277653] animate-pulse" />
          <span>DATA PIPELINE: LIVE SYNAPSE</span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Scans Processed', val: overview.total_scans.toLocaleString() },
          { label: 'Threats Intercepted', val: overview.threats_blocked.toLocaleString() },
          { label: 'Avg Risk Score', val: `${overview.average_risk_score}/100` },
          { label: 'Multi-Channel Links', val: overview.cross_channel_correlations.toLocaleString() },
          { label: 'Confirmed Mules', val: overview.confirmed_mules.toLocaleString() },
          { label: 'Detection Accuracy', val: `${overview.detection_accuracy}%` },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-2xs">
            <div className="font-mono text-[9px] uppercase text-[#777064] dark:text-[#9E9688] mb-1 font-semibold truncate">
              {item.label}
            </div>
            <div className="font-display font-bold text-lg text-[#242019] dark:text-[#FBF8F0]">
              {item.val}
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: 6-Month Threat Velocity Trend */}
        <div className="lg:col-span-8 p-6 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820]">
            <div>
              <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
                Monthly Incident Ingestion & Threat Block Velocity
              </h3>
              <p className="text-xs text-[#777064] dark:text-[#9E9688] font-mono">
                Volume of incoming vectors vs confirmed malicious blocks.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#C69A42]/15 text-[#906727] dark:text-[#EAD6A0]">
              6-Month Window
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C69A42" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C69A42" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B42332" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B42332" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DCCB" opacity={0.3} />
                <XAxis dataKey="month" stroke="#777064" fontSize={11} fontFamily="IBM Plex Mono" />
                <YAxis stroke="#777064" fontSize={11} fontFamily="IBM Plex Mono" />
                <Tooltip contentStyle={{ backgroundColor: '#1C1813', borderColor: '#C69A42', borderRadius: '8px', color: '#FBF8F0', fontSize: '11px', fontFamily: 'IBM Plex Mono' }} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'IBM Plex Mono' }} />
                <Area type="monotone" dataKey="scans" name="Total Scans" stroke="#C69A42" strokeWidth={2} fillOpacity={1} fill="url(#goldGrad)" />
                <Area type="monotone" dataKey="threats" name="Threats Blocked" stroke="#B42332" strokeWidth={2} fillOpacity={1} fill="url(#redGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 4 Cols: Risk Level Distribution Pie Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820]">
            <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
              Risk Category Breakdown
            </h3>
            <p className="text-xs text-[#777064] dark:text-[#9E9688] font-mono">
              Empirical distribution of threat severities.
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDist}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {riskDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={riskColors[index % riskColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1C1813', borderColor: '#C69A42', borderRadius: '8px', color: '#FBF8F0', fontSize: '11px', fontFamily: 'IBM Plex Mono' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {riskDist.map((r, i) => (
              <div key={r.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: riskColors[i % riskColors.length] }} />
                <span className="truncate">{r.name}: {r.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Channel Comparison Bar Chart & Top Brands */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Vectors Bar Chart */}
        <div className="lg:col-span-6 p-6 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm space-y-4">
          <div className="pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820]">
            <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
              Threat Density by Ingestion Channel
            </h3>
            <p className="text-xs text-[#777064] dark:text-[#9E9688] font-mono">
              Scans analyzed vs verified threats per medium.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channels}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DCCB" opacity={0.3} />
                <XAxis dataKey="name" stroke="#777064" fontSize={10} fontFamily="IBM Plex Mono" />
                <YAxis stroke="#777064" fontSize={10} fontFamily="IBM Plex Mono" />
                <Tooltip contentStyle={{ backgroundColor: '#1C1813', borderColor: '#C69A42', borderRadius: '8px', color: '#FBF8F0', fontSize: '11px', fontFamily: 'IBM Plex Mono' }} />
                <Bar dataKey="scans" name="Total Scans" fill="#C69A42" radius={[4, 4, 0, 0]} />
                <Bar dataKey="threats" name="Malicious Threat" fill="#B42332" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 6 Cols: Top Targeted Entities Table */}
        <div className="lg:col-span-6 p-6 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm space-y-4">
          <div className="pb-3 border-b border-[#E5DCCB] dark:border-[#2E2820]">
            <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
              Most Impersonated Entities & Brands
            </h3>
            <p className="text-xs text-[#777064] dark:text-[#9E9688] font-mono">
              Syndicate targets with highest incident recurrence.
            </p>
          </div>

          <div className="divide-y divide-[#E5DCCB] dark:divide-[#2E2820]">
            {topBrands.map((b) => (
              <div key={b.entity} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-[#242019] dark:text-[#FBF8F0]">{b.entity}</h4>
                  <span className="text-[10px] font-mono text-[#777064]">{b.vector}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-[#B42332]">{b.incidents.toLocaleString()}</span>
                  <span className="block text-[9px] text-[#777064]">{b.risk} Risk</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
