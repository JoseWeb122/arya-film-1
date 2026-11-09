import { Music2 } from 'lucide-react';
import { useState } from 'react';
import { imagery, projects } from '../data';
import { Button, DemoTag, Modal, Reveal, SectionHeading, SmartImage } from './Primitives';

const heartbeat = projects.find((project) => project.id === 'davina-michelle-heartbeat')!;

export function Talent({ onInquiry }: { onInquiry: (type: string) => void }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <section id="talent" className="overflow-hidden bg-ivory py-24 text-charcoal sm:py-32 lg:py-40">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            eyebrow="Talent & musical artists"
            title="Exceptional talent. Distinctive voices."
            className="lg:col-span-9"
          />
          <Reveal delay={0.12} className="lg:col-span-3 lg:pb-2">
            <p className="max-w-sm text-sm leading-7 text-black/60">We believe in supporting remarkable talent, building meaningful creative relationships, and helping artists reach new audiences.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7" y={35}>
            <button type="button" onClick={() => setProfileOpen(true)} className="group relative block aspect-[4/5] w-full overflow-hidden bg-charcoal text-left sm:aspect-[16/13] lg:aspect-[4/5]" aria-label="Explore Davina Michelle artist profile">
              <SmartImage
                src={heartbeat.image}
                fallbackSrc="https://i.ytimg.com/vi/yHPjU6ujot8/hqdefault.jpg"
                alt="Davina Michelle in the official Heartbeat music video thumbnail"
                className="image-mono h-full w-full object-cover object-center transition-transform duration-[1400ms] group-hover:scale-[1.045]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white sm:p-9">
                <div>
                  <span className="text-[0.52rem] uppercase tracking-[0.24em] text-white/60">Featured collaboration · 2023</span>
                  <p className="mt-3 font-display text-5xl uppercase leading-none sm:text-7xl">Davina<br className="sm:hidden" /> Michelle</p>
                </div>
                <span className="mb-1 hidden h-12 w-12 items-center justify-center rounded-full border border-white/45 transition-colors group-hover:bg-white group-hover:text-black sm:flex">
                  <Music2 className="h-4 w-4" strokeWidth={1.3} />
                </span>
              </div>
            </button>
            <p className="mt-3 text-[0.5rem] uppercase leading-5 tracking-[0.16em] text-black/40">Official “Heartbeat” video thumbnail · YouTube</p>
          </Reveal>

          <div className="flex flex-col justify-center lg:col-span-5">
            <Reveal delay={0.1}>
              <DemoTag>Verified collaboration profile</DemoTag>
              <p className="mt-7 text-[0.57rem] font-semibold uppercase tracking-[0.24em] text-black/50">Pop · Recording artist</p>
              <h3 className="mt-4 font-display text-5xl uppercase leading-[0.9] tracking-[-0.03em] sm:text-6xl">Davina Michelle</h3>
              <p className="mt-7 text-sm leading-8 text-black/65">
                Dutch singer Davina Michelle released “Heartbeat” in 2023. The official video’s published credits identify Arya Worldwide Entertainment as the production company.
              </p>
              <p className="mt-5 border-l border-black/20 pl-4 text-xs leading-6 text-black/45">
                This profile documents that verified music-video collaboration only. It does not imply current management representation or an ongoing artist partnership.
              </p>
              <div className="mt-8 flex flex-wrap gap-5">
                <Button variant="dark" href={heartbeat.video?.watchUrl} external>Listen / Watch</Button>
                <Button variant="text-dark" onClick={() => setProfileOpen(true)}>Explore profile</Button>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="mt-12 border-t border-black/15 pt-8">
              <p className="text-[0.54rem] uppercase tracking-[0.23em] text-black/45">Roster transparency</p>
              <p className="mt-4 text-xs leading-6 text-black/55">Only verified names appear in this presentation. Additional artist profiles will be introduced when approved biographies, photography, and representation details are available.</p>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-20 grid overflow-hidden bg-charcoal text-white lg:mt-32 lg:grid-cols-12">
          <div className="relative min-h-[340px] lg:col-span-5 lg:min-h-[520px]">
            <SmartImage src={imagery.talentStudio} alt="Vocalist in a recording studio, used as editorial division imagery" className="image-mono absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/25" />
            <span className="absolute bottom-5 left-5 text-[0.48rem] uppercase tracking-[0.18em] text-white/55">Editorial studio imagery · not an artist roster portrait</span>
          </div>
          <div className="p-7 sm:p-12 lg:col-span-7 lg:p-16">
            <p className="text-[0.55rem] uppercase tracking-[0.26em] text-white/45">For artists & representatives</p>
            <h3 className="mt-6 max-w-2xl font-display text-4xl uppercase leading-[0.95] sm:text-5xl">Creative relationships, professionally considered.</h3>
            <div className="mt-10 grid gap-7 sm:grid-cols-3">
              {[
                ['01', 'Creative context', 'Begin with the artist’s voice, ambitions, and body of work.'],
                ['02', 'Clear scope', 'Define the opportunity, representation needs, and working relationship.'],
                ['03', 'Audience thinking', 'Consider how each creative decision can reach and resonate beyond the room.'],
              ].map(([number, title, copy]) => (
                <div key={number} className="border-t border-white/20 pt-5">
                  <span className="text-[0.5rem] tracking-[0.2em] text-white/35">{number}</span>
                  <h4 className="mt-4 font-display text-xl uppercase">{title}</h4>
                  <p className="mt-3 text-xs leading-6 text-white/50">{copy}</p>
                </div>
              ))}
            </div>
            <Button variant="outline-light" className="mt-10" onClick={() => onInquiry('Talent & Artist Management')}>Talent & management inquiries</Button>
          </div>
        </Reveal>
      </div>

      <Modal open={profileOpen} onClose={() => setProfileOpen(false)} label="Davina Michelle artist profile">
        <article className="min-h-full bg-ivory text-charcoal">
          <div className="relative h-[55svh] min-h-[400px] bg-black">
            <SmartImage src={heartbeat.image} fallbackSrc="https://i.ytimg.com/vi/yHPjU6ujot8/hqdefault.jpg" alt="Official Heartbeat music video thumbnail featuring Davina Michelle" className="image-mono h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
            <div className="site-shell absolute inset-x-0 bottom-0 left-1/2 -translate-x-1/2 pb-10 text-white">
              <p className="text-[0.55rem] uppercase tracking-[0.25em] text-white/60">Pop · Recording artist</p>
              <h2 className="mt-4 font-display text-[clamp(4rem,10vw,10rem)] uppercase leading-[0.78] tracking-[-0.045em]">Davina Michelle</h2>
            </div>
          </div>
          <div className="site-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <DemoTag>Verified collaboration profile</DemoTag>
              <h3 className="mt-7 font-display text-4xl uppercase">Heartbeat · Official music video</h3>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-black/65">Davina Michelle is a Dutch singer. Her “Heartbeat” music video was released in 2023, with published video credits identifying Arya Worldwide Entertainment as production company.</p>
              <p className="mt-5 max-w-2xl text-xs leading-6 text-black/45">No current management relationship is claimed. This concise biography is intentionally limited to verified information relevant to the selected work.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="dark" href={heartbeat.video?.watchUrl} external>Official YouTube release</Button>
                <Button variant="text-dark" onClick={() => { setProfileOpen(false); onInquiry('Talent & Artist Management'); }}>Management inquiries</Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-video bg-black">
                <iframe className="h-full w-full" src={heartbeat.video?.embedUrl} title="Davina Michelle — Heartbeat official music video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <p className="mt-3 text-[0.48rem] uppercase leading-5 tracking-[0.15em] text-black/40">Official artist release · external YouTube player</p>
            </div>
          </div>
        </article>
      </Modal>
    </section>
  );
}
