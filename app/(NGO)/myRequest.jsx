import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importing Expo Icons

const MyRequest = () => {
  const router = useRouter();

  // Sample Data for Donation Camps
  const [donationCamps, setDonationCamps] = useState([
    {
      id: "1",
      title: "Food Donation Drive",
      poster: "https://t4.ftcdn.net/jpg/01/84/16/83/360_F_184168316_XuIwBx9xLpC6y3E67HpS3EMMDaM6WIju.jpg",
      description: "Providing food for underprivileged families.",
      city: "Pune",
      organization: "Helping Hands NGO",
      rating: "4.5",
      category: "Health",
      location: "Kondhwa, Pune",
      contact: "9876543210",
      deadline: "March 15, 2025",
    },
    {
      id: "2",
      title: "Blood Donation Camp",
      poster: "https://www.shutterstock.com/shutterstock/photos/1328701031/display_1500/stock-vector-blood-donation-drive-poster-design-1328701031.jpg",
      description: "A drive to encourage blood donation.",
      city: "Mumbai",
      organization: "Red Cross Society",
      rating: "4.8",
      category: "Health",
      location: "Bandra, Mumbai",
      contact: "9123456789",
      deadline: "April 10, 2025",
    },
    {
      id: "3",
      title: "Book Collection for Kids",
      poster: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      description: "Collecting books for children in need.",
      city: "Nashik",
      organization: "Bright Future Foundation",
      rating: "4.7",
      category: "Education",
      location: "College Road, Nashik",
      contact: "9988776655",
      deadline: "March 25, 2025",
    },
  ]);

  return (
    <View className="p-4 flex-1 bg-gray-100">
      {/* Header Section with Button on Top Right */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-3xl font-cormorantGaramondBold text-blue-900">My Request</Text>
        <TouchableOpacity
          className="bg-blue-900 py-2 px-4 rounded-lg flex-row items-center"
          onPress={() => router.push("/CreateCamp")}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold ml-1">Create New Camp</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable List of Donation Camps */}
      <ScrollView>
        {donationCamps.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="bg-white rounded-lg shadow-lg p-4 mb-4 border border-black"
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
            {/* Image */}
            <Image source={{ uri: item.poster }} className="w-full h-40 rounded-lg" />

            {/* Camp Details */}
            <Text className="text-xl font-semibold mt-2 text-blue-900">{item.title}</Text>
            <Text className="text-sm text-gray-700 mt-1">{item.description}</Text>

            {/* Additional Info */}
            <Text className="text-sm font-semibold mt-2 text-black">📍 Location: <Text className="text-gray-700">{item.location}</Text></Text>
            <Text className="text-sm font-semibold mt-1 text-black">🏙 City: <Text className="text-gray-700">{item.city}</Text></Text>
            <Text className="text-sm font-semibold mt-1 text-black">🏢 Organization: <Text className="text-gray-700">{item.organization}</Text></Text>
           
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MyRequest;
