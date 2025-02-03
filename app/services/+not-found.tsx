import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import CustomButton from "./components/CustomButton";

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.subtitle}>This page doesn't exist.</Text>

      <View style={styles.spacing} />

      <Link href="/(tabs)/home" asChild>
        <CustomButton title="Go to Home" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  spacing: {
    height: 24,
  },
});
