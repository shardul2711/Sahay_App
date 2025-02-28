import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const campaigns = [
  {
    id: "1",
    title: "Save the Rainforest",
    poster: "https://blog.plant-for-the-planet.org/wp-content/uploads/2021/09/TFJ-YouTube-Banner-01.png",
    description: "Help us protect the rainforest and its wildlife.",
    city: "Amazon Forest",
    organization: "Green Earth Foundation",
    rating: "4.7",
    deadline: "April 20, 2025",
  },
  {
    id: "2",
    title: "Education for All",
    poster: "https://www.ei-ie.org/image/VSqQfBuUfi9DcmCM0CGDJeHUbgd7JrUyyUKrEj1c.png/lead.jpg",
    description: "Providing education resources for underprivileged children.",
    city: "Mumbai",
    organization: "Education for Change",
    rating: "4.8",
    deadline: "May 10, 2025",
  },
  {
    id: "3",
    title: "Clean Water Initiative",
    poster: "https://media.istockphoto.com/id/1320748109/vector/world-water-day-lets-save-the-water-together-text-and-hand-close-water-drip-from-water-tap.jpg?s=612x612&w=0&k=20&c=aMHQbO6WVLpiK48e_UECtriaXXlf1giDoV0PkVSl5JU=",
    description: "Ensuring clean drinking water for remote communities.",
    city: "Rajasthan",
    organization: "WaterAid Foundation",
    rating: "4.6",
    deadline: "March 30, 2025",
  },
];

const OngoingCampaigns = () => {
  const router = useRouter();

  return (
    <View className="p-4">
      <Text className="text-2xl font-cormorantGaramondBold mb-4 text-blue-900">Ongoing Campaigns</Text>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-64 bg-white rounded-lg shadow-lg p-4 m-2 border border-black"
            onPress={() =>
              router.push({
                pathname: "/CampDetails",
                params: {
                  title: item.title,
                  city: item.city,
                  organization: item.organization,
                  rating: item.rating,
                  description: item.description,
                  poster: item.poster,
                  deadline: item.deadline,
                },
              })
            }
          >
            <Image source={{ uri: item.poster }} className="w-full h-40 rounded-lg" />
            <Text className="text-lg font-semibold mt-2 text-blue-900">{item.title}</Text>
            <Text className="text-sm text-gray-700 mt-1">{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OngoingCampaigns;
