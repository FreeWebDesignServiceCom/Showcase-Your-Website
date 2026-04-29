export interface Website {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  category: 'Portfolio' | 'Agency' | 'Tools' | 'Blog';
  isFeatured?: boolean;
}

export const websites: Website[] = [
  {
    id: '1',
    name: 'Aether Studio',
    description: 'A minimalist design agency specializing in immersive digital experiences and unique brand identities.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
    url: '#',
    category: 'Agency',
    isFeatured: true
  },
  {
    id: '2',
    name: 'Nexus Analytics',
    description: 'Next-generation data visualization and real-time analytics for modern software teams.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    url: '#',
    category: 'Tools'
  },
  {
    id: '3',
    name: 'Elena Vance Portfolio',
    description: 'Exploring the intersection of interactive motion and high-end typography through web design.',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=1200',
    url: '#',
    category: 'Portfolio'
  },
  {
    id: '4',
    name: 'Chronos Journal',
    description: 'A daily publication focusing on the philosophy of time and modern productivity workflows.',
    image: 'https://images.unsplash.com/photo-1544197150-14e30fc27798?auto=format&fit=crop&q=80&w=1200',
    url: '#',
    category: 'Blog'
  },
  {
    id: '5',
    name: 'Morph UI',
    description: 'A component library designed for fluid interfaces and neo-skeuomorphic aesthetic.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    url: '#',
    category: 'Tools'
  },
  {
    id: '6',
    name: 'Velvet Agency',
    description: 'Boutique creative shop crafting pixel-perfect luxury digital assets for global brands.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    url: '#',
    category: 'Agency'
  },
  {
    id: '7',
    name: 'Prism Source',
    description: 'An open-source hub for creative developers to share shaders and WebGL experiments.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    url: '#',
    category: 'Tools'
  },
  {
    id: '8',
    name: 'Atlas Travels',
    description: 'Curated guides for the modern digital nomad looking for the best remote workspaces.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1200',
    url: '#',
    category: 'Blog'
  }
];
