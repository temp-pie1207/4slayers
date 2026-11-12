import React, { useState } from 'react';
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  History,
  Dna,
  Network,
  ShieldAlert,
  Users,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  Zap,
  ExternalLink,
  Shield,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user, logout, demoLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDemo = async () => {
    try {
      await demoLogin();
    } catch (e) {
      console.error(e);
    }
  };

  const navGroups = [
    {
      group: 'WORKSPACE',
      items: [
        { label: 'Overview', path: '/app', icon: LayoutDashboard },
        { label: 'New Scan', path: '/app/scan', icon: ScanLine },
        { label: 'Scan History', path: '/app/scans', icon: History },
      ],
    },
    {
      group: 'INTELLIGENCE',
      items: [
        { label: 'Scam DNA', path: '/app/scam-dna', icon: Dna },
        { label: 'Fraud Network', path: '/app/network', icon: Network },
        { label: 'Threat Intelligence', path: '/app/intelligence', icon: ShieldAlert },
        { label: 'Community Reports', path: '/app/reports', icon: Users },
      ],
    },
    {
      group: 'INSIGHTS',
      items: [
        { label: 'Analytics', path: '/app/analytics', icon: BarChart3 },
        { label: 'Notifications', path: '/app/notifications', icon: Bell, badge: '4' },
      ],
    },
    {
      group: 'ACCOUNT',
      items: [
        { label: 'Settings', path: '/app/settings', icon: Settings },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-[#FBF8F0] dark:bg-[#0F0D0A] text-[#242019] dark:text-[#FBF8F0] overflow-hidden">
      
      {/* Sidebar for Desktop */}
      <aside
        className={`hidden md:flex flex-col border-r border-[#E5DCCB] dark:border-[#2E2820] bg-[#FFFFFF] dark:bg-[#16130F] transition-all duration-300 z-30 select-none ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#E5DCCB] dark:border-[#2E2820]">
          <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#906727] to-[#C69A42] flex items-center justify-center shrink-0 shadow-sm">
              <Shield className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-[0.16em] uppercase text-[#242019] dark:text-[#FBF8F0]">
                  4SLAYERS
                </span>
                <span className="font-mono text-[9px] text-[#777064] dark:text-[#9E9688] tracking-widest uppercase">
                  ENTERPRISE SHIELD
                </span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded text-[#777064] hover:text-[#242019] dark:text-[#9E9688] dark:hover:text-[#FBF8F0] hover:bg-[#F2EADB] dark:hover:bg-[#201C16] transition"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation items grouped */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              {!collapsed && (
                <div className="px-3 text-[10px] font-mono tracking-widest text-[#777064] dark:text-[#9E9688] uppercase mb-1.5 font-semibold">
                  {grp.group}
                </div>
              )}
              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/app'}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition duration-150 relative group ${
                        isActive
                          ? 'bg-[#C69A42]/15 text-[#906727] dark:text-[#EAD6A0] font-semibold border-l-2 border-[#C69A42]'
                          : 'text-[#777064] dark:text-[#A8A095] hover:text-[#242019] dark:hover:text-[#FBF8F0] hover:bg-[#F2EADB]/60 dark:hover:bg-[#201C16]/60'
                      } ${collapsed ? 'justify-center px-0' : ''}`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C69A42]' : 'text-[#777064] dark:text-[#A8A095]'}`} />
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="ml-auto text-[10px] font-mono bg-[#B42332] text-white px-1.5 py-0.2 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Card & Logout Bottom */}
        <div className="p-3 border-t border-[#E5DCCB] dark:border-[#2E2820] bg-[#FBF8F0]/50 dark:bg-[#12100E]/50">
          {user ? (
            <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : 'justify-between'}`}>
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold truncate text-[#242019] dark:text-[#FBF8F0]">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#777064] dark:text-[#9E9688] truncate">
                    {user.email}
                  </span>
                </div>
              )}
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 rounded text-[#777064] hover:text-[#B42332] hover:bg-white dark:hover:bg-[#201C16] transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {!collapsed && (
                <span className="text-[11px] font-mono text-[#777064] dark:text-[#9E9688]">
                  Guest Analyst Session
                </span>
              )}
              <button
                onClick={handleDemo}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded text-xs font-mono bg-[#C69A42]/15 text-[#906727] dark:text-[#EAD6A0] hover:bg-[#C69A42]/25 transition"
              >
                <Zap className="w-3.5 h-3.5 text-[#C69A42]" />
                {!collapsed && <span>Activate Demo ID</span>}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* App Topbar */}
        <header className="h-16 border-b border-[#E5DCCB] dark:border-[#2E2820] bg-white/80 dark:bg-[#16130F]/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 z-20 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1.5 rounded-lg border border-[#E5DCCB] dark:border-[#2E2820] text-[#777064]"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Active status indicator */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#277653] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#277653]"></span>
              </span>
              <span className="text-[#277653] font-semibold hidden sm:inline">LIVE ENGINE 2.4</span>
              <span className="text-[#777064] dark:text-[#9E9688] hidden sm:inline">/</span>
              <span className="text-[#777064] dark:text-[#9E9688] uppercase tracking-wider">
                {location.pathname.replace('/app', 'WORKSPACE') || 'WORKSPACE'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Quick Action: New Scan Button */}
            <Link
              to="/app/scan"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-gold-shimmer text-xs tracking-wider uppercase font-semibold border border-[#C69A42] shadow-sm"
            >
              <ScanLine className="w-3.5 h-3.5" />
              <span>New Threat Scan</span>
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#E5DCCB] dark:border-[#2E2820] text-[#777064] dark:text-[#A8A095] hover:text-[#C69A42] transition"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#EAD6A0]" /> : <Moon className="w-4 h-4 text-[#906727]" />}
            </button>

            {/* Notifications Shortcut */}
            <Link
              to="/app/notifications"
              className="relative p-2 rounded-lg border border-[#E5DCCB] dark:border-[#2E2820] text-[#777064] dark:text-[#A8A095] hover:text-[#242019] dark:hover:text-[#FBF8F0] transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B42332]" />
            </Link>

            {/* Public site link */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1 text-xs text-[#777064] hover:text-[#C69A42] font-mono transition"
              title="Return to Public Landing Page"
            >
              <span>Landing</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Page View with Smooth Animated Route Transition */}
        <main className="flex-1 overflow-y-auto bg-[#FBF8F0] dark:bg-[#0F0D0A]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-72 max-w-[80vw] bg-white dark:bg-[#16130F] h-full shadow-2xl flex flex-col z-10 border-r border-[#E5DCCB] dark:border-[#2E2820]"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-[#E5DCCB] dark:border-[#2E2820]">
                <span className="font-display font-bold text-sm tracking-widest uppercase">4SLAYERS</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 text-[#777064]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                {navGroups.map((grp) => (
                  <div key={grp.group} className="space-y-1">
                    <div className="px-3 text-[10px] font-mono tracking-widest text-[#777064] uppercase font-semibold">
                      {grp.group}
                    </div>
                    {grp.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.path === '/app'}
                          onClick={() => setMobileSidebarOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition ${
                              isActive
                                ? 'bg-[#C69A42]/15 text-[#906727] dark:text-[#EAD6A0] font-semibold border-l-2 border-[#C69A42]'
                                : 'text-[#777064] dark:text-[#A8A095]'
                            }`
                          }
                        >
                          <Icon className="w-4 h-4 shrink-0 text-[#C69A42]" />
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto text-[10px] font-mono bg-[#B42332] text-white px-1.5 py-0.2 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-[#E5DCCB] dark:border-[#2E2820]">
                <Link
                  to="/"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-2 text-xs font-medium text-[#777064] py-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Exit to Landing Page</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
