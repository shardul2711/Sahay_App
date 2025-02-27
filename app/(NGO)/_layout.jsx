import { Tabs } from 'expo-router'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';


const NGOLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name='home' options={{ headerShown: false, title: "Home" , tabBarIcon:({color})=><Ionicons name="home" size={24} color="black" />}} />
            <Tabs.Screen name='allDonation' options={{ headerShown: false, title: "All Donations", tabBarIcon:({color})=><Ionicons name="cash" size={24} color="black" />}} />
            <Tabs.Screen name='impactScore' options={{ headerShown: false, title: "Imapct Score" , tabBarIcon:({color})=><Ionicons name="medal" size={24} color="black" />}} />
            <Tabs.Screen name='myRequest' options={{ headerShown: false, title: "My Request",tabBarIcon:({color})=><Ionicons name="document" size={24} color="black" /> }} />
        </Tabs>
    )
}

export default NGOLayout