import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          variant === "secondary" && styles.secondaryButtonText,
          disabled && styles.disabledButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#F2F2F2",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  secondaryButtonText: {
    color: "#007AFF",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
    borderColor: "#CCCCCC",
  },
  disabledButtonText: {
    color: "#888888",
  },
});
