import React, { useEffect } from 'react'
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from 'expo-router'
import "../global.css"
import { ActivityIndicator } from 'react-native';
import AuthProvider from "../context/AuthContext"

const AppLayout = () => {
  const [fontsLoaded] = useFonts({
    "CormorantGaramond-Bold": require("../assets/fonts/CormorantGaramond-Bold.ttf"),
    "CormorantGaramond-BoldItalic": require("../assets/fonts/CormorantGaramond-BoldItalic.ttf"),
    "CormorantGaramond-Italic": require("../assets/fonts/CormorantGaramond-Italic.ttf"),
    "CormorantGaramond-Light": require("../assets/fonts/CormorantGaramond-Light.ttf"),
    "CormorantGaramond-LightItalic": require("../assets/fonts/CormorantGaramond-LightItalic.ttf"),
    "CormorantGaramond-Medium": require("../assets/fonts/CormorantGaramond-Medium.ttf"),
    "CormorantGaramond-MediumItalic": require("../assets/fonts/CormorantGaramond-MediumItalic.ttf"),
    "CormorantGaramond-Regular": require("../assets/fonts/CormorantGaramond-Regular.ttf"),
    "CormorantGaramond-SemiBold": require("../assets/fonts/CormorantGaramond-SemiBold.ttf"),
    "CormorantGaramond-SemiBoldItalic": require("../assets/fonts/CormorantGaramond-SemiBoldItalic.ttf"),
    "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        <Stack.Screen name='(common)' options={{ headerShown: false }} />
        <Stack.Screen name='(NGO)' options={{ headerShown: false }} />
        <Stack.Screen name='(shopkeeper)' options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  )
}

export default AppLayout