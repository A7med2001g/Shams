import { View, Text, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000), // Wait for 1 second
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation, check auth status and redirect
      const isAuthenticated = false; // TODO: Replace with actual auth check

      if (isAuthenticated) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(onboarding)/welcome");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>ChatBot</Text>
        <Text style={styles.subtitle}>Your AI Assistant</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
