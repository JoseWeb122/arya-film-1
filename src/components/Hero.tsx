import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import { imagery } from '../data';
import { Button, ease, scrollToId, SmartImage } from './Primitives';

const entrance = {
  hidden: { y: '115%' },
  visible: (delay: number) => ({
    y: '0%',
    transition: { duration: 1.25, delay, ease },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '17%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.045, 1.23]);
  const contentY = useTransform(scrollYProgress, [0, 0.8], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const shadeOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.72]);

  return (
    <section ref={ref} id="home" className="relative h-[100svh] min-h-[680px] overflow-hidden bg-ink" aria-label="Arya Worldwide Entertainment introduction">
      <motion.div
        className="absolute -inset-[8%]"
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0.3 : 2.2, ease }}
      >
        <motion.div
          className="h-full w-full"
          animate={reduce ? undefined : { scale: [1, 1.025, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SmartImage
            src={imagery.hero}
            alt="Silhouetted figure in a dramatically lit cinematic interior"
            className="image-mono h-full w-full object-cover object-[56%_center]"
            fetchPriority="high"
            loading="eager"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.66)_0%,rgba(0,0,0,.1)_34%,rgba(0,0,0,.35)_64%,rgba(0,0,0,.9)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.16)_62%,rgba(0,0,0,.34)_100%)]" />
      <motion.div className="absolute inset-0 bg-black" style={reduce ? { opacity: 0.18 } : { opacity: shadeOpacity }} />
      <div className="film-grain z-[2]" />

      <motion.div
        className="site-shell relative z-10 flex h-full flex-col pb-20 pt-32 sm:pb-24 sm:pt-36"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="flex items-center gap-4 text-[0.52rem] font-medium uppercase leading-5 tracking-[0.27em] text-white/65 sm:text-[0.58rem]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: reduce ? 0 : 0.5, ease }}
        >
          <span className="h-px w-8 bg-white/60 sm:w-12" />
          <span>Arya Worldwide Entertainment<br className="sm:hidden" /><span className="hidden sm:inline"> · </span>Film · Music · Talent</span>
        </motion.div>

        <div className="my-auto pt-8 sm:pt-12">
          <h1 className="font-display text-[clamp(3.3rem,14.2vw,5rem)] font-normal uppercase leading-[0.79] tracking-[-0.045em] text-white sm:text-[clamp(5rem,9.3vw,10.2rem)]">
            <span className="sr-only">Stories that move the world.</span>
            <span className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
              <motion.span className="block" variants={entrance} initial="hidden" animate="visible" custom={reduce ? 0 : 0.28}>
                Stories that
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.09em]" aria-hidden="true">
              <motion.span className="block" variants={entrance} initial="hidden" animate="visible" custom={reduce ? 0 : 0.4}>
                Move the <span className="max-sm:block">world.</span>
              </motion.span>
            </span>
          </h1>
        </div>

        <div className="grid items-end gap-8 border-t border-white/25 pt-6 md:grid-cols-12 md:gap-8 md:pt-7">
          <motion.p
            className="max-w-xl text-[0.82rem] leading-6 text-white/70 sm:text-sm sm:leading-7 md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: reduce ? 0 : 0.85, ease }}
          >
            An independent entertainment company bringing compelling stories, exceptional talent, and creative vision to the screen and beyond.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: reduce ? 0 : 0.98, ease }}
          >
            <Button onClick={() => scrollToId('work')}>Explore our work</Button>
            <Button variant="outline-light" onClick={() => scrollToId('contact')}>Get in touch</Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToId('about')}
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.46rem] uppercase tracking-[0.25em] text-white/55 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.5, duration: 1 }}
        aria-label="Scroll to About Arya"
      >
        <span>Scroll</span>
        <motion.span animate={reduce ? undefined : { y: [0, 5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.2} />
        </motion.span>
      </motion.button>
    </section>
  );
}
