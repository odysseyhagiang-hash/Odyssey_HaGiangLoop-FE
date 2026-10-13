import { twMerge } from 'tailwind-merge';

type ClassValue = string | number | null | undefined | false | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const flatten = (value: ClassValue): string[] => {
    if (!value && value !== 0) return [];
    if (Array.isArray(value)) return value.flatMap(flatten);
    return [String(value)];
  };
  return twMerge(inputs.flatMap(flatten).join(' '));
}

export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}
export const BLOG_IMAGE_COUNT = 80;

/** Short description of each /Blog/N.webp (index 0 = 1.webp), shown in the admin cover picker. */
export const BLOG_IMAGE_LABELS: string[] = [
  'Rider on blue dirt bike',
  'Rider on red scooter, mountain view',
  'Winding mountain road',
  'Pose on karst peak (red cap)',
  'Guide hug at Odyssey office',
  'Fitting knee guards by the road',
  'Odyssey swimming pool',
  'Helmet fitting on Ha Giang street',
  'Knee guard fitting at Odyssey',
  'Riders at Odyssey stairs',
  'Big group photo with guides',
  'Group on ridge above the river',
  'Riders lined up with knee guards',
  'Two guests at viewpoint seats',
  'Guides at prayer-flag viewpoint',
  'Guests in conical hats on boat',
  'Elderly woman weaving',
  'Four village children on bench',
  'Group jumping at canyon edge',
  'Riders on motorbikes at gate',
  'Jump pose on karst peak',
  'Odyssey guide team with banner',
  'Handshake at Odyssey lobby',
  'Pose on karst peak (green cap)',
  'Woman with motorbike at sunset',
  'Guests in helmets at Odyssey',
  'Two bikes with riders and guides',
  'Guide and guest on red bike',
  'Boat picnic in conical hats',
  'Riders ready to depart',
  'Elderly woman embroidering',
  'Elderly woman close-up',
  'Couple at river viewpoint',
  'Large group with scarves at viewpoint',
  'Group on rock above winding road',
  'Man sitting on rock ledge',
  'Man photographing the valley',
  'Man with Nho Que river behind',
  'Climber on rock face',
  'Traditional costumes at cafe',
  'Two riders on dark bike',
  'Smiling guests on boat',
  'Couple above Nho Que river',
  'Lone figure above canyon',
  'Group with flag (back view)',
  'Costume pair at lattice door',
  'Riders at viewpoint with red bike',
  'Group in vests with flag',
  'Home-cooked dinner table',
  'Guide and guest thumbs-up',
  'Rider convoy on the road',
  'Villagers on corn field path',
  'Emerald river from boat',
  'Two women looking at the river',
  'Riders on bikes at gate',
  'Guide and guest on red bike (2)',
  'Three friends at flag viewpoint',
  'Two women with arms out, flag',
  'Bamboo raft on the river',
  'Guide at route map',
  'Water handover at Odyssey',
  'Route map close-up',
  'Car window greeting',
  'Group on wooden deck',
  'Three friends posing above canyon',
  'Group swimming at waterfall pool',
  'Guests with guide on plaza',
  'Raft picnic on green water',
  'Traditional costumes on old street',
  'Friendship bracelets circle',
  'Carried in rain poncho',
  'Group at waterfall by boat',
  'Rice planting',
  'Four riders at flag viewpoint',
  'Sea of clouds',
  'Green hillside',
  'Valley village with twin peaks',
  'Karst valley town',
  'Narrow gorge',
  'Clouds over terraces',
];

/** Deterministic stand-in cover from /Blog/1.webp – /Blog/80.webp, picked by seed so a post always gets the same one. */
export function blogFallbackImage(seed = ''): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return `/Blog/${(hash % BLOG_IMAGE_COUNT) + 1}.webp`;
}

/** onError handler for plain <img>: swaps a broken (e.g. Cloudinary) image for a /Blog fallback, once. */
export function blogImageOnError(seed: string) {
  return (e: { currentTarget: HTMLImageElement }) => {
    const img = e.currentTarget;
    if (img.dataset.fallback) return;
    img.dataset.fallback = '1';
    img.src = blogFallbackImage(seed);
  };
}
