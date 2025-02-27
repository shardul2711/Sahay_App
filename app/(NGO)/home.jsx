import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/Header"; 
import Slider from "../../components/Slider";
import RecentStatus from "../../components/RecentStatus";
import OngoingCampaigns from "../../components/OngoingCampaigns";

const Home = () => {
  return (
    <View >
       
      {/* Include the Header component at the top */}
      <Header />

      {/* Include the Slider component */}
      <Slider />

      <RecentStatus/>

      <OngoingCampaigns/>

     

    </View>
  );
};

export default Home;
