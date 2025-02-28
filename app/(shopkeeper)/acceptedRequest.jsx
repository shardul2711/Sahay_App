import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import supabase from "../../supabase/supabaseConfig";

const AcceptedRequest = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data, error } = await supabase.from("campaigns").select("*");
        if (error) throw error;

        // ✅ Parse the location field from JSON string to an object
        const parsedData = data.map((item) => ({
          ...item,
          location: item.location ? JSON.parse(item.location) : { latitude: null, longitude: null },
        }));

        console.log("Fetched and parsed data:", parsedData); // ✅ Log to verify data
        setRequests(parsedData);
      } catch (error) {
        console.error("Error fetching requests:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const openGoogleMaps = (latitude, longitude) => {
    console.log("Opening Google Maps with:", { latitude, longitude }); // ✅ Log latitude & longitude
    if (latitude && longitude) {
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      console.error("Invalid latitude or longitude");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center items-center" />;
  }

  return (
    <ScrollView className="p-4">
      {requests.map((item) => (
        <TouchableOpacity
          key={item.id}
          className="mb-4 bg-white rounded-2xl shadow-md p-4 border border-black" // ✅ Added black border
          onPress={() =>
            router.push({
              pathname: "/Verification",
              params: {
                id: item.id,
                title: item.title,
                city: item.city,
                organization: item.organization,
                category: item.category,
                description: item.description,
                poster: item.imageLink,
                deadline: item.deadline,
                latitude: item.location.latitude, // ✅ Use parsed latitude
                longitude: item.location.longitude, // ✅ Use parsed longitude
              },
            })
          }
        >
          <Image source={{ uri: item.imageLink }} className="w-full h-40 rounded-xl" />
          <Text className="text-xl font-bold mt-2">{item.title}</Text>
          <Text className="text-gray-600">{item.city}</Text>
          <Text className="text-gray-500">{item.organization}</Text>
          <Text className="text-gray-700 mt-1">Category: {item.category}</Text>
          <Text className="text-gray-700 mt-1">Deadline: {item.deadline}</Text>

          {/* View Map Button */}
          <TouchableOpacity
            className="mt-2 bg-blue-500 px-3 py-1 rounded-lg w-36"
            onPress={() => openGoogleMaps(item.location.latitude, item.location.longitude)}
          >
            <Text className="text-white text-center">View on Map</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AcceptedRequest;
