import { View, Text } from "react-native";
import React from "react";
import defaultStyles from "../defaultStyles";

const ErrorPage = () => {
  return (
    <View>
      <View
        style={[defaultStyles.container, { backgroundColor: "transparent" }]}
      >
        <Text style={[defaultStyles.fWB, defaultStyles.fs25]}>Error....</Text>
      </View>
    </View>
  );
};

export default ErrorPage;
