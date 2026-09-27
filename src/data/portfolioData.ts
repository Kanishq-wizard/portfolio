import { Project, SideQuest, StickyNote, CuttingBoardItem } from '../types';
import kanishqProfilePhoto from '../assets/images/kanishq_profile_photo_1790498789973.jpg';
import kanishqDeskPhoto from '../assets/images/kanishq_desk_photo_1790498804128.jpg';
import kanishqAvatarDoodle from '../assets/images/kanishq_avatar_doodle_1788026929290.jpg';
import kanishqDeskDoodle from '../assets/images/kanishq_desk_doodle_1788026947814.jpg';
import kanishqCharacterDoodle from '../assets/images/kanishq_character_doodle_1788027005205.jpg';

export const HERO_DATA = {
  name: 'Kanishq',
  role: 'Full-Stack Developer & Prototyper',
  location: 'Delhi, India',
  timezone: 'GMT+5:30 (IST)',
  experience: '8+ Years',
  headline: 'Building tools and systems that empower people to do their best work.',
  subheadline:
    'Full-stack software developer, rapid prototyper, and creative engineer based in Delhi, India. Transforming complex workflows and high-scale systems into tactile, high-performance digital tools.',
  availability: 'Available for select high-impact engineering projects & full-stack development',
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'bash',
    title: 'OmniFlow',
    tagline: 'High-scale omnichannel retail & multi-brand discovery commerce platform',
    role: 'Lead Full-Stack Engineer & Prototyper',
    timeline: '2023 — 2025',
    ticketType: 'boarding-pass',
    accentColor: '#133827',
    secondaryColor: '#E8EFE6',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    overview:
      'OmniFlow united 500+ top retail brands into a unified, high-performance shopping app and web ecosystem. Led the core discovery architecture, unified multi-cart state engine, checkout pipeline, and cross-platform design token synchronization.',
    challenge:
      'Each constituent brand had legacy silos, disparate fulfillment methods, separate loyalty systems, and divergent customer archetypes. We had to create a singular, lightning-fast digital storefront that respected individual brand identities while delivering instant multi-item checkout.',
    solution:
      'Engineered an adaptive, modular component architecture with dynamic brand themes, consolidated cross-brand cart & store fulfillment pickers, 1-tap instant payments (UPI & cards), and seamless reward integration.',
    keyFeatures: [
      'Modular Multi-Brand Design System (500+ brands supported)',
      'Universal Cart with smart multi-warehouse & click-and-collect routing',
      'Frictionless 3-step checkout with instant biometrics & saved card vaults',
      'AI-curated discovery feeds with real-time stock availability across 2,000+ stores',
    ],
    metrics: [
      { label: 'Conversion Lift', value: '+42%' },
      { label: 'Monthly Active Users', value: '2.8M+' },
      { label: 'App Store Rating', value: '4.8 ★' },
      { label: 'Checkout Duration', value: '-65%' },
    ],
    tags: ['E-Commerce', 'Design Systems', 'Mobile App', 'Fintech & Checkout', 'Design Leadership'],
    prototypeUrl: 'https://github.com',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
        caption: 'Universal mobile checkout flow and multi-brand item basket architecture',
      },
      {
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        caption: 'Design token architecture supporting 20+ sub-brand color accents seamlessly',
      },
    ],
  },
  {
    id: 'pulse',
    title: 'Pulse',
    tagline: 'Asynchronous team rhythm, sentiment pulse & standup workspace',
    role: 'Principal Full-Stack Developer',
    timeline: '2022 — 2023',
    ticketType: 'luggage-tag',
    accentColor: '#B43B22',
    secondaryColor: '#FDECE8',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Pulse reimagines how distributed engineering & product teams communicate across 12 timezones without meeting fatigue. Engineered an organic, mood-aware check-in board and live sentiment visualizer that replaces stale daily standup calls.',
    challenge:
      'Remote teams suffer from meeting burnout and lack of organic emotional awareness. Existing bot check-ins felt robotic, sterile, and were frequently ignored.',
    solution:
      'Engineered a tactile, emoji-driven quick check-in interface with smart block detection, asynchronous video/audio snippets, and automated weekly team health reflections.',
    keyFeatures: [
      'Tactile 10-second daily standup input with blocker flagging',
      'Team sentiment heatmaps with trend anomaly detection',
      'Slack & Discord automated sync with custom interactive threads',
      'Focus block scheduler syncing directly into Google & Apple Calendars',
    ],
    metrics: [
      { label: 'Meeting Hours Saved', value: '4.5 hrs/wk' },
      { label: 'Check-in Participation', value: '94%' },
      { label: 'Remote Teams Using', value: '140+' },
      { label: 'Net Promoter Score', value: '+78' },
    ],
    tags: ['SaaS Tooling', 'Full-Stack React', 'Data Viz', 'Asynchronous Architecture'],
    prototypeUrl: 'https://pulse.app',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        caption: 'Real-time team sentiment analytics and cognitive load trends',
      },
      {
        url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
        caption: 'Quick check-in drawer with interactive blocker chips and focus time locks',
      },
    ],
  },
  {
    id: 'heygo',
    title: 'Voyage',
    tagline: 'Live-streamed interactive virtual travel & guided culture tours worldwide',
    role: 'Lead Frontend Engineer',
    timeline: '2021 — 2022',
    ticketType: 'wristband',
    accentColor: '#1E40AF',
    secondaryColor: '#EFF6FF',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Voyage connected armchair travelers with licensed local guides across 90+ countries through real-time interactive livestreaming, virtual postcard capture, and micro-tipping.',
    challenge:
      'Creating a feeling of genuine shared presence and connection between 500+ concurrent live viewers and an outdoor guide navigating crowded streets on a gimbal rig in real time.',
    solution:
      'Built a high-performance live viewing client with instant postcard screenshot stamps, interactive live map routes, synchronized audio cues, and seamless guide tipping micro-interactions.',
    keyFeatures: [
      'Ultra-low-latency live video player with custom floating reactions',
      'Virtual Postcard maker with geotags and guide signatures',
      'Live GPS map route tracker syncing guide location in real time',
      'Multi-currency tipping engine with instant on-screen appreciation alerts',
    ],
    metrics: [
      { label: 'Virtual Tours Completed', value: '1.2M+' },
      { label: 'Postcards Snapped', value: '8.4M+' },
      { label: 'Guide Earnings Paid', value: '$3.5M+' },
      { label: 'User Satisfaction', value: '98%' },
    ],
    tags: ['Live Streaming', 'WebRTC / Media', 'Interactive Maps', 'Full-Stack'],
    prototypeUrl: 'https://voyage.live',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        caption: 'Live tour interface with interactive postcard snapshot stamp & guide chat',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        caption: 'Geolocated guide explorer and traveler passport stamped archive',
      },
    ],
  },
  {
    id: 'dotslash',
    title: 'Dotslash',
    tagline: 'High-density developer code review & workflow workspace',
    role: 'Lead Developer & Architect',
    timeline: '2023 — 2024',
    ticketType: 'train-ticket',
    accentColor: '#4C1D95',
    secondaryColor: '#F5F3FF',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    overview:
      'Dotslash is a keyboard-first code review platform built for high-throughput software teams who refuse to spend their days wrestling clunky web diffs. Architected the dark-mode UI, AST code diff engine, and VS Code companion.',
    challenge:
      'Traditional pull request review tools are noisy, slow, and break the developer’s flow state. Reviewers need syntax-aware context, inline AI explanations, and seamless multi-file traversal.',
    solution:
      'Engineered an ultra-fast, monospaced review canvas with split diffs, side-by-side AST references, vim keybindings, and inline threaded suggestions.',
    keyFeatures: [
      'Keyboard-first navigation (Vim & custom keymaps)',
      'Smart AST-aware syntactic diff viewer with zero layout shift',
      'Threaded code conversations with instant one-click GitHub & GitLab sync',
      'High-contrast accessible theme built specifically for 8+ hour screen sessions',
    ],
    metrics: [
      { label: 'Review Turnaround Time', value: '-35%' },
      { label: 'GitHub Stars', value: '18.2k' },
      { label: 'Daily Reviews Logged', value: '45,000+' },
      { label: 'Dark Mode Adoption', value: '92%' },
    ],
    tags: ['Developer Tools', 'TypeScript AST', 'Keyboard Navigation', 'Open Source'],
    prototypeUrl: 'https://dotslash.dev',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
        caption: 'Split syntax diff view with AST inline token analysis and keyboard hints',
      },
      {
        url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        caption: 'Design system tokens optimized for high information density',
      },
    ],
  },
];

export const SIDE_QUESTS_DATA: SideQuest[] = [
  {
    id: 'drift',
    title: 'Drift',
    category: 'Audio Engine & Focus Timer',
    year: '2025',
    description: 'An interactive ambient sound synthesizer built with Web Audio API, combining binaural tones, procedural noise, and precise timer loops.',
    badge: 'Web Audio API',
    interactiveType: 'drift',
    linkText: 'Play Tone',
  },
  {
    id: 'triple-time',
    title: 'Triple Time',
    category: 'Global Time Coordinator',
    year: '2024',
    description: 'A tactile time scrubber connecting Delhi (GMT+5:30), London, New York, San Francisco, and Tokyo to find golden meeting hours without math.',
    badge: 'Time Scrubber',
    interactiveType: 'triple-time',
    linkText: 'Scrub Time',
  },
  {
    id: 'puzzle-2048',
    title: 'TF2048',
    category: 'Mini Retro Arcade',
    year: '2024',
    description: 'A pocket-sized 2048 tile merger crafted with crisp haptics, retro monospaced typography, and smooth directional key mechanics.',
    badge: 'Arcade Engine',
    interactiveType: 'puzzle-2048',
    linkText: 'Play Game',
  },
  {
    id: 'audio-vis',
    title: "Who's Speaking?",
    category: 'Audio Visualizer',
    year: '2023',
    description: 'Real-time browser audio waveform and frequency spectrum visualizer designed with tactile CRT oscilloscope aesthetics.',
    badge: 'Audio DSP / Canvas',
    interactiveType: 'audio-vis',
    linkText: 'View Waves',
  },
  {
    id: 'resqued',
    title: 'ResQued',
    category: 'Pet Adoption App',
    year: '2023',
    description: 'Tactile card-swiping mobile experiment for emergency animal foster homes across Delhi NCR.',
    badge: 'Mobile Prototype',
    interactiveType: 'resqued',
    linkText: 'Swipe Cards',
  },
];

export const INITIAL_CUTTING_BOARD_ITEMS: CuttingBoardItem[] = [
  {
    id: 'item-1',
    type: 'polaroid',
    title: 'Studio Desk DEL',
    content: 'Warm masala chai & late night code commits',
    x: 40,
    y: 50,
    rotation: -4,
    image: kanishqDeskPhoto,
  },
  {
    id: 'item-2',
    type: 'swatch',
    title: 'Terminal Palette',
    content: '#133827 Deep Emerald\n#D97706 Delhi Terracotta\n#B43B22 Spice Crimson',
    color: '#133827',
    x: 320,
    y: 35,
    rotation: 6,
  },
  {
    id: 'item-3',
    type: 'wireframe',
    title: 'Architecture v0.4',
    content: 'API Pipeline: Reduced latency by 65%. Implemented optimistic UI updates & client-side caching.',
    x: 180,
    y: 200,
    rotation: -2,
  },
  {
    id: 'item-4',
    type: 'tape',
    title: 'Washi Tape',
    content: 'DO NOT SHIP SLOW CODE',
    color: '#FBBF24',
    x: 520,
    y: 110,
    rotation: -12,
  },
  {
    id: 'item-5',
    type: 'sketch',
    title: 'Core Philosophy',
    content: '“Software should be snappy, resilient, and built directly in code with deep attention to detail.”',
    x: 480,
    y: 220,
    rotation: 3,
  },
  {
    id: 'item-6',
    type: 'tag',
    title: 'Luggage Tag',
    content: 'DEL ➔ GLOBAL\nFlight: KD-2026\nSeat: 01A Engineering',
    color: '#E11D48',
    x: 80,
    y: 300,
    rotation: 8,
  },
];

export const INITIAL_STICKY_NOTES: StickyNote[] = [
  {
    id: 'note-1',
    author: 'Sarah M. (Engineering VP)',
    message: 'Kanishq writes exceptionally clean, robust code and builds full-stack features faster than entire teams!',
    color: 'yellow',
    rotation: -2,
    date: 'Aug 2025',
    stamp: 'VERIFIED',
  },
  {
    id: 'note-2',
    author: 'Devin K. (Staff Engineer)',
    message: 'A true full-stack developer who understands both frontend performance physics and solid backend architecture.',
    color: 'mint',
    rotation: 3,
    date: 'Jul 2025',
    stamp: '10/10',
  },
  {
    id: 'note-3',
    author: 'Elena R. (Founder)',
    message: 'The interactive developer portfolio with custom doodles is the most engaging site I’ve seen all year.',
    color: 'peach',
    rotation: -4,
    date: 'Jun 2025',
    stamp: 'FAVORITE',
  },
];

export const ABOUT_STORIES = [
  {
    id: 'delhi-origins',
    title: 'Bustling Energy & Delhi Heritage',
    tag: 'Origins',
    snippet:
      'Growing up in Delhi surrounded by centuries of architecture and vibrant tech ecosystems taught me that high-performance engineering paired with grounded aesthetics creates timeless software.',
    icon: 'Compass',
  },
  {
    id: 'craft-code',
    title: 'Code as the Core Building Material',
    tag: 'Engineering',
    snippet:
      'I don’t just sketch mockups — I build production software (React, TypeScript, Three.js, Node.js, Web Audio, shaders, CSS layout physics). Direct code craftsmanship produces fast, unbreakable user experiences.',
    icon: 'Code2',
  },
  {
    id: 'curiosity',
    title: 'Doodling, Chai & Mechanical Keyboards',
    tag: 'Rituals',
    snippet:
      'Every great engineering solution begins with a quick architecture doodle in a dot-grid notebook over a cup of hot adrak masala chai. Tactile switches and physical notebooks keep my engineering grounded in reality.',
    icon: 'Utensils',
  },
  {
    id: 'mindset',
    title: 'Rapid Prototyping & Iteration',
    tag: 'Mindset',
    snippet:
      'Wiping out or building a failed prototype is just instant data for your next iteration. Build working software early, test rigorously, and ship with relentless attention to quality.',
    icon: 'Zap',
  },
];
export { kanishqProfilePhoto, kanishqDeskPhoto, kanishqAvatarDoodle, kanishqDeskDoodle, kanishqCharacterDoodle };

