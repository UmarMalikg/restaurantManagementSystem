import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchEmployeeData } from "../redux/actions/employeeActions";
import { fetchEmployeePositionData } from "../redux/actions/employeePositionActions";

const SignIn = ({
  fetchEmployeeData,
  employeeData,
  fetchEmployeePositionData,
  employeePositionData,
}) => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>SignIn</Text>
      <TextInput placeholder="Enter ID..." />
      <TextInput placeholder="Enter Passward..." />
      <TouchableOpacity onPress={() => navigation.navigate("Admin")}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
