import { View, Text } from "react-native";
import React from "react";
import defaultStyles from "../defaultStyles";

const Loader = () => {
  return (
    <View style={[defaultStyles.container, { backgroundColor: "transparent" }]}>
      <Text style={[defaultStyles.fWB, defaultStyles.fs25]}>Loading....</Text>
    </View>
  );
};

export default Loader;
