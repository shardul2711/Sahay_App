import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const HeaderForProvider = () => {
  // Hardcoded user data for frontend UI
  const userEmail = "provider@example.com"; // Replace with any email or static value
  const userName = userEmail.split("@")[0]; // Extract name before @
  const profileInitial = userName[0]?.toUpperCase() || "G"; // Default initial

  return (
    <View className="p-4 bg-white shadow-md flex-row items-center justify-between">
      {/* Welcome Text */}
      <View>
        <Text className="text-xl font-[OutfitBold]">Welcome, {userName}!</Text>
        <Text className="text-sm font-[OutfitBold] text-gray-500">
          Have a great day!
        </Text>
      </View>

      {/* Profile Circle */}
      <TouchableOpacity
        onPress={() => router.push("/(common)/shopkeeper_profile")}
        className="w-12 h-12 bg-blue-900 rounded-full items-center justify-center"
        activeOpacity={0.7}
      >
        <Text className="text-white text-lg font-[Outfit-Medium]">
          {profileInitial}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderForProvider;