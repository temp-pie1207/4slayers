import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, LogOut, Zap, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, demoLogin } = useAuth();
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
      navigate('/dashboard');
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
    { label: 'Platform', action: () => scrollToSection('platform') },
    { label: 'Features', action: () => scrollToSection('features') },
    { label: 'Intelligence', path: '/intelligence' },
    { label: 'How It Works', action: () => scrollToSection('how-it-works') },
    { label: 'Security', action: () => scrollToSection('security') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-white/[0.12] py-3'
          : 'bg-black/30 backdrop-blur-[4px] border-b border-white/[0.08] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-10">
          
          {/* Left: Custom Geometric Shield-and-Orbit Symbol + Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            {/* Geometric Shield & Orbit Vector Symbol */}
            <div className="relative w-7 h-7 flex items-center justify-center text-white/90 group-hover:text-white transition duration-300">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 stroke-current transition-transform duration-300 group-hover:scale-105"
              >
                {/* Outer orbital ellipse */}
                <ellipse
                  cx="16"
                  cy="16"
                  rx="13.5"
                  ry="5.2"
                  transform="rotate(-28 16 16)"
                  strokeWidth="1.1"
                  strokeOpacity="0.75"
                  strokeDasharray="1.5 2.5"
                />
                {/* Secondary subtle counter-ring */}
                <circle
                  cx="16"
                  cy="16"
                  r="11"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />
                {/* Geometric shield facets */}
                <path
                  d="M16 4.5L24 8V16C24 21.2 16 26.5 16 26.5C16 26.5 8 21.2 8 16V8L16 4.5Z"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
                {/* Internal core vector diamond */}
                <path
                  d="M16 10L19.5 16L16 22L12.5 16L16 10Z"
                  strokeWidth="0.9"
                  strokeOpacity="0.8"
                />
                <circle cx="16" cy="16" r="1.2" fill="white" />
              </svg>
            </div>

            {/* Wordmark 4SLAYERS */}
            <div className="flex items-baseline gap-2">
              <span className="text-white font-medium text-sm sm:text-base tracking-[0.24em] uppercase font-sans">
                4SLAYERS
              </span>
              <span className="hidden lg:inline text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
                SENTINEL AI
              </span>
            </div>
          </Link>

          {/* Center: Understated, spacious navigation links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((item, idx) => {
              if (item.path) {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="text-white/70 hover:text-white text-xs lg:text-[13px] tracking-wider uppercase font-normal transition duration-200 focus:outline-none"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-white/70 hover:text-white text-xs lg:text-[13px] tracking-wider uppercase font-normal transition duration-200 focus:outline-none cursor-pointer"
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Outlined compact button "OPEN SCANNER ↗" & App Links */}
          <div className="flex items-center gap-3">
            {/* Quick link to Dashboard if authenticated or demo active */}
            <Link
              to="/dashboard"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white tracking-wider uppercase transition duration-150 mr-1"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-white/40" />
              <span>Console</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline text-xs text-white/70 font-mono">
                  {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleDemoAnalyst}
                title="1-Click Demo Analyst Access"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] text-white/50 hover:text-white/90 border border-white/10 hover:border-white/30 transition"
              >
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>Demo</span>
              </button>
            )}

            {/* Primary compact outlined button matching reference */}
            <Link
              to="/scan"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full border border-white/30 hover:border-white/80 text-white text-xs tracking-wider uppercase font-medium hover:bg-white/10 transition duration-200 focus:outline-none"
            >
              <span>OPEN SCANNER</span>
              <span className="text-xs">↗</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-white/70 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 border-t border-white/10 mt-3 flex flex-col space-y-2">
            {navLinks.map((item) => (
              item.path ? (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/80 hover:text-white text-xs uppercase tracking-wider py-1.5 px-1"
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
                  className="text-left text-white/80 hover:text-white text-xs uppercase tracking-wider py-1.5 px-1"
                >
                  {item.label}
                </button>
              )
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-white/60 uppercase tracking-wider py-1"
              >
                Threat Console
              </Link>
              <button
                onClick={() => {
                  handleDemoAnalyst();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-cyan-400 py-1"
              >
                Instant Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
