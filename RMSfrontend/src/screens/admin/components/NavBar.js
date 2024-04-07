import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import adminStyles from "../../styles/adminStyles";
import { useNavigation } from "@react-navigation/native";
import waiterStyles from "../../styles/waiterStyles";
import HeaderLogoutButton from "../../common/HeaderLogoutButton";

import { useAppContext } from "../../../context/States";
import HeaderImage from "../../common/HeaderImage";

const NavBar = () => {
  const navigation = useNavigation();

  const { employee } = useAppContext();

  return (
    <View style={adminStyles.navBar}>
      <Image
        source={require("../../../../assets/images/logo.png")}
        style={{ height: 40, width: 250 }}
      />

      {employee && employee.isAdmin ? (
        <View style={waiterStyles.headerEmployeeAction}>
          <View>
            <Text>Notifications</Text>
          </View>

          <HeaderLogoutButton />
          <View style={waiterStyles.headerEmployeeInfo}>
            <HeaderImage imageUrl={employee.photo} />

            <View style={waiterStyles.headerEmployeeNameAndRole}>
              <View style={waiterStyles.headerEmployeeName}>
                <Text style={waiterStyles.headerEmployeeNameText}>
                  {`${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`}
                </Text>
              </View>
              <View style={waiterStyles.headerEmployeeRole}>
                <Text style={waiterStyles.headerEmployeeRoleText}>Admin</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Text>Log In</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default NavBar;
