import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Logo, Monogram } from './Brand';
import { ease, scrollToId } from './Primitives';
import { cn } from '../utils/cn';

const navigation = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Films & Productions', id: 'work' },
  { label: 'Talent & Music', id: 'talent' },
  { label: 'News & Events', id: 'news' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.25 });

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 32);
      const sections = [...navigation.map((item) => item.id), 'contact'];
      let current = 'home';
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 180) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const oldOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => {
      document.documentElement.style.overflow = oldOverflow;
      window.removeEventListener('keydown', close);
    };
  }, [menuOpen]);

  const navigate = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => scrollToId(id), menuOpen ? 280 : 0);
  };

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[110] h-[2px] origin-left bg-white"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[90] border-b transition-all duration-700',
          scrolled || menuOpen
            ? 'border-white/10 bg-ink/95 shadow-[0_12px_50px_rgba(0,0,0,.18)] backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className={cn('site-shell flex items-center justify-between transition-all duration-700', scrolled ? 'h-[72px]' : 'h-[86px] sm:h-[96px]')}>
          <button type="button" onClick={() => navigate('home')} aria-label="Arya Worldwide Entertainment — home" className="relative z-[95] shrink-0 text-left">
            <Logo descriptor />
          </button>

          <nav className="hidden items-center gap-6 min-[1180px]:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => navigate(item.id)}
                className={cn(
                  'relative py-4 text-[0.55rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
                  active === item.id ? 'text-white' : 'text-white/55 hover:text-white',
                )}
                aria-current={active === item.id ? 'page' : undefined}
              >
                {item.label}
                {active === item.id && (
                  <motion.span layoutId="active-navigation" className="absolute inset-x-0 bottom-1 h-px bg-white" transition={{ duration: 0.45, ease }} />
                )}
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate('contact')}
              className={cn(
                'group ml-2 inline-flex min-h-10 items-center gap-4 border px-5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] transition-all duration-500',
                active === 'contact' ? 'border-white bg-white text-black' : 'border-white/45 text-white hover:bg-white hover:text-black',
              )}
            >
              Contact
              <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="relative z-[95] flex h-12 w-12 items-center justify-center min-[1180px]:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className="relative block h-5 w-7">
              <motion.span
                className="absolute left-0 top-1 block h-px w-7 bg-white"
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease }}
              />
              <motion.span
                className="absolute bottom-1 right-0 block h-px bg-white"
                animate={menuOpen ? { rotate: -45, y: -6, width: 28 } : { rotate: 0, y: 0, width: 19 }}
                transition={{ duration: 0.4, ease }}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-[85] flex flex-col overflow-y-auto bg-ink"
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduce ? 0 : 0.65, ease }}
          >
            <div className="film-grain" />
            <div className="site-shell relative flex min-h-full flex-col pb-8 pt-28 sm:pt-36">
              <div className="mb-8 flex items-center gap-3 text-[0.52rem] uppercase tracking-[0.28em] text-white/45">
                <span className="h-px w-8 bg-white/35" />
                Independent Film & Entertainment
              </div>
              <nav aria-label="Mobile navigation" className="border-t border-white/15">
                {navigation.map((item, index) => (
                  <motion.button
                    type="button"
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className="group flex w-full items-center justify-between border-b border-white/15 py-4 text-left sm:py-5"
                    initial={reduce ? { opacity: 1 } : { opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.16 + index * 0.06, duration: 0.65, ease }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="w-5 text-[0.48rem] tracking-[0.2em] text-white/35">0{index + 1}</span>
                      <span className="font-display text-[clamp(2rem,8vw,3.6rem)] uppercase leading-none tracking-[-0.02em] text-white/85 transition-colors group-hover:text-white">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/45" strokeWidth={1.2} />
                  </motion.button>
                ))}
              </nav>
              <motion.button
                type="button"
                onClick={() => navigate('contact')}
                className="mt-8 flex min-h-14 items-center justify-between border border-white px-6 text-[0.62rem] font-semibold uppercase tracking-[0.24em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.5 }}
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
              </motion.button>
              <div className="mt-auto flex items-end justify-between pt-10 text-white/45">
                <p className="max-w-[12rem] text-[0.52rem] uppercase leading-5 tracking-[0.2em]">Film · Music · Talent<br />Los Angeles / Worldwide</p>
                <Monogram className="h-12 opacity-55" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
