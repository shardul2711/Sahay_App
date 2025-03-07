import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const NGOLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { backgroundColor: 'white', height: 60 },
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#1E3A8A',  // Active color
                tabBarInactiveTintColor: 'black',   // Inactive color
            }}
        >
            <Tabs.Screen 
                name='home' 
                options={{ 
                    headerShown: false, 
                    title: "Home", 
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "home-outline" : "home"} size={26} color={focused ? '#1E3A8A' : 'black'} />
                    ) 
                }} 
            />
            <Tabs.Screen 
                name='allDonation' 
                options={{ 
                    headerShown: false, 
                    title: "All Donations", 
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "cash-outline" : "cash"} size={26} color={focused ? '#1E3A8A' : 'black'} />
                    ) 
                }} 
            />
            <Tabs.Screen 
                name='myRequest' 
                options={{ 
                    headerShown: false, 
                    title: "My Request", 
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "document-text-outline" : "document-text"} size={26} color={focused ? '#1E3A8A' : 'black'} />
                    ) 
                }} 
            />
            <Tabs.Screen 
                name='impactScore' 
                options={{ 
                    headerShown: false, 
                    title: "Impact Score", 
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name={focused ? "medal-outline" : "medal"} size={26} color={focused ? '#1E3A8A' : 'black'} />
                    ) 
                }} 
            />
        </Tabs>
    );
};

export default NGOLayout;
