import { View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import defaultStyles from "../../defaultStyles";

const HeaderNotificationButton = () => {
  return (
    <View style={defaultStyles.mrgH20}>
      <Ionicons name="notifications-circle-outline" size={24} color="black" />
    </View>
  );
};

export default HeaderNotificationButton;
