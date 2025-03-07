import React, { useState, useEffect } from "react";
import { View, Alert, FlatList, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../supabase/supabaseConfig";

const NearbyRequest = () => {
  const { user } = useAuth();
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [region, setRegion] = useState(null);
  const [requests, setRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    fetchCampaigns();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access for NAVIC.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(loc.coords);
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  // Fetch only campaigns where isAccepted is false
  const fetchCampaigns = async () => {
    const { data, error } = await supabase.from("campaigns").select("*").neq("isAccepted", true);
    if (error) {
      Alert.alert("Error", "Failed to fetch campaign data.");
      console.error(error);
    } else {
      setRequests(data);
    }
  };

  // Confirm and accept a request
  const acceptRequest = async (id) => {
    Alert.alert(
      "Confirm Acceptance",
      "Are you sure you want to accept this request?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Accept",
          onPress: async () => {
            const { error } = await supabase.from("campaigns").update({
              isAccepted: true,
              acceptedByUserName: user?.name,
              providerid: user?.providerid,
            }).eq("id", id);

            if (error) {
              Alert.alert("Error", "Failed to accept the request.");
              console.error(error);
            } else {
              Alert.alert("Success", "You have accepted the request.");
              fetchCampaigns();
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Nearby Requests Section */}
      <View style={{ flex: 1, padding: 10, backgroundColor: "#f8f8f8" }}>
        <Text className="font-cormorantGaramondSemiBold text-3xl p-2 text-blue-800">Nearby Requests</Text>
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedMarker(item.id);
                setRegion({
                  latitude: item.latitude,
                  longitude: item.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
              }}
              className="flex-row items-center w-full"
              style={{
                padding: 10,
                backgroundColor: "white",
                marginBottom: 10,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text className="text-lg font-extrabold">{item.title}</Text>
                <Text className="text-gray-600">{item.location}</Text>
              </View>
              <TouchableOpacity onPress={() => acceptRequest(item.id)}>
                <Text className="text-lg text-blue-700 font-outfitBold">Accept</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Map Section */}
      <MapView style={{ flex: 1 }} region={region} showsUserLocation={true} >
        {location && (
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="You are here"
          />
        )}
        {requests.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
            title={item.title}
            pinColor={selectedMarker === item.id ? "blue" : "red"}
          />
        ))}
      </MapView>
    </View>
  );
};

export default NearbyRequest;