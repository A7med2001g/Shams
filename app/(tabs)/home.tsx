import { View, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatMessage from "../components/ChatMessage";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";

export default function HomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      text: string;
      isUser: boolean;
    }>
  >([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem(
        "hasCompletedOnboarding"
      );
      if (!hasCompletedOnboarding) {
        router.replace("/onboarding");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setIsLoading(false);
    }
  };

  // Prevent rendering content while checking onboarding status
  if (isLoading) {
    return <View style={styles.container} />;
  }

  const handleSend = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    // TODO: Implement OpenAI API call
    // This will be implemented when we set up the OpenAI service
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessage message={item.text} isUser={item.isUser} />
        )}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <InputField
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message..."
        />
        <CustomButton onPress={handleSend} title="Send" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
});
