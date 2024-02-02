import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Waiter from "./src/screens/waiter/Waiter";
import Admin from "./src/screens/admin/Admin";
import SignIn from "./src/screens/SignIn";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Admin"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="signIn" component={SignIn} />
          <Stack.Screen name="Waiter" component={Waiter} />
          <Stack.Screen name="Admin" component={Admin} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
