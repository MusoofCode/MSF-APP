
import { SelectionOption, OnboardingSlide } from './types';

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    title: "Turn Your Photo Into AI Art",
    description: "Experience the world's most advanced AI identity-lock technology for free.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Choose clothes, background, mood & style",
    description: "Full studio control at your fingertips. Customize every pixel of your transformation.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "AI adapts your real face — not a random person",
    description: "Our proprietary Banana Engine v4 ensures 100% identity preservation.",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Download ultra-HD images for free",
    description: "Studio-quality results delivered in 8K clarity, ready for the world.",
    image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=1000"
  }
];

export const CLOTHING_OPTIONS: SelectionOption[] = [
  { id: 'c1', name: 'Black Tie Luxury', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=400', promptSnippet: 'wearing a luxury tailored black tuxedo with a crisp white shirt and bow tie', badge: 'Trending' },
  { id: 'c2', name: 'Tech Minimalist', image: 'https://images.unsplash.com/photo-1552061330-334d2a95210f?auto=format&fit=crop&q=80&w=400', promptSnippet: 'wearing a high-end black turtleneck and designer minimalist eyewear' },
  { id: 'c3', name: 'Streetwear Icon', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400', promptSnippet: 'wearing futuristic oversized luxury streetwear and a hypebeast jacket', badge: 'New' },
  { id: 'c4', name: 'Royal Armor', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400', promptSnippet: 'wearing intricate golden ceremonial plate armor with royal engravings' },
  { id: 'c5', name: 'Cyber Suit', image: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=400', promptSnippet: 'wearing a high-tech glowing carbon fiber exosuit with integrated circuitry', badge: 'Popular' },
  { id: 'c6', name: 'Silk Editorial', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400', promptSnippet: 'wearing flowing avant-garde silk fabrics in a high-fashion editorial style' }
];

export const BACKGROUND_OPTIONS: SelectionOption[] = [
  { id: 'b1', name: 'Pro Studio', image: 'https://images.unsplash.com/photo-1598449334855-0112ee525bae?auto=format&fit=crop&q=80&w=400', promptSnippet: 'in a professional photography studio with clean softbox lighting and neutral gray backdrop' },
  { id: 'b2', name: 'Neon Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-e94e270b4d42?auto=format&fit=crop&q=80&w=400', promptSnippet: 'on a rain-slicked street in futuristic Tokyo at night with vibrant neon reflections', badge: 'Top Pick' },
  { id: 'b3', name: 'Alpine Villa', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400', promptSnippet: 'in a glass-walled luxury villa overlooking the snow-capped Swiss Alps at sunset' },
  { id: 'b4', name: 'Zen Garden', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400', promptSnippet: 'in a minimalist Japanese Zen garden with bamboo and raked sand' },
  { id: 'b5', name: 'Orbit Station', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400', promptSnippet: 'inside a high-tech space station with a massive view of planet Earth in the background', badge: 'Cinematic' },
  { id: 'b6', name: 'Parisian Balcony', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400', promptSnippet: 'on a classic limestone balcony in Paris with the Eiffel Tower visible in the distance' }
];

export const PHOTOSHOOT_OPTIONS: SelectionOption[] = [
  { id: 'p1', name: 'Rembrandt Light', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400', promptSnippet: 'using dramatic Rembrandt lighting with deep shadows and high contrast', badge: 'Classic' },
  { id: 'p2', name: 'Golden Hour', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400', promptSnippet: 'captured during the golden hour with warm, soft, ethereal sunlight' },
  { id: 'p3', name: 'Magazine Gloss', image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80&w=400', promptSnippet: 'in the style of a high-gloss fashion magazine cover with sharp focus and perfect skin retouching' },
  { id: 'p4', name: 'Anamorphic Cinema', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400', promptSnippet: 'shot on 35mm anamorphic film with cinematic bokeh and slight lens flare', badge: 'Movie Quality' }
];

export const EXPRESSION_OPTIONS: SelectionOption[] = [
  { id: 'e1', name: 'Confident Smile', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', promptSnippet: 'with a warm, confident, and genuine friendly smile' },
  { id: 'e2', name: 'Neutral Focus', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400', promptSnippet: 'with a calm, neutral, and focused professional expression' },
  { id: 'e3', name: 'Stoic Intensity', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', promptSnippet: 'with a powerful, stoic, and intense gaze' },
  { id: 'e4', name: 'Joyful Laugh', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400', promptSnippet: 'with a spontaneous and joyful laugh' }
];
