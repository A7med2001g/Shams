import { View, Text, StyleSheet } from "react-native";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
      ]}
    >
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.userText : styles.botText,
          ]}
        >
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  userContainer: {
    alignItems: "flex-end",
  },
  botContainer: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: "#F2F2F2",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#FFFFFF",
  },
  botText: {
    color: "#000000",
  },
});
