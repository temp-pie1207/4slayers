import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, ShieldAlert, AlertTriangle, Info, Sparkles, RefreshCw } from 'lucide-react';
import { api } from '../api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifs();
  }, []);

  const loadNotifs = async () => {
    try {
      setLoading(true);
      const data = await api.getNotifications();
      setNotifications(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (e) {
      console.error(e);
    }
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'critical':
        return 'bg-[#B42332]/10 text-[#B42332] border-[#B42332]/30';
      case 'warning':
        return 'bg-[#A86C13]/10 text-[#A86C13] border-[#A86C13]/30';
      default:
        return 'bg-[#277653]/10 text-[#277653] border-[#277653]/30';
    }
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'critical') return n.severity === 'critical';
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DCCB] dark:border-[#2E2820]">
        <div>
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#906727] dark:text-[#EAD6A0] font-bold uppercase tracking-widest">
            <Bell className="w-3.5 h-3.5 text-[#C69A42]" />
            <span>REAL-TIME THREAT BROADCASTS // INBOX</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#242019] dark:text-[#FBF8F0]">
            Intelligence & Incident Alerts
          </h1>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] text-xs font-mono text-[#777064] hover:text-[#242019] transition self-start sm:self-auto cursor-pointer"
        >
          <CheckCheck className="w-4 h-4 text-[#C69A42]" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['all', 'unread', 'critical'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition cursor-pointer ${
              filter === f
                ? 'bg-[#242019] text-[#FBF8F0] dark:bg-[#FBF8F0] dark:text-[#242019]'
                : 'bg-white dark:bg-[#16130F] border border-[#E5DCCB] dark:border-[#2E2820] text-[#777064]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="rounded-2xl border border-[#E5DCCB] dark:border-[#2E2820] bg-white dark:bg-[#16130F] shadow-sm divide-y divide-[#E5DCCB] dark:divide-[#2E2820] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-[#777064]">
            Loading threat notifications...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-[#777064]">
            No notifications in this filter view.
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => handleMarkRead(n.id)}
              className={`p-5 flex items-start justify-between gap-4 transition cursor-pointer ${
                n.read ? 'opacity-70 bg-transparent' : 'bg-[#FBF8F0]/60 dark:bg-[#181511]'
              } hover:bg-[#F2EADB]/50 dark:hover:bg-[#201C16]`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-xl mt-0.5 border ${getSeverityBadge(n.severity)}`}>
                  {n.severity === 'critical' ? <ShieldAlert className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${getSeverityBadge(n.severity)}`}>
                      {n.severity}
                    </span>
                    <span className="text-[10px] font-mono text-[#777064]">
                      {n.timestamp}
                    </span>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#B42332]" />
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm text-[#242019] dark:text-[#FBF8F0] mb-1">
                    {n.title}
                  </h3>
                  <p className="text-xs text-[#777064] dark:text-[#A8A095] leading-relaxed max-w-3xl">
                    {n.message}
                  </p>
                </div>
              </div>

              {!n.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkRead(n.id);
                  }}
                  className="text-xs font-mono text-[#C69A42] hover:underline shrink-0"
                >
                  Mark read
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
