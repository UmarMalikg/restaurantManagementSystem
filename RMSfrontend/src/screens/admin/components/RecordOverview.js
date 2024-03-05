import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import adminStyles from "../../styles/adminStyles";
import { useAppContext } from "../../../context/States";

const RecordOverview = ({
  recordName,
  recordNums,
  recordIcon,
  bgColor,
  link,
}) => {
  const { updateAdminActivedLink } = useAppContext();
  const navigation = useNavigation();

  const handleClick = (e) => {
    updateAdminActivedLink(e);
    navigation.navigate(e);
  };
  return (
    <Pressable
      onPress={() => handleClick(`${link}`)}
      style={[adminStyles.recordOverviewBox, { backgroundColor: `${bgColor}` }]}
    >
      <View style={adminStyles.recordDetail}>
        <Text style={adminStyles.recordName}>{recordName}</Text>
        <Text style={adminStyles.recordNums}>{recordNums}</Text>
      </View>
      <View style={adminStyles.recordIconPos}>
        <Image style={adminStyles.recordIcon} source={`${recordIcon}`} />
      </View>
    </Pressable>
  );
};

export default RecordOverview;
