import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Contact } from './components/Contact';
import { Events } from './components/Events';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Journal } from './components/Journal';
import { scrollToId } from './components/Primitives';
import { Showreel, SelectedWorks } from './components/Work';
import { About, Divisions } from './components/Story';
import { Talent } from './components/Talent';
import { Why } from './components/Why';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 850);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => scrollToId('home')}
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/75 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black sm:bottom-8 sm:right-8"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.4} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [requestedInquiry, setRequestedInquiry] = useState({ type: '', request: 0 });

  const handleInquiry = (type: string) => {
    setRequestedInquiry((current) => ({ type, request: current.request + 1 }));
    window.setTimeout(() => scrollToId('contact'), 40);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <a href="#work" className="fixed left-4 top-3 z-[130] -translate-y-20 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-transform focus:translate-y-0">Skip to selected works</a>
      <Header />
      <main>
        <Hero />
        <About />
        <Divisions />
        <SelectedWorks />
        <Showreel />
        <Talent onInquiry={handleInquiry} />
        <Events onInquiry={handleInquiry} />
        <Journal />
        <Why />
        <Contact requestedInquiry={requestedInquiry} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
