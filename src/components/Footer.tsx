import { useInView } from '../hooks/useInView';
import { useState } from 'react';
import { Instagram, Mail, ArrowRight } from 'lucide-react';

export function Footer() {
  const { ref, inView } = useInView();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  const fade = (delay: string) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease ${delay}, transform 0.8s ease ${delay}`,
  });

  return (
    <footer ref={ref as React.RefObject<HTMLElement>} className="bg-stone-900 text-cream-200 px-6 pt-24 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter */}
        <div className="grid md:grid-cols-2 gap-16 mb-20 pb-20 border-b border-stone-800" style={fade('0s')}>
          <div>
            <p className="text-brick-400 tracking-ultrawide uppercase text-xs font-sans font-medium mb-6">Newsletter</p>
            <h3 className="font-editorial text-cream-100 text-4xl md:text-5xl font-light leading-none mb-6">
              Stories from
              <br />
              <em>the studio.</em>
            </h3>
            <p className="text-stone-400 text-sm font-light leading-relaxed max-w-sm">
              Behind-the-seams updates, new arrivals, material finds, and collection launches. No noise, just craft.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            {submitted ? (
              <div className="text-center">
                <p className="font-editorial text-cream-100 text-2xl font-light italic mb-2">Thank you.</p>
                <p className="text-stone-400 text-sm">You'll hear from us soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-0 border-b border-stone-600 focus-within:border-brick-400 transition-colors duration-300">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 bg-transparent text-cream-200 placeholder-stone-500 py-4 text-sm font-light outline-none"
                    required
                  />
                  <button type="submit" className="py-4 text-brick-400 hover:text-brick-300 transition-colors duration-300" aria-label="Subscribe">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-stone-600 text-xs">No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>
        </div>

        {/* Links */}
        <div className="grid md:grid-cols-4 gap-10 mb-16" style={fade('0.2s')}>
          <div className="md:col-span-1">
            <p className="font-editorial text-cream-100 text-2xl font-light italic mb-1">Upcycle STL</p>
            <p className="text-stone-500 text-xs tracking-widest uppercase">Made in St. Louis.</p>
          </div>
          <div>
            <p className="text-stone-500 text-xs tracking-widest uppercase font-medium mb-4">Shop</p>
            <ul className="space-y-3">
              {['One // One', 'Small Batch', 'Studio Experiments', 'All Pieces'].map(l => (
                <li key={l}><a href="#" className="text-stone-300 text-sm font-light hover:text-cream-100 transition-colors duration-200">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-stone-500 text-xs tracking-widest uppercase font-medium mb-4">Studio</p>
            <ul className="space-y-3">
              {['Our Process', 'Material Library', 'Sustainability', 'Journal'].map(l => (
                <li key={l}><a href="#" className="text-stone-300 text-sm font-light hover:text-cream-100 transition-colors duration-200">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-stone-500 text-xs tracking-widest uppercase font-medium mb-4">Connect</p>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center gap-2 text-stone-300 text-sm font-light hover:text-cream-100 transition-colors duration-200">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-stone-300 text-sm font-light hover:text-cream-100 transition-colors duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.97a8.19 8.19 0 0 0 4.79 1.53V8.05a4.85 4.85 0 0 1-1.02-.14z"/></svg>
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-stone-300 text-sm font-light hover:text-cream-100 transition-colors duration-200">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.38.04-3.4.22-.93 1.45-6.14 1.45-6.14s-.37-.74-.37-1.83c0-1.72.99-3 2.5-3 1.17 0 1.74.88 1.74 1.94 0 1.18-.75 2.95-1.14 4.59-.33 1.37.68 2.49 2.03 2.49 2.43 0 4.06-3.12 4.06-6.81 0-2.8-1.9-4.77-4.62-4.77-3.14 0-4.98 2.36-4.98 4.8 0 .95.36 1.97.82 2.53a.33.33 0 0 1 .08.31c-.08.35-.27 1.1-.31 1.26-.05.2-.17.24-.38.15-1.42-.66-2.31-2.74-2.31-4.41 0-3.59 2.61-6.88 7.53-6.88 3.95 0 7.02 2.81 7.02 6.57 0 3.92-2.47 7.07-5.9 7.07-1.15 0-2.23-.6-2.6-1.3l-.71 2.64c-.25.98-.94 2.2-1.41 2.95A12 12 0 1 0 12 0z"/></svg>
                  Pinterest
                </a>
              </li>
              <li>
                <a href="mailto:hello@upcyclestl.com" className="flex items-center gap-2 text-stone-300 text-sm font-light hover:text-cream-100 transition-colors duration-200">
                  <Mail className="w-4 h-4" /> Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={fade('0.4s')}>
          <p className="text-stone-600 text-xs">&copy; {new Date().getFullYear()} Upcycle STL. All rights reserved.</p>
          <p className="text-stone-600 text-xs tracking-wide">Made in St. Louis.</p>
        </div>
      </div>
    </footer>
  );
}
