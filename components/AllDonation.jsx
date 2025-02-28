import { View, Text, FlatList, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import supabase from "../supabase/supabaseConfig";

const Campaigns = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
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
        console.log(campaigns)
      }
    };
    fetchCampaigns();
  }, []);

  const filteredCampaigns =
    selectedCategory === "All"
      ? campaigns
      : campaigns.filter((item) => item.category === selectedCategory);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center items-center" />;
  }

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
              poster: item.imageLink,
              deadline: item.deadline,  // Pass deadline
              latitude: item.latitude,  // Pass latitude
              longitude: item.longitude // Pass longitude
            },
          })
        }
      >
      
          <View className="bg-white rounded-lg shadow-lg p-4 mx-4 my-2 border border-black">
            <Image source={{ uri: item.imageLink }} className="w-full h-40 rounded-lg" />
            <Text className="text-lg font-semibold mt-2">{item.title}</Text>
          
            <Text className="text-sm text-gray-600 mt-1">City: {item.city}</Text>
            <Text className="text-sm text-gray-600 mt-1">Organization: {item.organization}</Text>
           
          </View>
        </Pressable>
      )}
    />
  );
};

export default Campaigns;
