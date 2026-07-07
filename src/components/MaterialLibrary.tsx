import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const materials = [
  { name: 'Deadstock Fabrics', count: '400+ yds', image: 'https://images.pexels.com/photos/6559528/pexels-photo-6559528.jpeg?auto=compress&cs=tinysrgb&w=600', href: 'https://www.vinted.com', external: true },
  { name: 'Vintage Garments', count: '200+ pieces', image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=600', href: 'https://www.depop.com', external: true },
  { name: 'Statement Scraps', count: '1,000+ cuts', image: 'https://images.pexels.com/photos/6567379/pexels-photo-6567379.jpeg?auto=compress&cs=tinysrgb&w=600', href: '#about', external: false },
  { name: 'Threads', count: '80+ spools', image: 'https://images.pexels.com/photos/4792071/pexels-photo-4792071.jpeg?auto=compress&cs=tinysrgb&w=600', href: '#about', external: false },
  { name: 'Notions', count: 'Curated', image: 'https://images.pexels.com/photos/6567614/pexels-photo-6567614.jpeg?auto=compress&cs=tinysrgb&w=600', href: '#about', external: false },
  { name: 'Buttons', count: '500+', image: 'https://images.pexels.com/photos/3737637/pexels-photo-3737637.jpeg?auto=compress&cs=tinysrgb&w=600', href: '#about', external: false },
  { name: 'Zippers', count: '150+', image: 'https://images.pexels.com/photos/5709699/pexels-photo-5709699.jpeg?auto=compress&cs=tinysrgb&w=600', href: '#about', external: false },
  { name: 'Trim', count: 'Extensive', image: 'https://images.pexels.com/photos/6567609/pexels-photo-6567609.jpeg?auto=compress&cs=tinysrgb&w=600', href: '#about', external: false },
  { name: 'Experimental Textiles', count: 'Rotating', image: 'https://images.pexels.com/photos/4792072/pexels-photo-4792072.jpeg?auto=compress&cs=tinysrgb&w=600', href: 'https://www.instagram.com', external: true },
];

export function MaterialLibrary() {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="materials" className="py-24 md:py-40 px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto">
        <div
          className="mb-16 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="text-brick-500 tracking-ultrawide uppercase text-xs font-sans font-medium mb-4">Material Library</p>
          <h2 className="font-editorial text-cream-100 text-5xl md:text-6xl leading-none font-light">
            The raw<em className="text-brick-500"> archive.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {materials.map((mat, i) => (
            <a
              key={mat.name}
              href={mat.href}
              target={mat.external ? '_blank' : undefined}
              rel={mat.external ? 'noopener noreferrer' : undefined}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative overflow-hidden rounded-xl cursor-pointer block"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1)' : 'scale(0.95)',
                transition: `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`,
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: hovered === i ? 'scale(1.1)' : 'scale(1)' }}
                />
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-500"
                style={{ background: hovered === i ? 'rgba(13,13,13,0.80)' : 'linear-gradient(to top, rgba(13,13,13,0.65) 0%, rgba(13,13,13,0.2) 50%, transparent 100%)' }}
              >
                <p className="text-cream-100 font-serif text-lg md:text-xl font-light transition-transform duration-300" style={{ transform: hovered === i ? 'translateY(0)' : 'translateY(4px)' }}>
                  {mat.name}
                </p>
                <p
                  className="text-brick-300 text-xs tracking-widest uppercase font-medium mt-1 transition-all duration-300"
                  style={{ opacity: hovered === i ? 1 : 0, transform: hovered === i ? 'translateY(0)' : 'translateY(8px)' }}
                >
                  {mat.count}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
