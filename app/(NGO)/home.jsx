import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Header"; 
import Slider from "../../components/Slider";
import RecentStatus from "../../components/RecentStatus";
import OngoingCampaigns from "../../components/OngoingCampaigns";

const Home = () => {
  return (
    <ScrollView >
       
      {/* Include the Header component at the top */}
      <Header />

      {/* Include the Slider component */}
      <Slider />

      <RecentStatus/>

      <OngoingCampaigns/>

     

    </ScrollView>
  );
};

export default Home;
