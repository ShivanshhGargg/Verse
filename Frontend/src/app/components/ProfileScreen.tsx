import { useState } from "react";
import { Settings, Heart, Users, Grid, Bookmark, Edit3, MapPin, CheckCircle2 } from "lucide-react";
import { currentUser, feedPosts } from "../data/mockData";
import { motion } from "motion/react";
import { useTheme } from "../context/ThemeContext";

interface Props {
  onSettingsClick?: () => void;
}

export function ProfileScreen({ onSettingsClick }: Props) {
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");
  const { theme } = useTheme();

  return (
    <div className="flex flex-col h-full bg-[#08080f] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3">
        <h2
          className="text-xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f0f0fc" }}
        >
          Profile
        </h2>
        <button
          onClick={onSettingsClick}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
          style={{ background: `${theme.bgTint}`, border: `1px solid ${theme.cardBorder}` }}
        >
          <Settings size={16} color={theme.primary} />
        </button>
      </div>

      {/* Cover + avatar */}
      <div className="relative mx-4 mb-4">
        <div
          className="w-full h-32 rounded-2xl overflow-hidden"
          style={{ background: "#161628" }}
        >
          <img
            src={currentUser.coverImage}
            alt="cover"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.15))" }}
          />
        </div>

        {/* Avatar */}
        <div className="absolute -bottom-6 left-4">
          <div
            className="w-16 h-16 rounded-2xl p-0.5"
            style={{ background: theme.gradientCSS }}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full rounded-[14px] object-cover"
            />
          </div>
        </div>

        {/* Edit button */}
        <button
          className="absolute -bottom-4 right-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm"
          style={{
            background: theme.gradientCSS,
            color: "#ffffff",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            boxShadow: `0 4px 16px ${theme.glowColor}`,
          }}
        >
          <Edit3 size={12} />
          Edit
        </button>
      </div>

      {/* Name + info */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <h3
            className="text-xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f0f0fc" }}
          >
            {currentUser.name}
          </h3>
          {currentUser.verified && (
            <CheckCircle2 size={16} color={theme.primary} fill={theme.bgTint} />
          )}
        </div>
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={11} color="#7070a0" />
          <span className="text-xs" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
            {currentUser.location}
          </span>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#a0a0c0", fontFamily: "var(--font-body)" }}>
          {currentUser.bio}
        </p>

        {/* Interests */}
        <div className="flex gap-2 flex-wrap mb-5">
          {currentUser.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: theme.bgTint,
                border: `1px solid ${theme.cardBorder}`,
                color: theme.primary,
                fontFamily: "var(--font-body)",
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 mb-5">
        <div
          className="grid grid-cols-3 rounded-2xl overflow-hidden"
          style={{ background: "#0f0f1c", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            { label: "Posts", value: currentUser.stats.posts, icon: <Grid size={14} color={theme.primary} /> },
            { label: "Matches", value: currentUser.stats.matches, icon: <Users size={14} color={theme.secondary} /> },
            { label: "Likes", value: currentUser.stats.likes.toLocaleString(), icon: <Heart size={14} color="#ec4899" /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center py-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : undefined,
              }}
            >
              <div className="flex items-center gap-1 mb-1">
                {stat.icon}
                <span
                  className="text-lg"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f0f0fc" }}
                >
                  {stat.value}
                </span>
              </div>
              <span className="text-xs" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-5 mb-4 rounded-xl p-1" style={{ background: "#0f0f1c" }}>
        {(["posts", "saved"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm transition-all capitalize"
            style={{
              background: activeTab === tab ? theme.bgTint : "transparent",
              color: activeTab === tab ? theme.primary : "#606080",
              fontFamily: "var(--font-body)",
              fontWeight: activeTab === tab ? 500 : 400,
              border: activeTab === tab ? `1px solid ${theme.cardBorder}` : "1px solid transparent",
            }}
          >
            {tab === "posts" ? <Grid size={13} /> : <Bookmark size={13} />}
            {tab}
          </button>
        ))}
      </div>

      {/* Post grid */}
      <div className="mx-5 mb-24 grid grid-cols-3 gap-1.5">
        {feedPosts.map((post) => (
          <div
            key={post.id}
            className="aspect-square rounded-xl overflow-hidden relative"
            style={{ background: "#161628" }}
          >
            <img src={post.image} alt="" className="w-full h-full object-cover" />
            <div
              className="absolute bottom-0 left-0 right-0 h-8"
              style={{ background: "linear-gradient(transparent, rgba(8,8,15,0.6))" }}
            />
            <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
              <Heart size={10} color="#ffffff" fill="#ffffff" />
              <span className="text-xs text-white" style={{ fontFamily: "var(--font-body)" }}>
                {post.likes > 999 ? `${(post.likes / 1000).toFixed(1)}k` : post.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
