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
import loginFormStyles from "./loginFormStyle";

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
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      }}
    >
      <View style={loginFormStyles.container}>
        <View style={loginFormStyles.loginBox}>
          <View style={loginFormStyles.loginTitle}>
            <Text style={loginFormStyles.loginTitleText}>SignIn</Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginBottom: 30,
            }}
          >
            <Text>Welcome back! Login to access the RMS</Text>
          </View>
          <TextInput
            placeholder="Enter ID..."
            value={userName}
            onChangeText={(text) => setUserName(text)}
            style={loginFormStyles.loginInput}
          />
          <TextInput
            placeholder="Enter Password..."
            value={pswrd}
            onChangeText={(text) => setPswrd(text)}
            secureTextEntry
            style={loginFormStyles.loginInput}
          />
          <Pressable onPress={handleLogin} style={loginFormStyles.loginButton}>
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>Sign In</Text>
          </Pressable>
          {/* <Pressable onPress={() => navigation.navigate("Home")}>
          <Text>Go back to Home</Text>
        </Pressable> */}
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text>Don't have account? </Text>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text style={{ fontWeight: "bold", color: "#00f" }}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignIn;
