import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../supabase/supabaseConfig";

const AcceptedRequest = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        if (!user?.providerid) return;

        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("isAccepted", true)
          .eq("providerid", user.providerid);

        if (error) throw error;

        setRequests(data);
      } catch (error) {
        console.error("Error fetching accepted requests:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedRequests();
  }, [user]);


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center items-center" />;
  }

  return (
    <ScrollView className="p-4">
      {requests.length === 0 ? (
        <Text className="text-center text-gray-600 text-lg">No accepted requests yet.</Text>
      ) : (
        requests.map((item) => (
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
                  category: item.category,
                  description: item.description,
                  poster: item.imageLink,
                  deadline: item.deadline,
                  latitude: item.location?.latitude ?? null,
                  longitude: item.location?.longitude ?? null,
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

          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default AcceptedRequest;