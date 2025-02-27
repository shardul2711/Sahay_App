import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import Slider from "../../components/Slider";
import RecentStatus from "../../components/RecentStatus";
import OngoingCampaigns from "../../components/OngoingCampaigns";
import { AntDesign } from "@expo/vector-icons";

const Home = () => {
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* Include the Header component at the top */}
      <Header />

      {/* Include the Slider component */}
      <Slider />

      <RecentStatus />

      <OngoingCampaigns />

      {/* Floating Chatbot Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#007bff",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
        onPress={() => router.push("/Chatbot")}
      >
        <AntDesign name="message1" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;