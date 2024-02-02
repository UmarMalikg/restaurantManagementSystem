import { Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/style";

const SideBarLinks = ({ text, icon, link }) => {
  const navigation = useNavigation();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <TouchableOpacity
      style={[
        adminStyles.sideBarLinks,
        (isHovered || isPressed) && adminStyles.hoversideBarLinks,
      ]}
      onPress={() => navigation.navigate(`${link}`)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Image
        style={[
          adminStyles.sideBarLinkIcon,
          (isHovered || isPressed) && adminStyles.hoversideBarLinks,
        ]}
        source={`${icon}`}
      />
      <Text
        style={[
          adminStyles.sideBarLinkText,
          (isHovered || isPressed) && adminStyles.hoversideBarLinks,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SideBarLinks;
