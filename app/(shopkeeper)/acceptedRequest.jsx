import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const requests = [
  {
    id: "1",
    title: "Save the Rainforest",
    city: "Amazon, Brazil",
    organization: "Green Earth Org",
    rating: "4.8",
    category: "Environment",
    description: "Help us protect the rainforest and its wildlife.",
    poster:
      "https://blog.plant-for-the-planet.org/wp-content/uploads/2021/09/TFJ-YouTube-Banner-01.png",
  },
  {
    id: "2",
    title: "Education for All",
    city: "Delhi, India",
    organization: "Teach the Future",
    rating: "4.5",
    category: "Education",
    description: "Providing education resources for underprivileged children.",
    poster:
      "https://www.ei-ie.org/image/VSqQfBuUfi9DcmCM0CGDJeHUbgd7JrUyyUKrEj1c.png/lead.jpg",
  },
  {
    id: "3",
    title: "Clean Water Initiative",
    city: "Nairobi, Kenya",
    organization: "Water for All",
    rating: "4.7",
    category: "Health",
    description: "Ensuring clean drinking water for remote communities.",
    poster:
      "https://media.istockphoto.com/id/1320748109/vector/world-water-day-lets-save-the-water-together-text-and-hand-close-water-drip-from-water-tap.jpg?s=612x612&w=0&k=20&c=aMHQbO6WVLpiK48e_UECtriaXXlf1giDoV0PkVSl5JU=",
  },
];

const AcceptedRequest = () => {
  const router = useRouter();

  return (
    <ScrollView className="p-4">
      {requests.map((item) => (
        <TouchableOpacity
          key={item.id}
          className="mb-4 bg-white rounded-2xl shadow-md p-4"
          onPress={() =>
            router.push({
              pathname: "/Verification",
              params: {
                id: item.id,
                title: item.title,
                city: item.city,
                organization: item.organization,
                rating: item.rating,
                category: item.category,
                description: item.description,
                poster: item.poster,
              },
            })
          }
        >
          <Image source={{ uri: item.poster }} className="w-full h-40 rounded-xl" />
          <Text className="text-xl font-bold mt-2">{item.title}</Text>
          <Text className="text-gray-600">{item.city}</Text>
          <Text className="text-gray-500">{item.organization}</Text>
          <Text className="text-blue-600 font-semibold">Rating: {item.rating}</Text>
          <Text className="text-gray-700 mt-1">{item.category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AcceptedRequest;
