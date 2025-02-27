import { Tabs } from 'expo-router'
import React from 'react'

const NGOLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name='home' options={{ headerShown: false, title: "Home" }} />
            <Tabs.Screen name='allDonation' options={{ headerShown: false, title: "All Donations" }} />
            <Tabs.Screen name='impactScore' options={{ headerShown: false, title: "Imapct Score" }} />
            <Tabs.Screen name='myRequest' options={{ headerShown: false, title: "My Request" }} />
        </Tabs>
    )
}

export default NGOLayout