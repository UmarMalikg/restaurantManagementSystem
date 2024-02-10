import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import adminStyles from "../styles/style";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../context/States";
import waiterStyles from "../../waiter/styles/style";

const NavBar = () => {
  const navigation = useNavigation();

  const { employee } = useAppContext();

  return (
    <View style={adminStyles.navBar}>
      <Text>Logo</Text>
      <Text>Search</Text>

      {employee && employee.isAdmin ? (
        <View style={waiterStyles.headerEmployeeAction}>
          <View>
            <Text>Notifications</Text>
          </View>
          <View>
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text>Log Out</Text>
            </Pressable>
          </View>

          <View style={waiterStyles.headerEmployeeInfo}>
            <View style={waiterStyles.headerEmployeeImgBox}>
              <Image
                source={{
                  uri: `http://localhost:8080/${employee.photo.replace(
                    /\\/g,
                    "/"
                  )}`,
                }}
                style={waiterStyles.headerEmployeeImg} // Adjust width and height as needed
              />
            </View>

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
