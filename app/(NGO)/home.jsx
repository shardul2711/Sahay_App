import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Header from "../../components/Header";
import Slider from "../../components/Slider";
import RecentStatus from "../../components/RecentStatus";
import OngoingCampaigns from "../../components/OngoingCampaigns";
import { AntDesign } from "@expo/vector-icons";

const Home = () => {
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Scrollable Content */}
          <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
            <Header />
            <Slider />
            <RecentStatus />
            <OngoingCampaigns />
          </ScrollView>

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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Home;
