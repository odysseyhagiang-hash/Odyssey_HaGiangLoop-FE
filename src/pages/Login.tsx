import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { apiLogin } from '../lib/api';

const REMEMBERED_USER_KEY = 'remembered_user';
const REMEMBER_ME_KEY = 'remember_me_checked';

export function Login() {
  const navigate = useNavigate();

  // Load remembered username & rememberMe state from localStorage on mount
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem(REMEMBERED_USER_KEY);
    const savedRemember = localStorage.getItem(REMEMBER_ME_KEY);
    if (savedUser) {
      setUsername(savedUser);
    }
    if (savedRemember === 'true') {
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    try {
      const result = await apiLogin(username.trim(), password, rememberMe);

      if (result.success) {
        // Lưu hoặc xóa remembered username dựa trên checkbox
        if (rememberMe) {
          localStorage.setItem(REMEMBERED_USER_KEY, username.trim());
          localStorage.setItem(REMEMBER_ME_KEY, 'true');
        } else {
          localStorage.removeItem(REMEMBERED_USER_KEY);
          localStorage.removeItem(REMEMBER_ME_KEY);
        }

        sessionStorage.setItem('admin_authenticated', 'true');
        navigate('/admin');
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-forest-900 px-6 py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,41,29,0.3),rgba(2,21,15,1))] z-0" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/backgrounds_section/background-TravelExperience.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 w-full max-w-[420px] rounded-5xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="text-center">
          <img
            src="/logo/logo.webp"
            alt="Odyssey logo"
            className="mx-auto h-16 w-16 rounded-full border border-white/10 object-cover mb-4"
          />
          <h1 className="mt-3 font-display text-3xl font-normal tracking-tight">Odyssey Dashboard</h1>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </p>
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-2">Username</label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              placeholder="Enter your username"
              autoComplete="username"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-gold-300/40 focus:ring-1 focus:ring-gold-300/40"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-2">Password</label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white placeholder-white/20 outline-none transition focus:border-gold-300/40 focus:ring-1 focus:ring-gold-300/40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors focus-visible:outline-none"
              >
                {showPassword
                  ? <EyeOff className="h-4 w-4" aria-hidden="true" />
                  : <Eye className="h-4 w-4" aria-hidden="true" />
                }
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="checkbox"
              aria-checked={rememberMe}
              id="remember-me"
              onClick={() => setRememberMe(!rememberMe)}
              className={`
                relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200
                ${rememberMe
                  ? 'border-gold-300/60 bg-gold-300/20'
                  : 'border-white/20 bg-white/5 hover:border-white/30'
                }
              `}
            >
              {rememberMe && (
                <svg className="h-3 w-3 text-gold-300" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </button>
            <label
              htmlFor="remember-me"
              onClick={() => setRememberMe(!rememberMe)}
              className="cursor-pointer select-none text-xs text-white/50 hover:text-white/70 transition-colors"
            >
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            variant="gold"
            className="w-full mt-4 py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </span>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
