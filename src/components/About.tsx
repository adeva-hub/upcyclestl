import { useInView } from '../hooks/useInView';

export function About() {
  const { ref, inView } = useInView();

  const fade = (delay: string) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s ease ${delay}, transform 0.8s ease ${delay}`,
  });

  return (
    <section id="about" className="py-32 md:py-48 px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div style={fade('0s')}>
          <p className="text-brick-500 tracking-ultrawide uppercase text-xs font-sans font-medium mb-6">
            Our Process
          </p>
          <h2 className="font-editorial text-cream-100 text-5xl md:text-6xl lg:text-7xl leading-none mb-8 font-light">
            Design from
            <br />
            <em className="text-brick-500">possibility.</em>
          </h2>
          <div className="space-y-5 text-stone-600 font-light leading-relaxed text-base md:text-lg">
            <p>Upcycle STL begins with materials already in existence.</p>
            <p>Every fabric, scrap, garment, zipper, button, and thread is thoughtfully cataloged before design begins.</p>
            <p>Rather than creating from new resources, we design from possibility.</p>
            <p>Each finished garment is a conversation between history and innovation.</p>
          </div>
          <div className="mt-10 pt-10 border-t border-stone-700 grid grid-cols-2 gap-8">
            {([['Nothing is waste.', 'Everything is potential.'], ['Every material', 'has another life.']] as [string, string][]).map(([l1, l2], i) => (
              <div key={i}>
                <p className="font-editorial text-brick-500 text-xl font-medium italic">{l1}</p>
                <p className="font-editorial text-stone-300 text-xl">{l2}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...fade('0.15s'), position: 'relative' }}>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Sewing studio with fabrics and tools"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
