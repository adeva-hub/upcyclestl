import { useInView } from '../hooks/useInView';

const garments = [
  {
    name: 'Residual Form No. 1',
    materials: 'Vintage denim, deadstock linen, brass hardware',
    story: 'Constructed from three denim jackets found at separate estate sales, this piece merges fragments of different decades into a unified silhouette.',
    image: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=800',
    oneOfOne: true,
    href: 'https://www.depop.com',
    external: true,
  },
  {
    name: 'Archive Coat',
    materials: 'Reclaimed wool suiting, vintage buttons, silk lining scraps',
    story: 'The silk lining came from a 1960s wedding gown. The buttons from a hotel uniform collection. Together, they tell a story of ceremony.',
    image: 'https://images.pexels.com/photos/7691167/pexels-photo-7691167.jpeg?auto=compress&cs=tinysrgb&w=800',
    oneOfOne: true,
    href: 'https://www.depop.com',
    external: true,
  },
  {
    name: 'Patchwork Reverie',
    materials: 'Statement scraps, deadstock velvet, upcycled zippers',
    story: 'Forty-seven individual fabric pieces joined by hand. Each scrap carries its own history; together they form something entirely new.',
    image: 'https://images.pexels.com/photos/5710082/pexels-photo-5710082.jpeg?auto=compress&cs=tinysrgb&w=800',
    oneOfOne: true,
    href: 'https://www.vinted.com',
    external: true,
  },
  {
    name: 'Strata Jacket',
    materials: 'Mixed deadstock cotton, reclaimed canvas, antique trim',
    story: "Layered construction inspired by geological strata — each visible seam is intentional, revealing the garment's material history.",
    image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800',
    oneOfOne: false,
    href: '#collections',
    external: false,
  },
];

export function FeaturedGarments() {
  const { ref, inView } = useInView();

  return (
    <section id="garments" className="py-24 md:py-40 px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto">
        <div
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div>
            <p className="text-brick-500 tracking-ultrawide uppercase text-xs font-sans font-medium mb-4">Featured Garments</p>
            <h2 className="font-editorial text-cream-100 text-5xl md:text-6xl leading-none font-light">
              Objects with
              <br />
              <em className="text-brick-500">memory.</em>
            </h2>
          </div>
          <p className="text-stone-500 font-light max-w-xs text-sm leading-relaxed">
            Each garment carries the history of its materials — every thread, every seam, every button tells a story.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {garments.map((g, i) => (
            <a
              key={g.name}
              href={g.href}
              target={g.external ? '_blank' : undefined}
              rel={g.external ? 'noopener noreferrer' : undefined}
              className="group block"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.8s ease ${i * 0.12}s, transform 0.8s ease ${i * 0.12}s`,
              }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                <img
                  src={g.image}
                  alt={g.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {g.oneOfOne && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-brick-500 text-cream-100 text-xs tracking-widest uppercase px-3 py-1.5 rounded-full font-medium">
                      One-of-One
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-editorial text-cream-100 text-2xl md:text-3xl font-light mb-2 group-hover:text-brick-400 transition-colors duration-300">{g.name}</h3>
                <p className="text-brick-500 text-xs tracking-widest uppercase font-medium font-sans mb-3">{g.materials}</p>
                <p className="text-stone-500 text-sm font-light leading-relaxed">{g.story}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
