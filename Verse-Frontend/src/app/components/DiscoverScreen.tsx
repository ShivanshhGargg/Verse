import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Zap, MapPin, Star } from "lucide-react";
import { discoverUsers, User } from "../data/mockData";

export function DiscoverScreen() {
  const [cards, setCards] = useState<User[]>(discoverUsers);
  const [lastAction, setLastAction] = useState<"like" | "skip" | "connect" | null>(null);
  const [exitDir, setExitDir] = useState<number>(0);

  const handleAction = (action: "like" | "skip" | "connect") => {
    setLastAction(action);
    setExitDir(action === "skip" ? -1 : 1);
    setTimeout(() => {
      setCards((prev) => prev.slice(1));
      setLastAction(null);
    }, 350);
  };

  const currentCard = cards[0];
  const nextCard = cards[1];

  return (
    <div className="flex flex-col h-full bg-[#08080f]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-3">
        <div>
          <h2
            className="text-xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f0f0fc" }}
          >
            Discover
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
            {cards.length} people nearby
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: "rgba(168,85,247,0.1)" }}>
          <Star size={12} color="#a855f7" fill="#a855f7" />
          <span className="text-xs" style={{ color: "#c084fc", fontFamily: "var(--font-body)" }}>
            Premium
          </span>
        </div>
      </div>

      {/* Card stack area */}
      <div className="flex-1 relative px-5 py-2">
        {cards.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="relative w-full h-full">
            {/* Background card (next) */}
            {nextCard && (
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  transform: "scale(0.94) translateY(12px)",
                  transformOrigin: "bottom center",
                  zIndex: 1,
                  background: "#161628",
                }}
              >
                <img
                  src={nextCard.avatar}
                  alt={nextCard.name}
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.5 }}
                />
              </div>
            )}

            {/* Front card */}
            <AnimatePresence>
              {currentCard && (
                <motion.div
                  key={currentCard.id}
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{ zIndex: 2 }}
                  initial={{ scale: 1, x: 0, opacity: 1 }}
                  exit={{
                    x: exitDir * 400,
                    rotate: exitDir * 15,
                    opacity: 0,
                    transition: { duration: 0.35 },
                  }}
                >
                  <ProfileCard
                    user={currentCard}
                    action={lastAction}
                    onLike={() => handleAction("like")}
                    onSkip={() => handleAction("skip")}
                    onConnect={() => handleAction("connect")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileCard({
  user,
  action,
  onLike,
  onSkip,
  onConnect,
}: {
  user: User;
  action: "like" | "skip" | "connect" | null;
  onLike: () => void;
  onSkip: () => void;
  onConnect: () => void;
}) {
  return (
    <div className="w-full h-full relative" style={{ background: "#0f0f1c" }}>
      {/* Photo */}
      <img
        src={user.avatar}
        alt={user.name}
        className="w-full object-cover"
        style={{ height: "65%" }}
      />

      {/* Action flash overlays */}
      {action === "like" && (
        <div
          className="absolute inset-0 flex items-start justify-end p-6 pointer-events-none"
          style={{ background: "rgba(168,85,247,0.15)" }}
        >
          <div
            className="px-4 py-2 rounded-xl rotate-[-15deg]"
            style={{ border: "3px solid #a855f7" }}
          >
            <span
              className="text-2xl font-bold"
              style={{ color: "#a855f7", fontFamily: "var(--font-display)" }}
            >
              LIKE
            </span>
          </div>
        </div>
      )}
      {action === "skip" && (
        <div
          className="absolute inset-0 flex items-start justify-start p-6 pointer-events-none"
          style={{ background: "rgba(239,68,68,0.1)" }}
        >
          <div
            className="px-4 py-2 rounded-xl rotate-[15deg]"
            style={{ border: "3px solid #ef4444" }}
          >
            <span
              className="text-2xl font-bold"
              style={{ color: "#ef4444", fontFamily: "var(--font-display)" }}
            >
              SKIP
            </span>
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "35%",
          height: "50%",
          background: "linear-gradient(transparent, #0f0f1c)",
        }}
      />

      {/* Info */}
      <div
        className="absolute left-0 right-0 bottom-0 px-5 pb-5"
        style={{ height: "35%" }}
      >
        <div className="flex items-end justify-between mb-1">
          <div>
            <div className="flex items-center gap-2">
              <h3
                className="text-2xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#ffffff" }}
              >
                {user.name}
              </h3>
              <span
                className="text-base"
                style={{ color: "#9090b8", fontFamily: "var(--font-body)" }}
              >
                {user.age}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} color="#7070a0" />
              <span className="text-xs" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
                {user.location}
              </span>
            </div>
          </div>
        </div>

        <p
          className="text-sm mb-3 leading-snug line-clamp-2"
          style={{ color: "#a0a0c0", fontFamily: "var(--font-body)" }}
        >
          {user.bio}
        </p>

        {/* Interest pills */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {user.interests.slice(0, 4).map((interest) => (
            <span
              key={interest}
              className="px-2.5 py-1 rounded-full text-xs"
              style={{
                background: "rgba(168,85,247,0.15)",
                border: "1px solid rgba(168,85,247,0.25)",
                color: "#c084fc",
                fontFamily: "var(--font-body)",
              }}
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-4">
          {/* Skip */}
          <button
            onClick={onSkip}
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.25)",
            }}
          >
            <X size={22} color="#ef4444" strokeWidth={2.5} />
          </button>

          {/* Connect */}
          <button
            onClick={onConnect}
            className="h-14 px-6 rounded-2xl flex items-center gap-2 font-semibold transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #a855f7, #3b82f6)",
              boxShadow: "0 6px 24px rgba(168,85,247,0.35)",
              color: "#ffffff",
              fontFamily: "var(--font-display)",
            }}
          >
            <Zap size={16} fill="#ffffff" />
            Connect
          </button>

          {/* Like */}
          <button
            onClick={onLike}
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all active:scale-90"
            style={{
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.25)",
            }}
          >
            <Heart size={22} color="#a855f7" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "rgba(168,85,247,0.1)" }}
      >
        <Star size={32} color="#a855f7" />
      </div>
      <h3
        className="text-xl mb-2"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f0f0fc" }}
      >
        You've seen everyone!
      </h3>
      <p className="text-center text-sm" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
        Check back later for new profiles or expand your distance
      </p>
    </div>
  );
}
