import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  Palette,
  Bell,
  Lock,
  Eye,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { appThemes, AppTheme } from "../data/themes";
import { useTheme } from "../context/ThemeContext";

interface Props {
  onBack: () => void;
}

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: <Bell size={16} />, label: "Notifications", sub: "Manage alerts" },
      { icon: <Lock size={16} />, label: "Privacy", sub: "Who can see you" },
      { icon: <Eye size={16} />, label: "Visibility", sub: "Profile discovery" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: <HelpCircle size={16} />, label: "Help Center", sub: "FAQs & guides" },
    ],
  },
];

export function SettingsScreen({ onBack }: Props) {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ background: "#08080f", scrollbarWidth: "none" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-5">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ArrowLeft size={16} color="#f0f0fc" />
        </button>
        <div>
          <h2
            className="text-xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f0f0fc" }}
          >
            Settings
          </h2>
        </div>
      </div>

      {/* Theme section */}
      <div className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Palette size={14} color={activeTheme.primary} />
          <span
            className="text-xs tracking-widest"
            style={{ color: "#7070a0", fontFamily: "var(--font-body)", letterSpacing: "0.1em" }}
          >
            APP THEME
          </span>
        </div>

        {/* Active theme hero */}
        <div
          className="relative p-4 rounded-2xl mb-4 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${activeTheme.bgTint}, rgba(8,8,15,0.8))`,
            border: `1px solid ${activeTheme.cardBorder}`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: activeTheme.primary }}
          />
          <div className="relative flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: activeTheme.gradientCSS }}
            >
              {activeTheme.emoji}
            </div>
            <div>
              <p
                className="text-sm mb-0.5"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#f0f0fc" }}
              >
                {activeTheme.name}
              </p>
              <p className="text-xs" style={{ color: "#9090b8", fontFamily: "var(--font-body)" }}>
                {activeTheme.description}
              </p>
            </div>
            <div className="ml-auto">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: activeTheme.gradientCSS }}
              >
                <Check size={12} color="#ffffff" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Gradient preview bar */}
          <div
            className="mt-3 h-1 rounded-full"
            style={{ background: activeTheme.gradientCSS }}
          />
        </div>

        {/* Theme grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {appThemes.map((t, i) => (
            <ThemeCard
              key={t.id}
              theme={t}
              isActive={t.id === activeTheme.id}
              index={i}
              onSelect={() => setTheme(t)}
            />
          ))}
        </div>
      </div>

      {/* Other settings */}
      {settingsSections.map((section) => (
        <div key={section.title} className="px-5 mb-5">
          <p
            className="text-xs mb-2 tracking-widest"
            style={{ color: "#7070a0", fontFamily: "var(--font-body)", letterSpacing: "0.1em" }}
          >
            {section.title.toUpperCase()}
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {section.items.map((item, idx) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-4 transition-all text-left"
                style={{
                  background: "#0f0f1c",
                  borderBottom:
                    idx < section.items.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.06)", color: "#9090b8" }}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm" style={{ color: "#f0f0fc", fontFamily: "var(--font-body)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#606080", fontFamily: "var(--font-body)" }}>
                    {item.sub}
                  </p>
                </div>
                <ChevronRight size={14} color="#404060" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <div className="px-5 mb-28">
        <button
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl transition-all active:scale-95"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.15)",
          }}
        >
          <LogOut size={16} color="#ef4444" />
          <span
            className="text-sm font-medium"
            style={{ color: "#ef4444", fontFamily: "var(--font-display)" }}
          >
            Log Out
          </span>
        </button>

        <p
          className="text-center text-xs mt-5"
          style={{ color: "#404060", fontFamily: "var(--font-body)" }}
        >
          Verse v1.0.0 — Phase 1 Prototype
        </p>
      </div>
    </div>
  );
}

function ThemeCard({
  theme,
  isActive,
  index,
  onSelect,
}: {
  theme: AppTheme;
  isActive: boolean;
  index: number;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      className="relative p-3.5 rounded-2xl text-left transition-all overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${theme.bgTint}, rgba(15,15,28,0.9))`
          : "#0f0f1c",
        border: isActive
          ? `1.5px solid ${theme.cardBorder}`
          : "1.5px solid rgba(255,255,255,0.06)",
        boxShadow: isActive ? `0 4px 20px ${theme.glowColor}` : "none",
      }}
    >
      {/* Subtle bg glow for active */}
      {isActive && (
        <div
          className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-20 blur-xl pointer-events-none"
          style={{ background: theme.primary }}
        />
      )}

      <div className="relative">
        {/* Gradient swatch */}
        <div
          className="w-full h-8 rounded-xl mb-2.5"
          style={{ background: theme.gradientCSS }}
        />

        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs mb-0.5"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: isActive ? "#f0f0fc" : "#a0a0c0",
              }}
            >
              {theme.emoji} {theme.name}
            </p>
          </div>
          {isActive && (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: theme.gradientCSS }}
            >
              <Check size={10} color="#ffffff" strokeWidth={3} />
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
