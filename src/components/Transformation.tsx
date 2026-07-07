import { useInView } from '../hooks/useInView';

const steps = [
  { step: '01', label: 'Collected', description: 'Textiles and garments gathered from donations, estates, and wholesale sources across the region.' },
  { step: '02', label: 'Organized', description: 'Every piece is sorted, cataloged, and assessed for creative potential.' },
  { step: '03', label: 'Designed', description: 'Garments emerge from the materials themselves — form following possibility.' },
  { step: '04', label: 'Deconstructed', description: 'Existing garments are carefully taken apart, preserving every usable element.' },
  { step: '05', label: 'Reconstructed', description: 'New forms are created through cutting, stitching, and structural innovation.' },
  { step: '06', label: 'Finished', description: 'Final details, closures, and finishing touches bring the garment to completion.' },
  { step: '07', label: 'Given New Life', description: 'Each piece finds its wearer — the final act of transformation is complete.' },
];

export function Transformation() {
  const { ref, inView } = useInView();

  return (
    <section id="process" className="py-24 md:py-40 bg-stone-900 px-6" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-5xl mx-auto">
        <div
          className="mb-16 md:mb-24"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="text-brick-500 tracking-ultrawide uppercase text-xs font-sans font-medium mb-4">The Transformation</p>
          <h2 className="font-editorial text-cream-100 text-5xl md:text-6xl leading-none font-light">
            From discarded
            <br />
            <em className="text-brick-500">to cherished.</em>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[18px] md:left-[24px] top-3 bottom-3 w-px bg-stone-700" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="flex gap-8 md:gap-12 items-start pl-12 md:pl-16"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`,
                }}
              >
                <div className="absolute left-0 flex items-center justify-center w-9 md:w-12">
                  <div className="w-3 h-3 rounded-full bg-brick-500 ring-4 ring-stone-900 flex-shrink-0" />
                </div>
                <div>
                  <p className="text-brick-500 text-xs tracking-widest uppercase font-medium font-sans mb-1">{s.step}</p>
                  <h3 className="font-editorial text-cream-100 text-2xl md:text-3xl font-light mb-2">{s.label}</h3>
                  <p className="text-stone-500 text-sm font-light leading-relaxed max-w-md">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
