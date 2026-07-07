import { useInView } from '../hooks/useInView';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: '01',
    name: 'One // One',
    subtitle: 'Wearable Art',
    description: 'Completely unique wearable art. Every garment exists only once.',
    image: 'https://images.pexels.com/photos/7691053/pexels-photo-7691053.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'One-of-One',
    href: 'https://www.depop.com',
    external: true,
  },
  {
    id: '02',
    name: 'Small Batch',
    subtitle: 'Limited Edition',
    description: 'Limited collections made from reclaimed materials. Designed in small quantities.',
    image: 'https://images.pexels.com/photos/5705499/pexels-photo-5705499.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Limited Run',
    href: 'https://www.vinted.com',
    external: true,
  },
  {
    id: '03',
    name: 'Studio Experiments',
    subtitle: 'Creative Explorations',
    description: 'Creative explorations, prototypes, and artistic concepts pushing the boundaries of upcycled fashion.',
    image: 'https://images.pexels.com/photos/6567620/pexels-photo-6567620.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Experimental',
    href: '#about',
    external: false,
  },
];

export function Collections() {
  const { ref, inView } = useInView();

  const fade = (delay: string) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(48px)',
    transition: `opacity 0.8s ease ${delay}, transform 0.8s ease ${delay}`,
  });

  return (
    <section id="collections" className="py-24 md:py-40 bg-stone-900 px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20" style={fade('0s')}>
          <p className="text-brick-400 tracking-ultrawide uppercase text-xs font-sans font-medium mb-4">Collections</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-editorial text-cream-100 text-5xl md:text-7xl leading-none font-light">
              Each piece,
              <br />
              <em>a singular story.</em>
            </h2>
            <p className="text-stone-400 font-light max-w-xs text-sm leading-relaxed">
              Every collection emerges from the materials themselves — no two pieces are ever alike.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {collections.map((col, i) => (
            <a
              key={col.id}
              href={col.href}
              target={col.external ? '_blank' : undefined}
              rel={col.external ? 'noopener noreferrer' : undefined}
              className="group cursor-pointer block"
              style={fade(`${i * 0.15}s`)}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl mb-6 relative">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-brick-500 text-cream-100 text-xs tracking-widest uppercase px-3 py-1 rounded-full font-medium">
                    {col.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-cream-100 rounded-full p-2">
                    <ArrowRight className="w-4 h-4 text-stone-900" />
                  </div>
                </div>
              </div>
              <p className="text-stone-500 text-xs tracking-widest uppercase font-medium mb-1">{col.id} — {col.subtitle}</p>
              <h3 className="font-editorial text-cream-100 text-2xl font-light mb-3">{col.name}</h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">{col.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
