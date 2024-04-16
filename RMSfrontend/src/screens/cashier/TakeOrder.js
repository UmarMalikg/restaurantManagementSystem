import { View, Text } from "react-native";
import React from "react";
import waiterStyles from "../styles/waiterStyles";
import COrderPlacement from "./components/COrderPlacement";
import HomeSection from "../waiter/components/HomeSection";

const TakeOrder = () => {
  return (
    <View style={waiterStyles.container}>
      <COrderPlacement />
      <HomeSection />
    </View>
  );
};

export default TakeOrder;
