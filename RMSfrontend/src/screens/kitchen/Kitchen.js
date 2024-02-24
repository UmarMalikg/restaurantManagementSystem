import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import waiterStyles from "../waiter/styles/style";
import { api } from "../../api/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Header from "./components/Header";
import KitchenOrders from "./components/KitchenOrders";

const Stack = createNativeStackNavigator();

const Kitchen = () => {
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
        initialRouteName="KitchenOrders"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="KitchenOrders" component={KitchenOrders} />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};

export default Kitchen;
