import React, { useEffect } from "react";
import Header from "./components/Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import { View } from "react-native";
import waiterStyles from "../styles/waiterStyles";
import { api } from "../../api/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Tables from "./models/Tables";
import Orders from "./Orders";
import UpdateOrder from "../common/updateOrder/UpdateOrder";

const Stack = createNativeStackNavigator();

const Waiter = () => {
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
        initialRouteName="WaiterHome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="WaiterHome" component={Home} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="UpdateOrder" component={UpdateOrder} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
          }}
        >
          <Stack.Screen name="Tables" component={Tables} />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};

export default Waiter;
