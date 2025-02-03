// app/(onboarding)/register.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../contexts/AppContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useApp();

  const handleRegister = async () => {
    // Basic validation
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setLocalError("Please fill in all the fields.");
      return;
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLocalError("");
      setIsLoading(true);
      // Call register from your context. Adjust parameters if needed.
      await register(email.trim(), password);
      // Successful registration should be handled in your auth state listener
      // (typically redirecting the user to the main app screen).
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage =
        error.message || "Registration failed. Please try again.";
      setLocalError(errorMessage);
      Alert.alert("Registration Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // The entire screen uses the same gradient background as the Welcome screen
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Sign Up</Text>
              <Text style={styles.headerSubtitle}>Create your account</Text>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
              <InputField
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setLocalError("");
                }}
                autoComplete="name"
              />
              <View style={styles.spacing} />
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setLocalError("");
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
              <View style={styles.spacing} />
              <InputField
                placeholder="Password"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setLocalError("");
                }}
                secureTextEntry
                autoComplete="new-password"
              />
              <View style={styles.spacing} />
              <InputField
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setLocalError("");
                }}
                secureTextEntry
                autoComplete="new-password"
              />
              {localError ? (
                <Text style={styles.errorText}>{localError}</Text>
              ) : null}
              <CustomButton
                title={isLoading ? "Creating Account..." : "Create Account"}
                onPress={handleRegister}
                style={styles.button}
                disabled={isLoading}
              />
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Link href="/(onboarding)/login" style={styles.footerLink}>
                Login
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  // Header Container: positions the Sign Up header at the top without its own background
  headerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#fff",
    marginTop: 8,
  },
  // Form Container: a card-like container with a slightly transparent white background
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 24,
    minHeight: 400,
    marginBottom: 32,
    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Android shadow/elevation
    elevation: 5,
  },
  spacing: {
    height: 20,
  },
  button: {
    marginTop: 32,
  },
  // Footer Section: offers navigation to the Login screen
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
  },
  footerLink: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
