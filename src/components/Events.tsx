import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, Check, MapPin } from 'lucide-react';
import { useState } from 'react';
import { type AryaEvent, events } from '../data';
import { cn } from '../utils/cn';
import { Button, DemoTag, ease, Modal, Reveal, SectionHeading, SmartImage } from './Primitives';

type StatusFilter = 'upcoming' | 'previous';
type CategoryFilter = 'All' | AryaEvent['category'];
const categories: CategoryFilter[] = ['All', 'Screening', 'Music', 'Industry'];

function downloadCalendar(event: AryaEvent) {
  const escape = (value: string) => value.replace(/,/g, '\\,').replace(/;/g, '\\;');
  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Arya Worldwide Entertainment//Demo Event//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}-demo@aryaworldwideent.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART:${event.isoDate}`,
    `DTEND:${event.endIsoDate}`,
    `SUMMARY:${escape(`[DEMO] ${event.title}`)}`,
    `LOCATION:${escape(event.location)}`,
    `DESCRIPTION:${escape('Sample programming for the Arya Worldwide front-end presentation. Not a confirmed event.')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.id}-demo.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Events({ onInquiry }: { onInquiry: (type: string) => void }) {
  const [status, setStatus] = useState<StatusFilter>('upcoming');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [selected, setSelected] = useState<AryaEvent | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const visible = events.filter((event) => event.status === status && (category === 'All' || event.category === category));
  const featured = visible[0];

  const saveDate = (event: AryaEvent) => {
    downloadCalendar(event);
    setSaved(event.id);
  };

  return (
    <section id="news" className="bg-ivory py-24 text-charcoal sm:py-32 lg:py-40">
      <div className="site-shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Upcoming events & announcements" title="What’s happening." />
          <Reveal delay={0.1} className="max-w-md lg:pb-2">
            <DemoTag>Sample programming</DemoTag>
            <p className="mt-4 text-xs leading-6 text-black/55">Every entry below demonstrates the intended event experience. Dates, venues, and program formats are samples—not confirmed Arya Worldwide announcements.</p>
          </Reveal>
        </div>

        <Reveal className="mt-12 border-y border-black/15" delay={0.08}>
          <div className="flex flex-col gap-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid grid-cols-2 sm:flex" role="group" aria-label="Filter events by time">
              {(['upcoming', 'previous'] as StatusFilter[]).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setStatus(item)}
                  className={cn('relative px-4 py-5 text-left text-[0.55rem] font-semibold uppercase tracking-[0.22em] transition-colors sm:px-6', status === item ? 'bg-black text-white' : 'text-black/50 hover:text-black')}
                  aria-pressed={status === item}
                >
                  {item === 'upcoming' ? 'Upcoming · Demo' : 'Previous · Demo'}
                  <span className="ml-2 opacity-45">{events.filter((event) => event.status === item).length}</span>
                </button>
              ))}
            </div>
            <div className="no-scrollbar flex overflow-x-auto border-t border-black/10 sm:border-l sm:border-t-0" role="group" aria-label="Filter events by category">
              {categories.map((item) => (
                <button type="button" key={item} onClick={() => setCategory(item)} className={cn('shrink-0 px-4 py-4 text-[0.5rem] uppercase tracking-[0.18em] transition-colors sm:py-5', category === item ? 'text-black underline underline-offset-8' : 'text-black/40 hover:text-black')} aria-pressed={category === item}>{item}</button>
              ))}
            </div>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div key={`${status}-${category}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.55, ease }} className="mt-12">
            {featured ? (
              <div className={cn('grid gap-10', visible.length > 1 && 'lg:grid-cols-12 lg:gap-12')}>
                <article className={cn(visible.length > 1 && 'lg:col-span-7')}>
                  <button type="button" onClick={() => setSelected(featured)} className="group block w-full text-left">
                    <div className="relative aspect-[16/11] overflow-hidden bg-charcoal">
                      <SmartImage src={featured.image} alt={`Editorial image for sample event: ${featured.title}`} className="image-mono h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                      <span className="absolute bottom-5 left-5 border border-white/35 px-3 py-2 text-[0.48rem] uppercase tracking-[0.2em] text-white sm:bottom-7 sm:left-7">Featured sample announcement</span>
                    </div>
                    <div className="mt-6">
                      <div className="flex flex-wrap items-center gap-4 text-[0.52rem] uppercase tracking-[0.2em] text-black/45"><span>{featured.category}</span><span className="h-px w-5 bg-black/25" /><span>{featured.date}</span></div>
                      <h3 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-[-0.02em] sm:text-5xl">{featured.title}</h3>
                      <p className="mt-4 flex items-center gap-2 text-xs text-black/50"><MapPin className="h-3.5 w-3.5" strokeWidth={1.3} />{featured.location}</p>
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60">{featured.description}</p>
                      <span className="mt-6 inline-flex border-b border-black/30 pb-2 text-[0.54rem] font-semibold uppercase tracking-[0.22em]">Learn more</span>
                    </div>
                  </button>
                </article>

                {visible.length > 1 && (
                  <div className="lg:col-span-5">
                    {visible.slice(1).map((event) => (
                      <article key={event.id} className="border-t border-black/15 py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7">
                        <button type="button" onClick={() => setSelected(event)} className="group grid w-full grid-cols-[108px_1fr] gap-5 text-left sm:grid-cols-[160px_1fr] sm:gap-7">
                          <div className="aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-[4/3] lg:aspect-square">
                            <SmartImage src={event.image} alt="" className="image-mono h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2 text-[0.48rem] uppercase tracking-[0.17em] text-black/45"><span>{event.category}</span><DemoTag>Demo</DemoTag></div>
                            <h3 className="mt-3 font-display text-2xl uppercase leading-[1] sm:text-3xl">{event.title}</h3>
                            <p className="mt-3 text-[0.53rem] uppercase leading-5 tracking-[0.14em] text-black/45">{event.date}<br />{event.location}</p>
                            <span className="mt-4 inline-block border-b border-black/25 pb-1 text-[0.48rem] uppercase tracking-[0.18em]">Learn more</span>
                          </div>
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="border border-black/15 px-6 py-16 text-center">
                <p className="font-display text-3xl">No sample events in this combination.</p>
                <p className="mt-3 text-xs text-black/50">Choose another category to continue exploring the demonstration program.</p>
                <Button variant="text-dark" className="mt-6" onClick={() => setCategory('All')}>Show all categories</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} label={selected ? `Event: ${selected.title}` : 'Event detail'}>
        {selected && (
          <article className="min-h-full bg-ivory text-charcoal">
            <div className="relative h-[48svh] min-h-[360px] bg-black">
              <SmartImage src={selected.image} alt={`Editorial image for sample event: ${selected.title}`} className="image-mono h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/15" />
              <div className="absolute bottom-7 left-6 sm:left-12"><DemoTag dark>Sample event · not confirmed</DemoTag></div>
            </div>
            <div className="site-shell grid gap-10 py-12 sm:py-20 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-[0.55rem] uppercase tracking-[0.24em] text-black/45">{selected.category} · {selected.status} demo</p>
                <h2 className="mt-5 max-w-5xl font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[0.86] tracking-[-0.035em]">{selected.title}</h2>
                <p className="mt-8 max-w-2xl font-display text-2xl leading-snug sm:text-3xl">{selected.description}</p>
                <p className="mt-6 max-w-2xl text-sm leading-8 text-black/60">{selected.detail}</p>
              </div>
              <aside className="lg:col-span-4">
                <div className="border-t border-black/20 pt-6">
                  <p className="flex items-start gap-3 text-xs leading-6 text-black/60"><CalendarDays className="mt-1 h-4 w-4 shrink-0" strokeWidth={1.3} />{selected.date}</p>
                  <p className="mt-4 flex items-start gap-3 text-xs leading-6 text-black/60"><MapPin className="mt-1 h-4 w-4 shrink-0" strokeWidth={1.3} />{selected.location}</p>
                </div>
                {selected.status === 'upcoming' && (
                  <Button variant="dark" className="mt-8 w-full" arrow={false} onClick={() => saveDate(selected)}>
                    {saved === selected.id ? <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" />Calendar file downloaded</span> : 'Save demo date · .ics'}
                  </Button>
                )}
                <Button variant="text-dark" className="mt-6" onClick={() => { const type = selected.category === 'Music' ? 'Music & Entertainment' : 'Film & Production Inquiries'; setSelected(null); onInquiry(type); }}>Discuss this program format</Button>
                <p className="mt-7 text-[0.5rem] uppercase leading-5 tracking-[0.16em] text-black/40">Saving a date creates a local calendar file. It does not register attendance or book a venue.</p>
              </aside>
            </div>
          </article>
        )}
      </Modal>
    </section>
  );
}
