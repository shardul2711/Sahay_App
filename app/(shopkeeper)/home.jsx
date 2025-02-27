import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Header"; 
import OngoingCampaigns from "../../components/OngoingCampaigns";
import SliderForProvider from "../../components/SliderForProvider";
import RecentStatusForProvider from "../../components/RecentStatusForProvider";
import OngoingCampaignsForProvider from "../../components/OngoingCampaignsForProvider";
import HeaderForProvider from "../../components/HeaderForProvider";

const Home = () => {
  return (
    <ScrollView >
       
      {/* Include the Header component at the top */}
      <HeaderForProvider />

      {/* Include the Slider component */}
      <SliderForProvider />

      <RecentStatusForProvider/>

      <OngoingCampaignsForProvider/>

     

    </ScrollView>
  );
};

export default Home;
