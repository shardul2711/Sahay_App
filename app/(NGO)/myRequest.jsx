import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importing Expo Icon

const MyRequest = () => {
  const router = useRouter();

  // Sample Data for Added Donation Camps
  const [donationCamps, setDonationCamps] = useState([
    {
      id: "1",
      title: "Food Donation Drive",
      poster: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      description: "Providing food for underprivileged families.",
    },
    {
      id: "2",
      title: "Blood Donation Camp",
      poster: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      description: "A drive to encourage blood donation.",
    },
    {
      id: "3",
      title: "Book Collection for Kids",
      poster: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      description: "Collecting books for children in need.",
    },
    
  ]);

  return (
    <View className="p-4 flex-1 bg-gray-100">
      {/* Header Section with Button on Top Right */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold color-blue-900">My Request</Text>
        <TouchableOpacity
          className="bg-blue-900 py-2 px-4 rounded-lg flex-row items-center"
          onPress={() => router.push("/CreateCamp")}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold ml-1">Create New Camp</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable List of Donation Camps (VERTICAL) */}
      <ScrollView>
        {donationCamps.map((item) => (
          <View key={item.id} className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <Image source={{ uri: item.poster }} className="w-full h-40 rounded-lg" />
            <Text className="text-lg font-semibold mt-2">{item.title}</Text>
            <Text className="text-sm text-gray-600 mt-1">{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyRequest;
