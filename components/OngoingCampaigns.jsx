import { View, Text, Image, FlatList } from "react-native";
import React from "react";

const campaigns = [
  {
    id: "1",
    title: "Save the Rainforest",
    poster: "https://blog.plant-for-the-planet.org/wp-content/uploads/2021/09/TFJ-YouTube-Banner-01.png",
    description: "Help us protect the rainforest and its wildlife.",
  },
  {
    id: "2",
    title: "Education for All",
    poster: "https://www.ei-ie.org/image/VSqQfBuUfi9DcmCM0CGDJeHUbgd7JrUyyUKrEj1c.png/lead.jpg",
    description: "Providing education resources for underprivileged children.",
  },
  {
    id: "3",
    title: "Clean Water Initiative",
    poster: "https://media.istockphoto.com/id/1320748109/vector/world-water-day-lets-save-the-water-together-text-and-hand-close-water-drip-from-water-tap.jpg?s=612x612&w=0&k=20&c=aMHQbO6WVLpiK48e_UECtriaXXlf1giDoV0PkVSl5JU=",
    description: "Ensuring clean drinking water for remote communities.",
  },
];

const OngoingCampaigns = () => {
  return (
    <View className="p-4">
      <Text className="text-2xl font-cormorantGaramondBold mb-4">Ongoing Campaigns</Text>
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

export default OngoingCampaigns;
