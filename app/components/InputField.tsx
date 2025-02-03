import { TextInput, StyleSheet, View, TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  error?: string;
}

export default function InputField({
  error,
  style,
  ...props
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#666"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
});
