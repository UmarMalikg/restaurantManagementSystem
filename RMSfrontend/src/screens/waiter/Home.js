import { View } from "react-native";
import React from "react";
import OrderPlacement from "./components/OrderPlacement";
import waiterStyles from "./styles/style";
import HomeSection from "./components/HomeSection";

const Home = () => {
  return (
    <View style={waiterStyles.container}>
      <OrderPlacement />
      <HomeSection />
    </View>
  );
};

export default Home;
