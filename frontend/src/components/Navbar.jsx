import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, LogOut, Zap, LayoutDashboard, ArrowUpRight, Sun, Moon, Menu, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, demoLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoAnalyst = async () => {
    try {
      await demoLogin();
      navigate('/app');
    } catch (e) {
      console.error(e);
    }
  };

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'Platform', action: () => scrollToSection('scanner-preview') },
    { label: 'How It Works', action: () => scrollToSection('how-it-works') },
    { label: 'Intelligence', path: '/app/intelligence' },
    { label: 'Scam DNA', action: () => scrollToSection('scam-dna-section') },
    { label: 'Network', path: '/app/network' },
    { label: 'About', action: () => scrollToSection('problem-section') },
  ];

  const isConsoleRoute = location.pathname.startsWith('/app');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FBF8F0]/90 dark:bg-[#0F0D0A]/90 backdrop-blur-md border-b border-[#E5DCCB] dark:border-[#332B20] py-3 shadow-sm'
          : 'bg-[#FBF8F0]/60 dark:bg-[#0F0D0A]/60 backdrop-blur-[6px] border-b border-[#E5DCCB]/60 dark:border-[#332B20]/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          
          {/* Left: Custom 4SLAYERS Brand Mark + Animated Gold Indicator */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            {/* Geometric Connected-Node Emblem */}
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-[#C69A42]/40 bg-gradient-to-br from-[#FFFFFF] to-[#F2EADB] dark:from-[#201C16] dark:to-[#16130F] shadow-sm group-hover:border-[#C69A42] transition duration-300">
              <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5 stroke-[#C69A42]">
                <polygon points="12 2 20 6.5 20 17.5 12 22 4 17.5 4 6.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="2.5" fill="#C69A42" />
                <line x1="12" y1="2" x2="12" y2="9.5" strokeWidth="1.2" strokeOpacity="0.7" />
                <line x1="20" y1="17.5" x2="14" y2="13.5" strokeWidth="1.2" strokeOpacity="0.7" />
                <line x1="4" y1="17.5" x2="10" y2="13.5" strokeWidth="1.2" strokeOpacity="0.7" />
              </svg>
              {/* Subtle animated gold indicator dot */}
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C69A42] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C69A42]"></span>
              </span>
            </div>

            {/* Wordmark 4SLAYERS */}
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-base sm:text-lg tracking-[0.2em] uppercase text-[#242019] dark:text-[#FBF8F0]">
                4SLAYERS
              </span>
              <span className="hidden xl:inline text-[9px] uppercase tracking-[0.22em] text-[#777064] dark:text-[#9E9688] font-mono border-l border-[#E5DCCB] dark:border-[#332B20] pl-2">
                FRAUD DEFENSE
              </span>
            </div>
          </Link>

          {/* Center: Editorial Geometric Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item) => {
              if (item.path) {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="text-[#777064] hover:text-[#242019] dark:text-[#B3AAA0] dark:hover:text-[#FBF8F0] text-xs uppercase tracking-wider font-medium transition duration-200"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-[#777064] hover:text-[#242019] dark:text-[#B3AAA0] dark:hover:text-[#FBF8F0] text-xs uppercase tracking-wider font-medium transition duration-200 cursor-pointer"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Theme Toggle, Auth, Golden CTA */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Golden Light Mode' : 'Switch to Dark Mode'}
              className="p-1.5 rounded-lg border border-[#E5DCCB] dark:border-[#332B20] text-[#777064] dark:text-[#B3AAA0] hover:text-[#C69A42] hover:border-[#C69A42] transition duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#EAD6A0]" /> : <Moon className="w-4 h-4 text-[#906727]" />}
            </button>

            {/* Quick Link to App / Console */}
            <Link
              to="/app"
              className="hidden lg:inline-flex items-center gap-1.5 text-xs text-[#777064] dark:text-[#B3AAA0] hover:text-[#242019] dark:hover:text-[#FBF8F0] tracking-wider uppercase transition font-medium mr-1"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#C69A42]" />
              <span>Console</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/app/settings"
                  className="text-xs font-mono font-medium text-[#242019] dark:text-[#FBF8F0] px-2.5 py-1 rounded border border-[#E5DCCB] dark:border-[#332B20] hover:border-[#C69A42] transition"
                >
                  {user.name.split(' ')[0]}
                </Link>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-[#777064] hover:text-[#B42332] transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:inline-flex text-xs font-medium uppercase tracking-wider text-[#777064] hover:text-[#242019] dark:text-[#B3AAA0] dark:hover:text-[#FBF8F0] transition px-2 py-1"
                >
                  Sign In
                </Link>
                <button
                  onClick={handleDemoAnalyst}
                  title="1-Click Demo Evaluation"
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider text-[#906727] dark:text-[#EAD6A0] bg-[#EAD6A0]/20 dark:bg-[#C69A42]/10 border border-[#C69A42]/30 hover:border-[#C69A42] transition"
                >
                  <Zap className="w-3 h-3 text-[#C69A42]" />
                  <span>Demo</span>
                </button>
              </div>
            )}

            {/* Primary Golden CTA: Launch Scanner ↗ */}
            <Link
              to="/app/scan"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg btn-gold-shimmer text-xs tracking-wider uppercase font-semibold border border-[#C69A42] shadow-sm hover:shadow-md transition focus:outline-none"
            >
              <span>Launch Scanner</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded text-[#777064] dark:text-[#B3AAA0] hover:text-[#242019] dark:hover:text-[#FBF8F0] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-3 pb-3 border-t border-[#E5DCCB] dark:border-[#332B20] mt-2 flex flex-col space-y-2.5 overflow-hidden"
            >
              {navLinks.map((item) => (
                item.path ? (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs uppercase tracking-wider py-1 text-[#777064] dark:text-[#B3AAA0] hover:text-[#C69A42]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.action();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-xs uppercase tracking-wider py-1 text-[#777064] dark:text-[#B3AAA0] hover:text-[#C69A42]"
                  >
                    {item.label}
                  </button>
                )
              ))}
              <div className="pt-2 border-t border-[#E5DCCB] dark:border-[#332B20] flex items-center justify-between">
                <Link
                  to="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-wider text-[#C69A42] font-semibold"
                >
                  Enter Workspace Console →
                </Link>
                {!user && (
                  <button
                    onClick={() => {
                      handleDemoAnalyst();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-mono text-[#906727] dark:text-[#EAD6A0]"
                  >
                    [ Instant Demo ]
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
