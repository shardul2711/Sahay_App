import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const campaigns = [
  {
    id: "1",
    title: "Save the Rainforest",
    city: "Amazon, Brazil",
    organization: "Green Earth Org",
    rating: "4.8",
    category: "Environment",
    description: "Help us protect the rainforest and its wildlife.",
    poster: "https://blog.plant-for-the-planet.org/wp-content/uploads/2021/09/TFJ-YouTube-Banner-01.png",
  },
  {
    id: "2",
    title: "Education for All",
    city: "Delhi, India",
    organization: "Teach the Future",
    rating: "4.5",
    category: "Education",
    description: "Providing education resources for underprivileged children.",
    poster: "https://www.ei-ie.org/image/VSqQfBuUfi9DcmCM0CGDJeHUbgd7JrUyyUKrEj1c.png/lead.jpg",
  },
  {
    id: "3",
    title: "Clean Water Initiative",
    city: "Nairobi, Kenya",
    organization: "Water for All",
    rating: "4.7",
    category: "Health",
    description: "Ensuring clean drinking water for remote communities.",
    poster: "https://media.istockphoto.com/id/1320748109/vector/world-water-day-lets-save-the-water-together-text-and-hand-close-water-drip-from-water-tap.jpg?s=612x612&w=0&k=20&c=aMHQbO6WVLpiK48e_UECtriaXXlf1giDoV0PkVSl5JU=",
  },
];

const Campaigns = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const filteredCampaigns =
    selectedCategory === "All"
      ? campaigns
      : campaigns.filter((item) => item.category === selectedCategory);

  return (
    <FlatList
      data={filteredCampaigns}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View className="p-4">
          <Text className="text-3xl font-cormorantGaramondBold mb-4 text-blue-900">Select Category</Text>
          <View className="border border-black rounded">
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              className="mb-4"
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Food" value="Food" />
              <Picker.Item label="Education" value="Education" />
              <Picker.Item label="Environment" value="Environment" />
              <Picker.Item label="Health" value="Health" />
            </Picker>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/CampDetails",
              params: {
                id: item.id,
                title: item.title,
                city: item.city,
                organization: item.organization,
                rating: item.rating,
                description: item.description,
                poster: item.poster,
              },
            })
          }
        >
          <View className="bg-white rounded-lg shadow-lg p-4 mx-4 my-2 border border-black">
            <Image source={{ uri: item.poster }} className="w-full h-40 rounded-lg" />
            <Text className="text-lg font-semibold mt-2">{item.title}</Text>
            <Text className="text-sm text-gray-600 mt-1">{item.description}</Text>
            <Text className="text-sm text-gray-600 mt-1">City: {item.city}</Text>
            <Text className="text-sm text-gray-600 mt-1">Organization: {item.organization}</Text>
            <Text className="text-sm text-gray-600 mt-1">Rating: {item.rating}⭐</Text>
          </View>
        </Pressable>
      )}
    />
  );
};

export default Campaigns;
