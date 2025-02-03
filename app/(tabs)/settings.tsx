import { View, StyleSheet, Alert } from "react-native";
import ThemeToggle from "../components/ThemeToggle";
import CustomButton from "../components/CustomButton";
import { useApp } from "../contexts/AppContext";

export default function SettingsScreen() {
  const { logout } = useApp();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemeToggle />
      </View>
      <View style={styles.section}>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 24,
  },
});
