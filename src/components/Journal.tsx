import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { type Article, articles } from '../data';
import { cn } from '../utils/cn';
import { Button, DemoTag, ease, Modal, Reveal, SectionHeading, SmartImage } from './Primitives';

const articleFilters = ['All', ...Array.from(new Set(articles.map((article) => article.category)))];

export function Journal() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Article | null>(null);
  const visible = filter === 'All' ? articles : articles.filter((article) => article.category === filter);

  const nextArticle = () => {
    if (!selected) return;
    const index = articles.findIndex((article) => article.id === selected.id);
    setSelected(articles[(index + 1) % articles.length]);
    document.querySelector('[role="dialog"]')?.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <section id="journal" className="bg-white py-24 text-charcoal sm:py-32 lg:py-40">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading eyebrow="Editorial / Latest updates" title="Inside Arya." className="lg:col-span-8" />
          <Reveal delay={0.1} className="max-w-md lg:col-span-4 lg:pb-2">
            <DemoTag>Editorial demonstration</DemoTag>
            <p className="mt-4 text-xs leading-6 text-black/55">Sample articles show the future journal format. None are real company announcements, release reports, or production claims.</p>
          </Reveal>
        </div>

        <Reveal className="no-scrollbar mt-12 flex overflow-x-auto border-y border-black/15" delay={0.08}>
          <div className="flex" role="group" aria-label="Filter journal articles by category">
            {articleFilters.map((item) => (
              <button type="button" key={item} onClick={() => setFilter(item)} className={cn('shrink-0 border-r border-black/10 px-4 py-4 text-[0.5rem] font-semibold uppercase tracking-[0.17em] transition-colors sm:px-5 sm:py-5', filter === item ? 'bg-black text-white' : 'text-black/45 hover:text-black')} aria-pressed={filter === item}>{item}</button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease }} className="mt-12">
            {visible[0] && (
              <article className="grid gap-7 border-b border-black/15 pb-12 lg:grid-cols-12 lg:gap-12 lg:pb-16">
                <button type="button" onClick={() => setSelected(visible[0])} className="group overflow-hidden bg-charcoal lg:col-span-7" aria-label={`Read ${visible[0].title}`}>
                  <div className="aspect-[16/10] overflow-hidden">
                    <SmartImage src={visible[0].image} alt={`Editorial image for sample article: ${visible[0].title}`} className="image-mono h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
                  </div>
                </button>
                <div className="flex flex-col justify-center lg:col-span-5">
                  <div className="flex flex-wrap items-center gap-3 text-[0.5rem] uppercase tracking-[0.2em] text-black/45"><span>{visible[0].category}</span><DemoTag>Demo</DemoTag></div>
                  <button type="button" onClick={() => setSelected(visible[0])} className="group mt-5 text-left">
                    <h3 className="font-display text-[clamp(2.7rem,5vw,5.4rem)] uppercase leading-[0.9] tracking-[-0.03em]">{visible[0].title}</h3>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-black/60">{visible[0].excerpt}</p>
                    <p className="mt-5 text-[0.5rem] uppercase leading-5 tracking-[0.16em] text-black/40">{visible[0].date} · {visible[0].readTime}</p>
                    <span className="mt-7 inline-flex items-center gap-4 border-b border-black/30 pb-2 text-[0.53rem] font-semibold uppercase tracking-[0.22em]">Read article<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                  </button>
                </div>
              </article>
            )}

            <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {visible.slice(1).map((article, index) => (
                <motion.article key={article.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.65, ease }}>
                  <button type="button" onClick={() => setSelected(article)} className="group block w-full text-left" aria-label={`Read ${article.title}`}>
                    <div className="aspect-[4/3] overflow-hidden bg-charcoal">
                      <SmartImage src={article.image} alt={`Editorial image for sample article: ${article.title}`} className="image-mono h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-4 text-[0.48rem] uppercase tracking-[0.17em] text-black/45"><span>{article.category}</span><span>{article.readTime}</span></div>
                    <h3 className="mt-4 font-display text-3xl uppercase leading-[0.98] tracking-[-0.015em]">{article.title}</h3>
                    <p className="mt-4 text-xs leading-6 text-black/55">{article.excerpt}</p>
                    <p className="mt-4 text-[0.46rem] uppercase tracking-[0.15em] text-black/35">{article.date}</p>
                    <span className="mt-5 inline-flex items-center gap-3 border-b border-black/25 pb-2 text-[0.5rem] font-semibold uppercase tracking-[0.2em]">Read article<ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
                  </button>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} label={selected ? `Article: ${selected.title}` : 'Journal article'}>
        {selected && (
          <article className="min-h-full bg-ivory text-charcoal">
            <div className="relative h-[52svh] min-h-[390px] bg-black">
              <SmartImage src={selected.image} alt={`Editorial image for sample article: ${selected.title}`} className="image-mono h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute bottom-7 left-6 sm:left-12"><DemoTag dark>Sample article · not an announcement</DemoTag></div>
            </div>
            <div className="site-shell py-12 sm:py-20">
              <div className="mx-auto max-w-5xl">
                <div className="flex flex-wrap items-center gap-4 text-[0.52rem] uppercase tracking-[0.2em] text-black/45"><span>{selected.category}</span><span className="h-px w-6 bg-black/25" /><span>{selected.readTime}</span></div>
                <h2 className="mt-6 font-display text-[clamp(3.2rem,8vw,8rem)] uppercase leading-[0.85] tracking-[-0.04em]">{selected.title}</h2>
                <p className="mt-7 text-[0.52rem] uppercase tracking-[0.18em] text-black/40">{selected.date}</p>
                <p className="mt-10 border-y border-black/15 py-8 font-display text-2xl italic leading-snug text-black/75 sm:text-3xl">{selected.excerpt}</p>
                <div className="mx-auto mt-10 max-w-3xl space-y-7 text-[0.95rem] leading-8 text-black/65 sm:text-base sm:leading-9">
                  {selected.body.map((paragraph, index) => <p key={index} className={index === 0 ? 'font-medium text-black/80' : ''}>{paragraph}</p>)}
                </div>
                <div className="mt-12 border-l border-black/25 pl-5 text-[0.52rem] uppercase leading-6 tracking-[0.17em] text-black/45">Editorial body placeholder · Replace with approved company writing and photography for publication.</div>
                <div className="mt-14 flex justify-end border-t border-black/15 pt-8">
                  <Button variant="text-dark" onClick={nextArticle}>Next article · {articles[(articles.findIndex((article) => article.id === selected.id) + 1) % articles.length].title}</Button>
                </div>
              </div>
            </div>
          </article>
        )}
      </Modal>
    </section>
  );
}
