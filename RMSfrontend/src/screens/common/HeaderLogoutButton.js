import { View, Text, Pressable } from "react-native";
import React from "react";

import { useAppContext } from "../../context/States";

import { MaterialIcons } from "@expo/vector-icons";
import defaultStyles from "../../defaultStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const HeaderLogoutButton = () => {
  const { updateEmployee } = useAppContext();
  const navigation = useNavigation();

  const clearTokens = () => {
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const clearEmployeesInfoFromLocalStorage = () => {
    AsyncStorage.removeItem("employee");
  };

  const logout = async () => {
    try {
      // Clear local storage
      clearTokens();
      clearEmployeesInfoFromLocalStorage();
      updateEmployee(null);
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={defaultStyles.mrgH20}>
      <Pressable
        onPress={() => {
          logout();
        }}
      >
        <MaterialIcons name="logout" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

export default HeaderLogoutButton;
