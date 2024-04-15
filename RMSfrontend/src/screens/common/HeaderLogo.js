import { View, Image } from "react-native";
import React from "react";

const HeaderLogo = () => {
  return (
    <View>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{ height: 40, width: 250 }}
      />
    </View>
  );
};

export default HeaderLogo;
