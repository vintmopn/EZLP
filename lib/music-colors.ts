export type MusicColor = {
  id: string;
  label: string;
  hex: string;
  text: string;
};

export const MUSIC_COLORS: MusicColor[] = [
  { id: 'black', label: 'BLACK', hex: '#111111', text: '#FFFFFF' },
  { id: 'white', label: 'WHITE', hex: '#FFFFFF', text: '#111111' },
  { id: 'clear', label: 'CLEAR', hex: '#F2F4F5', text: '#111111' },
  { id: 'grey', label: 'GREY', hex: '#8B8B8B', text: '#FFFFFF' },
  { id: 'silver', label: 'SILVER', hex: '#C0C0C0', text: '#111111' },
  { id: 'gold', label: 'GOLD', hex: '#D4AF37', text: '#111111' },
  { id: 'beige', label: 'BEIGE', hex: '#D8C3A5', text: '#111111' },
  { id: 'brown', label: 'BROWN', hex: '#6F4E37', text: '#FFFFFF' },

  { id: 'red', label: 'RED', hex: '#E53935', text: '#FFFFFF' },
  { id: 'burgundy', label: 'BURGUNDY', hex: '#800020', text: '#FFFFFF' },
  { id: 'wine', label: 'WINE', hex: '#722F37', text: '#FFFFFF' },
  { id: 'coral', label: 'CORAL', hex: '#FF6F61', text: '#111111' },
  { id: 'orange', label: 'ORANGE', hex: '#F57C00', text: '#111111' },

  { id: 'yellow', label: 'YELLOW', hex: '#FDD835', text: '#111111' },
  { id: 'cream', label: 'CREAM', hex: '#FFFDD0', text: '#111111' },

  { id: 'lime', label: 'LIME', hex: '#B7E000', text: '#111111' },
  { id: 'green', label: 'GREEN', hex: '#2E7D32', text: '#FFFFFF' },
  { id: 'olive', label: 'OLIVE', hex: '#708238', text: '#FFFFFF' },
  { id: 'forest', label: 'FOREST', hex: '#214E34', text: '#FFFFFF' },
  { id: 'mint', label: 'MINT', hex: '#98FF98', text: '#111111' },

  { id: 'teal', label: 'TEAL', hex: '#008080', text: '#FFFFFF' },
  { id: 'turquoise', label: 'TURQUOISE', hex: '#40E0D0', text: '#111111' },
  { id: 'sky-blue', label: 'SKY BLUE', hex: '#87CEEB', text: '#111111' },
  { id: 'blue', label: 'BLUE', hex: '#2563EB', text: '#FFFFFF' },
  { id: 'royal-blue', label: 'ROYAL BLUE', hex: '#4169E1', text: '#FFFFFF' },
  { id: 'navy', label: 'NAVY', hex: '#001F3F', text: '#FFFFFF' },

  { id: 'purple', label: 'PURPLE', hex: '#7E22CE', text: '#FFFFFF' },
  { id: 'violet', label: 'VIOLET', hex: '#8F00FF', text: '#FFFFFF' },
  { id: 'lavender', label: 'LAVENDER', hex: '#C8A2C8', text: '#111111' },

  { id: 'pink', label: 'PINK', hex: '#F8A5C2', text: '#111111' },
  { id: 'hot-pink', label: 'HOT PINK', hex: '#FF1493', text: '#FFFFFF' },
  { id: 'rose', label: 'ROSE', hex: '#E8A0BF', text: '#111111' },

  { id: 'marble', label: 'MARBLE', hex: 'linear-gradient(135deg,#111 0%,#eee 35%,#777 55%,#fff 75%,#222 100%)', text: '#FFFFFF' },
  { id: 'splatter', label: 'SPLATTER', hex: 'linear-gradient(135deg,#FF3B30,#FFD60A,#34C759,#0A84FF,#AF52DE)', text: '#FFFFFF' },
  { id: 'swirl', label: 'SWIRL', hex: 'linear-gradient(135deg,#6C5CE7,#FD79A8,#74B9FF,#55EFC4)', text: '#FFFFFF' },
  { id: 'smoke', label: 'SMOKE', hex: 'linear-gradient(135deg,#111,#777,#DDD)', text: '#FFFFFF' },
  { id: 'half-half', label: 'HALF & HALF', hex: 'linear-gradient(90deg,#111 50%,#F8A5C2 50%)', text: '#FFFFFF' },
  { id: 'multi', label: 'MULTI', hex: 'linear-gradient(90deg,#E53935,#FDD835,#2E7D32,#2563EB,#7E22CE)', text: '#FFFFFF' },
  { id: 'picture-disc', label: 'PICTURE DISC', hex: 'linear-gradient(135deg,#222,#D4AF37,#F8A5C2,#2563EB)', text: '#FFFFFF' },
];

export function findMusicColor(id?: string | null) {
  if (!id) return MUSIC_COLORS[0];
  const value = id.toLowerCase().trim();
  return MUSIC_COLORS.find(
    c => c.id === value || c.label.toLowerCase() === value
  ) || MUSIC_COLORS[0];
}
