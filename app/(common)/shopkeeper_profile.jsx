import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import supabase from "../../supabase/supabaseConfig";

const ShopkeeperProfile = () => {
  const router = useRouter();

  // Logout Function
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Navigate to login page after logout
      router.replace("/signIn");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">Shopkeeper Profile</Text>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#ff4d4d",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <Feather name="log-out" size={24} color="white" />
        <Text style={{ color: "white", fontSize: 18, marginLeft: 8 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShopkeeperProfile;
