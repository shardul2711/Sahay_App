import { Stack } from "expo-router";
import React from "react";

const CommonLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="CreateCamp" options={{ headerShown: false }} />
      <Stack.Screen name="CampDetails" options={{ headerShown: false }} />
      <Stack.Screen name="Chatbot" options={{ headerShown: false }} />
      <Stack.Screen name="documentVerification" options={{ headerShown: false }} />
      <Stack.Screen name="completeKYC" options={{ headerShown: false }} />
      <Stack.Screen name="shopkeeper_profile" options={{ headerShown: false }} />
      <Stack.Screen name="Verification" options={{ headerShown: false }} />
      <Stack.Screen name="Complaint" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CommonLayout;
