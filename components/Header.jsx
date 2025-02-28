import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import supabase from "../supabase/supabaseConfig"; // Adjust the path if needed

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user details from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      // Get current user session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData?.session) {
        router.replace("/signIn"); // Redirect to login if no session found
        return;
      }

      const userId = sessionData.session.user.id;

      // Fetch user details from Supabase
      const { data, error } = await supabase
        .from("user")
        .select("name")
        .eq("userid", userId)
        .single();

      if (!error) {
        setUser(data);
      }
      
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" className="p-4" />;
  }

  const userName = user?.name || "Guest";
  const profileInitial = userName[0]?.toUpperCase() || "G";

  return (
    <View className="p-4 bg-white shadow-md flex-row items-center justify-between">
      {/* Welcome Text */}
      <View>
        <Text className="text-xl font-cormorantGaramondBold">Welcome, {userName}!</Text>
        <Text className="text-sm font-cormorantGaramondMedium text-gray-500">
          Have a great day!
        </Text>
      </View>

      {/* Profile Circle */}
      <TouchableOpacity
        onPress={() => router.push("/profile")}
        className="w-12 h-12 bg-blue-900 rounded-full items-center justify-center"
        activeOpacity={0.7}
      >
        <Text className="text-white text-lg font-[Outfit-Medium]">
          {profileInitial}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
