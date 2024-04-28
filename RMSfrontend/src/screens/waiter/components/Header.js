import React from "react";
import { View, Text, Pressable } from "react-native";
import waiterStyles from "../../styles/waiterStyles";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../context/States";
import HeaderLogoutButton from "../../common/HeaderLogoutButton";
import HeaderImage from "../../common/HeaderImage";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import HeaderNotificationButton from "../../common/HeaderNotificationButton";
import HeaderLogo from "../../common/HeaderLogo";
import defaultStyles from "../../../defaultStyles";

const Header = () => {
  const navigation = useNavigation();

  const { employee } = useAppContext();
  return (
    // <ScrollView>
    <View style={waiterStyles.header}>
      {/* left */}
      <HeaderLogo />
      {/* centre */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{ marginHorizontal: 10 }}
          onPress={() => navigation.navigate("WaiterHome")}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
        </Pressable>
        <Pressable
          style={{ marginHorizontal: 10 }}
          onPress={() => navigation.navigate("Orders")}
        >
          <MaterialIcons name="addchart" size={24} color="#fff" />
        </Pressable>
      </View>
      {/* right */}

      {employee && employee.isWaiter ? (
        <View style={waiterStyles.headerEmployeeAction}>
          {/* <HeaderNotificationButton /> */}
          <HeaderLogoutButton />

          <View style={waiterStyles.headerEmployeeInfo}>
            <HeaderImage imageUrl={employee.photo} />

            <View style={waiterStyles.headerEmployeeNameAndRole}>
              <View style={waiterStyles.headerEmployeeName}>
                <Text style={waiterStyles.headerEmployeeNameText}>
                  {employee.personalInfo.firstName +
                    employee.personalInfo.lastName}
                </Text>
              </View>
              <View style={waiterStyles.headerEmployeeRole}>
                <Text style={waiterStyles.headerEmployeeRoleText}>Waiter</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text style={[defaultStyles.fWB, { color: "#fff" }]}>Sign In</Text>
        </Pressable>
      )}
    </View>
    // </ScrollView>
  );
};

export default Header;
