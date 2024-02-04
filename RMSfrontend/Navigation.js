import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Waiter from "./src/screens/waiter/Waiter";
import Admin from "./src/screens/admin/Admin";
import SignIn from "./src/screens/SignIn";
import Home from "./src/screens/client/Home";
import Receptionist from "./src/screens/receptionist/Receptionist";
import Cashier from "./src/screens/cashier/Cashier";
import Kitchen from "./src/screens/kitchen/Kitchen";
import EmployeeDetails from "./src/screens/employees/EmployeeDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState("SignIn");

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem("@navigationState");
        const state = savedStateString ? JSON.parse(savedStateString) : null;

        if (state && state.routes && state.routes.length > 0) {
          setInitialRouteName(state.routes[state.routes.length - 1].name);
        }

        setIsReady(true);
      } catch (e) {
        console.error("Error restoring navigation state", e);
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      onStateChange={(state) => {
        AsyncStorage.setItem("@navigationState", JSON.stringify(state));
      }}
    >
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Admin" component={Admin} />
          <Stack.Screen name="Waiter" component={Waiter} />
          <Stack.Screen name="Cashier" component={Cashier} />
          <Stack.Screen name="Receptionist" component={Receptionist} />
          <Stack.Screen name="Kitchen" component={Kitchen} />
          <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
