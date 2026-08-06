import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Bypassed login logic - just click login to authenticate!
    sessionStorage.setItem('admin_authenticated', 'true');
    navigate('/admin');
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
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-gold-300/40 focus:ring-1 focus:ring-gold-300/40"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-white/60 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-gold-300/40 focus:ring-1 focus:ring-gold-300/40"
            />
          </div>

          <Button type="submit" variant="gold" className="w-full mt-4 py-3">
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}
