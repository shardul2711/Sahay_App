import { Stack } from "expo-router";
import React from "react";

const CommonLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="CreateCamp" options={{ headerShown: false }} />
      <Stack.Screen name="documentVerification" options={{ headerShown: false }} />
      <Stack.Screen name="completeKYC" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CommonLayout;
