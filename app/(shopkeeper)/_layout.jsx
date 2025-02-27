import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const ShopkeeperLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='home' options={{ headerShown: false, title: "Home" }} />
      <Tabs.Screen name='acceptedRequest' options={{ headerShown: false, title: "Accepted Request" }} />
      <Tabs.Screen name='nearbyRequest' options={{ headerShown: false, title: "Nearby Request" }} />
    </Tabs>
  )
}

export default ShopkeeperLayout