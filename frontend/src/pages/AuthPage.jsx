import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register, demoLogin } = useAuth();

  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgot'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        navigate('/dashboard');
      } else if (mode === 'register') {
        if (!name.trim()) throw new Error('Please enter your full name');
        await register(name, email, password);
        navigate('/dashboard');
      } else if (mode === 'forgot') {
        setSuccessMsg(`Password reset instructions dispatched to ${email}. Check your inbox.`);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAnalyst = async () => {
    setError('');
    setLoading(true);
    try {
      await demoLogin();
      navigate('/dashboard');
    } catch (err) {
      setError('Demo login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white/[0.02] border border-white/[0.12] rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          
          {/* Brand Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.03] flex items-center justify-center text-white mb-3">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 stroke-current">
                <ellipse cx="16" cy="16" rx="13.5" ry="5.2" transform="rotate(-28 16 16)" strokeWidth="1.1" strokeOpacity="0.75" />
                <path d="M16 4.5L24 8V16C24 21.2 16 26.5 16 26.5C16 26.5 8 21.2 8 16V8L16 4.5Z" strokeWidth="1.25" />
                <circle cx="16" cy="16" r="1.5" fill="white" />
              </svg>
            </div>
            <h2 className="text-xl font-light text-white tracking-tight">
              {mode === 'login' ? 'Sign In to 4SLAYERS' : mode === 'register' ? 'Create Security Profile' : 'Reset Credentials'}
            </h2>
            <p className="text-xs text-white/40 mt-1 font-mono">
              {mode === 'login' ? 'Access multi-channel threat console' : mode === 'register' ? 'Join decentralized fraud intelligence' : 'Provide registered email for key recovery'}
            </p>
          </div>

          {/* Quick Demo Analyst CTA Button */}
          <button
            type="button"
            onClick={handleDemoAnalyst}
            disabled={loading}
            className="w-full mb-6 py-2.5 px-4 rounded-full font-mono text-xs uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/20 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>1-Click Demo Analyst Access</span>
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-white/[0.08] w-full"></div>
            <span className="bg-black px-3 text-[10px] font-mono text-white/30 uppercase tracking-widest shrink-0">
              or credentials
            </span>
            <div className="border-t border-white/[0.08] w-full"></div>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 text-xs font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-white/[0.1] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 placeholder:text-white/25 font-mono"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="analyst@4slayers.security"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/[0.1] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 placeholder:text-white/25 font-mono"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[10px] font-mono text-white/40 hover:text-white transition cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-white/[0.1] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 placeholder:text-white/25 font-mono"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black hover:bg-white/90 font-medium flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
            >
              <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Authenticate' : mode === 'register' ? 'Register Profile' : 'Send Reset Link'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] text-center text-xs font-mono text-white/40">
            {mode === 'login' ? (
              <p>
                Don't have an analyst account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-white hover:underline cursor-pointer"
                >
                  Register
                </button>
              </p>
            ) : (
              <p>
                Already have credentials?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-white hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
