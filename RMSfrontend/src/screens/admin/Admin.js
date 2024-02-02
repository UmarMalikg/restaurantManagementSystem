import { View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SideBar from "./components/SideBar";
import adminStyles from "./styles/style";
import Dashboard from "./Dashboard";
import NavBar from "./components/NavBar";
import Products from "./Products";
import Employees from "./Employees";
import AddProducts from "./models/AddProducts";
import AddEmployees from "./models/AddEmployees";

const Stack = createNativeStackNavigator();

const Admin = () => {
  return (
    <View style={adminStyles.container}>
      <NavBar />
      <SideBar />
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Employees" component={Employees} />
          <Stack.Screen name="Products" component={Products} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="Add Product" component={AddProducts} />
          <Stack.Screen name="Add Employee" component={AddEmployees} />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};

export default Admin;
