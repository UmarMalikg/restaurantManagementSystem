import { View, Text, Pressable } from "react-native";
import React from "react";

import { useAppContext } from "../../context/States";

const HeaderLogoutButton = () => {
  const { updateEmployee } = useAppContext();
  const clearTokens = () => {
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const clearEmployeesInfoFromLocalStorage = () => {
    localStorage.removeItem("employee");
  };

  const logout = async () => {
    try {
      // Clear local storage
      clearTokens();
      clearEmployeesInfoFromLocalStorage();
      updateEmployee(null);
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          logout();
        }}
      >
        <Text>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default HeaderLogoutButton;
