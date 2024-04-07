import { View, Image } from "react-native";
import React from "react";
import waiterStyles from "../styles/waiterStyles";

const HeaderImage = ({ imageUrl }) => {
  return (
    <View style={waiterStyles.headerEmployeeImgBox}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={waiterStyles.headerEmployeeImg} // Adjust width and height as needed
      />
    </View>
  );
};

export default HeaderImage;
