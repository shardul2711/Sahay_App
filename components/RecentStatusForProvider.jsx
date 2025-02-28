import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const RecentStatusForProvider = () => {
  const router = useRouter();

  const recentStats = [
    {
      id: "1",
      value: "Document Verification",
      onPress: () => router.push("/documentVerification"), // Redirect to document verification page
    },
    {
      id: "2",
      value: "Complete KYC",
      onPress: () => router.push("/completeKYC"), // Redirect to complete KYC page
    },
  ];

  return (
    <View className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
      <Text className="text-lg font-cormorantGaramondBold text-black mb-4">Complete Verification</Text>
      <View className="flex-row justify-between">
        {recentStats.map((stat) => (
          <TouchableOpacity
            key={stat.id}
            onPress={stat.onPress} // Handle redirection on press
            className="flex-1 items-center p-6 mx-2 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            <Text className="text-lg font-semibold text-black-600 text-center">
              {stat.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RecentStatusForProvider;