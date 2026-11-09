export const px = (id: number, width = 1800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const imagery = {
  hero: px(34215534, 2400),
  about: px(30396798, 1600),
  production: px(23384400, 1600),
  distribution: px(39587241, 1600),
  talentDivision: px(973814, 1400),
  showreel: px(34215537, 2200),
  talentStudio: px(12216242, 1400),
  cinema: px(7991486, 1800),
  clapper: px(8088380, 1600),
  cameraGlass: px(10140954, 1600),
  director: px(8089650, 1600),
  crew: px(34007217, 1600),
  editSuite: px(8088371, 1600),
  forest: px(18651903, 1800),
  forestRoad: px(34657697, 1800),
  alley: px(19943722, 1800),
  nightStreet: px(6494663, 1800),
  singer: px(34017953, 1400),
  theaterSeats: px(7991231, 1600),
};

export type ProjectCategory = 'Films' | 'Music Videos' | 'Other Productions';

export interface Project {
  id: string;
  title: string;
  displayTitle: string;
  year?: string;
  category: ProjectCategory;
  image: string;
  imageAlt: string;
  artworkNote: string;
  summary: string;
  description: string;
  video?: {
    kind: 'youtube';
    embedUrl: string;
    watchUrl: string;
  };
  external?: {
    label: string;
    url: string;
  };
}

export const projects: Project[] = [
  {
    id: 'raised-in-the-woods',
    title: 'RAISED IN THE WOODS',
    displayTitle: 'Raised in the Woods',
    category: 'Films',
    image: imagery.forest,
    imageAlt: 'Atmospheric monochrome forest used as editorial artwork',
    artworkNote: 'Atmospheric editorial image — not official key art.',
    summary: 'A selected title presented for the Arya Worldwide portfolio concept.',
    description:
      'A verified synopsis, credits, and official preview were not supplied for this design presentation. This project view is ready for approved production information and media; no plot or credit details have been invented.',
  },
  {
    id: 'the-fear-1995',
    title: 'THE FEAR',
    displayTitle: 'The Fear',
    year: '1995',
    category: 'Films',
    image: imagery.alley,
    imageAlt: 'Silhouettes in a foggy alley used as atmospheric editorial artwork',
    artworkNote: 'Atmospheric editorial image — not official key art.',
    summary: 'The 1995 title included in the selected Arya Worldwide works presentation.',
    description:
      'This presentation identifies the title and year only. Approved synopsis, key art, credits, and an official viewing destination can be added here when supplied. The imagery shown is atmospheric editorial photography, not a film still.',
  },
  {
    id: 'davina-michelle-heartbeat',
    title: 'DAVINA MICHELLE — HEARTBEAT',
    displayTitle: 'Davina Michelle — Heartbeat',
    year: '2023',
    category: 'Music Videos',
    image: 'https://i.ytimg.com/vi/yHPjU6ujot8/maxresdefault.jpg',
    imageAlt: 'Official video thumbnail for Davina Michelle’s Heartbeat',
    artworkNote: 'Official video thumbnail via the artist’s YouTube release.',
    summary: 'The official music video for Davina Michelle’s “Heartbeat.”',
    description:
      'Released in 2023, the official video’s published credits identify Arya Worldwide Entertainment as the production company. Watch the complete official release below or on the artist’s YouTube channel.',
    video: {
      kind: 'youtube',
      embedUrl: 'https://www.youtube-nocookie.com/embed/yHPjU6ujot8?rel=0&modestbranding=1',
      watchUrl: 'https://www.youtube.com/watch?v=yHPjU6ujot8',
    },
  },
  {
    id: 'one-last-drive',
    title: 'ONE LAST DRIVE',
    displayTitle: 'One Last Drive',
    category: 'Other Productions',
    image:
      'https://images.squarespace-cdn.com/content/v1/5970050e29687fd94a814f66/de10f2b1-03c7-4213-b1fa-be5beb8b69d1/AWE.OneLastDrive.r2.jpg?format=1500w',
    imageAlt: 'One Last Drive artwork shown on the current Arya Worldwide website',
    artworkNote: 'Existing project artwork from aryaworldwide.com.',
    summary: 'A forthcoming title currently signposted on the existing Arya Worldwide website.',
    description:
      'The current Arya Worldwide website presents this artwork with a “Coming soon to WatchArya.com” announcement. No additional synopsis, release date, or credits are assumed in this concept. The destination below is the published WatchArya website.',
    external: {
      label: 'VISIT WATCHARYA',
      url: 'https://www.watcharya.com',
    },
  },
];

export interface AryaEvent {
  id: string;
  title: string;
  status: 'upcoming' | 'previous';
  category: 'Screening' | 'Music' | 'Industry';
  date: string;
  isoDate: string;
  endIsoDate: string;
  location: string;
  image: string;
  description: string;
  detail: string;
}

export const events: AryaEvent[] = [
  {
    id: 'stories-in-development',
    title: 'Stories in Development: An Open Conversation',
    status: 'upcoming',
    category: 'Industry',
    date: '18 SEP 2026 · 18:30',
    isoDate: '20260918T183000',
    endIsoDate: '20260918T203000',
    location: 'Los Angeles, CA · Sample venue',
    image: imagery.clapper,
    description: 'A sample salon format about developing a story with a clear visual point of view.',
    detail:
      'This demonstration program imagines an intimate, moderated conversation about the choices that shape early development: voice, audience, visual references, and a practical path toward production. It is not a confirmed Arya Worldwide event.',
  },
  {
    id: 'independent-voices-screening',
    title: 'Independent Voices: Screening Format Study',
    status: 'upcoming',
    category: 'Screening',
    date: '09 OCT 2026 · 19:00',
    isoDate: '20261009T190000',
    endIsoDate: '20261009T213000',
    location: 'New York, NY · Sample venue',
    image: imagery.cinema,
    description: 'A demonstration screening format pairing a film program with an audience conversation.',
    detail:
      'A sample editorial event page showing how a future screening could present its date, venue, program note, and calendar action. No film, guests, ticketing partner, or venue booking is being announced.',
  },
  {
    id: 'modern-music-video',
    title: 'The Modern Music Video: Craft Session',
    status: 'upcoming',
    category: 'Music',
    date: '06 NOV 2026 · 17:30',
    isoDate: '20261106T173000',
    endIsoDate: '20261106T193000',
    location: 'Nashville, TN · Sample venue',
    image: imagery.talentStudio,
    description: 'A sample craft session on building a visual world around a musical performance.',
    detail:
      'This sample session explores performance, camera movement, production design, and edit rhythm as a framework for future music programming. It is demonstration content and does not feature a confirmed host or artist appearance.',
  },
  {
    id: 'script-to-screen-roundtable',
    title: 'From Script to Screen: Demo Roundtable',
    status: 'previous',
    category: 'Industry',
    date: '14 MAR 2026 · 18:00',
    isoDate: '20260314T180000',
    endIsoDate: '20260314T200000',
    location: 'Los Angeles, CA · Sample venue',
    image: imagery.cameraGlass,
    description: 'An archived example of a small industry roundtable and production conversation.',
    detail:
      'This previous-event entry demonstrates how an archive can preserve the intent and format of a past program without inventing attendance, guests, or outcomes. It is sample content only.',
  },
  {
    id: 'restoration-repertory',
    title: 'Restoration & Repertory: Demo Screening',
    status: 'previous',
    category: 'Screening',
    date: '24 JAN 2026 · 16:00',
    isoDate: '20260124T160000',
    endIsoDate: '20260124T183000',
    location: 'Online · Sample presentation',
    image: imagery.theaterSeats,
    description: 'A sample archive entry exploring presentation, restoration, and catalog context.',
    detail:
      'A demonstration archive page for a possible repertory screening. No specific restoration, screening copy, or presentation partner is claimed. Approved event reporting can replace this text at launch.',
  },
];

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: string[];
}

export const articles: Article[] = [
  {
    id: 'visual-language',
    title: 'How a Visual Language Takes Shape',
    category: 'Behind the Scenes',
    date: '12 FEB 2026 · SAMPLE DATE',
    readTime: '4 MIN READ',
    image: imagery.director,
    excerpt: 'A development journal on references, restraint, and the choices that make a frame feel intentional.',
    body: [
      'This is demonstration editorial copy for the Arya Worldwide design presentation. It explores a subject rather than announcing a real production, collaboration, or company milestone.',
      'A visual language rarely arrives fully formed. It is built through a sequence of precise decisions: the quality of light, the distance of the camera, the rhythm of a cut, and the details a frame chooses to leave out. References are most useful when they clarify intent rather than prescribe imitation.',
      'The strongest process leaves room for discovery while protecting the central idea. A future Arya journal entry could use this space for approved photography, filmmaker notes, and a concrete account of the work behind a particular scene.',
    ],
  },
  {
    id: 'script-and-screen',
    title: 'The Work Between Script and Screen',
    category: 'Production',
    date: '28 JAN 2026 · SAMPLE DATE',
    readTime: '5 MIN READ',
    image: imagery.crew,
    excerpt: 'Why development is less a waiting room than a series of creative and practical decisions.',
    body: [
      'This sample production article is designed to show the reading experience and does not describe an actual Arya Worldwide announcement.',
      'Between the first draft and the first day of photography sits a dense creative process. Scenes are tested against character, schedule, location, and resources. Each constraint can become a useful question: what does the story truly need, and what is the most expressive way to achieve it?',
      'A published version of this journal could follow one approved project through that process, giving readers specific insight without reducing production to a checklist.',
    ],
  },
  {
    id: 'music-video-performance',
    title: 'Designing a Music Video Around a Performance',
    category: 'Music',
    date: '09 JAN 2026 · SAMPLE DATE',
    readTime: '4 MIN READ',
    image: imagery.singer,
    excerpt: 'Camera, choreography, and edit rhythm in service of a singular musical identity.',
    body: [
      'This is sample editorial content, not a report about a specific artist or production. The verified “Heartbeat” music video is available separately in Selected Works.',
      'A performance-led video begins by listening. Tempo can inform cutting, but phrasing often reveals something more useful: where a held shot creates tension, where movement should open up, and when the most powerful choice is stillness.',
      'The finished piece should feel inseparable from the artist’s point of view. Future commissioned writing can replace this placeholder with verified production notes and approved behind-the-scenes material.',
    ],
  },
  {
    id: 'thoughtful-distribution',
    title: 'What Thoughtful Distribution Can Make Possible',
    category: 'Industry',
    date: '18 DEC 2025 · SAMPLE DATE',
    readTime: '6 MIN READ',
    image: imagery.cinema,
    excerpt: 'A clear-eyed look at audience, context, and the life of a story beyond its completion.',
    body: [
      'This demonstration industry essay contains no market claims, release announcements, or distribution agreements.',
      'Distribution is often discussed as a destination, but it is more useful to consider it as a relationship between a work and its potential audience. Context matters: where a story is encountered, how it is introduced, and whether the presentation respects what makes it distinctive.',
      'A future Arya editorial feature could bring approved case studies and practical detail to this discussion, with transparent information about venues, platforms, and release strategy.',
    ],
  },
  {
    id: 'catalog-presentation',
    title: 'A Restoration-First Approach to Catalog Presentation',
    category: 'Film',
    date: '02 DEC 2025 · SAMPLE DATE',
    readTime: '5 MIN READ',
    image: imagery.forestRoad,
    excerpt: 'An editorial placeholder about caring for image, context, and the experience of rediscovery.',
    body: [
      'This article is a design demonstration and does not claim that a particular restoration is underway or complete.',
      'Presenting catalog work begins with attention: to the source materials, to the original viewing experience, and to the expectations of a contemporary audience. Technical decisions are only one part of that responsibility; clear context and thoughtful presentation matter too.',
      'Approved project notes, comparison imagery, and partner information can be introduced here when a genuine restoration story is ready to be told.',
    ],
  },
  {
    id: 'development-slate',
    title: 'Building a Development Slate With Room to Breathe',
    category: 'Development',
    date: '14 NOV 2025 · SAMPLE DATE',
    readTime: '4 MIN READ',
    image: imagery.editSuite,
    excerpt: 'A sample note on creative range, patience, and giving each idea its own internal logic.',
    body: [
      'This sample development article does not announce a slate, project, or partnership.',
      'Range is not simply a matter of genre. A considered development environment makes space for different scales, voices, and production realities while remaining clear about the kind of work it wants to champion.',
      'That clarity allows an idea to develop at the pace it requires. A future edition of Inside Arya can replace this placeholder with verified project news when there is something official to share.',
    ],
  },
];

export const inquiryTypes = [
  'Film & Production Inquiries',
  'Talent & Artist Management',
  'Music & Entertainment',
  'Distribution & Partnerships',
  'General Inquiries',
] as const;

export const showreel = {
  video: 'https://videos.pexels.com/video-files/16392049/16392049-uhd_3840_2160_24fps.mp4',
  poster:
    'https://images.pexels.com/videos/16392049/4-k-abstract-alone-beautiful-16392049.jpeg?auto=compress&cs=tinysrgb&w=1800',
  credit: 'Demo footage: Film Composite / Pexels. Not official Arya Worldwide footage.',
};
