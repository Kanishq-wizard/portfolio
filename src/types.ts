export interface Project {
  id: string;
  title: string;
  tagline: string;
  role: string;
  timeline: string;
  ticketType: 'luggage-tag' | 'wristband' | 'boarding-pass' | 'train-ticket';
  accentColor: string;
  secondaryColor: string;
  coverImage: string;
  overview: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  prototypeUrl?: string;
  galleryImages: { url: string; caption: string }[];
}

export interface SideQuest {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  badge: string;
  interactiveType: 'drift' | 'triple-time' | 'puzzle-2048' | 'audio-vis' | 'resqued';
  linkText?: string;
}

export interface StickyNote {
  id: string;
  author: string;
  message: string;
  color: 'yellow' | 'pink' | 'mint' | 'blue' | 'peach';
  rotation: number;
  date: string;
  stamp?: string;
}

export interface CuttingBoardItem {
  id: string;
  type: 'polaroid' | 'wireframe' | 'swatch' | 'tape' | 'sketch' | 'tag' | 'sticker';
  title: string;
  content: string;
  x: number;
  y: number;
  rotation: number;
  color?: string;
  width?: number;
  height?: number;
  image?: string;
}

export interface StampMark {
  id: string;
  x: number;
  y: number;
  text: string;
  color: string;
  rotation: number;
}
