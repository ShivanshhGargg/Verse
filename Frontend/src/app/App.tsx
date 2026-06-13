import { useState, useEffect } from "react";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { AuthScreen } from "./components/AuthScreen";
import { HomeFeed } from "./components/HomeFeed";
import { DiscoverScreen } from "./components/DiscoverScreen";
import { ActivitiesScreen } from "./components/ActivitiesScreen";
import { ChatScreen } from "./components/ChatScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { BottomNav } from "./components/BottomNav";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

type Screen =
    | "onboarding"
    | "login"
    | "signup"
    | "home"
    | "discover"
    | "activities"
    | "chat"
    | "profile"
    | "settings";

type MainTab = "home" | "discover" | "activities" | "chat" | "profile";

const MAIN_TABS: MainTab[] = ["home", "discover", "activities", "chat", "profile"];

function AppInner() {
  const { user, isLoading } = useAuth();
  const { theme } = useTheme();

  // Determine initial screen based on auth state
  const getInitialScreen = (): Screen => {
    if (isLoading) return "onboarding";
    return user ? "home" : "onboarding";
  };

  const [screen, setScreen] = useState<Screen>(getInitialScreen);
  const [activeTab, setActiveTab] = useState<MainTab>("home");

  // Update screen if auth state changes after initial render
  useEffect(() => {
    if (!isLoading) {
      if (!user && screen !== "onboarding" && screen !== "login" && screen !== "signup") {
        setScreen("onboarding");
      } else if (user && (screen === "onboarding" || screen === "login" || screen === "signup")) {
        setScreen("home");
        setActiveTab("home");
      }
    }
  }, [user, isLoading, screen]);

  const isMainApp = MAIN_TABS.includes(screen as MainTab);

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setScreen(tab);
  };

  const renderScreen = () => {
    switch (screen) {
      case "onboarding":
        return (
            <OnboardingScreen
                onGetStarted={() => setScreen("signup")}
                onLogin={() => setScreen("login")}
            />
        );
      case "login":
        return (
            <AuthScreen
                mode="login"
                onSuccess={() => {
                  setScreen("home");
                  setActiveTab("home");
                }}
                onBack={() => setScreen("onboarding")}
                onToggleMode={() => setScreen("signup")}
            />
        );
      case "signup":
        return (
            <AuthScreen
                mode="signup"
                onSuccess={() => {
                  setScreen("home");
                  setActiveTab("home");
                }}
                onBack={() => setScreen("onboarding")}
                onToggleMode={() => setScreen("login")}
            />
        );
      case "home":
        return <HomeFeed />;
      case "discover":
        return <DiscoverScreen />;
      case "activities":
        // Phase 1: coming soon message (or keep as is)
        return <ActivitiesScreen />;
      case "chat":
        return <ChatScreen />;
      case "profile":
        return <ProfileScreen onSettingsClick={() => setScreen("settings")} />;
      case "settings":
        return (
            <SettingsScreen
                onBack={() => {
                  setScreen("profile");
                  setActiveTab("profile");
                }}
            />
        );
      default:
        return <HomeFeed />;
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full bg-[#08080f]">
          <div className="text-purple-400 text-sm">Loading...</div>
        </div>
    );
  }

  const themeVars = {
    "--verse-purple": theme.primary,
    "--verse-blue": theme.secondary,
    "--verse-gradient": theme.gradientCSS,
    "--primary": theme.primary,
    "--ring": theme.primary,
    "--sidebar-primary": theme.primary,
    "--border": theme.cardBorder,
  } as React.CSSProperties;

  return (
      <div className="relative w-full h-full" style={{ background: "#08080f", ...themeVars }}>
        {/* Mobile frame container */}
        <div
            className="relative mx-auto overflow-hidden"
            style={{
              maxWidth: "430px",
              height: "100vh",
              background: "#08080f",
            }}
        >
          <div className="w-full h-full overflow-hidden">{renderScreen()}</div>
          {isMainApp && <BottomNav active={activeTab} onChange={handleTabChange} unreadMessages={3} />}
        </div>
      </div>
  );
}

export default function App() {
  return (
      <ThemeProvider>
        <AuthProvider>
          <AppInner />
        </AuthProvider>
      </ThemeProvider>
  );
}