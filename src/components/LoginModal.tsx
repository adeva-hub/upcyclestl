import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: Props) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => { setEmail(''); setPassword(''); setError(''); }, 300);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      onClose();
    } else {
      setError(result.error ?? 'Login failed.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] transition-all duration-300"
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      aria-modal="true"
      role="dialog"
      aria-label="Sign in"
    >
      <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="absolute inset-x-0 bottom-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[440px] bg-stone-800 border border-stone-700 rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
        style={{ transform: open ? 'translateY(0)' : 'translateY(40px)' }}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-stone-700">
          <div>
            <p className="text-brick-400 text-xs tracking-ultrawide uppercase font-medium font-sans">Account</p>
            <h2 className="font-editorial text-cream-100 text-2xl font-light mt-0.5">Sign in</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-700 hover:bg-stone-600 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-stone-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div>
            <label className="text-stone-400 text-xs tracking-widest uppercase font-medium block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-stone-900 border border-stone-700 text-cream-100 placeholder-stone-600 px-4 py-3 text-sm font-light focus:outline-none focus:border-brick-500 transition-colors duration-200 rounded-sm"
            />
          </div>
          <div>
            <label className="text-stone-400 text-xs tracking-widest uppercase font-medium block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-stone-900 border border-stone-700 text-cream-100 placeholder-stone-600 px-4 py-3 text-sm font-light focus:outline-none focus:border-brick-500 transition-colors duration-200 rounded-sm"
            />
          </div>

          {error && <p className="text-brick-400 text-sm font-light">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 flex items-center justify-center gap-2 bg-brick-500 hover:bg-brick-600 text-cream-100 text-xs tracking-widest uppercase font-medium transition-all duration-300 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>

          <div className="pt-2 border-t border-stone-700">
            <p className="text-stone-500 text-xs leading-relaxed">
              Demo credentials: <span className="text-stone-400">user@upcyclestl.com / shopper123</span>
              <br />
              Admin: <span className="text-stone-400">admin@upcyclestl.com / admin2026</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
