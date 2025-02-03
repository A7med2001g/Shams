// app/(onboarding)/login.tsx
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
import { useApp } from "../contexts/AppContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useApp();

  const handleLogin = async () => {
    // Basic input validation
    if (!email.trim() || !password.trim()) {
      setLocalError("Please enter both email and password.");
      return;
    }

    try {
      setLocalError("");
      setIsLoading(true);
      await login(email.trim(), password);
      // Successful login is handled in your AppContext's auth state listener.
    } catch (error: any) {
      // Log and display the error
      console.error("Login error:", error);
      const errorMessage = error.message || "Login failed. Please try again.";
      setLocalError(errorMessage);
      Alert.alert("Login Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.container}>
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
            <Text style={styles.headerTitle}>Login</Text>
            <Text style={styles.headerSubtitle}>Welcome back!</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
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
              autoComplete="password"
            />
            {localError ? (
              <Text style={styles.errorText}>{localError}</Text>
            ) : null}
            <CustomButton
              title={isLoading ? "Logging in..." : "Login"}
              onPress={handleLogin}
              style={styles.button}
              disabled={isLoading}
            />

            <Link
              href="/(onboarding)/forgotPassword"
              style={styles.forgotPassword}
            >
              Forgot Password?
            </Link>
          </View>

          {/* Footer Section */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/(onboarding)/register" style={styles.footerLink}>
              Sign Up
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  headerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 32,
    alignItems: "center",
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
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 24,
    minHeight: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  spacing: {
    height: 20,
  },
  button: {
    marginTop: 32,
  },
  forgotPassword: {
    marginTop: 16,
    textAlign: "center",
    color: "#007AFF",
    fontSize: 16,
  },
  footer: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "center",
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
