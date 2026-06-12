import { Home, Compass, Zap, MessageCircle, User } from "lucide-react";

type Screen = "home" | "discover" | "activities" | "chat" | "profile";

interface Props {
  active: Screen;
  onChange: (screen: Screen) => void;
  unreadMessages?: number;
}

const tabs: { id: Screen; icon: React.ReactNode; label: string }[] = [
  { id: "home", icon: <Home size={20} strokeWidth={1.8} />, label: "Home" },
  { id: "discover", icon: <Compass size={20} strokeWidth={1.8} />, label: "Discover" },
  { id: "activities", icon: <Zap size={20} strokeWidth={1.8} />, label: "Activities" },
  { id: "chat", icon: <MessageCircle size={20} strokeWidth={1.8} />, label: "Chat" },
  { id: "profile", icon: <User size={20} strokeWidth={1.8} />, label: "Profile" },
];

export function BottomNav({ active, onChange, unreadMessages = 0 }: Props) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 pt-2 pb-6"
      style={{
        background: "rgba(8,8,15,0.85)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        maxWidth: "430px",
        margin: "0 auto",
      }}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all"
            style={{
              minWidth: 56,
            }}
          >
            {/* Active pill background */}
            {isActive && (
              <div
                className="absolute inset-0 rounded-xl"
                style={{ background: "rgba(168,85,247,0.1)" }}
              />
            )}

            <div
              className="relative"
              style={{
                color: isActive ? "#a855f7" : "#404060",
                filter: isActive ? "drop-shadow(0 0 8px rgba(168,85,247,0.5))" : "none",
                transition: "all 0.2s",
              }}
            >
              {tab.icon}
              {/* Unread badge */}
              {tab.id === "chat" && unreadMessages > 0 && (
                <span
                  className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                    color: "#ffffff",
                    fontFamily: "var(--font-body)",
                    fontSize: "9px",
                  }}
                >
                  {unreadMessages}
                </span>
              )}
            </div>

            <span
              className="text-xs relative"
              style={{
                color: isActive ? "#a855f7" : "#404060",
                fontFamily: "var(--font-body)",
                fontWeight: isActive ? 500 : 400,
                fontSize: "10px",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </span>

            {/* Active dot */}
            {isActive && (
              <div
                className="absolute -bottom-0.5 w-1 h-1 rounded-full"
                style={{ background: "linear-gradient(135deg, #a855f7, #3b82f6)" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
