import React, { useState, useEffect } from 'react';
import { Settings, Shield, User, Download, Trash2, CheckCircle2, AlertTriangle, Save, Lock } from 'lucide-react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [sensitivity, setSensitivity] = useState('balanced');
  const [realtimeAlerts, setRealtimeAlerts] = useState(true);
  const [anonymizeScans, setAnonymizeScans] = useState(true);
  const [autoQuarantine, setAutoQuarantine] = useState(true);
  const [savedStatus, setSavedStatus] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [purging, setPurging] = useState(false);
  const [purgeMsg, setPurgeMsg] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const s = await api.getUserSettings();
        if (s) {
          setSensitivity(s.sensitivity || 'balanced');
          setRealtimeAlerts(s.realtime_alerts !== false);
          setAnonymizeScans(s.anonymize_scans !== false);
          setAutoQuarantine(s.auto_quarantine_links !== false);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (user) loadSettings();
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.updateUserSettings({
        sensitivity,
        realtime_alerts: realtimeAlerts,
        anonymize_scans: anonymizeScans,
        auto_quarantine_links: autoQuarantine,
        theme
      });
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportData = async () => {
    setExporting(true);
    try {
      const data = await api.exportUserData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `4slayers-gdpr-export-${user?.id || 'guest'}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  const handlePurgeData = async () => {
    if (!window.confirm('WARNING: This will permanently purge all your scan records and submitted reports from our database. This action is irreversible. Continue?')) {
      return;
    }
    setPurging(true);
    try {
      const res = await api.purgeUserData();
      setPurgeMsg(res.message || 'All records wiped.');
    } catch (e) {
      console.error(e);
    } finally {
      setPurging(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#906727] dark:text-[#EAD6A0] font-bold uppercase tracking-widest">
          <Settings className="w-3.5 h-3.5 text-[#C69A42]" />
          <span>USER CONFIGURATION & DATA SOVEREIGNTY</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
          Platform & Account Settings
        </h1>
      </div>

      {/* Account Info Card */}
      <div className="p-6 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#C69A42]/15 text-[#C69A42] flex items-center justify-center font-display font-bold text-lg">
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-[#242019] dark:text-[#FBF8F0]">
              {user?.name || 'Guest Investigator'}
            </h3>
            <p className="text-xs font-mono text-[#777064]">
              {user?.email || 'analyst@4slayers.security'} • Role: {user?.role || 'analyst'}
            </p>
          </div>
        </div>

        <span className="font-mono text-xs px-3 py-1 rounded-lg bg-[#277653]/10 text-[#277653] border border-[#277653]/30">
          ENTERPRISE ACTIVE
        </span>
      </div>

      {/* Preferences Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm space-y-6">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
          Detection Engine Sensitivity:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'conservative', label: 'Conservative', desc: 'Alerts only on definitive high-confidence signatures.' },
            { id: 'balanced', label: 'Balanced (Recommended)', desc: 'Standard heuristic baseline correlating multi-channel signals.' },
            { id: 'aggressive', label: 'High Sensitivity', desc: 'Aggressive flags on newly registered domains and low entropy.' },
          ].map((mode) => (
            <label
              key={mode.id}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                sensitivity === mode.id
                  ? 'border-[#C69A42] bg-[#FBF8F0] dark:bg-[#201C16] ring-1 ring-[#C69A42]'
                  : 'border-[#E5DCCB] dark:border-[#2E2820] hover:border-[#C69A42]/60'
              }`}
            >
              <input
                type="radio"
                name="sensitivity"
                value={mode.id}
                checked={sensitivity === mode.id}
                onChange={() => setSensitivity(mode.id)}
                className="hidden"
              />
              <span className="font-display font-bold text-xs text-[#242019] dark:text-[#FBF8F0] block mb-1">
                {mode.label}
              </span>
              <span className="text-[11px] text-[#777064] dark:text-[#A8A095] leading-relaxed block">
                {mode.desc}
              </span>
            </label>
          ))}
        </div>

        {/* Toggle Switches */}
        <div className="space-y-4 pt-4 border-t border-[#E5DCCB] dark:border-[#2E2820]">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
            Privacy & Notification Switches:
          </h3>

          <div className="space-y-3">
            {[
              {
                id: 'realtime',
                title: 'Broadcast Emerging Syndicate Alerts',
                desc: 'Receive instant notifications when zero-day phishing kits or mule pools are discovered.',
                val: realtimeAlerts,
                setVal: setRealtimeAlerts
              },
              {
                id: 'anonymize',
                title: 'Anonymize Outbound Scan Telemetry',
                desc: 'Strip phone numbers and email handles before adding indicators to collective intelligence.',
                val: anonymizeScans,
                setVal: setAnonymizeScans
              },
              {
                id: 'quarantine',
                title: 'Auto-Quarantine Malicious Redirects',
                desc: 'Prevent sandbox browser emulation from resolving known malicious DNS servers.',
                val: autoQuarantine,
                setVal: setAutoQuarantine
              }
            ].map((sw) => (
              <div key={sw.id} className="flex items-center justify-between p-3.5 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/40 dark:bg-[#12100E]">
                <div className="pr-4">
                  <h4 className="text-xs font-semibold text-[#242019] dark:text-[#FBF8F0]">{sw.title}</h4>
                  <p className="text-[11px] text-[#777064] dark:text-[#9E9688] mt-0.5">{sw.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => sw.setVal(!sw.val)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    sw.val ? 'bg-[#C69A42]' : 'bg-[#E5DCCB] dark:bg-[#332B20]'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      sw.val ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#E5DCCB] dark:border-[#2E2820] flex items-center justify-between">
          {savedStatus && (
            <span className="text-xs font-mono text-[#277653] flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences saved successfully.</span>
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl btn-gold-shimmer text-xs uppercase font-bold tracking-wider border border-[#C69A42]"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </form>

      {/* GDPR Data Rights & Purge */}
      <div className="p-6 sm:p-8 rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm space-y-4">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0]">
          GDPR & CCPA Data Sovereignty Controls:
        </h3>
        <p className="text-xs text-[#777064] dark:text-[#A8A095] leading-relaxed">
          You own your telemetry. Export an auditable JSON archive of all your scan incidents and community reports, or invoke your right-to-be-forgotten by permanently wiping your history from our database.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            disabled={exporting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] text-xs font-mono text-[#242019] dark:text-[#FBF8F0] hover:border-[#C69A42] transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#C69A42]" />
            <span>{exporting ? 'Generating Archive...' : 'Export Audit Dossier (JSON)'}</span>
          </button>

          <button
            type="button"
            onClick={handlePurgeData}
            disabled={purging}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#B42332]/40 bg-[#B42332]/5 hover:bg-[#B42332]/15 text-[#B42332] text-xs font-mono transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{purging ? 'Purging Records...' : 'Purge All My Data (Irreversible)'}</span>
          </button>
        </div>

        {purgeMsg && (
          <div className="p-3.5 rounded-xl border border-[#277653]/30 bg-[#277653]/10 text-[#277653] text-xs font-mono flex items-center gap-2 mt-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{purgeMsg}</span>
          </div>
        )}
      </div>

    </div>
  );
}
