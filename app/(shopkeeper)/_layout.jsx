import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ShopkeeperLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="nearbyRequest"
        options={{
          headerShown: false,
          title: "Nearby Request",
          tabBarIcon: ({ color }) => <FontAwesome name="map-marker" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="acceptedRequest"
        options={{
          headerShown: false,
          title: "Accepted Request",
          tabBarIcon: ({ color }) => <Feather name="file" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
};

export default ShopkeeperLayout;