import { View, Switch, Text, StyleSheet } from "react-native";
import { useState } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((previous) => !previous);
    // TODO: Implement theme switching logic when we set up the theme context
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dark Mode</Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#007AFF" : "#f4f3f4"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
