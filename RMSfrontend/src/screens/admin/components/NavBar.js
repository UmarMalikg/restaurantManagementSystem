import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import adminStyles from "../styles/style";
import { useNavigation } from "@react-navigation/native";

const NavBar = () => {
  const navigation = useNavigation();
  return (
    <View style={adminStyles.navBar}>
      <Text>Logo</Text>
      <Text>Search</Text>
      <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
        <Text>Log Out</Text>
      </TouchableOpacity>
      <Text>Employee Image</Text>
    </View>
  );
};

export default NavBar;
