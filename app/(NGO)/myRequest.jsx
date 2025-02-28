import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import supabase from "../../supabase/supabaseConfig";
import { useAuth } from "../../context/AuthContext"; // Get logged-in user

const MyRequest = () => {
  const router = useRouter();
  const { user } = useAuth(); // Get logged-in user
  const [donationCamps, setDonationCamps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCampaigns = async () => {
      if (!user?.userid) {
        console.log("User not logged in yet.");
        return;
      }

      console.log("User ID:", user.userid);

      try {
        // Fetch campaigns where the logged-in user is the creator
        const { data, error } = await supabase
          .from("campaigns") // Ensure this is your table name
          .select("*")
          .eq("useridofcampaigncreator", user.userid); // Ensure correct column name

        if (error) throw error;

        console.log("Fetched Campaigns:", data); // Debugging log

        setDonationCamps(data || []);
      } catch (error) {
        console.error("Error fetching user campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCampaigns();
  }, [user]);

  return (
    <View className="p-4 flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-3xl font-cormorantGaramondBold text-blue-900">My Requests</Text>
        <TouchableOpacity
          className="bg-blue-900 py-2 px-4 rounded-lg flex-row items-center"
          onPress={() => router.push("/CreateCamp")}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold ml-1">Create New Camp</Text>
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {loading ? (
        <ActivityIndicator size="large" color="#1E40AF" />
      ) : donationCamps.length === 0 ? (
        <Text className="text-gray-600 text-center mt-10">No campaigns found.</Text>
      ) : (
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
                    description: item.description,
                    poster: item.imageLink,
                    deadline: item.deadline,
                  },
                })
              }
            >
              <Image source={{ uri: item.imageLink }} className="w-full h-40 rounded-lg" />
              <Text className="text-xl font-semibold mt-2 text-blue-900">{item.title}</Text>
              <Text className="text-sm text-gray-700 mt-1">{item.description}</Text>
              <Text className="text-sm font-semibold mt-2 text-black">
                📍 Location: <Text className="text-gray-700">{item.location}</Text>
              </Text>
              <Text className="text-sm font-semibold mt-1 text-black">
                🏙 City: <Text className="text-gray-700">{item.city}</Text>
              </Text>
              <Text className="text-sm font-semibold mt-1 text-black">
                🏢 Organization: <Text className="text-gray-700">{item.organization}</Text>
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MyRequest;
