import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type Project, projects, showreel } from '../data';
import { cn } from '../utils/cn';
import {
  Button,
  DemoTag,
  ease,
  InlineArrow,
  Modal,
  Reveal,
  scrollToId,
  SectionHeading,
  SmartImage,
} from './Primitives';

const filters = ['All', 'Films', 'Music Videos', 'Other Productions'] as const;
type Filter = (typeof filters)[number];

function ProjectModal({ project, onClose, onChange }: { project: Project | null; onClose: () => void; onChange: (project: Project) => void }) {
  const index = project ? projects.findIndex((item) => item.id === project.id) : -1;

  const navigate = (direction: number) => {
    if (index < 0) return;
    const next = projects[(index + direction + projects.length) % projects.length];
    onChange(next);
    const dialog = document.querySelector('[role="dialog"]');
    dialog?.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <Modal open={Boolean(project)} onClose={onClose} label={project ? `Project: ${project.displayTitle}` : 'Project detail'}>
      {project && (
        <article id="project-detail-start" className="min-h-full bg-ink">
          <div className="relative h-[58svh] min-h-[430px] overflow-hidden sm:h-[68svh]">
            <SmartImage
              key={project.id}
              src={project.image}
              fallbackSrc={project.video ? 'https://i.ytimg.com/vi/yHPjU6ujot8/hqdefault.jpg' : undefined}
              alt={project.imageAlt}
              className={cn('image-mono h-full w-full bg-black', project.id === 'one-last-drive' ? 'object-contain' : 'object-cover')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-black/25 to-black/35" />
            <div className="film-grain" />
            <div className="site-shell absolute inset-x-0 bottom-0 left-1/2 -translate-x-1/2 pb-10 sm:pb-14">
              <motion.div key={`${project.id}-title`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease }}>
                <div className="mb-5 flex flex-wrap items-center gap-3 text-[0.55rem] uppercase tracking-[0.24em] text-white/65">
                  <span>{project.category}</span>
                  {project.year && <><span className="h-px w-5 bg-white/40" /><span>{project.year}</span></>}
                </div>
                <h2 className="max-w-6xl font-display text-[clamp(3rem,8vw,8.5rem)] uppercase leading-[0.82] tracking-[-0.04em]">{project.title}</h2>
              </motion.div>
            </div>
          </div>

          <div className="site-shell grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-7">
              <p className="font-display text-3xl leading-tight text-white sm:text-4xl">{project.summary}</p>
              <p className="mt-7 max-w-2xl text-sm leading-8 text-white/60">{project.description}</p>
              <p className="mt-8 border-l border-white/25 pl-4 text-[0.57rem] uppercase leading-5 tracking-[0.18em] text-white/40">{project.artworkNote}</p>
              {project.external && (
                <Button className="mt-8" variant="outline-light" href={project.external.url} external>{project.external.label}</Button>
              )}
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border-t border-white/20 pt-5 text-[0.55rem] uppercase tracking-[0.22em] text-white/45">Project information</div>
              <dl className="mt-6 space-y-5">
                <div className="flex justify-between gap-6 border-b border-white/10 pb-5 text-xs">
                  <dt className="text-white/40">Title</dt><dd className="text-right text-white/85">{project.displayTitle}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-white/10 pb-5 text-xs">
                  <dt className="text-white/40">Category</dt><dd className="text-right text-white/85">{project.category}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-white/10 pb-5 text-xs">
                  <dt className="text-white/40">Status</dt><dd className="text-right text-white/85">Details as supplied</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="site-shell pb-16 sm:pb-24">
            <div className="mb-5 flex items-center justify-between text-[0.55rem] uppercase tracking-[0.24em] text-white/50">
              <span>Video preview</span>
              <span>{project.video ? 'Official release' : 'Official asset not supplied'}</span>
            </div>
            {project.video ? (
              <div className="aspect-video w-full bg-black">
                <iframe
                  className="h-full w-full"
                  src={project.video.embedUrl}
                  title={`${project.displayTitle} — official video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative flex aspect-video max-h-[640px] min-h-[260px] items-center justify-center overflow-hidden border border-white/15 bg-charcoal">
                <div className="absolute inset-6 border border-white/[0.06] sm:inset-10" />
                <div className="relative max-w-md px-8 text-center">
                  <span className="mx-auto mb-7 block h-px w-12 bg-white/35" />
                  <p className="font-display text-3xl uppercase leading-tight text-white/75 sm:text-4xl">The official preview belongs here.</p>
                  <p className="mt-5 text-xs leading-6 text-white/40">No trailer URL has been fabricated. This space will play an approved asset when one is supplied.</p>
                </div>
              </div>
            )}
            {project.video && (
              <Button variant="text-light" className="mt-7" href={project.video.watchUrl} external>Watch on YouTube</Button>
            )}
          </div>

          <div className="grid border-y border-white/15 sm:grid-cols-2">
            <button type="button" onClick={() => navigate(-1)} className="group flex min-h-28 items-center gap-5 border-b border-white/15 px-6 text-left transition-colors hover:bg-white hover:text-black sm:border-b-0 sm:border-r sm:px-10">
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" strokeWidth={1.2} />
              <span><span className="block text-[0.5rem] uppercase tracking-[0.22em] opacity-50">Previous project</span><span className="mt-2 block font-display text-xl uppercase">{(projects[(index - 1 + projects.length) % projects.length] || projects[0]).displayTitle}</span></span>
            </button>
            <button type="button" onClick={() => navigate(1)} className="group flex min-h-28 items-center justify-end gap-5 px-6 text-right transition-colors hover:bg-white hover:text-black sm:px-10">
              <span><span className="block text-[0.5rem] uppercase tracking-[0.22em] opacity-50">Next project</span><span className="mt-2 block font-display text-xl uppercase">{projects[(index + 1) % projects.length]?.displayTitle}</span></span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.2} />
            </button>
          </div>
        </article>
      )}
    </Modal>
  );
}

export function SelectedWorks() {
  const [filter, setFilter] = useState<Filter>('All');
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = filter === 'All' ? projects : projects.filter((project) => project.category === filter);

  const exploreAll = () => {
    setFilter('All');
    scrollToId('work-grid');
  };

  return (
    <section id="work" className="bg-charcoal py-24 sm:py-32 lg:py-40">
      <div className="site-shell">
        <SectionHeading
          eyebrow="Featured films & productions"
          title="Selected works."
          description="A collection of stories, productions, and creative collaborations."
          light
        />

        <Reveal delay={0.1}>
          <div className="no-scrollbar mt-12 flex gap-2 overflow-x-auto border-y border-white/15 py-4 sm:mt-16 sm:flex-wrap sm:gap-0 sm:py-0" role="group" aria-label="Filter productions by category">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                className={cn(
                  'relative shrink-0 px-4 py-3 text-[0.55rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 sm:px-6 sm:py-5',
                  filter === item ? 'text-black sm:bg-white' : 'text-white/50 hover:text-white',
                )}
                aria-pressed={filter === item}
              >
                {item}
                <span className="ml-2 text-[0.45rem] opacity-50">{item === 'All' ? projects.length : projects.filter((project) => project.category === item).length}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div id="work-grid" layout className="mt-12 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-8 lg:mt-20">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 50, clipPath: 'inset(0 0 15% 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0, y: 25, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, delay: index * 0.06, ease }}
                className={cn(
                  index % 4 === 0 && 'md:col-span-7',
                  index % 4 === 1 && 'md:col-span-5 md:mt-28',
                  index % 4 === 2 && 'md:col-span-5 md:mt-10',
                  index % 4 === 3 && 'md:col-span-7 md:mt-36',
                )}
              >
                <button type="button" onClick={() => setSelected(project)} className="group block w-full text-left" aria-label={`Explore ${project.displayTitle}`}>
                  <div className={cn('relative overflow-hidden bg-ink max-md:aspect-[4/3]', index % 4 === 0 || index % 4 === 3 ? 'md:aspect-[16/11]' : 'md:aspect-[4/5]')}>
                    <SmartImage
                      src={project.image}
                      fallbackSrc={project.video ? 'https://i.ytimg.com/vi/yHPjU6ujot8/hqdefault.jpg' : undefined}
                      alt={project.imageAlt}
                      loading="lazy"
                      className={cn('image-mono h-full w-full bg-black transition-transform duration-[1300ms] ease-out group-hover:scale-[1.055]', project.id === 'one-last-drive' ? 'object-contain' : 'object-cover')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 transition-opacity duration-500 group-hover:opacity-75" />
                    <div className="absolute left-5 top-5 flex items-center gap-3 text-[0.5rem] uppercase tracking-[0.22em] text-white/70 sm:left-7 sm:top-7">
                      <span>{String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, '0')}</span>
                      <span className="h-px w-6 bg-white/50" />
                      <span>{project.category}</span>
                    </div>
                    <div className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full border border-white/50 bg-black/15 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-7 sm:right-7">
                      <InlineArrow />
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-5 border-t border-white/20 pt-5">
                    <div>
                      <h3 className="font-display text-[1.75rem] uppercase leading-[1.02] tracking-[-0.015em] text-white sm:text-3xl">{project.title}{project.year && project.id === 'the-fear-1995' ? ` (${project.year})` : ''}</h3>
                      <p className="mt-3 max-w-lg text-xs leading-6 text-white/45">{project.summary}</p>
                    </div>
                    <span className="mt-1 shrink-0 text-[0.5rem] uppercase tracking-[0.2em] text-white/55 transition-colors group-hover:text-white">Explore</span>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-24 border-t border-white/20 pt-14 text-center sm:mt-36 sm:pt-20">
          <p className="text-[0.55rem] uppercase tracking-[0.28em] text-white/45">The archive continues</p>
          <h3 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2.8rem,6vw,6.5rem)] uppercase leading-[0.9] tracking-[-0.035em]">Your next favorite story starts here.</h3>
          <Button className="mt-9" variant="outline-light" onClick={exploreAll}>Explore all productions</Button>
        </Reveal>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} onChange={setSelected} />
    </section>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
}

function ShowreelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || error) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  }, [error]);

  useEffect(() => {
    if (!open) {
      setPlaying(false);
      setTime(0);
      setError(false);
      return;
    }
    const keyControl = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isControl = ['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'A'].includes(target?.tagName);
      if (event.code === 'Space' && !isControl) {
        event.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', keyControl);
    return () => window.removeEventListener('keydown', keyControl);
  }, [open, togglePlay]);

  const changeVolume = (value: number) => {
    setVolume(value);
    setMuted(value === 0);
    if (videoRef.current) {
      videoRef.current.volume = value;
      videoRef.current.muted = value === 0;
    }
  };

  return (
    <Modal open={open} onClose={onClose} label="Arya Worldwide demo showreel">
      <div className="flex min-h-full flex-col bg-black p-4 pt-20 sm:p-8 sm:pt-20">
        <div className="site-shell mb-5 flex items-center justify-between !px-0 text-[0.52rem] uppercase tracking-[0.22em] text-white/50">
          <span>Arya Worldwide · Demo showreel</span>
          <DemoTag dark>Demo footage</DemoTag>
        </div>
        <div className="relative my-auto w-full overflow-hidden bg-charcoal">
          {!error ? (
            <video
              ref={videoRef}
              src={showreel.video}
              poster={showreel.poster}
              className="mx-auto max-h-[72svh] w-full cursor-pointer object-contain"
              autoPlay
              playsInline
              preload="metadata"
              onClick={togglePlay}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onLoadedMetadata={(event) => {
                setDuration(event.currentTarget.duration);
                event.currentTarget.volume = volume;
              }}
              onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
              onError={() => setError(true)}
              aria-label="Abstract slow-motion demonstration film"
            />
          ) : (
            <div className="flex aspect-video items-center justify-center p-8 text-center">
              <div>
                <p className="font-display text-3xl">The demo film could not be loaded.</p>
                <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-white/50">Check your connection, or view the licensed source directly on Pexels.</p>
                <Button className="mt-6" variant="outline-light" href="https://www.pexels.com/video/a-drop-of-water-in-a-bowl-with-a-black-background-16392049/" external>View source film</Button>
              </div>
            </div>
          )}
          {!playing && !error && (
            <button type="button" onClick={togglePlay} className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black" aria-label="Play demo showreel">
              <Play className="ml-1 h-6 w-6" fill="currentColor" strokeWidth={1} />
            </button>
          )}
        </div>
        <div className="mx-auto mt-5 w-full max-w-[1600px]">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={Math.min(time, duration || 0)}
            onChange={(event) => {
              const next = Number(event.target.value);
              if (videoRef.current) videoRef.current.currentTime = next;
              setTime(next);
            }}
            className="range-cinema w-full"
            aria-label="Video progress"
            disabled={!duration || error}
          />
          <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <button type="button" onClick={togglePlay} disabled={error} className="flex h-10 w-10 items-center justify-center border border-white/25 transition-colors hover:bg-white hover:text-black disabled:opacity-30" aria-label={playing ? 'Pause video' : 'Play video'}>
              {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" />}
            </button>
            <span className="min-w-20 text-[0.58rem] tabular-nums tracking-[0.12em] text-white/55">{formatTime(time)} / {formatTime(duration)}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const next = !muted;
                  setMuted(next);
                  if (videoRef.current) videoRef.current.muted = next;
                }}
                className="flex h-10 w-10 items-center justify-center text-white/75 hover:text-white"
                aria-label={muted ? 'Unmute video' : 'Mute video'}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input type="range" min={0} max={1} step={0.05} value={muted ? 0 : volume} onChange={(event) => changeVolume(Number(event.target.value))} className="range-cinema w-20 sm:w-28" aria-label="Video volume" />
            </div>
            <button type="button" onClick={() => videoRef.current?.requestFullscreen?.()} disabled={error} className="ml-auto flex h-10 w-10 items-center justify-center border border-white/25 transition-colors hover:bg-white hover:text-black disabled:opacity-30" aria-label="Enter fullscreen">
              <Maximize className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>
          <p className="mt-5 text-[0.52rem] uppercase leading-5 tracking-[0.17em] text-white/35">{showreel.credit}</p>
        </div>
      </div>
    </Modal>
  );
}

export function Showreel() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section ref={ref} className="relative flex min-h-[88svh] items-end overflow-hidden bg-ink py-24 sm:py-32" aria-labelledby="showreel-title">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
        <SmartImage src={showreel.poster} alt="A drop of water in darkness, thumbnail for the licensed demo film" className="image-mono h-full w-full object-cover" loading="lazy" />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/55" />
      <div className="film-grain" />
      <div className="site-shell relative z-10 grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <div className="mb-6 flex items-center gap-4 text-[0.55rem] uppercase tracking-[0.28em] text-white/60"><span className="h-px w-10 bg-white/50" />Cinematic showreel · 00:18</div>
            <h2 id="showreel-title" className="font-display text-[clamp(3.4rem,7.5vw,8rem)] uppercase leading-[0.84] tracking-[-0.04em]">The art of<br />storytelling.</h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-white/65">A glimpse into the stories, performances, and creative work behind Arya Worldwide.</p>
            <p className="mt-4 max-w-lg text-[0.52rem] uppercase leading-5 tracking-[0.18em] text-white/40">Presentation uses a clearly designated abstract demo film, not official company footage.</p>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="lg:col-span-4 lg:flex lg:justify-end">
          <button type="button" onClick={() => setOpen(true)} className="group flex items-center gap-6 text-left" aria-label="Play demo showreel">
            <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/55 transition-all duration-700 group-hover:scale-105 group-hover:bg-white group-hover:text-black sm:h-32 sm:w-32">
              <span className="absolute inset-2 rounded-full border border-white/15 transition-transform duration-700 group-hover:rotate-45" />
              <Play className="ml-1 h-6 w-6" fill="currentColor" strokeWidth={1} />
            </span>
            <span className="text-[0.56rem] uppercase leading-5 tracking-[0.22em] text-white/70">Play film<br /><span className="text-white/35">With sound</span></span>
          </button>
        </Reveal>
      </div>
      <ShowreelModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
