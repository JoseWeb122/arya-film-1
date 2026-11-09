import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useRef } from 'react';
import { imagery } from '../data';
import { Button, Reveal, scrollToId, SectionHeading, SmartImage } from './Primitives';

const divisions = [
  {
    number: '01',
    title: 'Film Production',
    description: 'Developing and producing compelling visual stories for film and entertainment audiences.',
    image: imagery.production,
    alt: 'Camera operator silhouetted against cinematic production lighting',
    target: 'work',
  },
  {
    number: '02',
    title: 'Film Distribution',
    description: 'Connecting stories with audiences through thoughtful distribution and entertainment opportunities.',
    image: imagery.distribution,
    alt: 'Empty cinema illuminated by a dramatic projector beam',
    target: 'work',
  },
  {
    number: '03',
    title: 'Talent & Music Management',
    description: 'Supporting exceptional creative talent and musical artists through professional representation, management, and creative opportunities.',
    image: imagery.talentDivision,
    alt: 'Vocalist performing into a studio microphone in monochrome',
    target: 'talent',
  },
];

export function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-24 text-charcoal sm:py-32 lg:py-44">
      <div className="site-shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <Reveal y={30}>
            <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-[5/6] lg:aspect-[4/5]">
              <motion.div className="absolute -inset-y-[10%] inset-x-0" style={reduce ? undefined : { y }}>
                <SmartImage
                  src={imagery.about}
                  alt="Film crew collaborating around a camera on a professional set"
                  className="image-mono h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[0.5rem] uppercase tracking-[0.22em] text-white/70 sm:bottom-7 sm:left-7 sm:right-7">
                <span>Independent by design</span>
                <span>Film / Music / Talent</span>
              </div>
            </div>
          </Reveal>
          <motion.div
            className="absolute -right-4 -top-8 hidden font-display text-[9rem] leading-none text-black/[0.055] lg:block"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            aria-hidden="true"
          >
            A
          </motion.div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading eyebrow="Who we are" title="Creativity without boundaries." />
          <Reveal delay={0.12}>
            <div className="mt-8 space-y-5 text-sm leading-7 text-black/65 sm:text-[0.95rem] sm:leading-8">
              <p>
                Arya Worldwide Entertainment is an independent entertainment company focused on film production, distribution, and the representation and management of exceptional creative talent.
              </p>
              <p>
                From developing compelling screen stories to supporting musical artists, we bring creative vision and professional execution together to create meaningful entertainment experiences.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <blockquote className="my-10 border-y border-black/15 py-7 font-display text-[1.65rem] italic leading-[1.2] text-black/85 sm:text-3xl">
              “Great stories deserve to be seen. Exceptional talent deserves to be heard.”
            </blockquote>
            <Button variant="text-dark" onClick={() => scrollToId('divisions')}>Discover Arya</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Divisions() {
  return (
    <section id="divisions" className="overflow-hidden bg-ink py-24 sm:py-32 lg:py-40">
      <div className="site-shell">
        <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end lg:mb-20">
          <SectionHeading
            eyebrow="Our creative divisions"
            title="One vision. Three disciplines."
            light
            className="max-w-4xl"
          />
          <Reveal delay={0.12} className="max-w-xs">
            <p className="text-xs uppercase leading-6 tracking-[0.18em] text-white/45">
              From the first creative impulse to the audience experience.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
          {divisions.map((division, index) => (
            <Reveal key={division.number} delay={index * 0.1} className={index === 1 ? 'md:mt-16' : index === 2 ? 'md:mt-32' : ''}>
              <button
                type="button"
                onClick={() => scrollToId(division.target)}
                className="group relative block h-[68vh] min-h-[520px] w-full overflow-hidden text-left md:h-[62vw] md:max-h-[760px] md:min-h-[540px]"
                aria-label={`${division.title} — explore relevant section`}
              >
                <SmartImage
                  src={division.image}
                  alt={division.alt}
                  className="image-mono absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.075]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/25 transition-colors duration-700 group-hover:from-black/95" />
                <div className="absolute inset-0 border border-white/0 transition-colors duration-700 group-hover:border-white/25" />
                <div className="relative flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between text-[0.55rem] uppercase tracking-[0.24em] text-white/60">
                    <span>Division {division.number}</span>
                    <span className="h-px w-8 bg-white/45 transition-all duration-500 group-hover:w-14 group-hover:bg-white" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="max-w-xs font-display text-[2.4rem] uppercase leading-[0.94] tracking-[-0.025em] text-white sm:text-5xl md:text-[clamp(2rem,3vw,3.7rem)]">
                      {division.title}
                    </h3>
                    <p className="mt-5 max-w-sm text-xs leading-6 text-white/60 transition-colors duration-500 group-hover:text-white/80 sm:text-sm">
                      {division.description}
                    </p>
                    <div className="mt-7 flex items-center justify-between border-t border-white/25 pt-5 text-[0.55rem] uppercase tracking-[0.22em] text-white">
                      Explore division
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 transition-all duration-500 group-hover:border-white group-hover:bg-white group-hover:text-black">
                        <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5" strokeWidth={1.3} />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
