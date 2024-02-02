import React from "react";
import Header from "./components/Header";
import Home from "./Home";
import { View } from "react-native";
import waiterStyles from "./styles/style";

const Waiter = () => {
  return (
    <View style={waiterStyles.container}>
      <Header />
      <Home />
    </View>
  );
};

export default Waiter;
