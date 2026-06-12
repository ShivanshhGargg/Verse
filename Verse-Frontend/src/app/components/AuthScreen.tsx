import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";

type Mode = "login" | "signup";

interface Props {
  mode: Mode;
  onSuccess: () => void;
  onBack: () => void;
  onToggleMode: () => void;
}

const INTERESTS = [
  "Music", "Art", "Travel", "Gaming", "Fitness", "Coffee",
  "Film", "Books", "Fashion", "Tech", "Food", "Dance",
  "Photography", "Hiking", "Yoga", "Comedy",
];

const GENDERS = ["Man", "Woman", "Non-binary", "Prefer not to say"];

export function AuthScreen({ mode, onSuccess, onBack, onToggleMode }: Props) {
  const [showPass, setShowPass] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [step, setStep] = useState(1); // for signup multi-step

  const toggleInterest = (i: string) => {
    setSelectedInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : prev.length < 6 ? [...prev, i] : prev
    );
  };

  const isSignup = mode === "signup";

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-[#08080f] flex flex-col">
      {/* Background orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full opacity-15 blur-[60px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #a855f7, #3b82f6)" }}
      />

      <div className="relative z-10 flex flex-col h-full min-h-screen px-6 pt-12 pb-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 transition-opacity active:opacity-60"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <ArrowLeft size={18} color="#f0f0fc" />
          </button>
          <div>
            <h2
              className="text-white"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              {isSignup ? (step === 1 ? "Create Account" : "Your Interests") : "Welcome Back"}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "#7070a0" }}>
              {isSignup
                ? step === 1
                  ? "Start your Verse journey"
                  : `Pick up to 6 interests (${selectedInterests.length}/6)`
                : "Good to see you again"}
            </p>
          </div>
        </div>

        {/* Step indicator for signup */}
        {isSignup && (
          <div className="flex gap-2 mb-6">
            {[1, 2].map((s) => (
              <div
                key={s}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{
                  background:
                    s <= step
                      ? "linear-gradient(90deg, #a855f7, #3b82f6)"
                      : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          key={`${mode}-${step}`}
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Login form */}
          {!isSignup && (
            <div className="flex flex-col gap-4">
              <InputField label="Email" type="email" placeholder="you@example.com" />
              <InputField
                label="Password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                right={
                  <button onClick={() => setShowPass(!showPass)} className="opacity-50 hover:opacity-80 transition-opacity">
                    {showPass ? <EyeOff size={16} color="#f0f0fc" /> : <Eye size={16} color="#f0f0fc" />}
                  </button>
                }
              />
              <div className="text-right mt-1">
                <span className="text-sm" style={{ color: "#a855f7", fontFamily: "var(--font-body)" }}>
                  Forgot password?
                </span>
              </div>
            </div>
          )}

          {/* Signup step 1 */}
          {isSignup && step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <InputField label="First Name" type="text" placeholder="Alex" />
                </div>
                <div className="flex-1">
                  <InputField label="Last Name" type="text" placeholder="Rivera" />
                </div>
              </div>
              <InputField label="Email" type="email" placeholder="you@example.com" />
              <InputField
                label="Password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                right={
                  <button onClick={() => setShowPass(!showPass)} className="opacity-50 hover:opacity-80 transition-opacity">
                    {showPass ? <EyeOff size={16} color="#f0f0fc" /> : <Eye size={16} color="#f0f0fc" />}
                  </button>
                }
              />
              <InputField label="Age" type="number" placeholder="23" />
              {/* Gender selector */}
              <div>
                <label className="text-sm mb-2 block" style={{ color: "#9090b8", fontFamily: "var(--font-body)" }}>
                  Gender
                </label>
                <div className="flex gap-2 flex-wrap">
                  {GENDERS.map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className="px-3 py-2 rounded-xl text-sm transition-all"
                      style={{
                        background:
                          selectedGender === g
                            ? "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.3))"
                            : "rgba(255,255,255,0.04)",
                        border:
                          selectedGender === g
                            ? "1px solid rgba(168,85,247,0.5)"
                            : "1px solid rgba(255,255,255,0.08)",
                        color: selectedGender === g ? "#c084fc" : "#9090b8",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Signup step 2 - interests */}
          {isSignup && step === 2 && (
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => {
                const selected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className="px-4 py-2.5 rounded-2xl text-sm flex items-center gap-1.5 transition-all"
                    style={{
                      background: selected
                        ? "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(59,130,246,0.25))"
                        : "rgba(255,255,255,0.04)",
                      border: selected
                        ? "1px solid rgba(168,85,247,0.45)"
                        : "1px solid rgba(255,255,255,0.08)",
                      color: selected ? "#c084fc" : "#9090b8",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {selected && <Check size={12} />}
                    {interest}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex-1" />

          {/* CTA button */}
          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => {
                if (isSignup && step === 1) {
                  setStep(2);
                } else {
                  onSuccess();
                }
              }}
              className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-all active:scale-95"
              style={{
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                fontFamily: "var(--font-display)",
                boxShadow: "0 8px 32px rgba(168,85,247,0.3)",
              }}
            >
              {isSignup ? (step === 1 ? "Continue" : "Join Verse") : "Log In"}
            </button>

            <p className="text-center text-sm" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={onToggleMode}
                className="font-medium"
                style={{ color: "#a855f7" }}
              >
                {isSignup ? "Log in" : "Sign up"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({
  label,
  type,
  placeholder,
  right,
}: {
  label: string;
  type: string;
  placeholder: string;
  right?: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="text-sm mb-1.5 block"
        style={{ color: "#9090b8", fontFamily: "var(--font-body)" }}
      >
        {label}
      </label>
      <div
        className="flex items-center rounded-xl px-4 py-3.5"
        style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: "#f0f0fc", fontFamily: "var(--font-body)" }}
        />
        {right}
      </div>
    </div>
  );
}
