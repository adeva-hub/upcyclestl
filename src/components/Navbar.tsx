import { useState, useEffect } from 'react';
import { Menu, X, User, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { href: '#about', label: 'Process' },
  { href: '#collections', label: 'Collections' },
  { href: '#materials', label: 'Materials' },
  { href: '#garments', label: 'Garments' },
  { href: '#journal', label: 'Journal' },
];

interface NavbarProps {
  onLoginOpen: () => void;
}

export function Navbar({ onLoginOpen }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close account dropdown on outside click
  useEffect(() => {
    if (!accountOpen) return;
    const close = () => setAccountOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [accountOpen]);

  const handleAccountClick = () => {
    if (user?.role === 'admin') navigate('/admin');
    else if (user?.role === 'user') navigate('/account');
    else onLoginOpen();
    setAccountOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-stone-900/95 backdrop-blur-md shadow-sm border-b border-stone-800' : 'bg-transparent'}`}
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(-80px)',
          transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s, background-color 0.5s ease, box-shadow 0.5s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center">
          {/* Left — spacer */}
          <div className="flex-1" />

          {/* Center — nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={`text-xs tracking-widest uppercase font-medium transition-colors duration-300 whitespace-nowrap ${scrolled ? 'text-stone-300 hover:text-brick-400' : 'text-cream-200 hover:text-cream-100'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right — account control */}
          <div className="flex-1 hidden md:flex items-center justify-end gap-3">
            {user ? (
              <div className="relative" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setAccountOpen(v => !v)}
                  className={`flex items-center gap-2 text-xs tracking-widest uppercase font-medium transition-colors duration-300 px-3 py-2 rounded-lg ${scrolled ? 'text-stone-300 hover:text-cream-100 hover:bg-stone-800' : 'text-cream-200 hover:text-cream-100 hover:bg-white/10'}`}
                >
                  <User className="w-4 h-4" />
                  {user.name.split(' ')[0]}
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-stone-800 border border-stone-700 rounded-xl shadow-2xl overflow-hidden z-50">
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => { navigate('/admin'); setAccountOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-200 hover:bg-stone-700 hover:text-cream-100 transition-colors duration-150"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brick-400" />
                        Admin Dashboard
                      </button>
                    ) : (
                      <button
                        onClick={() => { navigate('/account'); setAccountOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-200 hover:bg-stone-700 hover:text-cream-100 transition-colors duration-150"
                      >
                        <User className="w-4 h-4 text-brick-400" />
                        My Account
                      </button>
                    )}
                    <button
                      onClick={() => { logout(); setAccountOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-400 hover:bg-stone-700 hover:text-cream-100 border-t border-stone-700 transition-colors duration-150"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginOpen}
                className={`flex items-center gap-2 text-xs tracking-widest uppercase font-medium transition-colors duration-300 px-3 py-2 rounded-lg ${scrolled ? 'text-stone-300 hover:text-cream-100 hover:bg-stone-800' : 'text-cream-200 hover:text-cream-100 hover:bg-white/10'}`}
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          <button className="md:hidden ml-auto" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="w-6 h-6 text-cream-100" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[100] bg-stone-900 flex flex-col transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-center justify-between px-6 h-16">
          <span className="font-editorial text-cream-100 text-xl italic">Upcycle STL</span>
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X className="w-6 h-6 text-cream-200" />
          </button>
        </div>
        <nav className="flex flex-col items-start justify-center flex-1 px-6 gap-8">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-editorial text-cream-100 text-4xl font-light hover:text-brick-400 transition-colors duration-200"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.3s ease ${i * 0.07 + 0.1}s, transform 0.3s ease ${i * 0.07 + 0.1}s`,
              }}
            >
              {l.label}
            </a>
          ))}
          <div
            className="pt-4 border-t border-stone-800 w-full"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transition: `opacity 0.3s ease 0.5s`,
            }}
          >
            {user ? (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => { handleAccountClick(); setMobileOpen(false); }}
                  className="flex items-center gap-3 text-cream-200 text-sm tracking-widest uppercase font-medium"
                >
                  <User className="w-4 h-4 text-brick-400" />
                  {user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
                </button>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="flex items-center gap-3 text-stone-400 text-sm tracking-widest uppercase font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onLoginOpen(); setMobileOpen(false); }}
                className="flex items-center gap-3 text-cream-200 text-sm tracking-widest uppercase font-medium"
              >
                <User className="w-4 h-4 text-brick-400" />
                Sign In
              </button>
            )}
          </div>
        </nav>
        <div className="px-6 pb-8">
          <p className="text-stone-500 text-xs tracking-widest uppercase">Made in St. Louis.</p>
        </div>
      </div>
    </>
  );
}
