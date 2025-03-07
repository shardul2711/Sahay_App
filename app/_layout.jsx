import React, { useEffect } from 'react';
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from 'expo-router';
import "../global.css";
import { ActivityIndicator } from 'react-native';
import AuthProvider from "../context/AuthContext";
import '@walletconnect/react-native-compat';
import { createAppKit, defaultConfig, AppKit  } from '@reown/appkit-ethers-react-native';

// 1. Get projectId from https://cloud.reown.com
const projectId = '8f0d906dc22f1dbf5cd963b01bd0c2d4'; // Replace with your actual project ID

// 2. Create config
const metadata = {
  name: 'SAHAY',
  description: 'AppKit RN Example',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'my_app' // Replace with your app scheme
  }
};

const config = defaultConfig({ metadata });

// 3. Define your chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
};

const polygon = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com'
};

const chains = [mainnet, polygon];

// 4. Create modal
createAppKit({
  projectId,
  chains,
  config,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
});

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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(common)" options={{ headerShown: false }} />
        <Stack.Screen name="(NGO)" options={{ headerShown: false }} />
        <Stack.Screen name="(shopkeeper)" options={{ headerShown: false }} />
      </Stack>
      <AppKit />
    </AuthProvider>
  );
};

export default AppLayout;
