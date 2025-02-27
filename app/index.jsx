import { View, Text, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import images from "../constants/images";
import { useRouter } from "expo-router";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext"

const Index = () => {
  const router = useRouter();
  const { user, userType, loading, session } = useAuth();

  useEffect(() => {
    console.log(session)
    console.log(userType)
    if (!loading) {
      if (userType === "provider") {
        router.replace("/(shopkeeper)/home");
      } else if (userType === "user") {
        router.replace("/(NGO)/home");
      }
    }
  }, [loading, userType]);

  return (
    <ImageBackground
      source={images.IndexImage}
      className="flex-1 justify-center items-center h-[220px]"
      resizeMode="cover"
    >
      <View
        className="absolute bottom-0 bg-white rounded-t-[30px] w-full h-[250px] px-6 py-5 items-center"
      >
        {/* Slogan */}
        <Text
          className="text-4xl font-bold text-primary text-center mt-5"
        >
          SAHAY
        </Text>

        <Text
          className="text-lg font-semibold text-center mb-7.5 mb-11 mt-3"
        >
          सेवा, आशा और विश्वास का संगम!
        </Text>

        <Button
          title="Get Started"
          onPress={() => router.push("/signIn")}
        />
      </View>
    </ImageBackground>
  );
};

export default Index;