import { forwardRef } from "react";
import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useApp, AppProvider } from "./contexts/AppContext"; // Back to using relative path

const Layout = forwardRef(function Layout() {
  const segments = useSegments();
  const router = useRouter();
  const { user, isLoading } = useApp();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboardingGroup = segments[0] === "(onboarding)";
    const inProtectedGroup = !inAuthGroup && !inOnboardingGroup;
    const isChatbotScreen = segments.includes("chatbot");

    if (!user) {
      // Allow access to chatbot even when not authenticated
      if (inProtectedGroup && !isChatbotScreen) {
        router.replace("/(onboarding)/welcome");
      }
    } else {
      if (inAuthGroup || inOnboardingGroup) {
        router.replace("/(tabs)/chatbot");
      }
    }
  }, [user, segments, isLoading]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen name="splashScreen" options={{ animation: "none" }} />
      <Stack.Screen name="(onboarding)" options={{ animation: "none" }} />
      <Stack.Screen name="(tabs)" options={{ animation: "none" }} />
    </Stack>
  );
});

export default function RootLayout() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
