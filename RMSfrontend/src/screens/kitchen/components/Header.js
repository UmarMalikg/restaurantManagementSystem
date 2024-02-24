import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import waiterStyles from "../../waiter/styles/style";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../context/States";

const Header = () => {
  const navigation = useNavigation();

  const { employee } = useAppContext();
  return (
    // <ScrollView>
    <View style={waiterStyles.header}>
      {/* left */}
      <View>
        <Text>LOGO</Text>
      </View>
      {/* centre */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      ></View>
      {/* right */}

      {employee && employee.isKitchenManager ? (
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
                  {employee.personalInfo.firstName}{" "}
                  {employee.personalInfo.lastName}
                </Text>
              </View>
              <View style={waiterStyles.headerEmployeeRole}>
                <Text style={waiterStyles.headerEmployeeRoleText}>
                  Kitchen Manager
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text>Sign In</Text>
        </Pressable>
      )}
    </View>
    // </ScrollView>
  );
};

export default Header;
