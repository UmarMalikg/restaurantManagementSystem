import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import waiterStyles from "../../styles/waiterStyles";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../context/States";
import HeaderLogoutButton from "../../common/HeaderLogoutButton";
import HeaderImage from "../../common/HeaderImage";

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
          <HeaderLogoutButton />

          <View style={waiterStyles.headerEmployeeInfo}>
            <HeaderImage imageUrl={employee.photo} />

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
