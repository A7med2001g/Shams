import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import CustomButton from "../components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../contexts/AppContext";

export default function Welcome() {
  const router = useRouter();
  const { setGuestMode } = useApp(); // Assuming we'll add this to context

  const handleGuestAccess = () => {
    router.replace("/(tabs)/chatbot");
  };

  return (
    <LinearGradient colors={["#00008B", "#0000FF"]} style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome to Shams</Text>
        <Text style={styles.subtitle}>
          Your AI-powered conversation companion
        </Text>
        <View style={styles.buttonContainer}>
          <Link href="/(onboarding)/login" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </Link>
          <View style={styles.spacing} />
          <Link href="/(onboarding)/register" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
          </Link>
          <Pressable
            style={[styles.button, styles.guestButton]}
            onPress={handleGuestAccess}
          >
            <Text style={[styles.buttonText, styles.guestButtonText]}>
              Continue as Guest
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#e0e0e0",
    textAlign: "center",
    marginBottom: 40, // Adds space between the text and the buttons
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  spacing: {
    height: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  guestButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
    marginTop: 10,
  },
  guestButtonText: {
    color: "#007AFF",
  },
});
