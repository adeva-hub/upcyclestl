import { useRef, useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 50); return () => clearTimeout(t); }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0" style={{ transform: 'scale(1.1)' }}>
        <img
          src="https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Fabric studio with textiles and sewing tools"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-stone-900/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-900/80" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1
          className="font-editorial text-cream-100 text-6xl md:text-8xl lg:text-[10rem] leading-none font-light mb-8 text-balance transition-all duration-1000"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(32px)', transitionDelay: '400ms' }}
        >
          Boundless
          <br />
          <em>Possibilities.</em>
        </h1>

        <p
          className="text-cream-300 font-sans font-light text-base md:text-lg max-w-md mx-auto leading-relaxed mb-12 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '700ms' }}
        >
          Every stitch begins with something forgotten.
          <br />
          Every collection tells a new story.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 transition-all duration-700"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '900ms' }}
        >
          <a
            href="#collections"
            className="px-10 py-4 border border-cream-200 text-cream-100 text-xs tracking-widest uppercase font-medium hover:bg-cream-100 hover:text-stone-900 transition-all duration-500"
          >
            Explore Collection
          </a>
          <a
            href="#process"
            className="px-10 py-4 text-cream-200 text-xs tracking-widest uppercase font-medium hover:text-cream-100 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            Inside the Studio
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="text-cream-300 w-5 h-5" />
      </div>
    </section>
  );
}
