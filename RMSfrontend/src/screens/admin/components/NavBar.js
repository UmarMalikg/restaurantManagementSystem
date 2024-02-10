import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import adminStyles from "../styles/style";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../context/States";

const NavBar = () => {
  const navigation = useNavigation();

  const { employee } = useAppContext();

  return (
    <View style={adminStyles.navBar}>
      <Text>Logo</Text>
      <Text>Search</Text>
      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text>Log Out</Text>
      </Pressable>
      <Text>
        {employee ? employee.personalInfo.firstName : "Employee Name"}
      </Text>
    </View>
  );
};

export default NavBar;
