import { motion } from "motion/react";

interface Props {
  onGetStarted: () => void;
  onLogin: () => void;
}

export function OnboardingScreen({ onGetStarted, onLogin }: Props) {
  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-[#08080f] flex flex-col">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-20 blur-[80px]"
          style={{ background: "radial-gradient(circle, #a855f7, transparent)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-15 blur-[80px]"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
        />
        <div
          className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full opacity-10 blur-[60px]"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full min-h-screen px-6 pt-16 pb-12">
        {/* Logo area */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Verse wordmark */}
          <div className="mb-6 relative">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto"
              style={{ background: "linear-gradient(135deg, #a855f7, #3b82f6)" }}
            >
              <span className="text-white text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                V
              </span>
            </div>
          </div>

          <h1
            className="text-6xl text-white tracking-tight mb-3"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              background: "linear-gradient(135deg, #ffffff 0%, #c084fc 50%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            verse
          </h1>

          <p
            className="text-lg text-center mb-2"
            style={{ color: "#9090b8", fontFamily: "var(--font-body)", letterSpacing: "0.15em" }}
          >
            MEET. CONNECT. GROW.
          </p>

          {/* Decorative line */}
          <div className="flex items-center gap-2 mt-3">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #a855f7)" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-60" />
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #3b82f6, transparent)" }} />
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="flex gap-2 justify-center flex-wrap mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {["Real Connections", "Smart Matching", "Vibes-First"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: "rgba(168, 85, 247, 0.12)",
                border: "1px solid rgba(168, 85, 247, 0.25)",
                color: "#c084fc",
                fontFamily: "var(--font-body)",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button
            onClick={onGetStarted}
            className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #a855f7, #3b82f6)",
              fontFamily: "var(--font-display)",
              boxShadow: "0 8px 32px rgba(168,85,247,0.35)",
            }}
          >
            Get Started
          </button>

          <button
            onClick={onLogin}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f0f0fc",
              fontFamily: "var(--font-display)",
            }}
          >
            Log In
          </button>
        </motion.div>

        <p className="text-center mt-6 text-xs" style={{ color: "#404060", fontFamily: "var(--font-body)" }}>
          <span style={{ color: "#505070" }}>By continuing you agree to our </span>
          <span style={{ color: "#a855f7" }}>Terms</span>
          <span style={{ color: "#404060" }}> & </span>
          <span style={{ color: "#a855f7" }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
