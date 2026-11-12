import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Shield, Lock, Mail, User, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AuthPage({ mode = 'login' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, demoLogin } = useAuth();

  const [isRegister, setIsRegister] = useState(mode === 'register' || location.pathname === '/register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error('Please enter your full name');
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantDemo = async () => {
    setLoading(true);
    setError('');
    try {
      await demoLogin();
      navigate('/app');
    } catch (e) {
      setError('Demo activation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF8F0] dark:bg-[#0F0D0A] text-[#242019] dark:text-[#FBF8F0]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient radial gold background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-radial from-[#C69A42]/15 via-[#EAD6A0]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="w-full max-w-md rounded-2xl border border-[#E5DCCB] dark:border-[#332B20] bg-white dark:bg-[#16130F] p-8 shadow-xl relative z-10 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#906727] to-[#C69A42] flex items-center justify-center text-white mx-auto shadow-md">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="font-display font-bold text-2xl text-[#242019] dark:text-[#FBF8F0]">
              {isRegister ? 'Create Analyst ID' : 'Sign in to 4Slayers'}
            </h1>
            <p className="text-xs text-[#777064] dark:text-[#9E9688]">
              {isRegister
                ? 'Join our decentralized threat verification collective.'
                : 'Access your persistent threat dossiers and graph workspaces.'}
            </p>
          </div>

          {/* Quick Demo Analyst Access Banner */}
          <button
            type="button"
            onClick={handleInstantDemo}
            disabled={loading}
            className="w-full py-2.5 px-3 rounded-xl border border-[#C69A42]/50 bg-[#EAD6A0]/15 dark:bg-[#C69A42]/10 hover:bg-[#EAD6A0]/25 transition flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#906727] dark:text-[#EAD6A0] cursor-pointer"
          >
            <Zap className="w-4 h-4 text-[#C69A42]" />
            <span>1-Click Instant Demo Analyst Access →</span>
          </button>

          <div className="relative flex items-center justify-center">
            <span className="w-full border-t border-[#E5DCCB] dark:border-[#2E2820]" />
            <span className="bg-white dark:bg-[#16130F] px-3 font-mono text-[10px] text-[#777064] uppercase tracking-wider relative">
              Or Credentials
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl border border-[#B42332]/30 bg-[#B42332]/10 text-[#B42332] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-mono font-medium uppercase text-[#777064] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777064]" />
                  <input
                    type="text"
                    required
                    placeholder="Analyst Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E] pl-9 pr-3 py-2.5 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-medium uppercase text-[#777064] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777064]" />
                <input
                  type="email"
                  required
                  placeholder="analyst@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E] pl-9 pr-3 py-2.5 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium uppercase text-[#777064] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#777064]" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#E5DCCB] dark:border-[#332B20] bg-[#FBF8F0]/40 dark:bg-[#12100E] pl-9 pr-3 py-2.5 text-xs text-[#242019] dark:text-[#FBF8F0] focus:outline-none focus:border-[#C69A42]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl btn-gold-shimmer text-xs uppercase font-bold tracking-wider border border-[#C69A42] shadow-sm hover:shadow-md transition cursor-pointer"
            >
              {loading ? 'Authenticating...' : isRegister ? 'Complete Registration' : 'Sign In to Workspace'}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#777064]">
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-[#906727] dark:text-[#EAD6A0] font-semibold hover:underline"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Need an analyst account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-[#906727] dark:text-[#EAD6A0] font-semibold hover:underline"
                >
                  Create one now
                </button>
              </span>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
