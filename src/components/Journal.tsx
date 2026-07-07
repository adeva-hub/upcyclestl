import { useInView } from '../hooks/useInView';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    category: 'Behind the Seams',
    title: 'Deconstructing a 1970s Suede Jacket',
    excerpt: "What happens when a garment arrives that's too far gone to wear but too beautiful to discard? We take it apart piece by piece.",
    date: 'June 2026',
    image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=700',
    featured: true,
    href: '#about',
    external: false,
  },
  {
    category: 'Studio Notes',
    title: 'The Archive: How We Catalog 2,000 Fabric Pieces',
    excerpt: "Our cataloging system started on a napkin. It's evolved into something we're genuinely proud of.",
    date: 'May 2026',
    image: 'https://images.pexels.com/photos/6551140/pexels-photo-6551140.jpeg?auto=compress&cs=tinysrgb&w=700',
    featured: false,
    href: '#materials',
    external: false,
  },
  {
    category: 'Material Stories',
    title: 'The Wedding Dress We Found at a St. Louis Estate Sale',
    excerpt: "Seventy years of history, held in silk satin. We'll tell you what became of it.",
    date: 'April 2026',
    image: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=700',
    featured: false,
    href: 'https://www.instagram.com',
    external: true,
  },
  {
    category: 'Collection Launch',
    title: 'Introducing: Small Batch No. 3',
    excerpt: 'Twelve pieces. Sourced entirely from a single estate. Available this weekend.',
    date: 'March 2026',
    image: 'https://images.pexels.com/photos/7691053/pexels-photo-7691053.jpeg?auto=compress&cs=tinysrgb&w=700',
    featured: false,
    href: 'https://www.depop.com',
    external: true,
  },
];

export function Journal() {
  const { ref, inView } = useInView();

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <section id="journal" className="py-24 md:py-40 bg-stone-900 px-6" ref={ref as React.RefObject<HTMLElement>}>
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
            <p className="text-brick-500 tracking-ultrawide uppercase text-xs font-sans font-medium mb-4">Journal</p>
            <h2 className="font-editorial text-cream-100 text-5xl md:text-6xl leading-none font-light">
              The studio
              <br />
              <em className="text-brick-500">in words.</em>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-brick-500 text-xs tracking-widest uppercase font-medium hover:gap-4 transition-all duration-300">
            All Stories <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured post */}
        <a
          href={featured.href}
          target={featured.external ? '_blank' : undefined}
          rel={featured.external ? 'noopener noreferrer' : undefined}
          className="group grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 cursor-pointer block"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
          }}
        >
          <div className="aspect-[16/10] md:h-96 rounded-2xl overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-brick-500 text-xs tracking-widest uppercase font-medium font-sans mb-4">{featured.category}</span>
            <h3 className="font-editorial text-cream-100 text-3xl md:text-4xl font-light leading-snug mb-4 group-hover:text-brick-400 transition-colors duration-300">
              {featured.title}
            </h3>
            <p className="text-stone-500 font-light leading-relaxed mb-6">{featured.excerpt}</p>
            <div className="flex items-center gap-4">
              <span className="text-stone-400 text-sm">{featured.date}</span>
              <div className="flex items-center gap-2 text-brick-500 text-xs tracking-widest uppercase font-medium">
                Read <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </a>

        {/* Secondary posts */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 border-t border-stone-800 pt-12">
          {rest.map((post, i) => (
            <a
              key={post.title}
              href={post.href}
              target={post.external ? '_blank' : undefined}
              rel={post.external ? 'noopener noreferrer' : undefined}
              className="group cursor-pointer block"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
              }}
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-brick-500 text-xs tracking-widest uppercase font-medium font-sans mb-2 block">{post.category}</span>
              <h3 className="font-editorial text-cream-100 text-xl font-light mb-2 group-hover:text-brick-400 transition-colors duration-300 leading-snug">
                {post.title}
              </h3>
              <p className="text-stone-500 text-sm font-light leading-relaxed line-clamp-2">{post.excerpt}</p>
              <p className="text-stone-400 text-xs mt-3">{post.date}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
