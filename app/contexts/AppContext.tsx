// contexts/AppContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import {
  auth,
  loginWithEmail,
  registerWithEmail,
  logOut,
  subscribeToAuthChanges,
  getCurrentUser,
} from "../services/firebase";
import { useRouter, useSegments } from "expo-router";

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  theme: "light" | "dark";
  toggleTheme: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Set initial user state
    setUser(getCurrentUser());

    // Subscribe to auth state changes
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setIsLoading(false);

      // Redirect based on the auth state and current route segment
      if (!user && segments[0] !== "(onboarding)") {
        console.log(
          "User is not authenticated. Redirecting to /(onboarding)/welcome"
        );
        router.replace("/(onboarding)/welcome");
      } else if (user && segments[0] === "(onboarding)") {
        console.log(
          "User is authenticated but in onboarding routes. Redirecting to /(tabs)/home"
        );
        router.replace("/(tabs)/home");
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [segments, router]);

  const login = async (email: string, password: string) => {
    try {
      const { user } = await loginWithEmail(email, password);
      setUser(user);
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { user } = await registerWithEmail(email, password);
      setUser(user);
    } catch (error: any) {
      console.error("Registration error:", error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await logOut();
      setUser(null);
      router.replace("/(onboarding)/welcome");
    } catch (error: any) {
      console.error("Logout error:", error);
      throw new Error(error.message);
    }
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const value = {
    user,
    isLoading,
    theme,
    toggleTheme,
    login,
    register,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
