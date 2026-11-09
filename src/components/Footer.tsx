import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Logo, Monogram } from './Brand';
import { Button, scrollToId } from './Primitives';

const socials = [
  { name: 'Instagram', href: '', mark: 'IG' },
  { name: 'YouTube', href: '', mark: 'YT' },
  { name: 'LinkedIn', href: '', mark: 'IN' },
];

const quickLinks = [
  ['About Arya', 'about'],
  ['Films & Productions', 'work'],
  ['Talent & Music', 'talent'],
  ['News & Events', 'news'],
  ['Inside Arya', 'journal'],
];

export function Footer() {
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 4500);
    return () => window.clearTimeout(timer);
  }, [notice]);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink pb-8 pt-20 sm:pt-28">
      <div className="site-shell relative z-10">
        <div className="grid gap-10 border-b border-white/15 pb-16 lg:grid-cols-12 lg:items-end lg:pb-24">
          <h2 className="max-w-5xl font-display text-[clamp(3.2rem,7vw,7.8rem)] uppercase leading-[0.86] tracking-[-0.04em] lg:col-span-9">The next great story starts with a conversation.</h2>
          <div className="lg:col-span-3 lg:flex lg:justify-end"><Button onClick={() => scrollToId('contact')}>Work with Arya</Button></div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo compact className="!items-start" />
            <p className="mt-7 max-w-xs text-xs leading-6 text-white/45">An independent entertainment company bringing film, music, and exceptional creative talent into focus.</p>
            <p className="mt-6 text-[0.48rem] uppercase leading-5 tracking-[0.2em] text-white/30">Independent film & entertainment<br />Los Angeles / Worldwide</p>
          </div>
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-[0.52rem] font-semibold uppercase tracking-[0.24em] text-white/35">Navigate</h3>
            <ul className="mt-6 space-y-4">
              {quickLinks.map(([label, id]) => <li key={id}><button type="button" onClick={() => scrollToId(id)} className="text-xs text-white/60 transition-colors hover:text-white">{label}</button></li>)}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-[0.52rem] font-semibold uppercase tracking-[0.24em] text-white/35">Productions</h3>
            <ul className="mt-6 space-y-4 text-xs text-white/60">
              <li><button type="button" onClick={() => scrollToId('work')} className="transition-colors hover:text-white">Selected works</button></li>
              <li><button type="button" onClick={() => scrollToId('divisions')} className="transition-colors hover:text-white">Creative divisions</button></li>
              <li><a href="https://www.watcharya.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">WatchArya</a></li>
              <li><a href="https://www.youtube.com/watch?v=yHPjU6ujot8" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Heartbeat · Official video</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-[0.52rem] font-semibold uppercase tracking-[0.24em] text-white/35">Connect</h3>
            <button type="button" onClick={() => scrollToId('contact')} className="mt-6 border-b border-white/25 pb-1 text-xs text-white/65 transition-colors hover:border-white hover:text-white">Business inquiries</button>
            <div className="mt-7 flex gap-3">
              {socials.map(({ name, href, mark }) => href ? (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name} className="flex h-10 w-10 items-center justify-center border border-white/20 text-[0.55rem] font-semibold tracking-[0.08em] text-white/55 transition-all hover:border-white hover:bg-white hover:text-black">{mark}</a>
              ) : (
                <button key={name} type="button" onClick={() => setNotice(`${name} destination is not configured for this presentation. Add the approved company URL before launch.`)} aria-label={`${name} — destination not configured`} className="flex h-10 w-10 items-center justify-center border border-white/20 text-[0.55rem] font-semibold tracking-[0.08em] text-white/55 transition-all hover:border-white hover:bg-white hover:text-black">{mark}</button>
              ))}
            </div>
            <p className="mt-4 max-w-[12rem] text-[0.46rem] uppercase leading-5 tracking-[0.13em] text-white/25">Social destinations configurable for launch</p>
          </div>
        </div>

        <AnimatePresence>
          {notice && (
            <motion.div role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mb-8 flex items-center justify-between gap-5 border border-white/20 bg-charcoal p-5 text-xs leading-6 text-white/65">
              {notice}<button type="button" onClick={() => setNotice('')} className="shrink-0 text-[0.5rem] uppercase tracking-[0.18em] text-white">Dismiss</button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3 border-t border-white/15 pt-7 text-[0.47rem] uppercase leading-5 tracking-[0.16em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Arya Worldwide Entertainment. All rights reserved.</p>
          <p>Front-end concept presentation · Demo content labeled throughout</p>
        </div>
      </div>
      <div className="pointer-events-none relative mt-6 h-[19vw] min-h-24 select-none overflow-hidden" aria-hidden="true">
        <span className="absolute left-1/2 top-0 -translate-x-1/2 font-display text-[30vw] leading-[0.7] tracking-[0.04em] text-white/[0.035]">ARYA</span>
      </div>
      <Monogram className="pointer-events-none absolute bottom-5 right-5 h-16 text-white/[0.04]" />
    </footer>
  );
}
