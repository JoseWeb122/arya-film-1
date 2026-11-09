import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal, SectionHeading } from './Primitives';

const statements = [
  {
    number: '01',
    title: 'Creative Storytelling',
    description: 'A commitment to meaningful stories and distinctive creative expression.',
  },
  {
    number: '02',
    title: 'Talent & Collaboration',
    description: 'Building relationships with talented individuals and creative professionals.',
  },
  {
    number: '03',
    title: 'Entertainment With Purpose',
    description: 'Bringing film, music, and entertainment experiences together.',
  },
];

export function Why() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['7%', '-10%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-44">
      <motion.p
        className="pointer-events-none absolute left-0 top-10 whitespace-nowrap font-display text-[24vw] uppercase leading-none tracking-[-0.055em] text-white/[0.025]"
        style={reduce ? undefined : { x }}
        aria-hidden="true"
      >
        Vision / Execution / Vision
      </motion.p>
      <div className="site-shell relative">
        <SectionHeading eyebrow="Why Arya Worldwide" title="Where creative vision meets execution." light className="max-w-6xl" />
        <div className="mt-16 sm:mt-24 lg:ml-[18%]">
          {statements.map((statement, index) => (
            <Reveal key={statement.number} delay={index * 0.07}>
              <div className="group grid gap-5 border-t border-white/20 py-9 sm:grid-cols-12 sm:gap-7 sm:py-12">
                <div className="text-[0.55rem] tracking-[0.25em] text-white/35 sm:col-span-2">{statement.number}</div>
                <h3 className="font-display text-4xl uppercase leading-[0.95] text-white sm:col-span-5 sm:text-5xl lg:text-6xl">{statement.title}</h3>
                <p className="max-w-md text-sm leading-7 text-white/55 sm:col-span-5 sm:pt-2">{statement.description}</p>
              </div>
            </Reveal>
          ))}
          <motion.div className="h-px origin-left bg-white/20" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
        </div>
        <Reveal className="mt-16 flex justify-end sm:mt-24">
          <p className="max-w-lg text-right font-display text-2xl italic leading-snug text-white/45 sm:text-3xl">Independent in spirit.<br />International in outlook.<br />Exacting in execution.</p>
        </Reveal>
      </div>
    </section>
  );
}
