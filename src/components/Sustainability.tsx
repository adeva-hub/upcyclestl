import { useInView } from '../hooks/useInView';
import { Recycle, Shirt, Package, Layers } from 'lucide-react';

const stats = [
  { icon: Recycle, value: '2,400+', label: 'Textiles Reclaimed', unit: 'pounds' },
  { icon: Shirt, value: '850+', label: 'Garments Saved', unit: 'pieces' },
  { icon: Package, value: '600+', label: 'Fabric Diverted', unit: 'yards from landfill' },
  { icon: Layers, value: '180+', label: 'Pieces Created', unit: 'and counting' },
];

export function Sustainability() {
  const { ref, inView } = useInView();

  return (
    <section id="sustainability" className="py-24 md:py-40 bg-stone-900 px-6 relative overflow-hidden" ref={ref as React.RefObject<HTMLElement>}>
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.pexels.com/photos/6559528/pexels-photo-6559528.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div
          className="text-center mb-20 md:mb-28"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="text-brick-400 tracking-ultrawide uppercase text-xs font-sans font-medium mb-4">Impact</p>
          <h2 className="font-editorial text-cream-100 text-5xl md:text-7xl leading-none font-light max-w-3xl mx-auto">
            Designed from what
            <br />
            <em className="text-brick-400">already exists.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${0.1 + i * 0.12}s, transform 0.7s ease ${0.1 + i * 0.12}s`,
              }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-brick-700 mb-6">
                <s.icon className="w-5 h-5 text-brick-400" />
              </div>
              <p className="font-editorial text-cream-100 text-4xl md:text-5xl font-light mb-2">{s.value}</p>
              <p className="text-stone-300 text-sm font-medium mb-1">{s.label}</p>
              <p className="text-stone-500 text-xs uppercase tracking-wide">{s.unit}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-20 md:mt-28 border-t border-stone-800 pt-16 grid md:grid-cols-3 gap-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
          }}
        >
          {[
            ['Local', "Everything is sourced and made in St. Louis. Our supply chain is the city itself."],
            ['Zero-Waste Design', "We design to use every scrap. What doesn't become a garment becomes part of the next one."],
            ['Community', 'We partner with local donation drives, thrift stores, and community members to source materials.'],
          ].map(([title, body]) => (
            <div key={title}>
              <h4 className="font-editorial text-cream-200 text-xl mb-3 font-light">{title}</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
