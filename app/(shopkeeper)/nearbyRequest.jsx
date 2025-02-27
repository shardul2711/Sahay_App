import React, { useState, useEffect } from "react";
import { View, Alert, FlatList, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const NearbyRequest = () => {
  const [location, setLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [region, setRegion] = useState(null);
  const [requests, setRequests] = useState([
    { id: "1", title: "Food Donation Drive", location: "Community Center", latitude: 20.014836936929253, longitude: 73.82184366677026 },
    { id: "2", title: "Blood Donation Camp", location: "City Hospital", latitude: 20.5965, longitude: 78.9655 },
    { id: "3", title: "Clothes for the Needy", location: "Downtown Shelter", latitude: 20.5940, longitude: 78.9630 },
  ]);

  useEffect(() => {
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{flex: 1, padding: 10, backgroundColor: "#f8f8f8" }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Nearby Requests</Text>
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
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
              style={{ padding: 10, backgroundColor: "white", marginBottom: 10, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
              <Text style={{ color: "gray" }}>{item.location}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <MapView
        style={{ flex: 2 }}
        region={region}
        showsUserLocation={true}
      >
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