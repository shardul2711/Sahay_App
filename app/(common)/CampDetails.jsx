import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const CampDetails = () => {
  const { title, city, organization, rating, description, poster, deadline } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 py-6" contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Title */}
      <Text className="text-3xl font-cormorantGaramondBold text-gray-900 mb-4 text-center">{title}</Text>

      {/* Campaign Image */}
      <View className="items-center mb-6">
        <Image 
          source={{ uri: poster }} 
          className="w-11/12 h-72 rounded-lg shadow-md border border-black"
        />
      </View>

      {/* Description */}
      <Text className="text-lg font-cormorantGaramondSemiBold text-gray-800 mb-2">Description</Text>
      <View className="bg-white p-4 rounded-md shadow border border-black mb-3">
        <Text className="text-base text-gray-800">{description}</Text>
      </View>

      {/* Location */}
      <Text className="text-lg font-cormorantGaramondSemiBold text-gray-800 mb-2">Location</Text>
      <View className="bg-white p-4 rounded-md shadow border border-black mb-3 flex-row items-center gap-2">
        <Ionicons name="location-sharp" size={20} color="gray" />
        <Text className="text-base text-gray-800">{city}</Text>
      </View>

      {/* Organization */}
      <Text className="text-lg font-cormorantGaramondSemiBold text-gray-800 mb-2">Organized By</Text>
      <View className="bg-white p-4 rounded-md shadow border border-black mb-3 flex-row items-center gap-2">
        <MaterialCommunityIcons name="office-building" size={20} color="gray" />
        <Text className="text-base text-gray-800">{organization}</Text>
      </View>

      {/* Rating */}
      <Text className="text-lg font-cormorantGaramondSemiBold text-gray-800 mb-2">Rating</Text>
      <View className="bg-white p-4 rounded-md shadow border border-black mb-3 flex-row items-center gap-2">
        <Ionicons name="star" size={20} color="gold" />
        <Text className="text-base text-gray-800 font-semibold">{rating} / 5</Text>
      </View>

      {/* Deadline */}
      <Text className="text-lg font-cormorantGaramondSemiBold text-gray-800 mb-2">Deadline</Text>
      <View className="bg-white p-4 rounded-md shadow border border-black mb-6 flex-row items-center gap-2">
        <FontAwesome5 name="clock" size={20} color="gray" />
        <Text className="text-base text-gray-800 font-semibold">{deadline}</Text>
      </View>

      {/* Donation Status */}
      <Text className="text-lg font-cormorantGaramondSemiBold text-gray-800 mb-2">Donation Status</Text>
      <View className="bg-white p-6 rounded-md shadow-md border border-black mb-10">
        <View className="flex-row items-center mb-3">
          <Ionicons name="checkmark-circle" size={24} color="green" />
          <Text className="text-lg text-gray-700 font-semibold ml-3">Campaign Created</Text>
        </View>

        {/* Dotted Line */}
        <View className="border-l-2 border-dotted border-gray-500 h-4 ml-3" />

        <View className="flex-row items-center mb-3">
          <Ionicons name="checkmark-circle" size={24} color="green" />
          <Text className="text-lg text-gray-700 font-semibold ml-3">Request Accepted</Text>
        </View>

        {/* Dotted Line */}
        <View className="border-l-2 border-dotted border-gray-500 h-4 ml-3" />

        <View className="flex-row items-center mb-3">
          <Ionicons name="hourglass" size={24} color="orange" />
          <Text className="text-lg text-gray-700 font-semibold ml-3">Request Fulfilled</Text>
        </View>

        {/* Dotted Line */}
        <View className="border-l-2 border-dotted border-gray-500 h-4 ml-3" />

        <View className="flex-row items-center">
          <Ionicons name="hourglass" size={24} color="gray" />
          <Text className="text-lg text-gray-700 font-semibold ml-3">Money Transferred</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CampDetails;
