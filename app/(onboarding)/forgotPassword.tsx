// app/(onboarding)/forgotPassword.tsx
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
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setLocalError("Please enter your email address.");
      return;
    }

    try {
      setLocalError("");
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert(
        "Password Reset",
        "A password reset link has been sent to your email address."
      );
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      const errorMessage =
        error.message || "Failed to send password reset email.";
      setLocalError(errorMessage);
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Unified gradient background similar to the Welcome screen
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
            {/* Header Title */}
            <Text style={styles.headerTitle}>Forgot Password</Text>

            {/* Description Text */}
            <Text style={styles.description}>
              Enter your email address and we'll send you a link to reset your
              password.
            </Text>

            {/* Card-like Form Container */}
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
              {localError ? (
                <Text style={styles.errorText}>{localError}</Text>
              ) : null}
              <View style={styles.spacing} />
              <CustomButton
                title={isLoading ? "Sending..." : "Reset Password"}
                onPress={handleResetPassword}
                disabled={isLoading}
              />
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
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.85)", // Slight transparency for a modern look
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 24,
    minHeight: 200,
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
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
