import { View } from "react-native";
import React from "react";
import waiterStyles from "../styles/style";
import CategoryButtons from "./elements/CategoryButtons";
import Products from "./elements/Products";

const HomeSection = () => {
  return (
    <View style={waiterStyles.homeSection}>
      <CategoryButtons />
      <Products />
    </View>
  );
};

export default HomeSection;
