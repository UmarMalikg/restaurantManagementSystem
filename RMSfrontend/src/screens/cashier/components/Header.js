import React from "react";
import { View, Text, Pressable } from "react-native";
import waiterStyles from "../../styles/waiterStyles";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../context/States";
import HeaderLogoutButton from "../../common/HeaderLogoutButton";
import HeaderImage from "../../common/HeaderImage";
// import HeaderNotificationButton from "../../common/HeaderNotificationButton";
import HeaderLogo from "../../common/HeaderLogo";
import defaultStyles from "../../../defaultStyles";
import { FontAwesome6, FontAwesome, MaterialIcons } from "@expo/vector-icons";

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
        <View style={defaultStyles.mrgH10}>
          <Pressable onPress={() => navigation.navigate("CachierOrders")}>
            <FontAwesome name="tasks" size={24} color="#fff" />
          </Pressable>
        </View>
        <View style={defaultStyles.mrgH10}>
          <Pressable onPress={() => navigation.navigate("TakeOrder")}>
            <MaterialIcons name="add-task" size={24} color="#fff" />
          </Pressable>
        </View>
        <View style={defaultStyles.mrgH10}>
          <Pressable onPress={() => navigation.navigate("MyOrders")}>
            <FontAwesome6 name="clipboard-list" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
      {/* right */}

      {employee && employee.isCachier ? (
        <View style={waiterStyles.headerEmployeeAction}>
          {/* <HeaderNotificationButton /> */}
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
                <Text style={waiterStyles.headerEmployeeRoleText}>Cashier</Text>
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
