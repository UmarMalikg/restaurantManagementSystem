import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { api } from "../api/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/States";

const SignIn = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [pswrd, setPswrd] = useState("");

  const { updateEmployee } = useAppContext();

  axios.defaults.withCredentials = true;

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${api}/login`, {
        userName,
        pswrd,
      });
      if (res.data.Login) {
        updateEmployee(res.data.employee);
        switch (true) {
          case res.data.Admin:
            navigation.navigate("Admin");
            break;
          case res.data.Waiter:
            navigation.navigate("Waiter");
            break;
          case res.data.Cashier:
            navigation.navigate("Cashier");
            break;
          case res.data.KitchenManager:
            navigation.navigate("Kitchen");
            break;
          case res.data.Receptionist:
            navigation.navigate("Receptionist");
            break;
          default:
            navigation.navigate("EmployeeDetails");
            break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>SignIn</Text>
      <TextInput
        placeholder="Enter ID..."
        value={userName}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        placeholder="Enter Password..."
        value={pswrd}
        onChangeText={(text) => setPswrd(text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Go back to Home</Text>
      </TouchableOpacity>
      <Text>Don't have account</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
