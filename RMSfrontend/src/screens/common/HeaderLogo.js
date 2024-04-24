import { View, Image } from "react-native";
import React from "react";

const HeaderLogo = () => {
  return (
    <View>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{ height: 70, width: 170 }}
      />
    </View>
  );
};

export default HeaderLogo;
