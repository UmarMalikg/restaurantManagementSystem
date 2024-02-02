import { View } from "react-native";
import React from "react";
import SideBar from "./components/SideBar";
import TablesDetail from "./components/TablesDetail";
import waiterStyles from "./styles/style";
import HomeSection from "./components/HomeSection";

const Home = () => {
  return (
    <View style={waiterStyles.container}>
      <SideBar />
      <TablesDetail />
      <HomeSection />
    </View>
  );
};

export default Home;
