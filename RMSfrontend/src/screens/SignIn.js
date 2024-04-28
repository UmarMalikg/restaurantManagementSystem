import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { api } from "../api/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../context/States";
import defaultStyles from "../defaultStyles";
import loginRegisterFormStyles from "./styles/loginRegisterPageStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isWeb = Platform.OS === "web";

const SignIn = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [pswrd, setPswrd] = useState("");

  const { updateEmployee } = useAppContext();
  const { updateUser } = useAppContext();

  axios.defaults.withCredentials = true;

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${api}/login`, {
        userName,
        pswrd,
      });
      if (res.data.Login) {
        if (res.data.employee) {
          await updateEmployee(res.data.employee);
          await AsyncStorage.setItem(
            "employee",
            JSON.stringify(res.data.employee)
          );
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
        } else if (res.data.user) {
          updateUser(res.data.user);
          navigation.navigate("Home");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={loginRegisterFormStyles.backgroundImage}
    >
      <View style={defaultStyles.container}>
        <View style={loginRegisterFormStyles.loginBox}>
          <View style={loginRegisterFormStyles.formHeader}>
            <Text style={loginRegisterFormStyles.TitleText}>Sign in</Text>
          </View>
          <View style={loginRegisterFormStyles.quote}>
            <Text>Welcome back! Login to the RMS</Text>
          </View>
          <TextInput
            placeholder="Enter username..."
            value={userName}
            onChangeText={(text) => setUserName(text)}
            style={loginRegisterFormStyles.inputfield}
          />
          <TextInput
            placeholder="Enter password..."
            value={pswrd}
            onChangeText={(text) => setPswrd(text)}
            secureTextEntry
            style={loginRegisterFormStyles.inputfield}
          />
          <Pressable
            onPress={handleLogin}
            style={loginRegisterFormStyles.loginRegisterButton}
          >
            <Text style={loginRegisterFormStyles.loginRegisterButtonText}>
              Sign in
            </Text>
          </Pressable>
          {/* <Pressable onPress={() => navigation.navigate("Home")}>
            <Text>Go back to Home</Text>
          </Pressable> */}
          {/* <View style={defaultStyles.rowCenteredFlex}>
            <Text>Don't have account? </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={{ fontWeight: "bold", color: "#00f" }}>Sign Up</Text>
            </Pressable>
          </View> */}
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignIn;
