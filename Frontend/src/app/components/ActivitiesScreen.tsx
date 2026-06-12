import { motion } from "motion/react";
import { Users, Lock, ChevronRight, Sparkles, Trophy } from "lucide-react";
import { activities } from "../data/mockData";

export function ActivitiesScreen() {
  return (
    <div className="flex flex-col h-full bg-[#08080f] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-5">
        <div className="flex items-center justify-between mb-1">
          <h2
            className="text-xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#f0f0fc" }}
          >
            Activities
          </h2>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.15)" }}
          >
            <Trophy size={12} color="#a855f7" />
            <span className="text-xs" style={{ color: "#c084fc", fontFamily: "var(--font-body)" }}>
              12 pts
            </span>
          </div>
        </div>
        <p className="text-sm" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
          Connect deeper through shared experiences
        </p>
      </div>

      {/* Featured banner */}
      <div className="mx-5 mb-5">
        <div
          className="relative p-5 rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(59,130,246,0.2))",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          {/* background glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
            style={{ background: "#a855f7" }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} color="#c084fc" />
              <span className="text-xs" style={{ color: "#c084fc", fontFamily: "var(--font-body)" }}>
                FEATURED THIS WEEK
              </span>
            </div>
            <h3
              className="text-lg mb-1"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#ffffff" }}
            >
              Icebreaker Challenge
            </h3>
            <p className="text-sm mb-4" style={{ color: "#a0a0c0", fontFamily: "var(--font-body)" }}>
              4,821 people playing now · Find your match in 5 questions
            </p>
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                color: "#ffffff",
                fontFamily: "var(--font-display)",
                boxShadow: "0 4px 16px rgba(168,85,247,0.4)",
              }}
            >
              Play Now
            </button>
          </div>
        </div>
      </div>

      {/* Category label */}
      <div className="px-5 mb-3">
        <p className="text-xs" style={{ color: "#7070a0", fontFamily: "var(--font-body)", letterSpacing: "0.1em" }}>
          ALL ACTIVITIES
        </p>
      </div>

      {/* Activity cards */}
      <div className="px-5 pb-24 space-y-3">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <button
              disabled={!activity.available}
              className="w-full rounded-2xl p-4 text-left transition-all active:scale-[0.98]"
              style={{
                background: activity.available ? "#0f0f1c" : "#0a0a16",
                border: activity.available
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(255,255,255,0.03)",
                opacity: activity.available ? 1 : 0.6,
              }}
            >
              <div className="flex items-center gap-4">
                {/* Emoji/icon area */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 bg-gradient-to-br ${activity.gradient}`}
                  style={{ opacity: activity.available ? 1 : 0.5 }}
                >
                  {activity.available ? (
                    activity.emoji
                  ) : (
                    <Lock size={20} color="rgba(255,255,255,0.5)" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        color: activity.available ? "#f0f0fc" : "#606080",
                      }}
                    >
                      {activity.title}
                    </span>
                    {!activity.available && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(255,165,0,0.1)",
                          border: "1px solid rgba(255,165,0,0.2)",
                          color: "#fbbf24",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        Soon
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs mb-2 line-clamp-2"
                    style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}
                  >
                    {activity.description}
                  </p>
                  {activity.available && (
                    <div className="flex items-center gap-1">
                      <Users size={10} color="#606080" />
                      <span className="text-xs" style={{ color: "#505070", fontFamily: "var(--font-body)" }}>
                        {activity.participants.toLocaleString()} playing
                      </span>
                    </div>
                  )}
                </div>

                {activity.available && (
                  <ChevronRight size={16} color="#505070" className="flex-shrink-0" />
                )}
              </div>

              {/* Progress bar for available */}
              {activity.available && (
                <div
                  className="mt-3 h-0.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${activity.gradient}`}
                    style={{ width: `${Math.min(85, (activity.participants / 8000) * 100)}%` }}
                  />
                </div>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
