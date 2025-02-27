import { View, Text, Image, FlatList } from "react-native";
import React from "react";

const campaigns = [
  {
    id: "1",
    title: "Donating Food",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1MJoJLaM_cOIc_U-4HKOBHC8HgVDJbUH3Sg&s",
    description: "Providing free or subsidized grains to underprivileged families, orphanages, and old-age homes.",
  },
  {
    id: "2",
    title: "Supporting Disaster Relief",
    poster: "https://media.hanoitimes.vn/2020/11/9/FLOODS.PNG",
    description: "Supplying food during floods, droughts, or other calamities.",
  },
  {
    id: "3",
    title: "Running Food Drives",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9iEFuZyNxQFH3gEf0r8HkOMEtEHm71fn5g&s",
    description: "Organizing events where needy individuals can collect essential grains.",
  },
];

const OngoingCampaignsForProvider = () => {
  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-4">My Open Request</Text>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="w-64 bg-white rounded-lg shadow-lg p-4 m-2">
            <Image source={{ uri: item.poster }} className="w-full h-40 rounded-lg" />
            <Text className="text-lg font-semibold mt-2">{item.title}</Text>
            <Text className="text-sm text-gray-600 mt-1">{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OngoingCampaignsForProvider;
