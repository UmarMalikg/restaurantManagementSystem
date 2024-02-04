import { View, Text, TouchableOpacity, Image } from "react-native";
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
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text>Log Out</Text>
      </TouchableOpacity>
      <Text>
        {employee ? employee.personalInfo.firstName : "Employee Name"}
      </Text>
    </View>
  );
};

export default NavBar;
