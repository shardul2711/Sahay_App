import { View, Text } from "react-native";
import React from "react";

const recentStats = [
  { id: "1", value: "03", label: "Active Campaign" },
  { id: "2", value: "15", label: "Active Investors", highlight: true },
  { id: "3", value: "$50k", label: "Total Funding" },
];

const RecentStatus = () => {
  return (
    <View className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
      <Text className="text-lg font-bold text-black mb-4">Recent Status</Text>
      <View className="flex-row justify-between">
        {recentStats.map((stat) => (
          <View 
            key={stat.id} 
            className={`flex-1 items-center p-4 mx-1 rounded-lg border border-black ${stat.highlight ? 'bg-white' : 'bg-white'}`}
          >
            <Text className="text-2xl font-bold text-black">{stat.value}</Text>
            <Text className="text-sm text--black">{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RecentStatus;
