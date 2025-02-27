import { View, Text } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

const ImpactScore = () => {
  const data = [
    { rank: 1, name: 'Satyajit', score: 95 },
    { rank: 2, name: 'Kanishk', score: 90 },
    { rank: 3, name: 'Sarvad', score: 85 },
    { rank: 4, name: 'Pranav', score: 80 },
    { rank: 5, name: 'Amit', score: 78 },
    { rank: 6, name: 'Rahul', score: 75 },
    { rank: 7, name: 'Neha', score: 72 },
    { rank: 8, name: 'Divya', score: 70 },
    { rank: 9, name: 'Arjun', score: 68 },
    { rank: 10, name: 'Pooja', score: 65 },
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <FontAwesome name="trophy" size={24} color="gold" />;
    if (rank === 2) return <FontAwesome name="trophy" size={24} color="silver" />;
    if (rank === 3) return <FontAwesome name="trophy" size={24} color="brown" />;
    return <Text className="text-lg font-bold">{rank}</Text>;
  };

  return (
    <ScrollView className="p-4">
      <Text className="text-blue-900 text-3xl font-cormorantGaramondBold mb-4">Impact Score Leaderboard</Text>
      
      <View className="border border-black rounded-lg overflow-hidden">
        {/* Table Header */}
        <View className="flex-row bg-gray-200 p-3">
          <Text className="w-1/4 text-center font-cormorantGaramondSemiBold text-blue-900 text-lg">Rank</Text>
          <Text className="w-1/2 text-center font-cormorantGaramondSemiBold text-blue-900 text-lg">Name</Text>
          <Text className="w-1/4 text-center font-cormorantGaramondSemiBold text-blue-900 text-lg">Score</Text>
        </View>

        {/* Table Rows */}
        {data.map((item, index) => (
          <View key={index} className="flex-row p-3 border-t border-black">
            <Text className="w-1/4 text-center text-lg font-bold">{getRankIcon(item.rank)}</Text>
            <Text className="w-1/2 text-center text-lg font-bold">{item.name}</Text>
            <Text className="w-1/4 text-center text-lg font-bold">{item.score}</Text>
          </View>
        ))}
      </View>

      {/* Impact Score Calculation Explanation */}
      <View className="mt-4 p-3 border border-black rounded-lg bg-gray-100">
        <Text className="text-2xl font-cormorantGaramondBoldItalic text-blue-900">How Impact Score is Calculated?</Text>
        <Text className="mt-2 text-lg">- Based on the total amount donated.</Text>
        <Text className="text-lg">- Consideration of donor's status and consistency.</Text>
        <Text className="text-lg">- Extra points for donations in critical situations.</Text>
      </View>
    </ScrollView>
  );
};

export default ImpactScore;
