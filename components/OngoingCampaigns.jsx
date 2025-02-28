import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import supabase from "../supabase/supabaseConfig";

const OngoingCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data, error } = await supabase.from("campaigns").select("*");
        if (error) throw error;
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center items-center" />;
  }

  return (
    <View className="p-4">
      <Text className="text-2xl font-cormorantGaramondBold mb-4 text-blue-900">Ongoing Campaigns</Text>
      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="w-64 bg-white rounded-lg shadow-lg p-4 m-2 border border-black"
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
                  poster: item.imageLink,
                  deadline: item.deadline,
                  latitude: item.latitude,
                  longitude: item.longitude,
                },
              })
            }
          >
            <Image source={{ uri: item.imageLink }} className="w-full h-40 rounded-lg" />
            <Text className="text-lg font-semibold mt-2 text-blue-900">{item.title}</Text>
            <Text className="text-sm text-gray-700 mt-1">{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default OngoingCampaigns;