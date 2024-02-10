import { Pressable, View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SideBar from "./components/SideBar";
import adminStyles from "./styles/style";
import Dashboard from "./Dashboard";
import NavBar from "./components/NavBar";
import Products from "./Products";
import Employees from "./Employees";
import OrderLists from "./OrderLists";
import AddProducts from "./models/AddProducts";
import AddEmployees from "./models/AddEmployees";
import { api } from "../../api/api";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../context/States";

const Stack = createNativeStackNavigator();

const Admin = () => {
  const { employee } = useAppContext();
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
          <Stack.Screen name="OrderLists" component={OrderLists} />
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
  /* (
    /*<View>
      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text>Please Login</Text>
      </Pressable>
    </View>
  // )*/
};

export default Admin;
