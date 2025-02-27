import { View, Text, ImageBackground } from "react-native";
import React from "react";
import images from "../constants/images";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors"; // Import colors from Colors.ts
import Button from "../components/Button"; // Import the Button component

const Index = () => {
  const router = useRouter();

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

        {/* Custom Button */}
        <Button
          title="Get Started"
          onPress={() => router.push("/signIn")}
          // No need to pass buttonStyle or textStyle unless overriding defaults
        />
      </View>
    </ImageBackground>
  );
};

export default Index;