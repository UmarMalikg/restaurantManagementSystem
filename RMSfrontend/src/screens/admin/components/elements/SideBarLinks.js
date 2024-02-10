import { Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/style";
import { useAppContext } from "../../../../context/States";

const SideBarLinks = ({ text, icon, link }) => {
  const { updateAdminActivedLink, adminActivedLink } = useAppContext();
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

  const handleClick = (e) => {
    updateAdminActivedLink(e);
    navigation.navigate(e);
  };
  const isActive = adminActivedLink === link;

  return (
    <Pressable
      style={[
        adminStyles.sideBarLinks,
        (isHovered || isPressed) && adminStyles.hoverSideBarLinks,
        isActive && adminStyles.activeSideBarLinks,
      ]}
      onPress={() => handleClick(`${link}`)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {icon}
      <Text
        style={[
          adminStyles.sideBarLinkText,
          (isHovered || isPressed) && adminStyles.hoverSideBarLinks,
          isActive && adminStyles.activeSideBarLinks,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default SideBarLinks;
