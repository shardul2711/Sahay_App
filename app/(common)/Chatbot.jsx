import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator 
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";

export const aimlapikey = Constants.expoConfig.extra.aimlapikey; 

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello, नमस्कार! How can I assist your NGO today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const BASE_URL = "https://api.aimlapi.com/v1";
  const API_KEY = "c47018ee2ec7435ba96388073ed4c791";
  
  const SYSTEM_PROMPT = "I am Sahay chatbot, dedicated to assisting NGOs with donations and fraud prevention. How can I help?";
  const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2";

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const payload = {
        model: MODEL_ID,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: input },
        ],
        temperature: 0.7,
        max_tokens: 256,
      };

      const response = await axios.post(
        `${BASE_URL}/chat/completions`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse = response.data?.choices[0]?.message?.content || "Sorry, I couldn't process that.";
      const botMessage = { role: "bot", content: botResponse };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error.response?.data || error.message);
      setMessages((prev) => [...prev, { role: "bot", content: "Oops! Something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === "user";
    return (
      <View
        style={{
          alignSelf: isUser ? "flex-end" : "flex-start",
          backgroundColor: isUser ? "#1e3a8a" : "#e5e7eb",
          padding: 15,
          marginVertical: 5,
          borderRadius: 20,
          maxWidth: "80%",
        }}
      >
        <Text style={{ color: isUser ? "white" : "black", fontSize: 18 }}>{item.content}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 10 }}
    >
      <View
        style={{
          backgroundColor: "#1e3a8a",
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 30,
          borderRadius: 20,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "white", textAlign: "center" }}>
          Sahay - NGO Assistant
        </Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ flexGrow: 1 }}
      />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderTopWidth: 1, borderTopColor: "#e5e7eb" }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: "#ddd",
            backgroundColor: "#f9fafb",
            fontSize: 16,
          }}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={isLoading}
          style={{
            backgroundColor: "#1e3a8a",
            paddingHorizontal: 20,
            paddingVertical: 12,
            marginLeft: 10,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatbotScreen;
