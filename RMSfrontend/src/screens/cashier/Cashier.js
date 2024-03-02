import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { api } from "../../api/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import waiterStyles from "../waiter/styles/style";
import Header from "./components/Header";
import CachierOrders from "./CachierOrders";

const Stack = createNativeStackNavigator();

const Cashier = () => {
  const navigation = useNavigation();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(`${api}/userAuth`);
        console.log("Server Response:", res.data); // Log the response
        if (!res.data.valid) {
          navigation.navigate("SignIn");
        }
      } catch (err) {
        console.error("Error from Server:", err); // Log the error
      }
    };

    fetchToken();
  }, [navigation]);
  return (
    <View style={waiterStyles.container}>
      <Header />
      <Stack.Navigator
        initialRouteName="CachierOrders"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="CachierOrders" component={CachierOrders} />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};

export default Cashier;
