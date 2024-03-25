import { Text, Pressable, Image, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../../styles/adminStyles";
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
      {/* <View
        style={[
          (isHovered || isPressed) && adminStyles.hoverSideBarLinksBefore,
          isActive && adminStyles.activeSideBarLinksBefore,
        ]}
      ></View>
      <View
        style={[
          (isHovered || isPressed) && adminStyles.hoverSideBarLinksAfter,
          isActive && adminStyles.activeSideBarLinksAfter,
        ]}
      ></View> */}
      <Image
        style={[
          adminStyles.sideBarLinkIcon,
          (isHovered || isPressed) && adminStyles.hoverSideBarLinks,
          isActive && adminStyles.activeSideBarLinks,
        ]}
        source={`${icon}`}
      />
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
