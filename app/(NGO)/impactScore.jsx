import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import supabase from '../../supabase/supabaseConfig';

const ImpactScore = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('user')
          .select('name, impactScore')
          .order('impactScore', { ascending: false });
        
        if (error) throw error;

        const rankedUsers = data.map((user, index) => ({
          rank: index + 1,
          name: user.name,
          score: user.impactScore,
        }));

        setUsers(rankedUsers);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return <FontAwesome name="trophy" size={24} color="gold" />;
    if (rank === 2) return <FontAwesome name="trophy" size={24} color="silver" />;
    if (rank === 3) return <FontAwesome name="trophy" size={24} color="brown" />;
    return <Text className="text-lg font-bold">{rank}</Text>;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" className="flex-1 justify-center items-center" />;
  }

  return (
    <ScrollView className="p-4">
      <Text className="text-blue-900 text-3xl font-cormorantGaramondBold mb-4">Impact Score Leaderboard</Text>
      
      <View className="border border-black rounded-lg overflow-hidden">
        <View className="flex-row bg-gray-200 p-3">
          <Text className="w-1/4 text-center font-cormorantGaramondSemiBold text-blue-900 text-lg">Rank</Text>
          <Text className="w-1/2 text-center font-cormorantGaramondSemiBold text-blue-900 text-lg">Name</Text>
          <Text className="w-1/4 text-center font-cormorantGaramondSemiBold text-blue-900 text-lg">Score</Text>
        </View>
        {users.map((item) => (
          <View key={item.rank} className="flex-row p-3 border-t border-black">
            <Text className="w-1/4 text-center text-lg font-bold">{getRankIcon(item.rank)}</Text>
            <Text className="w-1/2 text-center text-lg font-bold">{item.name}</Text>
            <Text className="w-1/4 text-center text-lg font-bold">{item.score}</Text>
          </View>
        ))}
      </View>
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
