export interface AppTheme {
  id: string;
  name: string;
  emoji: string;
  description: string;
  primary: string;
  secondary: string;
  gradient: string;
  gradientCSS: string;
  bgTint: string;
  cardBorder: string;
  glowColor: string;
}

export const appThemes: AppTheme[] = [
  {
    id: "cosmic",
    name: "Cosmic",
    emoji: "🔮",
    description: "Purple & blue — the default Verse vibe",
    primary: "#a855f7",
    secondary: "#3b82f6",
    gradient: "from-purple-500 to-blue-500",
    gradientCSS: "linear-gradient(135deg, #a855f7, #3b82f6)",
    bgTint: "rgba(168,85,247,0.12)",
    cardBorder: "rgba(168,85,247,0.15)",
    glowColor: "rgba(168,85,247,0.35)",
  },
  {
    id: "midnight",
    name: "Midnight",
    emoji: "🌙",
    description: "Indigo & cyan — cool and electric",
    primary: "#6366f1",
    secondary: "#06b6d4",
    gradient: "from-indigo-500 to-cyan-400",
    gradientCSS: "linear-gradient(135deg, #6366f1, #06b6d4)",
    bgTint: "rgba(99,102,241,0.12)",
    cardBorder: "rgba(99,102,241,0.15)",
    glowColor: "rgba(99,102,241,0.35)",
  },
  {
    id: "sunset",
    name: "Sunset",
    emoji: "🌅",
    description: "Pink & orange — warm and expressive",
    primary: "#ec4899",
    secondary: "#f97316",
    gradient: "from-pink-500 to-orange-400",
    gradientCSS: "linear-gradient(135deg, #ec4899, #f97316)",
    bgTint: "rgba(236,72,153,0.12)",
    cardBorder: "rgba(236,72,153,0.15)",
    glowColor: "rgba(236,72,153,0.35)",
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "🌿",
    description: "Emerald & teal — grounded and calm",
    primary: "#10b981",
    secondary: "#14b8a6",
    gradient: "from-emerald-500 to-teal-400",
    gradientCSS: "linear-gradient(135deg, #10b981, #14b8a6)",
    bgTint: "rgba(16,185,129,0.12)",
    cardBorder: "rgba(16,185,129,0.15)",
    glowColor: "rgba(16,185,129,0.35)",
  },
  {
    id: "gold",
    name: "Gold Rush",
    emoji: "✨",
    description: "Amber & yellow — bold and radiant",
    primary: "#f59e0b",
    secondary: "#eab308",
    gradient: "from-amber-500 to-yellow-400",
    gradientCSS: "linear-gradient(135deg, #f59e0b, #eab308)",
    bgTint: "rgba(245,158,11,0.12)",
    cardBorder: "rgba(245,158,11,0.15)",
    glowColor: "rgba(245,158,11,0.35)",
  },
  {
    id: "cherry",
    name: "Cherry",
    emoji: "🍒",
    description: "Red & rose — fierce and passionate",
    primary: "#ef4444",
    secondary: "#f43f5e",
    gradient: "from-red-500 to-rose-500",
    gradientCSS: "linear-gradient(135deg, #ef4444, #f43f5e)",
    bgTint: "rgba(239,68,68,0.12)",
    cardBorder: "rgba(239,68,68,0.15)",
    glowColor: "rgba(239,68,68,0.35)",
  },
];

export const defaultTheme = appThemes[0];
